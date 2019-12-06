import styled from "styled-components";

import { accentColorButton, sizes } from "../../../style-constants";

export const Container = styled.div`
    position: absolute;
    font-size: 0.85em;
    padding: 0.25em 0.75em;
    text-align: center;
    z-index: 10;
    top: 3.25em;
    right: 4.25%;
    background-color: #414141;
    box-shadow: 0 0.1em 0.2em rgba(0,0,0,.15);
    
    @media (max-width: ${sizes.screen1440}) {
      right: 3.5%;
    }
    
    @media (max-width: ${sizes.screen880}) {
      right: 3%;
    }
        
    @media (max-width: ${sizes.screen600}) {
      right: 2.5%;
    }
`;

export const Username = styled.div`
  margin: 0.5em 0;
  color: ${accentColorButton};
  font-size: 1.1em;
  cursor: default;
`;

export const Item = styled.div`
  margin: 0.5em 0;
`;

export const Button = styled.button`
    background-color: #414141;
    border: none;
    color: white;
    font-size: 1.1em;
    cursor: pointer;
`;
