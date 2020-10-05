const url = 'http://localhost:5000/playground';
module.exports = {
  client: {
    service: {
      name: 'local',
      url: url,
      skipSSLValidation: true
    }
  }
};
