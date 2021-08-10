import React from "react";
import jwt_decode from "jwt-decode";
import { useSubscription } from "@apollo/client";
import { useRouter } from "next/router";

const AuthContext = React.createContext();

import * as utils from "../../utils";
import { USER } from "../../graphql";
import { Loader } from "../../components";

const reducers = (state, { type, payload }) => {
  switch (type) {
     case 'LOGOUT':
        return {
           ...state,
           authenticated: false,
           user: {
              name: '',
              email: '',
              organization: {
                 id: '',
                 url: '',
              },
           },
           onboard: {
              step: 1,
           },
        }
     case 'SET_USER':
        return {
           ...state,
           user: {
              ...state.user,
              name: `${payload?.firstName || ''} ${payload?.lastName || ''}`,
              ...payload,
           },
           authenticated: true,
        }
     case 'CHANGE_STEP':
        return {
           ...state,
           onboard: { ...state.onboard, step: payload },
        }
     default:
        return state
  }
}

export const AuthProvider = ({ children }) => {
  const Router = useRouter()
  const location = useRouter()
  const [state, dispatch] = React.useReducer(reducers, {
     authenticated: false,
     user: {
        email: '',
        organization: {
           id: null,
        },
     },
     onboard: {
        step: 1,
     },
  })

  const { loading, data: { admins = [] } = {} } = useSubscription(USER, {
     skip: !state?.user?.email,
     variables: { where: { email: { _eq: state?.user?.email } } },
  })

  React.useEffect(() => {
     if (!loading && location.pathname.includes('onboard')) {
        if (Array.isArray(admins) && admins.length) {
           const [admin] = admins
           dispatch({ type: 'SET_USER', payload: admin })
           const { onboardStatus: status = '' } = admin.organization
           if (status) {
              switch (status) {
                 case 'COMPANY':
                    Router.push('/onboard/signup/company')
                    break
                 case 'ABOUT_YOURSELF':
                    Router.push('/onboard/signup/about-yourself')
                    break
                 case 'HOSTING':
                    Router.push('/onboard/signup/hosting')
                    break
                 case 'CARD_DETAILS':
                     Router.push('/onboard/signup/card-details')
                     break
               //   case 'SUPPORT':
               //      Router.push('/onboard/signup/support')
               //      break
               //   case 'IMPORT':
               //      Router.push('/onboard/signup/import')
               //      break
                 case 'SETUP_DOMAIN':
                    Router.push('/onboard/signup/finish-setup')
                    break
                 case 'FINISH_SETUP':
                    Router.push('/onboard/signup/finish-setup')
                    break
                 case 'ONBOARDED':
                    Router.push('/')
                    break
                 default:
                    break
              }
           }
        }
     }
  }, [loading, admins])

  React.useEffect(() => {
     try {
        const token = localStorage.getItem('token')
        if (token) {
           const profile = jwt_decode(token)
           if (profile?.email) {
              dispatch({ type: 'SET_USER', payload: { email: profile.email } })
           }
        }
     } catch (error) {
        console.log(error)
     }
  }, [])

  const logout = React.useCallback(() => {
     localStorage.removeItem('token')
     dispatch({ type: 'LOGOUT' })
     Router.push('/onboard/login')
  }, [])

  React.useEffect(() => {
     switch (location.pathname) {
        case '/onboard/signup': {
           dispatch({ type: 'CHANGE_STEP', payload: 1 })
           break
        }
        case '/onboard/signup/company': {
           dispatch({ type: 'CHANGE_STEP', payload: 2 })
           break
        }
        case '/onboard/signup/about-yourself': {
           dispatch({ type: 'CHANGE_STEP', payload: 3 })
           break
        }
        case '/onboard/signup/hosting': {
           dispatch({ type: 'CHANGE_STEP', payload: 4 })
           break
        }
        case '/onboard/signup/card-details': {
         dispatch({ type: 'CHANGE_STEP', payload: 5 })
         break
      }
      //   case '/onboard/signup/support': {
      //      dispatch({ type: 'CHANGE_STEP', payload: 6 })
      //      break
      //   }
      //   case '/onboard/signup/import': {
      //      dispatch({ type: 'CHANGE_STEP', payload: 7 })
      //      break
      //   }
        case '/onboard/signup/finish-setup': {
           dispatch({ type: 'CHANGE_STEP', payload: 6 })
           break
        }
     }
  }, [location.pathname])

  const login = async ({ email, password }) => {
     try {
        const profile = await utils.login({ email, password })
        if (profile?.email) {
           dispatch({ type: 'SET_USER', payload: { email: profile.email } })
        }
        return profile
     } catch (error) {
        throw error
     }
  }

  if (loading) return <Loader />
  return (
     <AuthContext.Provider
        value={{
           login,
           logout,
           dispatch,
           ...state,
        }}
     >
        {children}
     </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)