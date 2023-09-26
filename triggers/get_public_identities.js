const perform = (z, bundle) => {
  const options = {
    url: `https://${bundle.authData.idn_org}.api.identitynow.com/v3/public-identities`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
      'X-IDN-ORG': bundle.authData.idn_org,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results.map((r) => ({ name: r.name, id: r.id }));
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: { name: 'john.doe', id: '2c918088772a8f4801772a95120c0011' },
    outputFields: [
      { key: 'name', label: 'Name' },
      { key: 'id', label: 'ID' },
    ],
  },
  key: 'get_public_identities',
  noun: 'Public Identities',
  display: {
    label: 'Get Public Identities',
    description: 'Get a list of public identities.',
    hidden: true,
    important: false,
  },
};
