require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - list_account_activities', () => {
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
      App.searches['list_account_activities'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
  });

  it('should return an array with one item using requested-for', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1,
        requestedFor: process.env.REQUESTED_FOR
      },
    };

    const results = await appTester(
      App.searches['list_account_activities'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].targetIdentitySummary.id.should.equal(bundle.inputData.requestedFor)
  });

  it('should return an empty array using requested-by', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1,
        requestedBy: process.env.REQUESTED_BY
      },
    };

    const results = await appTester(
      App.searches['list_account_activities'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(0);
  });

  it('should return an array with one item using regarding-identity', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1,
        regardingIdentity: process.env.REGARDING_IDENTITY
      },
    };

    const results = await appTester(
      App.searches['list_account_activities'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].targetIdentitySummary.id.should.equal(bundle.inputData.regardingIdentity)
  });

  it('should return an array with one item using type', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1,
        type: 'appRequest'
      },
    };

    const results = await appTester(
      App.searches['list_account_activities'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
  });

  it('should return an array with one item using filter date', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1,
        filters: `created lt ${process.env.FILTER_DATE}`
      },
    };

    const results = await appTester(
      App.searches['list_account_activities'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
  });

  it('should return an array with descending created dates', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 2,
        sorters: `-created`
      },
    };

    const results = await appTester(
      App.searches['list_account_activities'].operation.perform,
      bundle
    );
    let comparison = results[0].created > results[1].created
    comparison.should.be.True
  });
});
