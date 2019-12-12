import styled from "styled-components";

import { headerBackground } from "../../../style-constants";

export const Spinner = styled.svg`
    width: 1.75em;
    height: 1.75em;

    animation: rotate 2s linear infinite;

    stroke: ${headerBackground};
  
    & .path {
      animation: dash 1.5s ease-in-out infinite;
      
      stroke: hsl(210, 70, 75);
      stroke-linecap: round;
    }
    
    @keyframes rotate {
    100% {
      transform: rotate(360deg);
      }
    }
  
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }  
`;
