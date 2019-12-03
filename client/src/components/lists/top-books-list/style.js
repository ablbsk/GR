import styled from "styled-components";
import { sectionWidth, PageHeader } from "../../../style-constants";

export const Container = styled.div`
  margin: 3em auto;
  width: ${sectionWidth};
`;

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const PageH2 = PageHeader;
