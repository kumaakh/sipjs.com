---
title: SIP.UA Configuration Parameters | SIP.js
description: A list of configuration parameters for SIP user agents in SIP.js.

---
# SIP.UA Configuration Parameters

* TOC
{:toc}

# Parameters

## uri

`String` - SIP URI associated to the User Agent. This is a SIP address given to you by your provider.  By default, URI is set to `anonymous.X@anonymous.invalid`, where X is a random token generated for each UA.

## wsServers

Set of WebSocket URIs to connect to. By default, the WebSocket URI is set to `wss://edge.sip.onsip.com`. If not specified, port 80 will be used for WS URIs and port 443 will be used for WSS URIs. This parameter can be expressed in multiple ways:

* `String` to define a single WebSocket URI.
* `Array` of `Strings` to define multiple WebSocket URIs.
* `Array` of `Object` to define multiple WebSocket URIs with weight. URIs with higher weights are attempted before those with lower weights.

~~~ javascript
wsServers: "ws://sip-ws.example.com"
~~~

~~~ javascript
wsServers: "ws://sip-ws.example.com:8443/sip?KEY=1234"
~~~

~~~ javascript
wsServers: [
  "ws://sip-ws-1.example.com",
  "ws://sip-ws-2.example.com"
]
~~~

~~~ javascript
wsServers: [
  { // First connection attempt
    ws_uri: "ws://sip-ws-1.example.com",
    weight: 10
  },
  {
    ws_uri: "ws://sip-ws-2.example.com",
    weight: 1
  }
]
~~~

## allowLegacyNotifications
If set to true, the user agent will allow NOTIFYs received without subscriptions to be emitted to a `notify` event listener on the UA.  Default value is false.

~~~ javascript
allowLegacyNotifications: true
~~~

## allowOutOfDialogRefers

