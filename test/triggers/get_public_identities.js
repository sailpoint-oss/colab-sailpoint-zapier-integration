require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Trigger - get_public_identities', () => {
  zapier.tools.env.inject();

  it('should get an array', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN
      },

      inputData: {},
    };

    const results = await appTester(
      App.triggers['get_public_identities'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
  });
});
