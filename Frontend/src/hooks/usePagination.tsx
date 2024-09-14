import React, { useState } from "react";
import { VacationModel } from "../Models/VacationModel";

function usePagination(vacations: VacationModel[], pageLimit: number) {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(vacations.length / pageLimit);

  const changePage = (pageNumber: React.SetStateAction<number>) => {
    setPageNumber(pageNumber);
  };

  const pageData = () => {
    const start = pageNumber * pageLimit;
    const end = start + pageLimit;
    return vacations.slice(start, end);
  };

  return { pageNumber, pageCount, changePage, pageData };
}

export default usePagination;
