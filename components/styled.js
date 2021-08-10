import styled, { css } from 'styled-components'

export const Button = styled.button`
background: #fff;
border-style: none;
padding: 2px 10px 10px 5px;
height: 2.5rem;
position: absolute;
width: 36px;
height: 36px;
left: 1460px;
top: 330px;

border: 3px solid #111B2B;
box-sizing: border-box;
border-radius: 14px;
   &:disabled {
      cursor: not-allowed;
      border: 3px solid #CEDEF3;
      color: #CEDEF3;
   }
`

export const GhostButton = styled.button`
color: #8ac03b;
font-family: "Nunito", sans-serif;
text-transform: uppercase; 
font-weight: bolder; 
font-size: 0.875rem;
line-height: 1.25rem;
border:2px solid #8ac03b;
padding-left: 1rem;
padding-right: 1rem;
margin-right:2rem;
height: 2.5rem;
border-radius: 9999px;

   &:disabled {
      cursor: not-allowed;
      --tw-bg-opacity: 1;
background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
--tw-text-opacity: 1;
color: rgba(107, 114, 128, var(--tw-text-opacity));
   }
`

export const Footer = styled.footer`
   padding: 0 16px;
   font-family: "Nunito", sans-serif;
   grid-area: footer;
   display:flex;
   justify-content: flex-end;
`

export const Main = styled.main`
   grid-area: main;
   font-family: "Nunito", sans-serif;
   overflow: auto;
   background: #ffffff;
   margin: 13px 0px 0 16px;
   height:90vh;
`

export const H2 = styled.h2`
   text-align:center;
   font-size: 20px;
   font-weight: 800;
   font-family: "Nunito", sans-serif;
   color: #555b6e;
   margin-bottom: 24px;
`

export const H4 = styled.h4`
text-align:center;
   font-size: 16px;
   font-family: "Nunito", sans-serif;
   font-weight: 400;
   color: #555b6e;
   margin-top: 24px;
   margin-bottom: 14px;
`

export const Form = styled.form`
font-family: "Nunito", sans-serif;
   width: 320px;
   #terms__label {
      color: #555b6e;
      margin-left: 0.5rem;
      font-family: "Nunito", sans-serif;
      font-size: 0.875rem;
      line-height: 1.25rem;
      a {
         text-decoration: none;
         color: #555b6e;
         font-weight: 500;
         &:hover {
            color: #6e7382;
         }
      }
   }
`

export const Field = styled.div`
margin-top: 1.5rem;
font-family: "Nunito", sans-serif;
   input {
      font-size: 16px;
      color: #686d7b;
   }
   label {
      margin-bottom: 4px;
      font-size:20px;
   }
   input,
   select {
      width: 420px;
      height: 40px;
      border: none;
      border-radius: 0px;
      border-bottom: 2px solid #111B2B;
      &:focus {
         outline: transparent;
         border-bottom: 2px solid #111B2B;
      }
      &:focus,
      &:valid {
         border-bottom: 2px solid #111B2B;
         & + label {
            color: #8ac03b;
            font-size: 12px;
         }
      }
   }
`

export const Label = styled.label`
--tw-text-opacity: 1;
color: #111B2B;
margin-top: 0.5rem;
margin-bottom:0.5rem;
font-family: "Nunito", sans-serif;
font-weight: bold;
`

export const CheckBoxWrapper = styled.div`
   text-align:center;
   margin-top: 32px;
   font-family: "Nunito", sans-serif;
   label {
      font-size: 16px;
      color: #888d9d;
      margin-left: 8px;
   }
`

export const Info = styled.div`
text-align:center;
align-self:center;
font-family: "Nunito", sans-serif;
   display: flex;
   justify-content:center;
   border-top: 1px solid rgba(0, 0, 0, 0.1);
   margin-top: 32px;
   padding-top: 32px;
   ul {
      padding-left: 32px;
      margin-top: 24px;
      li {
         list-style:'✔';
         font-size: 14px;
         color: #555b6e;
         line-height: 24px;
      }
   }
`

export const Tip = styled.div`
font-family: "Nunito", sans-serif;
   display: flex;
   span {
      margin-right: 16px;
   }
   p {
      font-size: 14px;
      color: #555b6e;
      opacity: 0.7;
      font-style: italic;
   }
`

export const Card = styled.div`
font-family: "Nunito", sans-serif;
margin-left:4rem;
   width: 260px;
   height: 180px;
   display: flex;
   padding: 16px;
   border-radius: 4px;
   text-align: center;
   flex-direction: column;
   border: 1px solid rgba(0, 0, 0, 0.1);
   h4 {
      font-size: 14px;
      margin: 0;
      font-weight: 400;
      color: #888d9d;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
   }
   #strike {
      font-size: 12px;
      text-decoration-line: line-through;
      color: #888d9d;
      margin-top: 16px;
   }
   #discount {
      font-size: 12px;
      font-feature-settings: 'cpsp' on;
      color: #ff8484;
      margin: 8px 0 24px 0;
   }
   #price {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #555b6e;
   }
   @media (max-width: 479px) {
      display: none;
    }
`
export const Input = styled.input`
font-family: "Nunito", sans-serif;
width: 170%;
display: block;
border-width: 1px;
height: 2.5rem;
border-color: #111b2b;
border-radius: 0.25rem;
padding-left: 0.5rem;
padding-right: 0.5rem;
margin-bottom:0.5rem;
outline: 2px solid transparent;
outline-offset: 2px;
&:focus {
  border-width: 2px;
  border-color: #111b2b;
}
`;
