require("dotenv").config();

module.exports.APP_HOST = process.env.APP_HOST;
module.exports.APP_PORT = process.env.APP_PORT ?? 3000;
module.exports.APP_ROUTE_PREFIX = process.env.APP_ROUTE_PREFIX;

module.exports.DB_CONNECTION = process.env.DB_CONNECTION;

module.exports.SECRET_KEY = process.env.SECRET_KEY;


