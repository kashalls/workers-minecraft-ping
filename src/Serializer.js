'use strict'

import {Serializer, FullPacketParser, CompiledProtoDef } from './node_modules/protodef/src/compiler.js';
import compiledStuff from './stuff'
const { sizeOf, write, read } = compiledStuff;
const protocols = {}

function createProtocol(state, direction, version, customPackets, compiled = true) {
    const key = state + ';' + direction + ';' + version + (compiled ? ';c' : '')
    if (protocols[key]) { return protocols[key] }

    const proto = new CompiledProtoDef(sizeOf[state][direction], write[state][direction], read[state][direction])
    protocols[key] = proto
    return proto
}

function createSerializer({ state = 'handshaking', isServer = false, version, customPackets, compiled = true } = {}) {
    return new Serializer(createProtocol(state, !isServer ? 'toServer' : 'toClient', version, customPackets, compiled), 'packet')
}

function createDeserializer({ state = 'handshaking', isServer = false, version, customPackets, compiled = true, noErrorLogging = false } = {}) {
    return new FullPacketParser(createProtocol(state, isServer ? 'toServer' : 'toClient', version, customPackets, compiled), 'packet', noErrorLogging)
}

module.exports = {
    createSerializer: createSerializer,
    createDeserializer: createDeserializer
}