const perform = (z, bundle) => {
  function getQueryParams() {
    query = [];
    if (bundle.inputData.requestedFor) {
      query.push(`requested-for=${bundle.inputData.requestedFor}`);
    }
    if (bundle.inputData.requestedBy) {
      query.push(`requested-by=${bundle.inputData.requestedBy}`);
    }
    if (bundle.inputData.regardingIdentity) {
      query.push(`regarding-identity=${bundle.inputData.regardingIdentity}`);
    }
    if (bundle.inputData.type) {
      query.push(`type=${bundle.inputData.type}`);
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
    }.api.identitynow.com/v3/account-activities${getQueryParams()}`,
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
        key: 'requestedFor',
        label: 'Requested For',
        type: 'string',
        helpText:
          'The identity that the activity was requested for.  "me" indicates the current user.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'requestedBy',
        label: 'Requested By',
        type: 'string',
        helpText:
          'The identity that requested the activity.  "me" indicates the current user.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'regardingIdentity',
        label: 'Regarding Identity',
        type: 'string',
        helpText:
          'The specified identity will be either the requester or target of the account activity.  "me" indicates the current user.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'type',
        label: 'Type',
        type: 'string',
        helpText: 'The type of account activity',
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
      completed: null,
      completionStatus: null,
      type: 'Identity Refresh',
      requesterIdentitySummary: null,
      targetIdentitySummary: {
        id: '2c9180857677453e01767b51738f56eb',
        name: 'colin.mckibben2',
      },
      errors: null,
      warnings: null,
      items: [
        {
          id: '2c918085766ca151017686a84ac4287a',
          name: '2c918085766ca151017686a84ac4287a',
          requested: '2020-12-21T18:55:44.836Z',
          approvalStatus: 'PENDING',
          provisioningStatus: 'PENDING',
          requesterComment: null,
          reviewerIdentitySummary: null,
          reviewerComment: null,
          operation: 'REMOVE',
          attribute: 'assignedRoles',
          value: 'Developer Relations [cloudRole-1608385854106]',
          nativeIdentity: null,
          sourceId: 'IdentityNow',
          accountRequestInfo: null,
          clientMetadata: null,
          removeDate: null,
        }
      ],
      executionStatus: 'EXECUTING',
      clientMetadata: null,
      id: 'e4d4dbdac71e4a8ebb6d512fc40fcb0e',
      name: 'e4d4dbdac71e4a8ebb6d512fc40fcb0e',
      created: '2020-12-21T18:55:44.869Z',
      modified: '2020-12-21T18:55:45.103Z',
    },
    outputFields: [
      { key: 'completed', label: 'Completed', type: 'datetime' },
      { key: 'completionStatus', label: 'Completion Status' },
      { key: 'type', label: 'Type' },
      { key: 'requesterIdentitySummary__id', label: 'Requester ID' },
      { key: 'requesterIdentitySummary__name', label: 'Requester Name' },
      { key: 'requesterIdentitySummary__identityId', label: 'Requester Identity ID' },
      { key: 'requesterIdentitySummary__completed', label: 'Requester Completed', type: 'boolean' },
      { key: 'targetIdentitySummary__id', label: 'Target ID' },
      { key: 'targetIdentitySummary__name', label: 'Target Name' },
      { key: 'targetIdentitySummary__identityId', label: 'Target Identity ID' },
      { key: 'targetIdentitySummary__completed', label: 'Target Completed', type: 'boolean' },
      { key: 'errors[]', label: 'Errors' },
      { key: 'warnings[]', label: 'Warnings' },
      { key: 'items[]id', label: 'Item ID' },
      { key: 'items[]name', label: 'Item Name' },
      { key: 'items[]requested', label: 'Item Requested' },
      { key: 'items[]approvalStatus', label: 'Item Approval Status' },
      { key: 'items[]provisioningStatus', label: 'Item Provisioning Status' },
      {
        key: 'items[]requesterComment__commenterId',
        label: 'Comment Requester ID',
      },
      {
        key: 'items[]requesterComment__commenterName',
        label: 'Comment Requester Name',
      },
      { key: 'items[]requesterComment__body', label: 'Requester Comment Body' },
      { key: 'items[]requesterComment__date', label: 'Requester Comment Date', type: 'datetime' },
      {
        key: 'items[]reviewerIdentitySummary__id',
        label: 'Identity Summary ID',
      },
      {
        key: 'items[]reviewerIdentitySummary__name',
        label: 'Identity Summary Name',
      },
      {
        key: 'items[]reviewerIdentitySummary__identityId',
        label: 'Identity Summary Identity ID',
      },
      {
        key: 'items[]reviewerIdentitySummary__completed',
        label: 'Identity Summary Completed',
        type: 'boolean'
      },
      { key: 'items[]reviewerComment__commenterId', label: 'ID of reviewer commenter' },
      { key: 'items[]reviewerComment__commenterName', label: 'Name of reviewer commenter' },
      { key: 'items[]reviewerComment__body', label: 'Comment Body' },
      { key: 'items[]reviewerComment__date', label: 'Date of reviewer commenter', type: 'datetime' },
      { key: 'items[]operation', label: 'Item Operation' },
      { key: 'items[]attribute', label: 'Item Attribute' },
      { key: 'items[]value', label: 'Item Value' },
      { key: 'items[]nativeIdentity', label: 'Item Native Identity' },
      { key: 'items[]sourceId', label: 'Item Source ID' },
      {
        key: 'items[]accountRequestInfo__requestedObjectId',
        label: 'Requested Object ID',
      },
      {
        key: 'items[]accountRequestInfo__requestedObjectName',
        label: 'Requested Object Name',
      },
      {
        key: 'items[]accountRequestInfo__requestedObjectType',
        label: 'Requested Object Type',
      },
      { key: 'items[]clientMetadata', label: 'Item Client Metadata' },
      { key: 'items[]removeDate', label: 'Remove Date', type: 'datetime' },
      { key: 'executionStatus', label: 'Execution Status' },
      { key: 'clientMetadata', label: 'Client Metadata' },
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'created', label: 'Created', type: 'datetime' },
      { key: 'modified', type: 'datetime', label: 'Modified' },
    ],
  },
  key: 'list_account_activities',
  noun: 'Account',
  display: {
    label: 'List Account Activities',
    description:
      "This gets a collection of account activities that satisfy the given parameters.  To filter results, enable the filter parameter and enter a query (ex. created gt 2018-12-18T23:05:55Z). See the <a href='https://api.sailpoint.com/api_reference/v3/account-activities/listaccountactivities'>docs</a>",
    hidden: false,
    important: false,
  },
};
