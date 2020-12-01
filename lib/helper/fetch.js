import 'isomorphic-unfetch';

const Helper = {
  GET: (API, callback, errorHandler, headers) => {
    fetch(API, { headers })
      .then(res => {
        if (res.status >= 400) {
          // throw new Error('Bad response from server');
        }

        return res.json();
      })
      .then(data =>
        data.result !== undefined ? callback(data.result) : callback(data)
      )
      .catch(error => {
        if (typeof errorHandler === 'function') {
          console.log('error:' + error);
          errorHandler();
        }
      });
  },
  POST: (API, callback, errorHandler, headers) => {
    //console.log("進來-POST-->", headers)
    fetch(API, headers)
      .then(res => {
        if (res.status >= 400) {
          // throw new Error('Bad response from server');

        }

        return res.json();
      })
      .then(data => {
        data.result !== undefined ? callback(data.result) : callback(data)
      })
      .catch(error => {
        if (typeof errorHandler === 'function') {
          console.log('error:' + error);
          errorHandler();
        }
      });
  }
};

export default Helper;
