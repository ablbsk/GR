import styled from "styled-components";
import { sectionWidth } from "../../../style-constants";

export const Container = styled.div`
  margin: 3em auto;
  width: ${sectionWidth};
`;

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
