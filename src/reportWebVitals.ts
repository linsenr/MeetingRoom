// 引入 web-vitals 模块的类型
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

type PerfEntryCallback = (metric: any) => void;

const reportWebVitals = (onPerfEntry?: PerfEntryCallback): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
