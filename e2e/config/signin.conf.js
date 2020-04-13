exports.config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  seleniumAddress: 'http://localhost:4200/',
  specs: ['./e2e/tests/**/signin.e2e-spec.ts']
};
