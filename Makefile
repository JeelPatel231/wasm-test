CC := clang
LD := wasm-ld

all: main.wasm

%.o: %.c
	$(CC) -DNDEBUG -Oz --target=wasm32 -nostdlib -c -o $@ $<

main.wasm: main.o walloc.o
	$(LD) --no-entry --lto-O3 --allow-undefined --import-memory -o $@ $^

clean:
	rm -f *.o *.wasm
