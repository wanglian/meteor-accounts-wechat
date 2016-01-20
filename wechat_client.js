Wechat = {};

Wechat.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'wechat'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }
  var credentialToken = Random.secret();

  var scope = (options && options.requestPermissions) || ['snsapi_login'];
  var flatScope = _.map(scope, encodeURIComponent).join('+');

  var loginStyle = OAuth._loginStyle('wechat', config, options);

  var loginUrl =
    'https://open.weixin.qq.com/connect/qrconnect' +
      '?appid=' + config.appId +
      '&redirect_uri=' + encodeURI(OAuth._redirectUri('wechat', config, null)) +
      '&response_type=code' +
      '&scope=' + flatScope +
      '&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl);

  OAuth.launchLogin({
    loginService: "wechat",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width: 500, height: 550}
  });
};
