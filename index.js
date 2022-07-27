import Client from './src/Client';
import net from 'net';
import dns from 'dns';

const doPing = async request => {
    let { host, port } = await request.json()
    const headers = { 'Content-Type': 'application/json' }

    let closeTimer = null;
    const client = new Client(false, '1.19')
    const result = await new Promise((resolve, reject) => {
        client.on('error', (err) => {
            clearTimeout(closeTimer)
            client.end()
            reject()
        })
        client.once('server_info', function (packet) {
            const data = JSON.parse(packet.response)
            const start = Date.now()
            const maxTime = setTimeout(() => {
                clearTimeout(closeTimer)
                client.end()
                resolve(data)
            }, 5000)
            client.once('ping', function (packet) {
                data.latency = Date.now() - start
                clearTimeout(maxTime)
                clearTimeout(closeTimer)
                client.end()
                resolve(data)
            })
            client.write('ping', { time: [0, 0] })
        })
        client.on('state', function (newState) {
            if (newState === 'status') { client.write('ping_start', {}) }
        })
        client.on('connect', function () {
            client.write('set_protocol', {
                protocolVersion: version.version,
                serverHost: host,
                serverPort: port,
                nextState: 1
            })
            client.state = 'status'
        })
        // timeout against servers that never reply while keeping
        // the connection open and alive.
        closeTimer = setTimeout(function () {
            client.end()
            reject(new Error('ETIMEDOUT'))
        }, 120000)

        if (port === 25565 && net.isIP(host) === 0 && host !== 'localhost') {
            dns.resolveSrv(`_minecraft.tcp.${host}`, (err, addr) => {
                if (err) client.setSocket(net.connect(port, host))
                if (addr && addr.length > 0) {
                    host = addr[0].host
                    port = addr[0].port
                    client.setSocket(net.connect(port, host));
                }
            })
        } else {
            client.setSocket(net.connect(port, host))
        }
    })

    return new Response(result, { headers })
}

async function handleRequest(request) {
    return await doPing(request)
}

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})