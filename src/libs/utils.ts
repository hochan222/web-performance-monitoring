export function convertPercentage(score) {
  return score * 100;
}

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

export function toFixedTwo(num: number): number {
  return +num.toFixed(2);
}

export function kebabCaseToString(str: string): string {
  return str.replaceAll(/-/g, ' ');
}
