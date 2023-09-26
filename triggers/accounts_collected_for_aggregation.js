const perform = (z, bundle) => {
  return [bundle.cleanedRequest];
};

const performList = (z, bundle) => {
  const example = [
    {
      stats: {
        scanned: 200,
        unchanged: 190,
        changed: 6,
        added: 4,
        removed: 3,
      },
      warnings: ['Account skipped'],
      started: '2020-06-29T22:01:50.474Z',
      source: {
        id: '4e4d982dddff4267ab12f0f1e72b5a6d',
        name: 'Corporate Active Directory',
        type: 'SOURCE',
      },
      completed: '2020-06-29T22:02:04.090Z',
      errors: [],
      status: 'Success',
    },
  ];

  return example;
};

const performSubscribe = (z, bundle) => {
  const options = {
    url: `https://${bundle.authData.idn_org}.api.identitynow.com/beta/trigger-subscriptions`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
      'X-IDN-ORG': bundle.authData.idn_org,
    },
    params: {},
    body: {
      name: `zapier-${bundle.meta.zap.id}`,
      triggerId: 'idn:aggregation-accounts-collected',
      type: 'HTTP',
      httpConfig: {
        url: `${bundle.targetUrl}`,
      },
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const performUnsubscribe = (z, bundle) => {
  const options = {
    url: `https://${bundle.authData.idn_org}.api.identitynow.com/beta/trigger-subscriptions/${bundle.subscribeData.id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
      'X-IDN-ORG': bundle.authData.idn_org,
    },
    params: {},
    body: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    type: 'hook',
    performSubscribe: performSubscribe,
    performUnsubscribe: performUnsubscribe,
    sample: {
      stats: {
        scanned: 200,
        unchanged: 190,
        changed: 6,
        added: 4,
        removed: 3,
      },
      warnings: ['Account skipped'],
      started: '2020-06-29T22:01:50.474Z',
      source: {
        id: '4e4d982dddff4267ab12f0f1e72b5a6d',
        name: 'Corporate Active Directory',
        type: 'SOURCE',
      },
      completed: '2020-06-29T22:02:04.090Z',
      errors: [],
      status: 'Success',
    },
    performList: performList,
    sample: {
      stats: { scanned: 200, unchanged: 190, changed: 6, added: 4, removed: 3 },
      warnings: [],
      started: '2020-06-29T22:01:50.474Z',
      source: {
        id: '4e4d982dddff4267ab12f0f1e72b5a6d',
        name: 'Corporate Active Directory',
        type: 'SOURCE',
      },
      completed: '2020-06-29T22:02:04.090Z',
      errors: [],
      status: 'Success',
    },
    outputFields: [
      { key: 'stats__scanned', label: 'Scanned', type: 'integer' },
      { key: 'stats__unchanged', label: 'Unchanged', type: 'integer' },
      { key: 'stats__changed', label: 'Changed', type: 'integer' },
      { key: 'stats__added', label: 'Added', type: 'integer' },
      { key: 'stats__removed', label: 'Removed', type: 'integer' },
      { key: 'started', label: 'Started', type: 'datetime' },
      { key: 'source__id', label: 'Source ID' },
      { key: 'source__name', label: 'Source Name' },
      { key: 'source__type', label: 'Source Type' },
      { key: 'completed', label: 'Completed', type: 'datetime' },
      { key: 'status', label: 'Status' },
    ],
  },
  key: 'accounts_collected_for_aggregation',
  noun: 'Aggregation',
  display: {
    label: 'Accounts Collected for Aggregation',
    description:
      'Triggers when the initial collection of accounts in the source system during aggregation completes.',
    hidden: false,
    important: false,
  },
};
