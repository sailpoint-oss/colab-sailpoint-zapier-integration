const perform = (z, bundle) => {
  function getQueryParams() {
    query = [];
    if (bundle.inputData.addCoreFilters) {
      query.push(`add-core-filters=${bundle.inputData.addCoreFilters}`);
    }
    if (bundle.inputData.filters) {
      query.push(`filters=${bundle.inputData.filters}`);
    }
    if (bundle.inputData.sorters) {
      query.push(`sorters=${bundle.inputData.sorters}`);
    }
    if (bundle.inputData.limit) {
      query.push(`limit=${bundle.inputData.limit}`);
    }
    if (bundle.inputData.offset) {
      query.push(`offset=${bundle.inputData.offset}`);
    }

    if (query.length > 0) {
      return `?${query.join('&')}`;
    } else {
      return '';
    }
  }

  const options = {
    url: `https://${
      bundle.authData.idn_org
    }.api.identitynow.com/v3/public-identities${getQueryParams()}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'addCoreFilters',
        label: 'Add Core Filters',
        type: 'boolean',
        helpText:
          'If true, apply additional filtering to remove identities that are spadmin, cloudadmin, or have null ID fields.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'filters',
        label: 'Filters',
        type: 'string',
        helpText:
          'Filter results.  See the [docs](https://api.sailpoint.com/api_reference/v3-api-standard-collection-parameters) for more info.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'sorters',
        label: 'Sorters',
        type: 'string',
        helpText:
          'Sort results. See the [docs](https://api.sailpoint.com/api_reference/v3-api-standard-collection-parameters) for more info.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        default: '250',
        helpText:
          'Limits the number of records returned.  Must be an integer.  Max is 250.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'offset',
        label: 'Offset',
        type: 'integer',
        default: '0',
        helpText:
          'Offset into the full result set.  Usually specified with "Limit" to paginate through the results.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: '2c91808375d8e80a0175e1f88a575221',
      name: 'jordan.violet',
      alias: 'jordan.violet',
      email: 'jordan.violet@sailpoint.com',
      status: null,
      manager: null,
      attributes: [],
    },
    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'alias', label: 'Alias' },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status' },
      { key: 'manager__type', label: 'Manager Type' },
      { key: 'manager__id', label: 'Manager ID', type: 'string' },
      { key: 'manager_name', label: 'Manager Name', type: 'string' },
      { key: 'attributes[]key', label: 'Attribute Key', type: 'string' },
      { key: 'attributes[]name', label: 'Attribute Name', type: 'string' },
      { key: 'attributes[]value', label: 'Attribute Value', type: 'string' },
    ],
  },
  key: 'list_public_identities',
  noun: 'Identities',
  display: {
    label: 'List Public Identities',
    description:
      'Returns a list of publicly viewable identities in Identity Now.  To filter results, enable the filter parameter and enter a query (ex. email eq "john.doe@bigcorp.com"). See the [docs](https://api.sailpoint.com/api_reference/v3/public-identities/getpublicidentities)',
    hidden: false,
    important: true,
  },
};