#### SECURITY WARNING!
{: style="font-weight: bold; color: red;""}

If enabled a malicious endpoint could take control of your client. This option should only be enabled if you have a listener on [`outOfDialogReferRequested`](../ua/#outofdialogreferrequested) event. If there is no listener, the default behavior of SIP.js is to follow the `REFER`. Default value is false.

~~~ javascript
allowOutOfDialogRefers: false
~~~

## authenticationFactory
Similar to `sessionDescriptionHandlerFactory`, this parameter allows the application to use a custom authentication model with SIP.js.
The factory is passed the UA and should return credentials.  Modifying this is very advanced; please refer to the source code for examples.

By default, Digest Authentication is used.

## authorizationUser
Username (`String`) to use when generating authentication credentials. If not defined the value in uri parameter is used.

~~~ javascript
authorizationUser: "alice123"
~~~

## autostart
If set to true, the user agent calls the `.start()` method upon being created.  Default value is true.

~~~ javascript
autostart: true
~~~

## connectionRecoveryMaxInterval
Maximum interval (`Number`) in seconds between WebSocket reconnection attempts. Default value is 30.

~~~ javascript
connectionRecoveryMaxInterval: 60
~~~

## connectionRecoveryMinInterval
Minimum interval (`Number`) in seconds between WebSocket reconnection attempts. Default value is 2.

~~~ javascript
connectionRecoveryMinInterval: 4
~~~

## displayName
Descriptive name (`String`) to be shown to the called party when calling or sending IM messages. It must NOT be enclosed between double quotes even if the given name contains multi-byte symbols (SIPjs will always enclose the `display_name` value between double quotes).

~~~ javascript
displayName: "Alice ¶€ĸøĸø"
~~~

## hackIpInContact
Set a random IP address as the host value in the Contact header field and Via sent-by parameter. Useful for SIP registrars not allowing domain names in the Contact URI. Valid values are `true` and `false` (`Boolean`). Default value is `false`.

~~~ javascript
hackIpInContact: true
~~~

## hackViaTcp
Set Via transport parameter in outgoing SIP requests to “TCP”. Useful when traversing SIP nodes that are not ready to parse Via headers with “WS” or “WSS” value in a Via header. Valid values are `true` and `false` (`Boolean`). Default value is `false`.

~~~ javascript
hackViaTcp: true
~~~

## hackWssInTransport
Set the transport parameter to `wss` when used in SIP URIs.  This replaces `ws`, which is the default and required by RFC 7118, but some SIP servers do not like that.

~~~ javascript
hackWssInTransport: true
~~~

## instanceId
`String` indicating the UUID URI to be used as instance ID to identify the UA instance when using GRUU.

~~~ javascript
instanceId: "uuid:8f1fa16a-1165-4a96-8341-785b1ef24f12"
~~~

~~~ javascript
instanceId: "8f1fa16a-1165-4a96-8341-785b1ef24f12"
~~~

## log
`Object` providing the desired log behavior.

### -   builtinEnabled

`Boolean` indicating whether SIPjs should write log messages in the browser console. Default value is `true`.

### -   level

`Number` or `String` indicating the verbose level of the SIPjs log. Valid values are `3`, `2`, `1`, `0` or `"debug"`, `"log"`, `"warn"`, `"error"` respectively. Default value is `2` (or `log`).

### -   connector

User defined `Function` which will be called everytime a log is generated, according to the `enabled` and `level` options.

The function is called with the following semantics:

~~~javascript
/*
  level: String representing the level of the log message
('debug', 'log', 'warn', 'error')

  category: String representing the SIPjs instance class firing
the log. ie: 'sipjs.ua'

  label: String indicating the 'identifier' of the class instance
 when the log level is '3' (debug). ie: transaction.id

  content: String representing the log message
*/
connector(level, category, label, content);
~~~

## noAnswerTimeout
Time (in seconds) (`Number`) after which an incoming call is rejected if not answered. Default value is `60`.

~~~ javascript
noAnswerTimeout: 120
~~~

## password
SIP Authentication password (`String`).   Default value is `null`.

~~~ javascript
password: "1234"
~~~

## register
Indicate if a SIP User Agent should register automatically when starting. Valid values are `true` and `false` (`Boolean`). Default value is `true`.

~~~ javascript
register: false
~~~

## registerExpires
Registration expiry time (in seconds) (`Number`). Default value is `600`.

~~~ javascript
registerExpires: 300
~~~

## registrarServer
Set the SIP registrar URI. Valid value is a SIP URI without username. Default value is `null` which means that the registrar URI is taken from the uri parameter (by removing the username).

~~~ javascript
registrarServer: 'sip:registrar.mydomain.com'
~~~

## rel100
`Constant` representing whether the UA should do 100rel. Accepts `SIP.C.supported.REQUIRED`, `SIP.C.supported.SUPPORTED`, and `SIP.C.supported.UNSUPPORTED`. Default value is `SIP.C.supported.UNSUPPORTED`.

~~~ javascript
rel100: SIP.C.supported.REQUIRED
~~~

## replaces
`Constant` representing whether the UA should support the SIP Replaces header.
If you enable support for Replaces, please be sure to listen for the [`replaced` event](../session/#replaced) event on each Session.
Accepts `SIP.C.supported.SUPPORTED`, and `SIP.C.supported.UNSUPPORTED`. Default value is `SIP.C.supported.UNSUPPORTED`.

~~~ javascript
replaces: SIP.C.supported.SUPPORTED
~~~

## sessionDescriptionHandlerFactory
`function` that is a factory for generating sessionDescriptionHandlers. The factory will be passed a `session` object for the current session and the `sessionDescriptionHandlerFactoryOptions` object defined on the UA.

See the [`WebRTC SessionDescriptionHandler`](../sessionDescriptionHandler) documentation for more information on how to create this factory.

~~~ javascript
sessionDescriptionHandlerFactory: function(session, options) {
  return new SessionDescriptionHandler(session, options);
}
~~~

## sessionDescriptionHandlerFactoryOptions
Options that will be passed to the SessionDescriptionHandlerFactory.

* `Object` providing options to the factory.
* Look at the [`WebRTC SessionDescriptionHandler`](../sessionDescriptionHandler) for a list of options the default session description handler takes.


## traceSip
Indicate whether incoming and outgoing SIP request/responses must be logged in the browser console (`Boolean`). Default value is `false`.

~~~ javascript
traceSip: true
~~~

## usePreloadedRoute

If set to true every SIP initial request sent by SIP.js includes a Route header with the SIP URI associated to the WebSocket server as value. Some SIP Outbound Proxies require such a header. Valid values are `true` and `false` (`Boolean`). Default value is `false`.

~~~ javascript
wsServers: "ws://example.org/sip-ws"
usePreloadedRoute: true
~~~

The Route header will look like Route: `<sip:example.org;lr;transport=ws>`

~~~ javascript
wsServers: "wss://example.org:8443"
usePreloadedRoute: true
~~~

The Route header will look like Route: `<sip:example.org:8443;lr;transport=ws>`

## userAgentString

If this is set then the User-Agent header will have this string appended after name and version.

~~~ javascript
userAgentString: "myAwesomeApp"
~~~

The User-Agent header will look like User-Agent: myAwesomeApp

## wsServerMaxReconnection

The number of times to attempt to reconnect to a WebSocket when the connection drops. The default value is 3.

## wsServerReconnectionTimeout

The time (in seconds) to wait between WebSocket reconnection attempts. The default timeout is 4 seconds.
