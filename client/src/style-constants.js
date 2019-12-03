import styled from "styled-components";

export const headerBackground = '#414141';
export const searchColor = '#C4C4C4';
export const borderColor = searchColor;
export const accentColorButton = '#EC6C10';
export const darkColorButton = '#414141';
export const wordsColorButton = '#FFFFFF';

export const border = `1px solid ${searchColor}`;

export const sectionWidth = "1024px";

export const boxShadowButton = `0px 2px 4px rgba(0,0,0,0.25)`;

/* =========================== SIZES ======================== */
export const size = {
  mobileS: `(min-width: 320px)`,
  mobileM: `(min-width: 375px)`,
  mobileL: `(max-width: 425px)`,
  tablet: `(min-width: 768px)`,
  laptop: `(min-width: 1024px)`,
  laptopL: `(min-width: 1440px)`,
  desktop: `(min-width: 2560px)`
};

export const PageHeader = styled.h2`
  cursor: default;
  
  color: black;
  
  text-decoration-line: underline;
  text-decoration-color: ${accentColorButton};
`;
