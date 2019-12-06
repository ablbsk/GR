import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  
  @media (min-width: 1000px) {
    width: 970px;
  }
  
  @media (max-width: 1000px) {
    justify-content: center;
  }
`;
