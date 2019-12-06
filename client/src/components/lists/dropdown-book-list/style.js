import styled from "styled-components";

import { border, headerBackground, sizes } from "../../../style-constants";

export const Container = styled.div`
  position: absolute;
  z-index: 10;
  top: 2.5em;

  width: 336px;

  background-color: white;
  box-shadow: 0 0.1em 0.2em rgba(0,0,0,.15);
    
  @media (max-width: ${sizes.screen600}) {
    width: 296px;
  }
`;

export const AllResults = styled.div`
    font-size: 0.9em;
    font-weight: bold;
    
    padding: 0.5em;

    text-align: center;

    border: ${border};
    border-top: none;
    
    color: ${headerBackground};
`;
