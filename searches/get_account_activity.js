const perform = (z, bundle) => {
  const options = {
    url: `https://${bundle.authData.idn_org}.api.identitynow.com/v3/account-activities/${bundle.inputData.id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return [results];
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'id',
        label: 'Account Activity ID',
        type: 'string',
        helpText: 'ID to check account activity for',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      completed: null,
      completionStatus: null,
      type: 'appRequest',
      requesterIdentitySummary: {
        id: '2c9180867624cbd7017642d8c8c81f67',
        name: 'colin.mckibben',
      },
      targetIdentitySummary: {
        id: '2c9180867624cbd7017642d8c8c81f66',
        name: 'michael.ellis',
      },
      errors: null,
      warnings: null,
      items: [
        {
          id: '2c918084766ca1750176863770193e9f',
          name: '2c918084766ca1750176863770193e9f',
          requested: '2020-12-21T16:52:28.825Z',
          approvalStatus: 'PENDING',
          provisioningStatus: 'PENDING',
          requesterComment: {
            commenterId: '2c9180867624cbd7017642d8c8c81f67',
            commenterName: 'colin.mckibben',
            body: 'none',
            date: '2020-12-21T16:52:28.837Z',
          },
          reviewerIdentitySummary: null,
          reviewerComment: null,
          operation: 'ADD',
          attribute: 'detectedRoles',
          value: 'Employee Source [AccessProfile-1608387254735]',
          nativeIdentity: 'michael.ellis',
          sourceId: 'IdentityNow',
          accountRequestInfo: {
            requestedObjectId: '2c91808a7643763f01767b59d9d907cf',
            requestedObjectName: 'Employee Source',
            requestedObjectType: 'ACCESS_PROFILE',
          },
          clientMetadata: null,
          removeDate: '2020-12-22T14:18:26.954Z',
        },
      ],
      executionStatus: 'EXECUTING',
      clientMetadata: null,
      id: '4b91094d8e934a46b3bb08a2f6337417',
      name: '4b91094d8e934a46b3bb08a2f6337417',
      created: '2020-12-21T16:52:28.837Z',
      modified: '2020-12-21T16:52:29.452Z',
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
  key: 'get_account_activity',
  noun: 'Account',
  display: {
    label: 'Get Account Activity',
    description: 'This gets a single account activity',
    hidden: false,
    important: false,
  },
};
