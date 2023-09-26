require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - get_certification_campaign', () => {
  zapier.tools.env.inject();

  it('should get an array with one item', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        id: process.env.CERTIFICATION_ID
      },
    };

    const results = await appTester(
      App.searches['get_certification_campaign'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].should.have.property('id').and.equal(bundle.inputData.id);
  });
});
