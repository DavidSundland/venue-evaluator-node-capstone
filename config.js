exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin@ds211558.mlab.com:11558/venue-evaluator';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:admin@ds211558.mlab.com:11558/venue-evaluator';
exports.PORT = process.env.PORT || 8080;
