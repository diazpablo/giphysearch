import { useEffect, useState } from "react";

const useParamsSearchPagination = (defaultParams) => {
  const url = new URL(window.location);
  const { searchParams } = url;

  const [pagination, _setPagination] = useState({
    page: parseInt(searchParams.get("page")) || defaultParams.page,
    pageSize: parseInt(searchParams.get("pageSize")) || defaultParams.pageSize,
    search: searchParams.get("search") || defaultParams.search
  });

  const setPagination = ({
    page = pagination.page,
    pageSize = pagination.pageSize,
    search = pagination.search
  }) => {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    if (search) {
      url.searchParams.set("search", search);
    } else {
      url.searchParams.delete("search");
    }
    window.history.pushState({}, "", url);
    _setPagination({ page: parseInt(page), pageSize: parseInt(pageSize), search });
  };

  useEffect(() => {
    setPagination(pagination);
  }, []);

  return [pagination, setPagination];
};

export default useParamsSearchPagination;
