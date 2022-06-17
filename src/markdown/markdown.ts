const BREAK_LINE = '';

function h1(content: string): string {
  return `# ${content}`;
}

function h3(content: string): string {
  return `### ${content}`;
}

function h4(content: string): string {
  return `#### ${content}`;
}

function h5(content: string): string {
  return `##### ${content}`;
}

function tHead(heads: string[]): string {
  const content = ['|'];

  heads.forEach((head) => content.push(` ${head} |`));
  return content.join('');
}

function tAlignLine(length: number, align?: string): string {
  let alignMarkdown = ' --- |';

  if (align === 'center') {
    alignMarkdown = ' :---: |';
  }
  if (align === 'right') {
    alignMarkdown = ' ---: |';
  }
  if (align === 'left') {
    alignMarkdown = ' :--- |';
  }

  return '|'.concat(alignMarkdown.repeat(length));
}

function tBody(body: (number | string)[], linkAttr?: string): string {
  const content = ['|'];
  const link = linkAttr ? (x) => `[${x}](https://web.dev/${linkAttr}/)` : (x) => x;
  const isValidAttribute = (attr) => attr || attr === 0;

  body.forEach((x, i) => {
    let attr = i === 0 ? link(x) : x;
    if (!isValidAttribute(attr)) {
      attr = '-';
    }
    content.push(` ${attr} |`);
  });
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

function bold(str) {
  return `**${str}**`;
}

function image(url: string, title: string = 'none'): string {
  return `![${title}](${url})`;
}

function hyperLink(text: string, url: string): string {
  return `[${text}](${url})`;
}

export { BREAK_LINE, h1, h3, h4, h5, tHead, tAlignLine, tBody, mlist, summary, bold, image, hyperLink };
