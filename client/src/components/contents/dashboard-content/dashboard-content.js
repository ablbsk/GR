import React from "react";

import * as S from "./style";

const DashboardContent = ({ booksLength, content, filtersBtn, changeFilters }) => {
  return (
    <S.Section>
      <S.PageH2>My books</S.PageH2>
      <S.FilterContainer>
        {booksLength !==0 && filtersBtn.map(btn => (
          <S.Button key={btn.id} onClick={() => changeFilters(btn.id)}>
            {btn.text}
          </S.Button>
        ))}
      </S.FilterContainer>
      {content}
    </S.Section>
  )
};

export default DashboardContent;
