// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 60000,
  specs: ['./e2e/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--start-maximized', 'disable-infobars']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  disableChecks: false,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  onPrepare() {
    testPrep();
  }
};

function testPrep() {
  require('ts-node').register({
    project: 'e2e/tsconfig.e2e.json'
  });
  jasmine
    .getEnv()
    .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

  var today = new Date();

  var dateTimeStamp = {
    date: today.toString('yyyy-MM-dd'),
    time: today.toString('HH-mm')
  };

  jasmine.getEnv().addReporter(
    new HtmlReporter({
      baseDirectory: `./e2e/reports/${dateTimeStamp.date}/${
        dateTimeStamp.time
      }`,
      screenshotsSubfolder: 'images',
      jsonsSubfolder: 'jsons',
      docName: `${dateTimeStamp.time}.html`
    }).getJasmine2Reporter()
  );
}
