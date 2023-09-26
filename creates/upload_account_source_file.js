
const got = require('got');
const FormData = require('form-data');
const utils = require('../utils.js')

const perform = async (z, bundle) => {
  const formData = new FormData();

  const response = await got(bundle.inputData.file); // Need to download the file with this library since z.request doesn't do it right
  const { file, filename } = await utils.retrieveFile(z, bundle.inputData.file);
  
  formData.append('file', response.body, filename);

  return z.request({
    url: `https://${bundle.authData.idn_org}.api.identitynow.com/cc/api/source/loadAccounts/${bundle.inputData.source_id}`,
    method: 'POST',
    body: formData,
  }).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });

  
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'file',
        label: 'File',
        type: 'file',
        helpText: 'Raw bytes or text from the file.  Must be CSV format.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'source_id',
        label: 'Account Source ID',
        type: 'string',
        helpText: 'The ID of the source account in IDN to update',
        dynamic: 'get_account_sources.id.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      success: true,
      task: {
        attributes: {
          appId: '2c9180887671ff8c01767b4671fb7d5e',
          eventId: 34387,
          optimizedAggregation: 'enabled',
          qpocJobId: '0b26561b-713f-41ca-ac54-14e92b8936d4',
        },
        completed: null,
        completionStatus: null,
        created: 1611694129800,
        description: 'Aggregates from the specified application.',
        id: '2c91808c771b685d01774074c2882640',
        launched: 1611694129812,
        launcher: 'colin.mckibben',
        messages: [],
        name: 'Cloud Account Aggregation',
        parentName: null,
        progress: null,
        type: 'QUARTZ',
      },
    },
    outputFields: [
      { key: 'success', label: 'Success', type: 'boolean' },
      { key: 'task__attributes__appId', label: 'App ID' },
      { key: 'task__attributes__eventId', label: 'Event ID' },
      {
        key: 'task__attributes__optimizedAggregation',
        label: 'Optimized Aggregation',
      },
      { key: 'task__attributes__qpocJobId', label: 'QPOC Job ID' },
      { key: 'task__completed', label: 'Completed' },
      { key: 'task__completionStatus', label: 'Completion Status' },
      { key: 'task__created', label: 'Task Created' },
      { key: 'task__description', label: 'Task Description' },
      { key: 'task__id', label: 'Task ID' },
      { key: 'task__launched', label: 'Task Launched' },
      { key: 'task__launcher', label: 'Task Launcher' },
      { key: 'task__name', label: 'Task Name' },
      { key: 'task__parentName', label: 'Task Parent Name' },
      { key: 'task__progress', label: 'Task Progress' },
      { key: 'task__type', label: 'Task Type' },
    ],
  },
  key: 'upload_account_source_file',
  noun: 'Source',
  display: {
    label: 'Upload Account Source File',
    description:
      'This uploads a CSV formatted account file generated from an identity source to Identity Now.',
    hidden: false,
    important: true,
  },
};
