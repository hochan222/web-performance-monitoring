const BREAK_LINE = '';

function h1(content: string): string {
  return `# ${content}`;
}

function h3(content: string): string {
  return `### ${content}`;
}

function tHead(heads): string {
  const content = ['|'];

  heads.forEach((head) => content.push(` ${head} |`));
  return content.join('');
}

function tAlignLine(length): string {
  return '| '.concat(' --- |'.repeat(length));
}

function tBody(body): string {
  const content = [];

  body.forEach((x) => content.push(` ${x} |`));
  return content.join('');
}

function mlist(list, listItem): string[] {
  return [`- ${list}`, ...listItem.map((item) => `  - ${item}`)];
}

function summary(title, description) {
  return `<details><summary>${title}</summary>
  
  ${description}
  
  </details>`;
}

export { BREAK_LINE, h1, h3, tHead, tAlignLine, tBody, mlist, summary };
