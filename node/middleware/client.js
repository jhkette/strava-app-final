const { Client } = require("strava-oauth2");

// middleware for strava oauth config and create client object
const config = {
    authorization_uri: 'https://www.strava.com/api/v3/oauth/authorize',
    token_uri: 'https://www.strava.com/api/v3/oauth/token',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: `${process.env.SERVER}/auth/authorise`,
    scopes: ['read','activity:read'],
}
const client = new Client(config);
module.exports = client;
