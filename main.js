const { app, BrowserWindow, TouchBar } = require('electron');
const { TouchBarButton } = TouchBar;
const path = require('path');
const axios = require('axios');
const _ = require('lodash');

const USDollarLabel = new TouchBarButton();
const euroLabel = new TouchBarButton();
const coin = new TouchBarButton();
const gold = new TouchBarButton();

getPrice = () => {
  USDollarLabel.label = `دلار آمریکا:  🔄`;
  euroLabel.label = `یورو:  🔄`;
  coin.label = `سکه:  🔄`;
  gold.label = `طلا ۱۸ عیار:  🔄`;
  axios.get('http://call3.tgju.org/ajax.json?2019092012-20190920111730-cqBKXSqADeUcLetq5z2Z')
    .then(function(response) {
      const data = _.get(response, ['data', 'current']);
      USDollarLabel.label = `دلار آمریکا:  ${_.get(data, ['price_dollar_rl', 'h'])} ﷼`;
      euroLabel.label = `یورو:  ${_.get(data, ['price_eur', 'p'])} ﷼`;
      coin.label = `سکه:  ${_.get(data, ['sekee', 'p'])} ﷼`;
      gold.label = `طلا ۱۸ عیار:  ${_.get(data, ['geram18', 'p'])} ﷼`;

    });
};
getPrice();
setInterval(getPrice, 30000);

const touchBar = new TouchBar({
  items: [
    USDollarLabel,
    euroLabel,
    coin,
    gold,
  ],
});

touchBar.escapeItem = new TouchBarButton({
  'label': '🔄',
  click: getPrice,
});

let window;
app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 0,
    height: 0,
    transparent: true,
    icon: path.join(__dirname, 'icons/logo.icns'),
    resizable: false,
    skipTaskbar: true,
    fullscreenable: false,
  });
  window.loadURL('about:blank');
  window.setTouchBar(touchBar);
  window.removeMenu();
});
