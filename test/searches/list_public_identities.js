require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - list_public_identities', () => {
  zapier.tools.env.inject();

  it('should get an array with 1 item', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1
      },
    };

    const results = await appTester(
      App.searches['list_public_identities'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
  });

  it('should return an array with one item using filter id', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        filters: `id eq "${process.env.FILTER_ID}"`
      },
    };

    const results = await appTester(
      App.searches['list_public_identities'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].id.should.equal(process.env.FILTER_ID)
  });

  it('should return an array with ascending names', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 2,
        sorters: `name`
      },
    };

    const results = await appTester(
      App.searches['list_public_identities'].operation.perform,
      bundle
    );
    let comparison = results[0].name < results[1].name
    comparison.should.be.True
  });
});
