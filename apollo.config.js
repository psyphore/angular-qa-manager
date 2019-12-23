const url = 'http://sipholpt:1337/graphql';
module.exports = {
  client: {
    service: {
      name: 'local',
      url: url,
      skipSSLValidation: true
    }
  }
};
