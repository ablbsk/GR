import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (max-width: 1000px) {
   justify-content: center;
  }
`;
