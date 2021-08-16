import React from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useMutation,useQuery,gql } from "@apollo/client";
import { useAuth } from "../../../store/auth";
import { UPDATE_ORGANIZATION, UPDATE_ORGANIZATION_ADMINS_BY_STRIPE_PAYMENT_METHOD_ID } from "../../../graphql";
import { loadStripe } from '@stripe/stripe-js'
import {
   Elements,
   useStripe,
   useElements,
   CardElement,
} from '@stripe/react-stripe-js'
import styled from 'styled-components';
import { Footer as Foter, Main,} from "../../../components/styled";
import Footer from "../../../components/Footer";
import {Loader} from "../../../components";
import axios from 'axios';
import Image from 'next/image';

export const PaymentForm = () => {
   const { user } = useAuth();
   const [intent, setIntent] = React.useState(null)
   console.log( process.browser && `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
   const stripePromise = loadStripe(
      process.browser && `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
   );
console.log(stripePromise)

   // stripeCustomerId and organization for intent
   const {data,loading}=useQuery(ORGANIZATION_ADMINS,  {
      variables:{
          where: {
         email:{"_eq": user.email}
       }
       },
       onCompleted: () => {
          console.log("success")
        },
        onError: (error) => {
          console.log(error);
        },
    })
    
   React.useEffect(() => {
      if (!loading) {
         if(Object.keys(data).length>0)
         ; (async () => {
            console.log(data)
            const stripeCustomerId=data?.organizationAdmins[0]?.stripeCustomerId
            const intent = await createSetupIntent(stripeCustomerId)
            console.log(intent)
            setIntent(intent)
            
         })()
      }
   }, [loading,data])

   const createSetupIntent = async (customer) => {
      try {
         if(customer){
         const { data } = await axios.post('/api/setup-intent', { customer })
         console.log('✨✨',{data})
         return data.data
         }
      } catch (error) {
         return error
      }
   }
  
   const [createPaymentMethod] = useMutation(UPDATE_ORGANIZATION_ADMINS_BY_STRIPE_PAYMENT_METHOD_ID, {
      onCompleted: () => {
         console.log("Payment method created")
      },
      onError: error => {
         console.error(error)
      },
   })

   const handleResult = async ({ setupIntent }) => {
      try {
            if (Object.keys(setupIntent).length > 0 && setupIntent.status === 'succeeded') {
               await createPaymentMethod({
                  variables: {
                     where: {
                        email: { "_eq": user.email }
                     },
                     _set: {
                        stripePaymentMethodId: setupIntent.payment_method
                     },
                  }
               })

            } else {
               throw Error("Couldn't complete card setup, please try again")
            }
         // } else {
         //    throw Error("Couldn't complete card setup, please try again")
         // }
      } catch (error) {console.error(error)} 
   }

  

   if (!intent) return  <Loader />
   return (
      <div>
         <Elements stripe={stripePromise}>
            <CardSetupForm intent={intent} handleResult={handleResult} />
         </Elements>
      </div>
   )
}

export default PaymentForm;

