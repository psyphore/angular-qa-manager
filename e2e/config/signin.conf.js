protractor = require('./protractor.base.conf');

var config = protractor.config;

config.specs = ['./e2e/tests/**/signin.e2e-spec.ts'];

exports.config = config;
