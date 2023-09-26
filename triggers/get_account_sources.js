const perform = (z, bundle) => {
  const options = {
    url: `https://${bundle.authData.idn_org}.api.identitynow.com/cc/api/source/list`,
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
    sample: { name: 'IdentityNow Admins', id: '14126' },
    outputFields: [
      { key: 'name', label: 'Name' },
      { key: 'id', label: 'ID' },
    ],
  },
  key: 'get_account_sources',
  noun: 'Source',
  display: {
    label: 'Get Account Sources',
    description: 'Get a list of account sources',
    hidden: true,
    important: false,
  },
};
