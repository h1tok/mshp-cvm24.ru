'use strict';

/**
 * Настройки поумолчанию
 */
module.exports = {
  account: {
    id: '1df0ea61fddc5b35011edc522dc19fd0',
    token: '433fd94b69022acf0f91a11d6cfb3f87',
    url: 'myshop-fa683.myinsales.ru',
    http: true
  },
  theme: {
    id: '1410357',
    root: '.',
    backup: true,
    assetsSync: true,
    excludeFiles: [],
    onUpdate: function onUpdate() {
      // обновление темы
    },
    assetsDomain: 'https://assets.insales.ru'
  },
  util: {
    openBrowser: true
  },
  plugins: {
    exclude: ['*.min.js', '*.min.css', '*.liquid']
  },
  chokidarOptions: {
    ignored: /[\/\\]\./,
    ignoreInitial: true,
    followSymlinks: true,
    usePolling: false,
    interval: 200,
    delay: 0,
    binaryInterval: 300,
    alwaysStat: true,
    depth: 99,
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 100
    },
    ignorePermissionErrors: true
  }
};