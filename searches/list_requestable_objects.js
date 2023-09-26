const perform = (z, bundle) => {
  function getQueryParams() {
    query = [];
    if (bundle.inputData.identity_id) {
      query.push(`identity-id=${bundle.inputData.identity_id}`);
    }
    if (bundle.inputData.types) {
      query.push(`types=${bundle.inputData.types}`);
    }
    if (bundle.inputData.term) {
      query.push(`term=${bundle.inputData.term}`);
    }
    if (bundle.inputData.statuses) {
      query.push(`statuses=${bundle.inputData.statuses}`);
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
    }.api.identitynow.com/v3/requestable-objects${getQueryParams()}`,
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
        key: 'identity_id',
        label: 'Identity ID',
        helpText: 'Only return requestable objects for the specified identity',
        dynamic: 'get_public_identities.id.name',
        required: false,
        altersDynamicFields: false,
      },
      {
        key: 'types',
        label: 'Filter by Types',
        type: 'string',
        helpText:
          'Comma separated list of requestable object types to filter by.  If blank, all types are returned.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'term',
        label: 'Search Term',
        type: 'string',
        helpText:
          'Searches requestable objects with a partial match on the name or description.  If Search Term is provided, Filter will be ignored.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'statuses',
        label: 'Filter by Statuses',
        type: 'string',
        helpText:
          'Comma separated list of statuses to filter by.  You must specify an Identity ID to use this.',
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
        helpText:
          'Limits the number of records returned.  Must be an integer.  Max is 250.',
        default: '250',
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
      description: 'ubuntu',
      type: 'ACCESS_PROFILE',
      requestStatus: null,
      identityRequestId: null,
      ownerRef: {
        email: 'colin.mckibben@sailpoint.com',
        type: 'IDENTITY',
        id: '2c9180867624cbd7017642d8c8c81f67',
        name: 'colin.mckibben',
      },
      requestCommentsRequired: false,
      id: '2c918088772a8f4801772a95120c0011',
      name: 'Ubuntu',
      created: '2021-01-22T14:52:28.556Z',
      modified: null,
    },
    outputFields: [
      { key: 'description', label: 'Description' },
      { key: 'type', label: 'Type' },
      { key: 'requestStatus', label: 'Request Status' },
      { key: 'identityRequestId', label: 'Identity Request ID' },
      { key: 'ownerRef__email', label: 'Owner Email' },
      { key: 'ownerRef__type', label: 'Owner Type' },
      { key: 'ownerRef__id', label: 'Owner ID' },
      { key: 'ownerRef__name', label: 'Owner Name' },
      {
        key: 'requestCommentsRequired',
        label: 'Request Comments Required',
        type: 'boolean',
      },
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'created', label: 'Created', type: 'datetime' },
      { key: 'modified', label: 'Modified', type: 'datetime' },
    ],
  },
  key: 'list_requestable_objects',
  noun: 'Requestable Objects',
  display: {
    label: 'List Requestable Objects',
    description:
      'Returns a list of acccess items that that can be requested through the Submit Access Request action.  To filter results, enable the filter parameter and enter a query (ex. name eq \\"Employee source\\"). See the <a href=\'https://api.sailpoint.com/api_reference/v3/requestable-objects/listrequestableobjects\'>docs</a>',
    hidden: false,
    important: true,
  },
};
