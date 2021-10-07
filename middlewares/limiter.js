const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 250, // можно совершить максимум 100 запросов с одного IP
});
