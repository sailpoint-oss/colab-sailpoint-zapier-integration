const perform = (z, bundle) => {
  const itemTypeOptions = {
    url: `https://${bundle.authData.idn_org}.api.identitynow.com/v3/requestable-objects`,
    method: 'GET',
    params: {},
    qs: {
      filters: `id eq "${bundle.inputData.requestedItemId}"`,
    },
  };

  return z.request(itemTypeOptions).then((response) => {
    response.throwForStatus();

    const accessRequestOptions = {
      url: `https://${bundle.authData.idn_org}.api.identitynow.com/v3/access-requests`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${bundle.authData.access_token}`,
        'X-IDN-ORG': bundle.authData.idn_org,
      },
      params: {},
      body: {
        requestedFor: [bundle.inputData.requestedFor],
        requestType: bundle.inputData.requestType,
        requestedItems: [
          {
            type: response.json[0].type,
            id: bundle.inputData.requestedItemId,
            comment: bundle.inputData.comment,
            removeDate: bundle.inputData.removeDate,
          },
        ],
      },
    };

    return z.request(accessRequestOptions).then((response) => {
      response.throwForStatus();

      // You can do any parsing you need for results here before returning them

      return { accepted: true };
    });
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
        helpText: 'The user ID to request access for',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'requestType',
        label: 'Request Type',
        type: 'string',
        helpText: 'Access request type.',
        choices: ['GRANT_ACCESS', 'REVOKE_ACCESS'],
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'requestedItemId',
        label: 'Requested Item',
        type: 'string',
        helpText: 'The role or access profile being requested',
        dynamic: 'get_requestable_objects.id.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'comment',
        label: 'Comment',
        type: 'text',
        helpText: 'Comment provided by the requestor',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'removeDate',
        label: 'Remove Date',
        type: 'datetime',
        helpText:
          'The date the role or access profile will be revoked for the identity.  The default SLA is 24 hours.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    outputFields: [
      { key: 'accepted', label: 'accepted', type: 'boolean' },
    ],
    sample: {
      accepted: true
    }
  },
  key: 'submit_access_request',
  noun: 'Request',
  display: {
    label: 'Submit Access Request',
    description:
      'This submits the access request into IdentityNow, where it will follow any IdentityNow approval processes.',
    hidden: false,
    important: true,
  },
};
