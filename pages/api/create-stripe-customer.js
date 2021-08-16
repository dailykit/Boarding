import { GraphQLClient } from 'graphql-request';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_DAILYCLOAK_URL, {
   headers: {
      'x-hasura-admin-secret':  process.env.NEXT_PUBLIC_ADMIN_SECRET,
   }
})


export default async function createStripeCustomer(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body
        const customer = await stripe.customers.create({
          email: email
        });
      const { updateOrganizationAdmins } = client.request(
        UPDATE_ORGANIZATION_ADMINS_BY_STRIPE_CUSTOMER_ID,
        {
          where: {
            email:{"_eq": email}
          },
          _set: {
            stripeCustomerId: customer.id,
          },
        }
      )
        return res.status(200).json({success:true,message:"created Stripe Customer"});
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
  }
}

export const UPDATE_ORGANIZATION_ADMINS_BY_STRIPE_CUSTOMER_ID= `
mutation updateOrganizationAdmins($_set: organization_organizationAdmin_set_input={}, $where: organization_organizationAdmin_bool_exp!) {
  updateOrganizationAdmins(where: $where, _set: $_set) {
    returning {
      id
      stripeCustomerId
    }
  }
}
`

