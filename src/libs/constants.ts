const COLLECTED_METRICS = new Map(['bootup-time', 'first-contentful-paint'].map((x) => [x, null]));

const REPORT_PATH = 'report';
const TEMP_DATA_PATH = 'tempData';

export { COLLECTED_METRICS, REPORT_PATH, TEMP_DATA_PATH };
