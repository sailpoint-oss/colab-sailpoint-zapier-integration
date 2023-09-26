const perform = (z, bundle) => {
  return [bundle.cleanedRequest];
};

const performList = (z, bundle) => {
  const example = [
    {
      identity: {
        id: 'ee769173319b41d19ccec6cea52f237b',
        name: 'john.doe',
        type: 'IDENTITY',
      },
      changes: [
        {
          attribute: 'department',
          oldValue: 'sales',
          newValue: 'marketing',
        },
        {
          attribute: 'manager',
          oldValue: {
            id: 'ee769173319b41d19ccec6c235423237b',
            name: 'nice.guy',
            type: 'IDENTITY',
          },
          newValue: {
            id: 'ee769173319b41d19ccec6c235423236c',
            name: 'mean.guy',
            type: 'IDENTITY',
          },
        },
        {
          attribute: 'email',
          oldValue: 'john.doe@hotmail.com',
          newValue: 'john.doe@gmail.com',
        },
      ],
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
      triggerId: 'idn:identity-attributes-changed',
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
    body: {
      hookUrl: bundle.subscribeData.id,
    },
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
      identity: {
        id: 'ee769173319b41d19ccec6cea52f237b',
        name: 'john.doe',
        type: 'IDENTITY',
      },
      changes: [
        {
          attribute: 'department',
          oldValue: 'sales',
          newValue: 'marketing',
        },
        {
          attribute: 'manager',
          oldValue: {
            id: 'ee769173319b41d19ccec6c235423237b',
            name: 'nice.guy',
            type: 'IDENTITY',
          },
          newValue: {
            id: 'ee769173319b41d19ccec6c235423236c',
            name: 'mean.guy',
            type: 'IDENTITY',
          },
        },
        {
          attribute: 'email',
          oldValue: 'john.doe@hotmail.com',
          newValue: 'john.doe@gmail.com',
        },
      ],
    },
    performList: performList,
    outputFields: [
      { key: 'identity__id', label: 'Identity ID' },
      { key: 'identity__name', label: 'Identity Name' },
      { key: 'identity__type', label: 'Identity Type' },
      { key: 'changes[]attribute', label: 'Attribute' },
      { key: 'changes[]oldValue', label: 'Old Value' },
      { key: 'changes[]newValue', label: 'New Value' },
      { key: 'changes[]oldValue__id', label: 'Old Value ID' },
      { key: 'changes[]newValue__id', label: 'New Value ID' },
      { key: 'changes[]oldValue__name', label: 'Old Value Name' },
      { key: 'changes[]newValue__name', label: 'New Value Name' },
      { key: 'changes[]oldValue__type', label: 'Old Value Type' },
      { key: 'changes[]newValue__type', label: 'New Value Type' }
    ],
  },
  key: 'identity_attribute_changed',
  noun: 'Identity Attribute',
  display: {
    label: 'Identity Attribute Changed',
    description:
      'Triggers when any attributes of an identity change. This may contain more than one changed attribute.',
    hidden: false,
    important: true,
  },
};