const CardSetupForm = ({ intent, handleResult }) => {
   const stripe = useStripe()
   const router = useRouter();
   const { user } = useAuth();
   const elements = useElements()
   const inputRef = React.useRef(null)
   const [name, setName] = React.useState('')
   const [error, setError] = React.useState('')
   const [submitting, setSubmitting] = React.useState(false)

   const [update] = useMutation(UPDATE_ORGANIZATION, {
      onCompleted: () => {
         router.push("/onboard/signup/finish-setup");
      },
      onError: (error) => {
         console.log(error);
      },
   });


   React.useEffect(() => {
      inputRef.current.focus()
   }, [])

   const handleSubmit = async event => {
      setSubmitting(true)
      event.preventDefault()

      if (!stripe || !elements) {
         return
      }
      console.log(intent)
      const result = await stripe.confirmCardSetup(intent.client_secret, {
         payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
               name,
            },
         },
      })
      console.log(result)
      if (result.error) {
         setSubmitting(false)
         setError(result.error.message)
      } else {
         handleResult(result)
         nextPage()
      }
   }
   
   const nextPage = () => {
      update({
         variables: {
            id: user.organization.id,
            _set: {
               onboardStatus: "SETUP_DOMAIN",
            },
         },
      });
   };
   return (
      <>
      <Layout>
         <Main>
         <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-7 col-md-offset-3">
            <form onSubmit={handleSubmit} className="container">
            <div className="row">
            <h2 className="nunito" style={{marginTop:"20px",marginBottom:"39px",fontWeight:"bold",fontSize:"34px"}}>Enter your Payment Details</h2>
               <div className="col-md-12 col-sm-12 wrapper" style={{marginLeft: "12px"}}>
                  <section className="mb-3 mt-4" style={{padding:"6px 12px 6px 12px"}}>
                     <label htmlFor="name" className="label">
                        Card Holder's Name
                     </label>
                     <input
                        type="text"
                        name="name"
                        value={name}
                        ref={inputRef}
                        placeholder="Enter Card Holder's name"
                        onChange={e => setName(e.target.value.trim())}
                        className="input mt-2"
                     />
                  </section>
                  <section className="mt-4 mb-4" style={{padding:"0px 12px 1.2px 12px"}}>
                     <label htmlFor="name" className="label mt-4">
                        Card Details
                     </label>
                     <CardSection />
                  </section>
               </div>
            </div>
           
            <Submit
            disabled={!name || submitting}
            type="submit"
            style={{ marginTop: "1.2rem" , marginLeft: "0.3%"}}
            className={ submitting ? "disabled" : ""}
          >{submitting ? 'Saving...' : 'Save'}
          </Submit>
            {error && <span tw="block text-red-500 mt-2">{error}</span>}
         </form>
         </div>
        <div className="col-md-4 col-md-offset-3" style={{"marginTop":"100px"}}>
        <Image width="300px"
         height="300px"
          src='/assets/images/PaymentPage.png'
          alt="payment-page"/>
          </div>
        </div></div>
        
      </Main>
         <Foter style={{ marginTop: "-80px", marginLeft: "20px", justifyContent: "start" }}>
         </Foter>
      </Layout>
         <Footer />
      </>
   );
}

// card info passed into stripe card Element

const CardSection = () => {
   return (
      <CardSectionWrapper className="mt-2" style={{marginBottom: "1.2rem"}}>
         <CardElement
            options={CARD_ELEMENT_OPTIONS}
         />
      </CardSectionWrapper>
   )
}


// for cardElement styling
const CARD_ELEMENT_OPTIONS = {
   style: {
      base: {
         color: '#fff',
         fontSize: '16px',
         '::placeholder': {
            color: '#aab7c4',
         },
      },
      invalid: {
         color: '#fa755a',
         iconColor: '#fa755a',
      },
   },
}


// query for stripeCustomerId and organization for intent
const ORGANIZATION_ADMINS = gql`
query organizations($where: organization_organizationAdmin_bool_exp = {}) {
   organizationAdmins(where: $where) {
     stripeCustomerId
     organization {
       id
       adminSecret
       stripeAccountType 
       stripeAccountId
     }
   }
 }`



const CardSectionWrapper = styled.div`
   .StripeElement {
      height: 40px;
      width: 100%;
      color: #fff;
      padding: 10px 0;
      background-color: #1a202c;
      border-bottom: 1px solid #2d3748;
   }

   .StripeElement--invalid {
      border-color: #fa755a;
   }

   .StripeElement--webkit-autofill {
      background-color: #fefde5 !important;
   }
`
const Submit = styled.button`
width: 103.3%;
font-family: "Nunito", sans-serif;
font-size: 20px;
border-radius: 0.25rem;
height: 2.5rem;
--tw-bg-opacity: 1;
background-color: #111B2B;
--tw-text-opacity: 1;
border:none;
text-transform: uppercase;
letter-spacing: 0.05em;
border-radius: 15px;
color: #fff;
padding-top: 13px;
padding-bottom: 40px;

&:disabled {
  background: #CEDEF3;
  border-radius: 15px;
  cursor: not-allowed;
 
}

`;
