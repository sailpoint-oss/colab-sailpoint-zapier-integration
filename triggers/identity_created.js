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
      attributes: {
        firstname: 'John',
        manager: {
          id: 'ee769173319b41d19ccec6c235423237b',
          name: 'nice.guy',
          type: 'IDENTITY',
        },
        displayName: 'John Doe',
        created: '2020-04-27T16:48:33.597Z',
        lastname: 'Doe',
        employeeNumber: 'E009',
        customAttribute2: 'customValue2',
        uid: 'E009',
        customAttribute1: 'customValue',
        inactive: 'true',
        phone: null,
        identificationNumber: 'E009',
        isManager: false,
        department: 'Sales',
        email: 'john.doe@gmail.com',
      },
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
      triggerId: 'idn:identity-created',
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
      identity: {
        id: 'ee769173319b41d19ccec6cea52f237b',
        name: 'john.doe',
        type: 'IDENTITY',
      },
      attributes: {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@gmail.com',
        department: 'Sales',
        displayName: 'John Doe',
        created: '2020-04-27T16:48:33.597Z',
        employeeNumber: 'E009',
        uid: 'E009',
        inactive: 'true',
        phone: null,
        identificationNumber: 'E009',
        isManager: false,
        manager: {
          id: 'ee769173319b41d19ccec6c235423237b',
          name: 'nice.guy',
          type: 'IDENTITY',
        },
        customAttribute1: 'customValue',
        customAttribute2: 'customValue2',
      },
    },
    outputFields: [
      { key: 'identity__id', label: 'Identity ID' },
      { key: 'identity__name', label: 'Identity Name' },
      { key: 'identity__type', label: 'Identity Type' },
      { key: 'attributes__firstname', label: 'First Name' },
      { key: 'attributes__lastname', label: 'Last Name' },
      { key: 'attributes__email', label: 'Email Address' },
      { key: 'attributes__department', label: 'Department' },
      { key: 'attributes__displayName', label: 'Display Name' },
      { key: 'attributes__created', label: 'Time Created' },
      { key: 'attributes__employeeNumber', label: 'Employee Number' },
      { key: 'attributes__uid', label: 'UID' },
      { key: 'attributes__inactive', label: 'Is Inactive', type: 'boolean' },
      { key: 'attributes__phone', label: 'Phone Number' },
      {
        key: 'attributes__identificationNumber',
        label: 'Identification Number',
      },
      { key: 'attributes__isManager', label: 'Is Manager', type: 'boolean' },
      { key: 'attributes__manager__id', label: 'Manager ID' },
      { key: 'attributes__manager__name', label: 'Manager Name' },
      { key: 'attributes__manager__type', label: 'Manager Type' },
      { key: 'attributes__customAttribute1', label: 'Custom Attribute 1' },
      { key: 'attributes__customAttribute2', label: 'Custom Attribute 2' },
    ],
    performList: performList,
  },
  key: 'identity_created',
  noun: 'Identity',
  display: {
    label: 'Identity Created',
    description: 'Triggers when a new identity is created in IdentityNow.',
    directions:
      'You might think of this as when someone is first hired into your company and their digital identity is created.',
    hidden: false,
    important: true,
  },
};
