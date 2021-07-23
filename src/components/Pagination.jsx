import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Select } from "../styles/styledCommon";

const rowsPerPageOptions = [5, 10, 25, 50];
const MAX_TOTAL_ALLOWED = 4999;

const PaginationWrapper = styled.div`
  display: flex;
  justifyContent: flex-end;
  align-items: center;
  margin: .5rem 0 .5rem auto;
`;

const Wrapper = styled.div`
  margin: 0 .5rem;
`;

const Page = styled.span`
  margin: 0 .5rem;
`;

const Pagination = (props) => {
  const {
    page, onChangePage,
    rowsPerPage, onChangeRowsPerPage, total
  } = props;

  if (!total) return null;

  const pagesCounted = Math.ceil(total / rowsPerPage);
  const maxPageAllowed = Math.ceil(MAX_TOTAL_ALLOWED / rowsPerPage);
  const totalPages = Math.max(1, Math.min(pagesCounted, maxPageAllowed));
  const firstPaginatedItem = Math.min((page - 1) * rowsPerPage + 1, total);
  const lastPaginatedItem = Math.min((page) * rowsPerPage, total);

  useEffect(() => {
    if (!rowsPerPageOptions.includes(rowsPerPage)) {
      onChangeRowsPerPage(rowsPerPageOptions[0]);
    }
  }, [page, total, rowsPerPage]);

  useEffect(() => {
    if (page > totalPages) {
      onChangePage(totalPages);
    }
  }, [page, total, rowsPerPage]);

  const hanglePageChange = page => {
    if (page > 0 && page <= totalPages) {
      onChangePage(page);
    }
  };

  return (
    <PaginationWrapper>
      <Wrapper>
        <Button
          title={"First"}
          disabled={page === 1}
          onClick={() => hanglePageChange(1)}
        >
          &lt;&lt;
        </Button>
        <Button
          data-test-id={"prev-page"}
          title={"Prev"}
          disabled={page === 1}
          onClick={() => hanglePageChange(page - 1)}
        >
          &lt;
        </Button>

        <Page data-test-id="page">{page}/{totalPages}</Page>

        <Button
          data-test-id={"next-page"}
          title={"Next"}
          disabled={totalPages <= page}
          onClick={() => hanglePageChange(page + 1)}
        >
          &gt;
        </Button>
        <Button
          title={"Last"}
          disabled={totalPages <= page}
          onClick={() => hanglePageChange(totalPages)}
        >
          &gt;&gt;
        </Button>
      </Wrapper>

      <Select
        value={rowsPerPage}
        onChange={({ target }) => onChangeRowsPerPage(target.value)}
      >
        {rowsPerPageOptions.map(option => <option key={option}>{option}</option>)}
      </Select>

      <Wrapper>
        {firstPaginatedItem} - {lastPaginatedItem} of {total}
      </Wrapper>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  total: PropTypes.number
};

export default Pagination;
