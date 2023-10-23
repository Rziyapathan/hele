const rateLimit=require('express-rate-limit')
const limiter= rateLimit({
    windowMs:  10 * 60 * 1000,
    max: 100,
    message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  });

  module.exports={limiter}