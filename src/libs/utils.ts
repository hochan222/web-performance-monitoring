export function score(score: number) {
  if (score < 50) {
    return `🔴 ${score}`;
  }
  if (score < 90) {
    return `🟠 ${score}`;
  }
  return `🟢 ${score}`;
}

export function getDate() {
  return new Date().toISOString().slice(0, 10);
}
