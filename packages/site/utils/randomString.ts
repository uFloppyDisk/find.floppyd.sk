export default function (length?: number, base?: number) {
  return Math.random().toString(base || 36).substring(2, length || 7);
}
