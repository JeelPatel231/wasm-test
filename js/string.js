export class WasmString {
  constructor(wasmMemory) {
    this.memory = wasmMemory;
  }

  encode(str) {
    return new TextEncoder().encode(str)
  }

  decode(dataView) {
    return new TextDecoder().decode(dataView)
  }

  read(ptr, length) {
    return this.decode(this.memory.read(ptr, length))
  }

  put(str) {
    return this.memory.set(this.encode(str))
  }

  consume(ptr, length) {
    return this.decode(this.memory.consume(ptr, length))
  }
}
