const perform = (z, bundle) => {
  return [bundle.cleanedRequest];
};

const performList = (z, bundle) => {
  const example = [
    {
      fileName: 'Modified.zip',
      ownerEmail: 'test@sailpoint.com',
      ownerName: 'Cloud Support',
      query: 'modified:[now-7y/d TO now]',
      searchName: 'Modified Activity',
      searchResults: {
        Identity: {
          count: '2',
          noun: 'identities',
          preview: [],
        },
        Entitlement: {
          count: '2',
          noun: 'entitlements',
          preview: [],
        },
        Account: {
          count: '3',
          noun: 'accounts',
          preview: [],
        },
      },
      signedS3Url:
        'https://sptcbu-org-data-useast1.s3.amazonaws.com/arsenal-john/reports/Events%20Export.2020-05-06%2018%2759%20GMT.3e580592-86e4-4953-8aea-49e6ef20a086.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200506T185919Z&X-Amz-SignedHeaders=host&X-Amz-Expires=899&X-Amz-Credential=AKIAV5E54XOGTS4Q4L7A%2F20200506%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2e732bb97a12a1fd8a215613e3b90fcdae8ba1fb6a25916843ab5b51d2ddefbc',
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
      triggerId: 'idn:saved-search-complete',
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
    sample: {
      fileName: 'Modified.zip',
      ownerEmail: 'test@sailpoint.com',
      ownerName: 'Cloud Support',
      query: 'modified:[now-7y/d TO now]',
      searchName: 'Modified Activity',
      searchResults: {
        Identity: { count: '2', noun: 'identities', preview: [] },
        Entitlement: { count: '2', noun: 'entitlements', preview: [] },
        Account: { count: '3', noun: 'accounts', preview: [] },
      },
      signedS3Url:
        'https://sptcbu-org-data-useast1.s3.amazonaws.com/arsenal-john/reports/Events%20Export.2020-05-06%2018%2759%20GMT.3e580592-86e4-4953-8aea-49e6ef20a086.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200506T185919Z&X-Amz-SignedHeaders=host&X-Amz-Expires=899&X-Amz-Credential=AKIAV5E54XOGTS4Q4L7A%2F20200506%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2e732bb97a12a1fd8a215613e3b90fcdae8ba1fb6a25916843ab5b51d2ddefbc',
    },
    outputFields: [
      { key: 'fileName', label: 'File Name' },
      { key: 'ownerEmail', label: 'Owner Email' },
      { key: 'ownerName', label: 'Owner Name' },
      { key: 'query', label: 'Query' },
      { key: 'searchName', label: 'Search Name' },
      { key: 'searchResults__Identity__count', label: 'Count' },
      { key: 'searchResults__Identity__noun', label: 'Noun' },
      { key: 'searchResults__Entitlement__count', label: 'Count' },
      { key: 'searchResults__Entitlement__noun', label: 'Noun' },
      { key: 'searchResults__Account__count', label: 'Count' },
      { key: 'searchResults__Account__noun', label: 'Noun' },
      { key: 'signedS3Url', label: 'Signed S3 Url' },
    ],
    type: 'hook',
    performSubscribe: performSubscribe,
    performUnsubscribe: performUnsubscribe,
    performList: performList,
  },
  key: 'saved_search_complete',
  noun: 'Search',
  display: {
    label: 'Saved Search Complete',
    description:
      'Triggers when a report generated from a saved search subscription is available to be processed.',
    directions:
      'Save one or more search queries in Identity Now and then activate this trigger to listen for when any search has completed.',
    hidden: false,
    important: false,
  },
};
