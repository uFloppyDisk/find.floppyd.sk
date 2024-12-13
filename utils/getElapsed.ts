export default function (thenDateString: string, now: number) {
  try {
    const then = new Date(thenDateString);
    return now - then.getTime();
  } catch {}

  return -1;
}
