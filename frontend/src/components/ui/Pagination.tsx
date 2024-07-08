import { IPagination } from "../../hooks/usePagination";
import { ButtonGroup } from "./ButtonGroup";

export default function Pagination({
  totalPages,
  currentPage,
  setPage,
  prevPage,
  nextPage,
}: IPagination) {
  if (!totalPages) {
    return null;
  }
  const OFFSET = 1;
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - OFFSET, 1);
    const endPage = Math.min(currentPage + OFFSET, totalPages);

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };
  const pages = getPageNumbers();

  return (
    <ButtonGroup.Root>
      <ButtonGroup.Button onClick={prevPage}>Anterior</ButtonGroup.Button>
      {pages[0] !== 1 && (
        <>
          <ButtonGroup.Button className="min-w-12" onClick={() => setPage(1)}>
            1
          </ButtonGroup.Button>

          {pages[0] !== 2 && (
            <ButtonGroup.Button disabled>...</ButtonGroup.Button>
          )}
        </>
      )}
      {pages.map((page) => (
        <ButtonGroup.Button
          key={page}
          className="min-w-12"
          onClick={() => setPage(page)}
          active={page === currentPage}
        >
          {page}
        </ButtonGroup.Button>
      ))}
      {pages[pages.length - 1] !== totalPages && (
        <>
          {pages[pages.length - 1] !== totalPages - 1 && (
            <ButtonGroup.Button disabled>...</ButtonGroup.Button>
          )}
          <ButtonGroup.Button
            className="min-w-12"
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </ButtonGroup.Button>
        </>
      )}
      <ButtonGroup.Button onClick={nextPage}>Próxima</ButtonGroup.Button>
    </ButtonGroup.Root>
  );
}
