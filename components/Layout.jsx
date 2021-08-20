import React from 'react'
import styled, { css } from 'styled-components'
import Navbar from './Navbar';
import { useAuth } from '../store/auth'

export const Layout = ({ children, hideSteps }) => {
   const { user, onboard } = useAuth()
   const evalHeightFirst = step => {
      if (step === 1) {
         return 28
      } else if (step === 2) {
         return 55
      } else if (step >= 3) {
         return 78
      }
   }
   const evalHeightSecond = step => {
      if (step === 4) {
         return 28
      } else if (step === 5) {
         return 55
      } else if (step === 6) {
         return 78
      } 
      
   }

   const isStepActive = start => {
      const steps = [...Array.from(new Array(8 - start).keys(), i => i + start)]
      return steps.includes(onboard.step) ? 'active' : ''
   }

   return (
      <Styles.Wrapper step={onboard.step} hideSteps={hideSteps} className="wrapper">
         <Navbar/>
         <Styles.Aside hideSteps={hideSteps} className="progressBar">
            <Styles.Stage height1={evalHeightFirst(onboard.step)}>
               Basic Information
               <>
                  <Styles.Step className={isStepActive(1)}>
                     Register
                  </Styles.Step>
                  <Styles.Step className={isStepActive(2)}>
                     Tell us about your company
                  </Styles.Step>
                  <Styles.Step className={isStepActive(3)}>
                     Tell us about yourself
                  </Styles.Step>
               </>
            </Styles.Stage>
            <Styles.Stage height2={evalHeightSecond(onboard.step)}>
               Setup your Account
               <>
                  <Styles.Step className={isStepActive(4)}>
                     <span>Pricing</span>
                     <span className="price">
                        {user.organization?.hosting?.cost === 0
                           ? 'Free'
                           : user.organization?.hosting?.cost}
                     </span>
                  </Styles.Step>
                  <Styles.Step className={isStepActive(5)}>
                     <span>Card Details</span>
                  </Styles.Step>
                  <Styles.Step className={isStepActive(6)}>
                     <span>Finish Setup</span>
                  </Styles.Step>
               </>
            </Styles.Stage>
         </Styles.Aside>
         {children}
      </Styles.Wrapper>
   )
}

export default Layout

const Styles = {
   Wrapper: styled.div`
   font-family:nunito;
      height: 100vh;
      display: grid;
      overflow: hidden;
      margin-top: 2rem;
      @media (max-width: 479px) {
         display: inline-block;
         overflow:visible;
         width:360px;
       }
      ${({ hideSteps }) =>
         hideSteps
            ? css`
                 grid-template-columns: 1fr;
                 grid-template-rows: 60px 1fr 16px;
                 grid-template-areas: 'head' 'main';
              `
            : css`
                 grid-template-rows: ${({ step }) =>
                    step === 6 ? '60px 1fr 16px' : '60px 1fr 100px'};
                 grid-template-columns: 320px 1fr;
                 grid-template-areas: ${({ step }) =>
                    step === 6
                       ? `'head head' 'aside main'`
                       : `'head head' 'aside main' 'aside footer'`};
              `}
   `,
   Aside: styled.aside`
      grid-area: aside;
      flex-direction: column;
      padding-top: 56px;
      color: #fff;
      padding-left:52px;
      background-color:#111b2b;
      display: ${({ hideSteps }) => {(hideSteps ? 'none' : 'flex')}};
      @media (max-width: 479px) {
         display: inline-block;
         grid-area: footer;
         padding-left:1.6rem;
         padding-top:7rem;
       } `,
   Stage: styled.ul(
      ({ height1, height2 }) => css`
         font-size: 24px;
         line-height: 16px;
         color: #fff;
         margin-bottom: 48px;
         padding: 0 16px 0 24px;
         position: relative;
         &::before {
            content: '';
            position: absolute;
            top: 16px;
            left: 4px;
            width: 2px;
            z-index: 100;
            background: #FCDE67;;
         }
         &::after {
            content: '';
            position: absolute;
            top: -2px;
            left: -5px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border-color:4px solid #FCDE67;
         }
         &:first-child {
            &::before {
               height: ${height1}%;
            }
            &::after {
               border: ${height1 > 0
                  ? `2px solid #FCDE67`
                  : `2px solid #C3C6CE`};
            }
         }
         &:nth-child(2) {
            &::before {
               height: ${height2}%;
            }
            &::after {
               border: ${height2 > 0
                  ? `2px solid #FCDE67;`
                  : `2px solid #C3C6CE`};
            }
         }
      `
   ),
   Step: styled.li`
      font-size: 14px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      &:first-child {
         margin-top: 24px;
      }
      position: relative;
      &::after {
         content: '';
         position: absolute;
         top: calc(100% - 26px);
         left: -23px;
         width: 8px;
         height: 8px;
         border-radius: 50%;
         background: #e1e1e1;
         z-index: 10;
      }
      &::before {
         content: '';
         position: absolute;
         top: -24px;
         left: -20px;
         width: 2px;
         height: 48px;
         background: #e1e1e1;
      }
      &.active {
         &::after {
            background: #FCDE67;;
         }
      }
      span.price {
         font-weight: 500;
      }
   `,
}
