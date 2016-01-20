# meteor-accounts-wechat

Login service for Wechat accounts

## Install

First make sure you've add the package:

```
meteor add service-coniguration
```

And then:

```
meteor add wanglian:accounts-wechat
```

## Config

Add server side config:

```
ServiceConfiguration.configurations.upsert(
  { service: "wechat" },
  {
    $set: {
      service: "wechat",
      appId: "xxx",
      scope: 'basic',
      secret: "xxx"
    }
  }
);
```