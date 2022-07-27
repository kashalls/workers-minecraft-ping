'use strict'

import { EventEmitter } from 'events';
import { createFramer, createSplitter } from './Framer';
import { createSerializer, createDeserializer } from './Serializer';

const closeTimeout = 30000

class Client extends EventEmitter {
    constructor(isServer, version, hideErrors = false) {
        super()
        this.version = version
        this.isServer = !!isServer
        this.splitter = createSplitter()
        this.packetsToParse = {}
        this.framer = createFramer()
        this.ended = true
        this.latency = 0
        this.hideErrors = hideErrors
        this.closeTimer = null

        this.state = 'handshaking'
    }

    get state() {
        return this.protocolState
    }

    setSerializer(state) {
        this.serializer = createSerializer({ isServer: this.isServer, version: this.version, state: state })
        this.deserializer = createDeserializer({
            isServer: this.isServer,
            version: this.version,
            state: state,
            packetsToParse:
                this.packetsToParse,
            noErrorLogging: this.hideErrors
        })

        this.splitter.recognizeLegacyPing = state === 'handshaking'

        this.serializer.on('error', (e) => {
            let parts
            if (e.field) {
                parts = e.field.split('.')
                parts.shift()
            } else { parts = [] }
            const serializerDirection = !this.isServer ? 'toServer' : 'toClient'
            e.field = [this.protocolState, serializerDirection].concat(parts).join('.')
            e.message = `Serialization error for ${e.field} : ${e.message}`
            this.emit('error', e)
        })

        this.deserializer.on('error', (e) => {
            let parts
            if (e.field) {
                parts = e.field.split('.')
                parts.shift()
            } else { parts = [] }
            const deserializerDirection = this.isServer ? 'toServer' : 'toClient'
            e.field = [this.protocolState, deserializerDirection].concat(parts).join('.')
            e.message = `Deserialization error for ${e.field} : ${e.message}`
            this.emit('error', e)
        })

        this.deserializer.on('data', (parsed) => {
            parsed.metadata.name = parsed.data.name
            parsed.data = parsed.data.params
            parsed.metadata.state = state
            debug('read packet ' + state + '.' + parsed.metadata.name)
            if (debug.enabled) {
                const s = JSON.stringify(parsed.data, null, 2)
                debug(s && s.length > 10000 ? parsed.data : s)
            }
            this.emit('packet', parsed.data, parsed.metadata, parsed.buffer, parsed.fullBuffer)
            this.emit(parsed.metadata.name, parsed.data, parsed.metadata)
            this.emit('raw.' + parsed.metadata.name, parsed.buffer, parsed.metadata)
            this.emit('raw', parsed.buffer, parsed.metadata)
        })
    }

    set state(newProperty) {
        const oldProperty = this.protocolState
        this.protocolState = newProperty

        if (this.serializer) {
            this.serializer.unpipe()
            this.splitter.unpipe(this.deserializer)

            this.serializer.removeAllListeners()
            this.deserializer.removeAllListeners()
        }
        this.setSerializer(this.protocolState)

        this.serializer.pipe(this.framer)
        this.splitter.pipe(this.deserializer)

        this.emit('state', newProperty, oldProperty)
    }

    setSocket(socket) {
        this.ended = false
        const endSocket = () => {
            if (this.ended) return
            this.ended = true
            clearTimeout(this.closeTimer)
            this.socket.removeListener('close', endSocket)
            this.socket.removeListener('end', endSocket)
            this.socket.removeListener('timeout', endSocket)
            this.emit('end', this._endReason || 'socketClosed')
        }

        const onFatalError = (err) => {
            this.emit('error', err)
            endSocket()
        }

        const onError = (err) => this.emit('error', err)
        this.socket = socket
        if (this.socket.setNoDelay) { this.socket.setNoDelay(true) }
        this.socket.on('connect', () => this.emit('connect'))
        this.socket.on('error', onFatalError)
        this.socket.on('close', endSocket)
        this.socket.on('end', endSocket)
        this.socket.on('timeout', endSocket)
        this.framer.on('error', onError)
        this.splitter.on('error', onError)

        this.socket.pipe(this.splitter)
        this.framer.pipe(this.socket)
    }

    end(reason) {
        this._endReason = reason
        /* ending the serializer will end the whole chain
        serializer -> framer -> socket -> splitter -> deserializer */
        if (this.serializer) {
            this.serializer.end()
        } else {
            if (this.socket) this.socket.end()
        }
        if (this.socket) {
            this.closeTimer = setTimeout(
                this.socket.destroy.bind(this.socket),
                closeTimeout
            )
        }
    }

    write(name, params) {
        if (!this.serializer.writable) { return }
        debug('writing packet ' + this.state + '.' + name)
        debug(params)
        this.serializer.write({ name, params })
    }

    writeRaw(buffer) {
        const stream = this.framer;
        if (!stream.writable) { return }
        stream.write(buffer)
    }
}

module.exports = Client