import { useState } from "react";

export interface IPagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  skip: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

interface Props {
  initialPage?: number;
  totalRecords: number;
  pageSize: number;
}

export const usePagination = ({
  initialPage = 1,
  totalRecords,
  pageSize,
}: Props): IPagination => {
  const totalPages = Math.ceil(totalRecords / pageSize);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const setPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const skip = Math.max(0, (currentPage - 1) * pageSize);

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    pageSize,
    totalRecords,
    skip,
  };
};
