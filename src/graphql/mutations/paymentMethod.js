import { gql } from '@apollo/client'

export const UPDATE_ORGANIZATION_ADMINS_BY_STRIPE_PAYMENT_METHOD_ID= gql`
mutation updateOrganizationAdmins($_set: organization_organizationAdmin_set_input={}, $where: organization_organizationAdmin_bool_exp!) {
  updateOrganizationAdmins(where: $where, _set: $_set) {
    returning {
      id
      stripePaymentMethodId
    }
  }
}
`