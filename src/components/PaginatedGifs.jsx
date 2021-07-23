import React, { useCallback, useEffect, useState } from "react";
import GiphyAPI from "../APIClasses/GiphyAPI";
import useParamsSearchPagination from "../hooks/useParamsSearchPagination";
import { debounce } from "../utils/helpers";
import Pagination from "./Pagination";
import GifGallery from "./GifGallery";
import styled from "styled-components";
import Loading from "./Loading";
import { Error, TextInput } from "../styles/styledCommon";

const GifHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.div``;

export const DEFAULT_PAGINATION = { page: 1, pageSize: 10 };

const PaginatedGifs = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotals] = useState(0);
  const [pagination, setPagination] = useParamsSearchPagination(DEFAULT_PAGINATION);
  const { pageSize, page, search = "" } = pagination;

  const getGifs = async (searchValue) => {
    setError(null);
    setLoading(true);
    setTotals(0);
    setData([]);

    if (searchValue) {
      try {
        const { data, pagination } = await GiphyAPI.searchGifs({ q: searchValue, limit: pageSize, offset: (page - 1) * pageSize });

        setTotals(pagination?.total_count || 0);
        setData(data || []);
      } catch (e) {
        setError("There was a problem with your request please try again later.");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getGifs(pagination.search);
  }, [pagination.page, pagination.pageSize]);

  const debouncedSearch = useCallback(debounce(searched => {
    getGifs(searched);
  }, 300), []);

  return (<>
      <GifHeader>
        <SearchInput>
          <label htmlFor="search">Search your gifs here: </label>
          <TextInput
            id="search"
            value={search}
            onChange={({ target }) => {
              setLoading(true);
              setPagination({ search: target.value });
              debouncedSearch(target.value);
            }}
          />
        </SearchInput>

        <Pagination
          page={page}
          onChangePage={page => setPagination({ page })}
          rowsPerPage={pageSize}
          onChangeRowsPerPage={pageSize => setPagination({ pageSize })}
          total={total}
        />
      </GifHeader>

      {
        loading
          ? <Loading />
          : error
          ? <Error>{error}</Error>
          : <GifGallery gifs={data} />
      }

    </>
  );
};

export default PaginatedGifs;
