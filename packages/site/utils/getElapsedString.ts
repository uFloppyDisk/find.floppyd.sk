export default function (elapsed_ts: number) {
  const toPaddedString = (num: number) => {
    return num.toString().padStart(2, '0');
  }

  const elapsed = elapsed_ts / 1000;

  if (isNaN(elapsed) || elapsed < 0) { return ''; }

  var str = toPaddedString((Math.floor(elapsed) % 60));
  str = `${toPaddedString((Math.floor(elapsed / 60) % 60))}:${str}`;

  if (elapsed < 3600) { return str; }

  str = `${toPaddedString((Math.floor(elapsed / 3600) % 24))}:${str}`;

  if (elapsed < 86400) { return str; }

  str = `${Math.floor(elapsed / 86400)}d ${str}`;
  return str;
}
