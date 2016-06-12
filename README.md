# Khoros Server Example

This is a simple node.js [Khoros](http://github.com/scottgarner/khoros) server example for using the Khoros middleware with socket.io.

## Redis

This example is built for Heroku and uses socket.io-redis to allow for communication across multiple dynos. For this to work properly, you must enable [session affinity](https://devcenter.heroku.com/articles/session-affinity).

`heroku features:enable http-session-affinity`