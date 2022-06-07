//@ lighthouserc.js
module.exports = {
  collect: {
    url: ['https://naver.com'],
    numberOfRuns: 1,
  },
  upload: {
    target: 'filesystem',
    outputDir: './lhci_reports',
    reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
  },
};
