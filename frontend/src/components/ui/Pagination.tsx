import clsx from "clsx";
import { IPagination } from "../../hooks/usePagination";

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
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - 5, 1);
    const endPage = Math.min(currentPage + 5, totalPages);

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };
  const pages = getPageNumbers();

  return (
    <ul className="inline-flex -space-x-px text-sm">
      <li>
        <button
          onClick={prevPage}
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-slate-500 bg-white border border-e-0 border-slate-300 rounded-s-md hover:bg-slate-100"
        >
          Anterior
        </button>
      </li>
      {pages[0] !== 1 && (
        <>
          <li>
            <button
              onClick={() => setPage(1)}
              className={clsx(
                "flex items-center justify-center px-3 h-8 leading-tight border border-slate-300",
                "text-slate-500 bg-white hover:bg-slate-100"
              )}
            >
              1
            </button>
          </li>
          {pages[0] !== 2 && (
            <li>
              <div className="flex items-center justify-center px-3 h-8 leading-tight border border-slate-300 text-slate-500 bg-white">
                ...
              </div>
            </li>
          )}
        </>
      )}
      {pages.map((page) => (
        <li key={page}>
          <button
            onClick={() => setPage(page)}
            className={clsx(
              "flex items-center justify-center px-3 h-8 leading-tight border border-slate-300",
              {
                "bg-zinc-900 text-white hover:bg-zinc-800":
                  page === currentPage,
                "text-slate-500 bg-white hover:bg-slate-100":
                  page !== currentPage,
              }
            )}
          >
            {page}
          </button>
        </li>
      ))}
      {pages[pages.length - 1] !== totalPages && (
        <>
          {pages[pages.length - 1] !== totalPages - 1 && (
            <li>
              <div className="flex items-center justify-center px-3 h-8 leading-tight border border-slate-300 text-slate-500 bg-white">
                ...
              </div>
            </li>
          )}
          <li>
            <button
              onClick={() => setPage(1)}
              className={clsx(
                "flex items-center justify-center px-3 h-8 leading-tight border border-slate-300",
                "text-slate-500 bg-white hover:bg-slate-100"
              )}
            >
              {totalPages}
            </button>
          </li>
        </>
      )}
      <li>
        <button
          onClick={nextPage}
          className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-300 rounded-e-md hover:bg-slate-100"
        >
          Próxima
        </button>
      </li>
    </ul>
  );
}
