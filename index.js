const identityCreatedTrigger = require('./triggers/identity_created.js');
const identityDeletedTrigger = require('./triggers/identity_deleted.js');
const identityAttributeChangedTrigger = require('./triggers/identity_attribute_changed.js');
const savedSearchCompleteTrigger = require('./triggers/saved_search_complete.js');
const accountsCollectedForAggregationTrigger = require('./triggers/accounts_collected_for_aggregation.js');
const getRequestableObjectsTrigger = require('./triggers/get_requestable_objects.js');
const getPublicIdentitiesTrigger = require('./triggers/get_public_identities.js');
const getAccountSourcesTrigger = require('./triggers/get_account_sources.js');
const submitAccessRequestCreate = require('./creates/submit_access_request.js');
const uploadAccountSourceFileCreate = require('./creates/upload_account_source_file.js');
const getAccountActivitySearch = require('./searches/get_account_activity.js');
const getCertificationCampaignSearch = require('./searches/get_certification_campaign.js');
const listAccountActivitiesSearch = require('./searches/list_account_activities.js');
const listCertificationCampaignsSearch = require('./searches/list_certification_campaigns.js');
const listRequestableObjectsSearch = require('./searches/list_requestable_objects.js');
const listPublicIdentitiesSearch = require('./searches/list_public_identities.js');

const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],
  triggers: {
    [identityCreatedTrigger.key]: identityCreatedTrigger,
    [identityDeletedTrigger.key]: identityDeletedTrigger,
    [identityAttributeChangedTrigger.key]: identityAttributeChangedTrigger,
    [savedSearchCompleteTrigger.key]: savedSearchCompleteTrigger,
    [accountsCollectedForAggregationTrigger.key]: accountsCollectedForAggregationTrigger,
    [getRequestableObjectsTrigger.key]: getRequestableObjectsTrigger,
    [getPublicIdentitiesTrigger.key]: getPublicIdentitiesTrigger,
    [getAccountSourcesTrigger.key]: getAccountSourcesTrigger,
  },
  creates: {
    [submitAccessRequestCreate.key]: submitAccessRequestCreate,
    [uploadAccountSourceFileCreate.key]: uploadAccountSourceFileCreate,
  },
  searches: {
    [getAccountActivitySearch.key]: getAccountActivitySearch,
    [getCertificationCampaignSearch.key]: getCertificationCampaignSearch,
    [listRequestableObjectsSearch.key]: listRequestableObjectsSearch,
    [listPublicIdentitiesSearch.key]: listPublicIdentitiesSearch,
    [listAccountActivitiesSearch.key]: listAccountActivitiesSearch,
    [listCertificationCampaignsSearch.key]: listCertificationCampaignsSearch,
  },
};
