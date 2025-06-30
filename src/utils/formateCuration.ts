const LEADING_ZERO_FORMATER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60 / 60);
  const minutes = Math.floor((duration - hours * 60 * 60) / 60);

  const seconds = duration % 60;
  if (hours > 60) {
    return `${hours}:${LEADING_ZERO_FORMATER.format(minutes)}
    ${minutes}:${LEADING_ZERO_FORMATER.format(seconds)}`;
  }

  return `${minutes}:${LEADING_ZERO_FORMATER.format(seconds)}`;
}
