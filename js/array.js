export class WasmMemory {
  constructor(memory, malloc, free) {
    this.memory = memory;
    this.malloc = malloc;
    this.free = free;
  }

  read(ptr, length) {
    return new Uint8Array(this.memory.buffer, ptr, length);
  }

  set(data) {
    const allocPtr = this.malloc(data.length)
    new Uint8Array(this.memory.buffer, allocPtr).set(data)
    return allocPtr
  }

  consume(ptr, length) {
    const read = new Uint8Array(this.read(ptr, length)) // create a copy in js memory
    this.free(ptr)
    return read
  }
}
