const Helper = {
  /**
   * @description 隨機產生不重複 ID
   *
   * @param {string} [namespace=uniqueID] 產生ID的命名域
   */
  generateUniqueID: (namespace = 'uniqueID') => {
    let id = `${namespace}-${new Date().getTime()}`;

    if (!window.uniqueIdPool) window.uniqueIdPool = {};

    let i = 0;
    let tmp = id;
    const idPool = window.uniqueIdPool;

    while (true) {
      if (idPool.hasOwnProperty(tmp) && idPool[tmp] === 1) {
        tmp = id + i.toString();
        i += 1;
      } else {
        id = tmp;
        break;
      }
    }

    idPool[id] = 1;

    return id;
  },

  releaseUniqueID: id => {
    delete window.uniqueIdPool[id];
  },

  // 使用 dangerouslySetInnerHTML
  createMarkup: elem => {
    return { __html: elem };
  },

  hexToBase64: hexstring =>
    btoa(
      hexstring
        .match(/\w{2}/g)
        .map(el => String.fromCharCode(parseInt(el, 16)))
        .join('')
    )
};

export default Helper;
