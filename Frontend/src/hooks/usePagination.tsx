import React, { useState } from "react";

function usePagination(items: any[], pageLimit: number) {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(items.length / pageLimit);

  const changePage = (pN: React.SetStateAction<number>) => {
    setPageNumber(pN);
  };

  const pageData = () => {
    const s = pageNumber * pageLimit;
    const e = s + pageLimit;
    return items.slice(s, e);
  };

  return { pageNumber, pageCount, changePage, pageData };
}

export default usePagination;
