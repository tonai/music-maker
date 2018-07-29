export function modulo(value, modulo) {
  value = value % modulo;
  return value < 0 ? value + modulo : value;
}
