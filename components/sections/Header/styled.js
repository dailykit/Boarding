import styled from "styled-components";

export const Styles = {
   Header: styled.header`
    background: #111b2b;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
   Auth: styled.button`
   border-radius: 0.25rem;
   padding-left: 1.75rem;
   padding-right: 1.75rem;
   height: 2rem;


   &.ghost {
      margin-left:2rem;
      background-color: #8ac03b;
      :hover{ --tw-text-opacity: 1;
         color: rgba(255, 255, 255, var(--tw-text-opacity));}
    }
    &.solid {
      --tw-bg-opacity: 1;
      color: rgba(255, 255, 255, var(--tw-text-opacity));
      background-color: #8ac03b;
      :hover{
         --tw-text-opacity: 1
         background-color: rgba(4, 120, 87, var(--tw-bg-opacity));
      }}`,

   Menu: styled.button`
   width: 40px;
   height: 40px;
   display: flex;
   cursor: pointer;
   align-items: center;
   justify-content: center;
   :hover,
   :focus {
    background: #111b2b;
   }
  `,
   Nav: styled.div`
    display: flex;
    border-left: 1px solid #111b2b;
  `,
   Button: styled.button`
    background: transparent;
    height: 2.5rem;
    width: 2.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover,
    :focus {
      background: #111b2b;
    }
    svg {
      display: unset;
    }
  `,
  ghostButton:styled.button`
    font-family: 'Work Sans', sans-serif;
    border: 2px solid #FFFFFF;
    border-radius: 16px;
    padding:0.3rem 2rem 0.3rem 2rem;`,
}
