import React from "react";
import { Pagination } from "semantic-ui-react";
import * as S from "../../contents/search-all-results-content/style";

const PaginationComp = ({ activePage, submit }) => {
  return (
    <>
      <hr />
      <S.PaginationDiv>
        <Pagination
          boundaryRange={0}
          activePage={activePage}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={2}
          totalPages={20}
          onPageChange={submit}
        />
      </S.PaginationDiv>
    </>
  )
};

export default PaginationComp;
