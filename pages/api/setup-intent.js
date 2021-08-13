const stripe = require('stripe')(window._env_.STRIPE_SECRET_KEY);

const create = async (req, res) => {
  try {
     const { customer } = req.body
     const response = await stripe.setupIntents.create({
        customer,
     })

     if (isObjectValid(response)) {
        return res.json({ success: true, data: response })
     } else {
        throw Error('Didnt get any response from Stripe!')
     }
  } catch (error) {
     return res.json({ success: false, error: error.message })
  }
}

export const isObjectValid = obj => {
  if (Object.keys(obj).length > 0 && obj.constructor === Object) {
     return true
  }
  return false
}
export default create;


