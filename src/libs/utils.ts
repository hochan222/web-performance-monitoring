export function convertPercentage(score: number): number {
  return score * 100;
}

export function score(score: number): string {
  if (score < 50) {
    return `🔴`;
  }
  if (score < 90) {
    return `🟠`;
  }
  return `🟢`;
}

export function passOrFail(score: number): string {
  if (score === null) {
    return 'It is for reference only.';
  }
  return score === 1 ? '✅' : '❌';
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
