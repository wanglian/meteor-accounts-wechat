Package.describe({
  name: "wanglian:accounts-wechat",
  version: "0.0.1",
  summary: "Login service for Wechat accounts",
  git: "https://github.com/wanglian/meteor-accounts-wechat",
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'server');
  api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Wechat');

  api.addFiles('wechat_client.js', 'client');
  api.addFiles('wechat_server.js', 'server');
  api.add_files("wechat.js");

  api.addFiles(
    ['wechat_configuration.html', 'wechat_configuration.js', 'wechat_login_button.css'],
    'client'
  );
});
