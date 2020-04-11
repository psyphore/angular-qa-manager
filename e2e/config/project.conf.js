exports.config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  seleniumAddress: 'http://localhost:4200/',
  specs: ['./e2e/tests/**/project.e2e-spec.ts']
};
