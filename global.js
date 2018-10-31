// NOTE: react-native-web says "Your application may need to polyfill Promise,
// Object.assign, Array.from, and ResizeObserver as necessary for your desired
// browser support."
import 'babel-polyfill';
import ResizeObserver from 'resize-observer-polyfill';

if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = ResizeObserver;
}
