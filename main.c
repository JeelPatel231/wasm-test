#include <stdint.h>

extern void __heap_base;

extern uint32_t random_num();

uint32_t bump_ptr = (uint32_t)&__heap_base;

void *js_malloc(int n) {
  unsigned int r = bump_ptr;
  bump_ptr += n;
  return (void *)r;
}

void js_free(void *p) {
  // lol
}

void gen_random_numbers(uint32_t *array, int len) {
  for (int i = 0; i < len; i++) {
    array[i] = random_num();
  }
}

void draw_in_arr(uint32_t *start, uint32_t h, uint32_t w) {
  gen_random_numbers(start, h * w);
}
