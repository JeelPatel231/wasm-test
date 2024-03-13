import { WasmMemory } from "./array.js"
import { WasmString } from "./string.js"

async function wasmInstance() {
  const memory = new WebAssembly.Memory({
    initial: 10, // 10 pages = 64KiB * 10 = 640KiB
    maximum: 100,
  });

  const { instance } = await WebAssembly.instantiateStreaming(fetch("main.wasm"), {
    env: { memory }
  })

  return { memory, instance };
}

async function main() {
  const { memory, instance } = await wasmInstance();
  console.log(memory, instance)
  const { walloc, wfree } = instance.exports;
  const wasmMemory = new WasmMemory(memory, walloc, wfree);
  const wasmString = new WasmString(wasmMemory)

  const helloWorld = 'Hello World'
  const ptr = wasmString.put(helloWorld)
  console.log(wasmString.consume(ptr, helloWorld.length))
}

main()
