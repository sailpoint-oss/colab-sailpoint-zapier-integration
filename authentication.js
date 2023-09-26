const getAccessToken = async (z, bundle) => {  
  const response = await z.request({
    url: `https://${bundle.inputData.idn_org}.api.identitynow.com/oauth/token`,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    },
    params: {
      'code': bundle.inputData.code,
      'client_id': bundle.inputData.ci,
      'client_secret': bundle.inputData.cs,
      'grant_type': 'authorization_code',
      'redirect_uri': bundle.inputData.redirect_uri
    },
  });

  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
    ci: bundle.inputData.ci,
    cs: bundle.inputData.cs,
    idn_org: bundle.inputData.idn_org,
  };
};

const refreshAccessToken = async (z, bundle) => {
  const response = await z.request({
    url: `https://${bundle.authData.idn_org}.api.identitynow.com/oauth/token`,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    },
    params: {
      'grant_type': 'refresh_token',
      'client_id': bundle.authData.ci,
      'client_secret': bundle.authData.cs,
      'refresh_token': bundle.authData.refresh_token
    }
  });

  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
    ci: bundle.authData.ci,
    cs: bundle.authData.cs,
    idn_org: bundle.authData.idn_org,
  };
};

// This function runs before every outbound request. You can have as many as you
// need. They'll need to each be registered in your index.js file.
const includeBearerToken = (request, z, bundle) => {
  // Don't include access token in headers if we are generating a new access token, since IDN will throw an error saying the token is expired.
  if (bundle.authData.access_token && request.url != `https://${bundle.authData.idn_org}.api.identitynow.com/oauth/token`) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
    request.headers['X-IDN-ORG'] = bundle.authData.idn_org;
  }

  return request;
};

const test = (z, bundle) =>
  z.request({ url: `https://${bundle.authData.idn_org}.api.identitynow.com/v3/account-activities?limit=1` });


module.exports = {
  config: {
    type: 'oauth2',
    oauth2Config: {
      authorizeUrl: {
        method: 'GET',
        url:
          'https://{{bundle.inputData.idn_org}}.identitynow.com/oauth/authorize',
        params: {
          client_id: '{{bundle.inputData.ci}}',
          redirect_uri: '{{bundle.inputData.redirect_uri}}',
          response_type: 'code',
          client_secret: '{{bundle.inputData.cs}}',
        },
      },
      getAccessToken,
      refreshAccessToken,
      autoRefresh: true,
    },
    fields: [
      {
        computed: false,
        key: 'ci', // client_id is reserved by zapier and will be overwritten by process.env.CLIENT_ID
        required: true,
        label: 'Client ID',
        helpText: 'See the [docs](https://developer.sailpoint.com/docs/authentication.html#client-credentials-grant-flow) for more information on generating client credentials.  Use https://zapier.com/dashboard/auth/oauth/return/SailPointCLIAPI/ for the redirect URL.',
        type: 'string'
      },
      {
        computed: false,
        key: 'cs', // client_secret is reserved by zapier and will be overwritten by process.env.CLIENT_SECRET
        required: true,
        label: 'Client Secret',
        helpText: 'See the [docs](https://developer.sailpoint.com/docs/authentication.html#client-credentials-grant-flow) for more information on generating client credentials.  Use https://zapier.com/dashboard/auth/oauth/return/SailPointCLIAPI/ for the redirect URL.',
        type: 'password'
      },
      {
        computed: false,
        key: 'idn_org',
        required: true,
        label: 'IdentityNow Org',
        helpText: 'See the [docs](https://developer.sailpoint.com/docs/authentication.html#client-credentials-grant-flow) for more information on authentication.',
        type: 'string',
        inputFormat: 'https://{{input}}.identitynow.com/',
      },
    ],
    test,
    connectionLabel: '{{idn_org}} organization',
  },
  befores: [includeBearerToken],
  afters: [],
};
