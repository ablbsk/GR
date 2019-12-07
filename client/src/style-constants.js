import styled from "styled-components";

/* ========================= VARIABLES ===================== */

export const headerBackground = '#414141';
export const searchColor = '#C4C4C4';
export const borderColor = searchColor;
export const accentColorButton = '#EC6C10';
export const wordsColorButton = '#FFFFFF';

export const border = `1px solid ${searchColor}`;

export const boxShadowButton = `0px 2px 4px rgba(0,0,0,0.25)`;

/* ======================== LINK STYLE ====================== */

export const linkStyle = {
  textDecoration: "none",
  color: headerBackground
};

export const linkStyleWhite = {
  textDecoration: "none",
  color: wordsColorButton,
  fontSize: "1.1em"
};

export const linkStyleButton = {
  textDecoration: "none",
  color: wordsColorButton,
  fontSize: "1em",
  fontWeight: "600",
  width: "100%",
  height: "100%",
  display: "block"
};

/* =========================== SIZES ======================== */

export const sizes = {
  mobile320: "320px",
  mobile375: "375px",
  mobile414: "414px",
  screen500: "500px",
  screen600: "600px",
  screen880: "880px",
  screen1000: "1000px",
  screen1440: "1440px"
};

/* ========================= COMPONENTS ===================== */

export const PageHeader = styled.h2`
  cursor: default;
  
  color: black;
  
  text-align: center;
  text-decoration-line: underline;
  text-decoration-color: ${accentColorButton};
`;

export const PageContainer = styled.div`
  margin: 3em auto;
  
  @media (min-width: 1000px) {
    width: 970px;
  }
`;

export const PageSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardTitle = styled.h4`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    color: ${accentColorButton};
    transition: all 0.25s ease-out;
  }
  
  @media (max-width: ${sizes.mobile414}) {
    white-space: normal;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`;

export const CardCover = styled.img`
  width: 100px;
  height: 150px;
  margin-bottom: 0.6em;
  
  @media (max-width: ${sizes.mobile414}) {
    width: 95px;
    height: 140px;
  };
  
  @media (max-width: ${sizes.mobile320}) {
    width: 90px;
  };
`;

export const CardAuthor = styled.div`
  margin: 0.35em 0;
  font-size: 0.85em;
`;

export const CardRatingNum = styled.span`
  position: absolute;
  top: 2px;
  padding-left: 0.4em;
`;

export const FormContainer = styled.div`
  width: 400px;
  height: ${props =>
    (props.type === 'login' && '440px') ||
    (props.type === 'signup' && '470px') ||
    (props.type === 'forgot_pass' && '275px') ||
    (props.type === 'reset_pass' && '365px')
  }
  
  padding: 1em 2em;
  position: absolute;
    
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  
  background: ${wordsColorButton};
  box-shadow: ${boxShadowButton};
  
  @media (max-width: ${sizes.screen600}) {
    width: 70%;
  }
`;

export const FormInput = styled.input`
  width: 90%;
  height: 2.5em;
  font-size: 1em;
  padding: 0 0.8em;
`;

export const FormButton = styled.button`
  width: 100%;
   padding: 0.75em;
   margin-top: 2em;
   color: ${wordsColorButton};
   background-color: ${accentColorButton};
   font-size: 1em;
   font-weight: 600;
   border: none;
   cursor: pointer;
`;
