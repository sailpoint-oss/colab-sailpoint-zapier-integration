const perform = (z, bundle) => {
  function getQueryParams() {
    query = [];
    if (bundle.inputData.reviewerIdentity) {
      query.push(`reviewer-identity=${bundle.inputData.reviewerIdentity}`);
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
    }.api.identitynow.com/v3/certifications${getQueryParams()}`,
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
        key: 'reviewerIdentity',
        label: 'Reviewer ID',
        type: 'string',
        helpText:
          'The ID of the reviewer identity.  "me" indicates the current user.',
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
      campaign: {
        campaignType: 'SOURCE_OWNER',
        description: 'source',
        type: null,
        id: '2c91808676f8a2020177259a5e2f1cf8',
        name: 'Source Campaign',
      },
      completed: false,
      decisionsMade: 0,
      decisionsTotal: 3,
      due: '2021-02-06T15:40:19Z',
      signed: null,
      reviewer: {
        email: 'colin.mckibben@sailpoint.com',
        type: 'IDENTITY',
        id: '2c9180867624cbd7017642d8c8c81f67',
        name: 'colin.mckibben',
        created: null,
        modified: null,
      },
      reassignment: null,
      hasErrors: false,
      errorMessage: null,
      phase: 'ACTIVE',
      identitiesCompleted: 0,
      identitiesTotal: 3,
      id: '2c91808676f8a2010177259a5eb64c41',
      name: 'Source Owner Access Review for Employees [source]',
      created: '2021-01-21T15:40:09.782Z',
      modified: '2021-01-21T15:41:20.431Z',
    },
    outputFields: [
      { key: 'campaign__campaignType', label: 'Campaign Type' },
      { key: 'campaign__description', label: 'Campaign Description' },
      { key: 'campaign__type', label: 'Type' },
      { key: 'campaign__id', label: 'Campaign ID' },
      { key: 'campaign__name', label: 'Campaign Name' },
      { key: 'completed', label: 'Date Completed', type: 'boolean' },
      { key: 'decisionsMade', label: 'Decisions Made', type: 'integer' },
      { key: 'decisionsTotal', label: 'Total Decisions', type: 'integer' },
      { key: 'due', label: 'Date Due', type: 'datetime' },
      { key: 'signed', label: 'Date Signed', type: 'datetime' },
      { key: 'reviewer__email', label: 'Reviewer Email' },
      { key: 'reviewer__type', label: 'Reviewer Type' },
      { key: 'reviewer__id', label: 'Reviewer ID' },
      { key: 'reviewer__name', label: 'Reviewer Name' },
      { key: 'reviewer__created', label: 'Reviewer Created', type: 'datetime' },
      {
        key: 'reviewer__modified',
        type: 'datetime',
        label: 'Reviewer Modified',
      },
      { key: 'reassignment__comment', label: 'Reassignment Comment' },
      { key: 'reassignment__from__id', label: 'Reassignment From ID' },
      { key: 'reassignment__from__name', label: 'Reassignment From Name' },
      { key: 'reassignment__from__type', label: 'Reassignment From Type' },
      { key: 'reassignment__from__reviewer__id', label: 'Reassignment From Reviewer ID' },
      { key: 'reassignment__from__reviewer__name', label: 'Reassignment From Reviewer Name' },
      { key: 'reassignment__from__reviewer__email', label: 'Reassignment From Reviewer Email' },
      { key: 'reassignment__from__reviewer__type', label: 'Reassignment From Reviewer Type' },
      { key: 'hasErrors', label: 'Has Errors', type: 'boolean' },
      { key: 'errorMessage', label: 'Error Message' },
      { key: 'phase', label: 'Phase' },
      {
        key: 'identitiesCompleted',
        label: 'Identities Completed',
        type: 'integer',
      },
      { key: 'identitiesTotal', label: 'Total Identities', type: 'integer' },
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'created', label: 'Date Created', type: 'datetime' },
      { key: 'modified', label: 'Date Modified', type: 'datetime' },
    ],
  },
  key: 'list_certification_campaigns',
  noun: 'Campaign',
  display: {
    label: 'List Certification Campaigns',
    description:
      "This gets multiple certification campaigns that satisfy the given parameters.  To filter results, enable the filter parameter and enter a query (ex. completed eq false). See the <a href='https://developer.sailpoint.com/apis/v3/#operation/listIdentityCertifications'>docs</a>",
    hidden: false,
    important: true,
  },
};
