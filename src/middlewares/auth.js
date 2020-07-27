/** @format */

const OktaJwtVerifier = require('@okta/jwt-verifier');
const { responses } = require("@ylz/common")
const { oktaIssuer, oktaClientId } = require('../config')

const verifier = new OktaJwtVerifier({
  issuer: oktaIssuer,
  clientId: oktaClientId,
  assertClaims: {
    'groups.includes': ['Manager']
  }
});

const auth = async (req, res, next) => {
    try {
      if (!req.headers.authorization){
        const response = new responses.UnauthorizedResponse({},'Authentication failed! Try again.');
        return res.status(response.code).json(response);
      }
      const accessToken = req.headers.authorization.trim().split(' ')[1];  
      const ret = await verifier.verifyAccessToken(accessToken, oktaClientId);

      next();
    } catch (error) {
        next(error)
    }
  };


module.exports = { auth }