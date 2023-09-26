require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - list_requestable_objects', () => {
  zapier.tools.env.inject();

  it('should get an array with 1 item', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
        refresh_token: process.env.REFRESH_TOKEN,
      },

      inputData: {
        limit: 1
      },
    };

    const results = await appTester(
      App.searches['list_requestable_objects'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
  });

  it('should return an array with one item using identity-id', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1,
        identityId: process.env.IDENTITY_ID
      },
    };

    const results = await appTester(
      App.searches['list_requestable_objects'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
  });

  it('should return an array with one item using types', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 1,
        types: "ACCESS_PROFILE"
      },
    };

    const results = await appTester(
      App.searches['list_requestable_objects'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].type.should.equal("ACCESS_PROFILE");
  });

  it('should return an empty array using a type that no object has', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        types: "ROLE"
      },
    };

    const results = await appTester(
      App.searches['list_requestable_objects'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(0);
  });

  it('should return an array with 1 item based on term', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        term: process.env.SEARCH_TERM
      },
    };

    const results = await appTester(
      App.searches['list_requestable_objects'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].name.should.equal(bundle.inputData.term);
  });

  it('should return an array with one item using filter name', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        filters: `name eq "${process.env.FILTER_NAME}"`
      },
    };

    const results = await appTester(
      App.searches['list_requestable_objects'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].name.should.equal(process.env.FILTER_NAME);
  });

  it('should return an array with descending names', async () => {
    const bundle = {
      authData: {
        idn_org: process.env.IDN_ORG,
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
        limit: 2,
        sorters: `-name`
      },
    };

    const results = await appTester(
      App.searches['list_requestable_objects'].operation.perform,
      bundle
    );
    let comparison = results[0].name > results[1].name
    comparison.should.be.True
  });
});
