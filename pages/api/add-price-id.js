import { GraphQLClient,gql } from 'graphql-request';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const client = new GraphQLClient(process.env.HASURA_KEYCLOAK_URL, {
   headers: {
      'x-hasura-admin-secret': process.env.ADMIN_SECRET,
   }
})

export default async function addPriceId(req, res) {
  if (req.method === 'POST') {
    try {
        const{priceId,email}=req.body
      const { updateOrganizationAdmins } = client.request(
        UPDATE_ORGANIZATION_ADMINS_BY_STRIPE_PRICE_ID,
        {
          where: {
            email:{"_eq": email}
          },
          _set: {
            stripePriceId: priceId
          },
        }
      )
        return res.status(200).redirect(`${req.headers.origin}/onboard/signup/card-details`);
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
  }
}

export const UPDATE_ORGANIZATION_ADMINS_BY_STRIPE_PRICE_ID=gql `
mutation updateOrganizationAdmins($_set: organization_organizationAdmin_set_input={}, $where: organization_organizationAdmin_bool_exp!) {
  updateOrganizationAdmins(where: $where, _set: $_set) {
    returning {
      id
      stripePriceId
    }
  }
}
`


