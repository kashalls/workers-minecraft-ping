export default {
    sizeOf: {
      handshaking: {
        toClient: {
          i8: native.i8,
          u8: native.u8,
          i16: native.i16,
          u16: native.u16,
          i32: native.i32,
          u32: native.u32,
          f32: native.f32,
          f64: native.f64,
          li8: native.li8,
          lu8: native.lu8,
          li16: native.li16,
          lu16: native.lu16,
          li32: native.li32,
          lu32: native.lu32,
          lf32: native.lf32,
          lf64: native.lf64,
          i64: native.i64,
          li64: native.li64,
          u64: native.u64,
          lu64: native.lu64,
          varint: native.varint,
          bool: native.bool,
          pstring: native.pstring,
          buffer: native.buffer,
          void: native.void,
          bitfield: native.bitfield,
          cstring: native.cstring,
          mapper: native.mapper,
          container: native.container,
          switch: native.switch,
          string: (value) => {
            let size = Buffer.byteLength(value, "utf8")
            size += (ctx.varint)(size)
            return size
          },
          packet: (value) => {
            let size = 0
            let name = value.name
            size += ((value) => {
              return (ctx.varint)({}[value] || value)
            })(name)
            let params = value.params
            size += ((value) => {
              switch (name) {
                default: return (ctx.void)(value)
              }
            })(params)
            return size
          }
        },
        toServer: {
            i8: native.i8,
            u8: native.u8,
            i16: native.i16,
            u16: native.u16,
            i32: native.i32,
            u32: native.u32,
            f32: native.f32,
            f64: native.f64,
            li8: native.li8,
            lu8: native.lu8,
            li16: native.li16,
            lu16: native.lu16,
            li32: native.li32,
            lu32: native.lu32,
            lf32: native.lf32,
            lf64: native.lf64,
            i64: native.i64,
            li64: native.li64,
            u64: native.u64,
            lu64: native.lu64,
            varint: native.varint,
            bool: native.bool,
            pstring: native.pstring,
            buffer: native.buffer,
            void: native.void,
            bitfield: native.bitfield,
            cstring: native.cstring,
            mapper: native.mapper,
            container: native.container,
            switch: native.switch,
            string: (value) => {
              let size = Buffer.byteLength(value, "utf8")
              size += (ctx.varint)(size)
              return size
            },
            packet_set_protocol: (value) => {
              let size = 0
              let protocolVersion = value.protocolVersion
              size += (ctx.varint)(protocolVersion)
              let serverHost = value.serverHost
              size += (ctx.string)(serverHost)
              let serverPort = value.serverPort
              size += (ctx.u16)(serverPort)
              let nextState = value.nextState
              size += (ctx.varint)(nextState)
              return size
            },
            packet_legacy_server_list_ping: (value) => {
              let size = 0
              let payload = value.payload
              size += (ctx.u8)(payload)
              return size
            },
            packet: (value) => {
              let size = 0
              let name = value.name
              size += ((value) => {
                return (ctx.varint)({"set_protocol":0,"legacy_server_list_ping":254}[value] || value)
              })(name)
              let params = value.params
              size += ((value) => {
                switch (name) {
                  case "set_protocol": return (ctx.packet_set_protocol)(value)
                  case "legacy_server_list_ping": return (ctx.packet_legacy_server_list_ping)(value)
                  default: return (ctx.void)(value)
                }
              })(params)
              return size
            }
          }
        }
      },
      status: {
        toClient: {
          i8: native.i8,
          u8: native.u8,
          i16: native.i16,
          u16: native.u16,
          i32: native.i32,
          u32: native.u32,
          f32: native.f32,
          f64: native.f64,
          li8: native.li8,
          lu8: native.lu8,
          li16: native.li16,
          lu16: native.lu16,
          li32: native.li32,
          lu32: native.lu32,
          lf32: native.lf32,
          lf64: native.lf64,
          i64: native.i64,
          li64: native.li64,
          u64: native.u64,
          lu64: native.lu64,
          varint: native.varint,
          bool: native.bool,
          pstring: native.pstring,
          buffer: native.buffer,
          void: native.void,
          bitfield: native.bitfield,
          cstring: native.cstring,
          mapper: native.mapper,
          container: native.container,
          switch: native.switch,
          string: (value) => {
            let size = Buffer.byteLength(value, "utf8")
            size += (ctx.varint)(size)
            return size
          },
          packet_server_info: (value) => {
            let size = 0
            let response = value.response
            size += (ctx.string)(response)
            return size
          },
          packet_ping: (value) => {
            let size = 0
            let time = value.time
            size += (ctx.i64)(time)
            return size
          },
          packet: (value) => {
            let size = 0
            let name = value.name
            size += ((value) => {
              return (ctx.varint)({"server_info":0,"ping":1}[value] || value)
            })(name)
            let params = value.params
            size += ((value) => {
              switch (name) {
                case "server_info": return (ctx.packet_server_info)(value)
                case "ping": return (ctx.packet_ping)(value)
                default: return (ctx.void)(value)
              }
            })(params)
            return size
          }
        },
        toServer: {
            i8: native.i8,
            u8: native.u8,
            i16: native.i16,
            u16: native.u16,
            i32: native.i32,
            u32: native.u32,
            f32: native.f32,
            f64: native.f64,
            li8: native.li8,
            lu8: native.lu8,
            li16: native.li16,
            lu16: native.lu16,
            li32: native.li32,
            lu32: native.lu32,
            lf32: native.lf32,
            lf64: native.lf64,
            i64: native.i64,
            li64: native.li64,
            u64: native.u64,
            lu64: native.lu64,
            varint: native.varint,
            bool: native.bool,
            pstring: native.pstring,
            buffer: native.buffer,
            void: native.void,
            bitfield: native.bitfield,
            cstring: native.cstring,
            mapper: native.mapper,
            container: native.container,
            switch: native.switch,
            string: (value) => {
              let size = Buffer.byteLength(value, "utf8")
              size += (ctx.varint)(size)
              return size
            },
            packet_ping_start: (value) => {
              let size = 0
              return size
            },
            packet_ping: (value) => {
              let size = 0
              let time = value.time
              size += (ctx.i64)(time)
              return size
            },
            packet: (value) => {
              let size = 0
              let name = value.name
              size += ((value) => {
                return (ctx.varint)({"ping_start":0,"ping":1}[value] || value)
              })(name)
              let params = value.params
              size += ((value) => {
                switch (name) {
                  case "ping_start": return (ctx.packet_ping_start)(value)
                  case "ping": return (ctx.packet_ping)(value)
                  default: return (ctx.void)(value)
                }
              })(params)
              return size
            }
          }
      },
    write: {
      handshaking: {
        toClient: {
          i8: native.i8,
          u8: native.u8,
          i16: native.i16,
          u16: native.u16,
          i32: native.i32,
          u32: native.u32,
          f32: native.f32,
          f64: native.f64,
          li8: native.li8,
          lu8: native.lu8,
          li16: native.li16,
          lu16: native.lu16,
          li32: native.li32,
          lu32: native.lu32,
          lf32: native.lf32,
          lf64: native.lf64,
          i64: native.i64,
          li64: native.li64,
          u64: native.u64,
          lu64: native.lu64,
          varint: native.varint,
          bool: native.bool,
          pstring: native.pstring,
          buffer: native.buffer,
          void: native.void,
          bitfield: native.bitfield,
          cstring: native.cstring,
          mapper: native.mapper,
          container: native.container,
          switch: native.switch,
          string: (value, buffer, offset) => {
            const length = Buffer.byteLength(value, "utf8")
            offset = (ctx.varint)(length, buffer, offset)
            buffer.write(value, offset, length, "utf8")
            return offset + length
          },
          packet: (value, buffer, offset) => {
            let name = value.name
            offset = ((value, buffer, offset) => {
              return (ctx.varint)({}[value] || value, buffer, offset)
            })(name, buffer, offset)
            let params = value.params
            offset = ((value, buffer, offset) => {
              switch (name) {
                default: return (ctx.void)(value, buffer, offset)
              }
            })(params, buffer, offset)
            return offset
          }
        },
        toServer: {
          i8: native.i8,
          u8: native.u8,
          i16: native.i16,
          u16: native.u16,
          i32: native.i32,
          u32: native.u32,
          f32: native.f32,
          f64: native.f64,
          li8: native.li8,
          lu8: native.lu8,
          li16: native.li16,
          lu16: native.lu16,
          li32: native.li32,
          lu32: native.lu32,
          lf32: native.lf32,
          lf64: native.lf64,
          i64: native.i64,
          li64: native.li64,
          u64: native.u64,
          lu64: native.lu64,
          varint: native.varint,
          bool: native.bool,
          pstring: native.pstring,
          buffer: native.buffer,
          void: native.void,
          bitfield: native.bitfield,
          cstring: native.cstring,
          mapper: native.mapper,
          container: native.container,
          switch: native.switch,
          string: (value, buffer, offset) => {
            const length = Buffer.byteLength(value, "utf8")
            offset = (ctx.varint)(length, buffer, offset)
            buffer.write(value, offset, length, "utf8")
            return offset + length
          },
          packet_set_protocol: (value, buffer, offset) => {
            let protocolVersion = value.protocolVersion
            offset = (ctx.varint)(protocolVersion, buffer, offset)
            let serverHost = value.serverHost
            offset = (ctx.string)(serverHost, buffer, offset)
            let serverPort = value.serverPort
            offset = (ctx.u16)(serverPort, buffer, offset)
            let nextState = value.nextState
            offset = (ctx.varint)(nextState, buffer, offset)
            return offset
          },
          packet_legacy_server_list_ping: (value, buffer, offset) => {
            let payload = value.payload
            offset = (ctx.u8)(payload, buffer, offset)
            return offset
          },
          packet: (value, buffer, offset) => {
            let name = value.name
            offset = ((value, buffer, offset) => {
              return (ctx.varint)({"set_protocol":0,"legacy_server_list_ping":254}[value] || value, buffer, offset)
            })(name, buffer, offset)
            let params = value.params
            offset = ((value, buffer, offset) => {
              switch (name) {
                case "set_protocol": return (ctx.packet_set_protocol)(value, buffer, offset)
                case "legacy_server_list_ping": return (ctx.packet_legacy_server_list_ping)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(params, buffer, offset)
            return offset
          }
        }
      },
      status: {
        toClient: {
          i8: native.i8,
          u8: native.u8,
          i16: native.i16,
          u16: native.u16,
          i32: native.i32,
          u32: native.u32,
          f32: native.f32,
          f64: native.f64,
          li8: native.li8,
          lu8: native.lu8,
          li16: native.li16,
          lu16: native.lu16,
          li32: native.li32,
          lu32: native.lu32,
          lf32: native.lf32,
          lf64: native.lf64,
          i64: native.i64,
          li64: native.li64,
          u64: native.u64,
          lu64: native.lu64,
          varint: native.varint,
          bool: native.bool,
          pstring: native.pstring,
          buffer: native.buffer,
          void: native.void,
          bitfield: native.bitfield,
          cstring: native.cstring,
          mapper: native.mapper,
          container: native.container,
          switch: native.switch,
          string: (value, buffer, offset) => {
            const length = Buffer.byteLength(value, "utf8")
            offset = (ctx.varint)(length, buffer, offset)
            buffer.write(value, offset, length, "utf8")
            return offset + length
          },
          packet_server_info: (value, buffer, offset) => {
            let response = value.response
            offset = (ctx.string)(response, buffer, offset)
            return offset
          },
          packet_ping: (value, buffer, offset) => {
            let time = value.time
            offset = (ctx.i64)(time, buffer, offset)
            return offset
          },
          packet: (value, buffer, offset) => {
            let name = value.name
            offset = ((value, buffer, offset) => {
              return (ctx.varint)({"server_info":0,"ping":1}[value] || value, buffer, offset)
            })(name, buffer, offset)
            let params = value.params
            offset = ((value, buffer, offset) => {
              switch (name) {
                case "server_info": return (ctx.packet_server_info)(value, buffer, offset)
                case "ping": return (ctx.packet_ping)(value, buffer, offset)
                default: return (ctx.void)(value, buffer, offset)
              }
            })(params, buffer, offset)
            return offset
          }
        },
        toServer: {
            i8: native.i8,
            u8: native.u8,
            i16: native.i16,
            u16: native.u16,
            i32: native.i32,
            u32: native.u32,
            f32: native.f32,
            f64: native.f64,
            li8: native.li8,
            lu8: native.lu8,
            li16: native.li16,
            lu16: native.lu16,
            li32: native.li32,
            lu32: native.lu32,
            lf32: native.lf32,
            lf64: native.lf64,
            i64: native.i64,
            li64: native.li64,
            u64: native.u64,
            lu64: native.lu64,
            varint: native.varint,
            bool: native.bool,
            pstring: native.pstring,
            buffer: native.buffer,
            void: native.void,
            bitfield: native.bitfield,
            cstring: native.cstring,
            mapper: native.mapper,
            container: native.container,
            switch: native.switch,
            string: (value, buffer, offset) => {
              const length = Buffer.byteLength(value, "utf8")
              offset = (ctx.varint)(length, buffer, offset)
              buffer.write(value, offset, length, "utf8")
              return offset + length
            },
            packet_ping_start: (value, buffer, offset) => {
              return offset
            },
            packet_ping: (value, buffer, offset) => {
              let time = value.time
              offset = (ctx.i64)(time, buffer, offset)
              return offset
            },
            packet: (value, buffer, offset) => {
              let name = value.name
              offset = ((value, buffer, offset) => {
                return (ctx.varint)({"ping_start":0,"ping":1}[value] || value, buffer, offset)
              })(name, buffer, offset)
              let params = value.params
              offset = ((value, buffer, offset) => {
                switch (name) {
                  case "ping_start": return (ctx.packet_ping_start)(value, buffer, offset)
                  case "ping": return (ctx.packet_ping)(value, buffer, offset)
                  default: return (ctx.void)(value, buffer, offset)
                }
              })(params, buffer, offset)
              return offset
            }
          }
      }
    },
    read: {
      handshaking: {
        toClient: {
          i8: native.i8,
          u8: native.u8,
          i16: native.i16,
          u16: native.u16,
          i32: native.i32,
          u32: native.u32,
          f32: native.f32,
          f64: native.f64,
          li8: native.li8,
          lu8: native.lu8,
          li16: native.li16,
          lu16: native.lu16,
          li32: native.li32,
          lu32: native.lu32,
          lf32: native.lf32,
          lf64: native.lf64,
          i64: native.i64,
          li64: native.li64,
          u64: native.u64,
          lu64: native.lu64,
          varint: native.varint,
          bool: native.bool,
          pstring: native.pstring,
          buffer: native.buffer,
          void: native.void,
          bitfield: native.bitfield,
          cstring: native.cstring,
          mapper: native.mapper,
          container: native.container,
          switch: native.switch,
          string: (buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            offset += countSize
            if (offset + count > buffer.length) {
              throw new PartialReadError("Missing characters in string, found size is " + buffer.length + " expected size was " + (offset + count))
            }
            return { value: buffer.toString("utf8", offset, offset + count), size: count + countSize }
          },
          packet: (buffer, offset) => {
            let { value: name, size: nameSize } = ((buffer, offset) => {
              const { value, size } = (ctx.varint)(buffer, offset)
              return { value: {}[value] || value, size }
            })(buffer, offset)
            let { value: params, size: paramsSize } = ((buffer, offset) => {
              switch (name) {
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + nameSize)
            return { value: { name, params }, size: nameSize + paramsSize}
          }
        },
        toServer: {
          i8: native.i8,
          u8: native.u8,
          i16: native.i16,
          u16: native.u16,
          i32: native.i32,
          u32: native.u32,
          f32: native.f32,
          f64: native.f64,
          li8: native.li8,
          lu8: native.lu8,
          li16: native.li16,
          lu16: native.lu16,
          li32: native.li32,
          lu32: native.lu32,
          lf32: native.lf32,
          lf64: native.lf64,
          i64: native.i64,
          li64: native.li64,
          u64: native.u64,
          lu64: native.lu64,
          varint: native.varint,
          bool: native.bool,
          pstring: native.pstring,
          buffer: native.buffer,
          void: native.void,
          bitfield: native.bitfield,
          cstring: native.cstring,
          mapper: native.mapper,
          container: native.container,
          switch: native.switch,
          string: (buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            offset += countSize
            if (offset + count > buffer.length) {
              throw new PartialReadError("Missing characters in string, found size is " + buffer.length + " expected size was " + (offset + count))
            }
            return { value: buffer.toString("utf8", offset, offset + count), size: count + countSize }
          },
          packet_set_protocol: (buffer, offset) => {
            let { value: protocolVersion, size: protocolVersionSize } = (ctx.varint)(buffer, offset)
            let { value: serverHost, size: serverHostSize } = (ctx.string)(buffer, offset + protocolVersionSize)
            let { value: serverPort, size: serverPortSize } = (ctx.u16)(buffer, offset + protocolVersionSize + serverHostSize)
            let { value: nextState, size: nextStateSize } = (ctx.varint)(buffer, offset + protocolVersionSize + serverHostSize + serverPortSize)
            return { value: { protocolVersion, serverHost, serverPort, nextState }, size: protocolVersionSize + serverHostSize + serverPortSize + nextStateSize}
          },
          packet_legacy_server_list_ping: (buffer, offset) => {
            let { value: payload, size: payloadSize } = (ctx.u8)(buffer, offset)
            return { value: { payload }, size: payloadSize}
          },
          packet: (buffer, offset) => {
            let { value: name, size: nameSize } = ((buffer, offset) => {
              const { value, size } = (ctx.varint)(buffer, offset)
              return { value: {"0":"set_protocol","254":"legacy_server_list_ping"}[value] || value, size }
            })(buffer, offset)
            let { value: params, size: paramsSize } = ((buffer, offset) => {
              switch (name) {
                case "set_protocol": return (ctx.packet_set_protocol)(buffer, offset)
                case "legacy_server_list_ping": return (ctx.packet_legacy_server_list_ping)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + nameSize)
            return { value: { name, params }, size: nameSize + paramsSize}
          }
        }
      },
      status: {
        toClient: {
          i8: native.i8,
          u8: native.u8,
          i16: native.i16,
          u16: native.u16,
          i32: native.i32,
          u32: native.u32,
          f32: native.f32,
          f64: native.f64,
          li8: native.li8,
          lu8: native.lu8,
          li16: native.li16,
          lu16: native.lu16,
          li32: native.li32,
          lu32: native.lu32,
          lf32: native.lf32,
          lf64: native.lf64,
          i64: native.i64,
          li64: native.li64,
          u64: native.u64,
          lu64: native.lu64,
          varint: native.varint,
          bool: native.bool,
          pstring: native.pstring,
          buffer: native.buffer,
          void: native.void,
          bitfield: native.bitfield,
          cstring: native.cstring,
          mapper: native.mapper,
          container: native.container,
          switch: native.switch,
          string: (buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            offset += countSize
            if (offset + count > buffer.length) {
              throw new PartialReadError("Missing characters in string, found size is " + buffer.length + " expected size was " + (offset + count))
            }
            return { value: buffer.toString("utf8", offset, offset + count), size: count + countSize }
          },
          packet_server_info: (buffer, offset) => {
            let { value: response, size: responseSize } = (ctx.string)(buffer, offset)
            return { value: { response }, size: responseSize}
          },
          packet_ping: (buffer, offset) => {
            let { value: time, size: timeSize } = (ctx.i64)(buffer, offset)
            return { value: { time }, size: timeSize}
          },
          packet: (buffer, offset) => {
            let { value: name, size: nameSize } = ((buffer, offset) => {
              const { value, size } = (ctx.varint)(buffer, offset)
              return { value: {"0":"server_info","1":"ping"}[value] || value, size }
            })(buffer, offset)
            let { value: params, size: paramsSize } = ((buffer, offset) => {
              switch (name) {
                case "server_info": return (ctx.packet_server_info)(buffer, offset)
                case "ping": return (ctx.packet_ping)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + nameSize)
            return { value: { name, params }, size: nameSize + paramsSize}
          }
        },
        toServer: {
          i8: native.i8,
          u8: native.u8,
          i16: native.i16,
          u16: native.u16,
          i32: native.i32,
          u32: native.u32,
          f32: native.f32,
          f64: native.f64,
          li8: native.li8,
          lu8: native.lu8,
          li16: native.li16,
          lu16: native.lu16,
          li32: native.li32,
          lu32: native.lu32,
          lf32: native.lf32,
          lf64: native.lf64,
          i64: native.i64,
          li64: native.li64,
          u64: native.u64,
          lu64: native.lu64,
          varint: native.varint,
          bool: native.bool,
          pstring: native.pstring,
          buffer: native.buffer,
          void: native.void,
          bitfield: native.bitfield,
          cstring: native.cstring,
          mapper: native.mapper,
          container: native.container,
          switch: native.switch,
          string: (buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            offset += countSize
            if (offset + count > buffer.length) {
              throw new PartialReadError("Missing characters in string, found size is " + buffer.length + " expected size was " + (offset + count))
            }
            return { value: buffer.toString("utf8", offset, offset + count), size: count + countSize }
          },
          packet_ping_start: (buffer, offset) => {
            return { value: {  }, size: 0}
          },
          packet_ping: (buffer, offset) => {
            let { value: time, size: timeSize } = (ctx.i64)(buffer, offset)
            return { value: { time }, size: timeSize}
          },
          packet: (buffer, offset) => {
            let { value: name, size: nameSize } = ((buffer, offset) => {
              const { value, size } = (ctx.varint)(buffer, offset)
              return { value: {"0":"ping_start","1":"ping"}[value] || value, size }
            })(buffer, offset)
            let { value: params, size: paramsSize } = ((buffer, offset) => {
              switch (name) {
                case "ping_start": return (ctx.packet_ping_start)(buffer, offset)
                case "ping": return (ctx.packet_ping)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + nameSize)
            return { value: { name, params }, size: nameSize + paramsSize}
          }
        }
      }
    }

}