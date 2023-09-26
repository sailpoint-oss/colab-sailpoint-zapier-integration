require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - list_certification_campaigns', () => {
  zapier.tools.env.inject();

  it('should return an array with 1 item', async () => {
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
      App.searches['list_certification_campaigns'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
  });

  it('should return an array using reviewer-identity', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1,
        reviewerIdentity: process.env.REVIEWER_IDENTITY
      },
    };

    const results = await appTester(
      App.searches['list_certification_campaigns'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].reviewer.id.should.equal(bundle.inputData.reviewerIdentity)
  });

  it('should return an array with one item using filter campaign.id', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1,
        filters: `campaign.id eq "${process.env.FILTER_CAMPAIGN_ID}"`
      },
    };

    const results = await appTester(
      App.searches['list_certification_campaigns'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].campaign.id.should.equal(process.env.FILTER_CAMPAIGN_ID)
  });

  it('should return an array with descending due dates', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 2,
        sorters: `-due`
      },
    };

    const results = await appTester(
      App.searches['list_certification_campaigns'].operation.perform,
      bundle
    );
    let comparison = results[0].created > results[1].created
    comparison.should.be.True
  });
});
