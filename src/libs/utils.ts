export function score(score: number) {
  if (score < 50) {
    return `🔴 ${score}`;
  }
  if (score < 90) {
    return `🟠 ${score}`;
  }
  return `🟢 ${score}`;
}

function createFileName(title, fileType) {
  const currentTime = new Date().toISOString().slice(0, 16);
  const fileExtension = fileType === 'json' ? 'json' : 'html';
  return `${currentTime}-${title}.${fileExtension}`;
}
