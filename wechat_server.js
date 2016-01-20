Wechat = {};

OAuth.registerService('wechat', 2, null, function(query) {

  var response = getTokenResponse(query);
  var accessToken = response.access_token;
  var openid = response.openid;
  var identity = getUserInfo(accessToken, openid);

  var serviceData = _.extend(identity, {accessToken: response.access_token});

  return {
    serviceData: {
      id: openid,
      accessToken: OAuth.sealSecret(accessToken)
    },
    options: {
      profile: { name: identity.nickname }
    }
  };
});

var userAgent = "Meteor";
if (Meteor.release)
  userAgent += "/" + Meteor.release;

var getTokenResponse = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'wechat'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var response;
  try {
    response = HTTP.post("https://api.weixin.qq.com/sns/oauth2/access_token", {
      headers: {
        Accept: 'application/json',
        "User-Agent": userAgent
      },
      params: {
        code: query.code,
        appid: config.appId,
        secret: OAuth.openSecret(config.secret),
        grant_type: 'authorization_code'
      }
    });
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Wechat. " + err.message), {
      response: err.response
    });
  }

  response = JSON.parse(response.content);
  if (response.errcode) {
    throw new Error("Failed to complete OAuth handshake with Wechat. " + response.errcode);
  } else {
    return response;
  }
};

var getUserInfo = function(access_token, openid) {
  var response;
  try {
     response = HTTP.get("https://api.weixin.qq.com/sns/userinfo", {
      headers: {
        Accept: 'application/json',
        "User-Agent": userAgent
      },
      params: {
        access_token: access_token,
        openid: openid
      }
    });
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Wechat. " + err.message), {
      response: err.response
    });
  }

  response = JSON.parse(response.content);
  if (response.errcode) {
    throw new Error("Failed to complete OAuth handshake with Wechat. " + response.errcode);
  } else {
    return response;
  }
}

Wechat.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
