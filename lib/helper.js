import $ from 'jquery';
import ResizeObserver from 'resize-observer-polyfill';
import HelperData from './helper/data';
import HelperScreen from './helper/screen';
import Helperfetch from './helper/fetch';

const Helper = {
  screen: HelperScreen,
  data: HelperData,
  fetch: Helperfetch,

  // 當設定detech_width時，僅會偵測 width變化，height也同理
  // 但若兩個維度都沒額外設定時，預設則會自動偵測寬高
  onResize: (cb, params = {}) => {
    let reloadTimeout;
    let originWidth = window.innerWidth;
    let originHeight = window.innerHeight;
    const {
      trigger = false,
      detectWidth = false,
      detectHeight = false,
      times = 500,
      namespace = HelperData.generateUniqueID()
    } = params;

    $(window).on(`resize.${namespace}`, (e, data = {}) => {
      if (
        !!data.trigger ||
        (detectWidth && originWidth !== window.innerWidth) ||
        (detectHeight && originHeight !== window.innerHeight) ||
        (!detectWidth && !detectHeight)
      ) {
        originWidth = window.innerWidth;
        originHeight = window.innerHeight;

        clearTimeout(reloadTimeout);
        reloadTimeout = setTimeout(cb, times);
      }
    });

    if (trigger) {
      $(window).trigger('resize', {
        trigger: true
      });
    }

    return namespace;
  },

  offResize: args => {
    let namespace;
    if (typeof args === 'object' && 'namespace' in args)
      namespace = args.namespace;
    else if (typeof args === 'string') namespace = args;

    if (!namespace) {
      return;
    }

    $(window).off(`resize.${namespace}`);
  },

  triggerResize: () => $(window).trigger('resize')

  // ResizeObserver:
  //   'ResizeObserver' in global.window
  //     ? global.window.ResizeObserver
  //     : ResizeObserver
};

export default Helper;
