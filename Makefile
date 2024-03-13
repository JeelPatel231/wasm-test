CC := clang

all: main.wasm

main.wasm: main.c
	$(CC) \
		--target=wasm32 -O3 -flto -nostdlib \
		-Wl,--no-entry -Wl,--export-all -Wl,--lto-O3 -Wl,--allow-undefined \
		-o main.wasm \
		main.c 

