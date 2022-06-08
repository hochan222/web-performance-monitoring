const COLLECTED_METRICS = new Map(['bootup-time', 'first-contentful-paint'].map((x) => [x, null]));

const REPORT_PATH = 'report';
const TEMP_DATA_PATH = 'tempData';
const PERSISTENT_DATA_PATH = 'persistentData';

export { COLLECTED_METRICS, REPORT_PATH, TEMP_DATA_PATH, PERSISTENT_DATA_PATH };
