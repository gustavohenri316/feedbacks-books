import { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "phosphor-react";

export function Pagination({
  itemsPerPage = 10,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Number(totalItems) / itemsPerPage);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  const pageNumbers = Array.from({ length: totalPages }).map(
    (_, index) => index + 1
  );

  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          className={`relative inline-flex items-center  bg-violet-900 text-sm font-semibold px-4 py-2 ring-1 ring-inset ring-gray-300 dark:ring-neutral-900 ${
            pageNumber === currentPage
              ? "z-10   text-neutral-100 bg-violet-900 dark:text-neutral-100 focus-visible:outline focus-visible:outline-2   focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              : "text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100  focus:outline-offset-0"
          }`}
          disabled={pageNumber === currentPage}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ));
    } else {
      let startPage = currentPage - 2;
      let endPage = currentPage + 2;

      if (startPage < 1) {
        startPage = 1;
        endPage = 5;
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - 4;
      }

      return (
        <>
          {startPage > 1 && (
            <>
              <button
                key={1}
                className={`relative inline-flex items-center  bg-violet-900 text-sm font-semibold px-4 py-2 ring-1 ring-inset ring-gray-300 dark:ring-neutral-900 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100  focus:outline-offset-0`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <span className="text-neutral-100  px-4 py-1">...</span>
            </>
          )}

          {pageNumbers
            .slice(startPage - 1, endPage)
            .map((pageNumber, index) => (
              <button
                key={index}
                className={`relative inline-flex items-center  bg-violet-900 text-sm font-semibold px-4 py-2 ring-1 ring-inset ring-gray-300 dark:ring-neutral-900 ${
                  pageNumber === currentPage
                    ? "z-10   text-neutral-100 bg-violet-900 dark:text-neutral-100 focus-visible:outline focus-visible:outline-2   focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    : "text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100  focus:outline-offset-0"
                }`}
                disabled={pageNumber === currentPage}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

          {endPage < totalPages && (
            <>
              <span className="text-neutral-100  px-4 py-1">...</span>
              <button
                key={totalPages}
                className={`relative inline-flex items-center  bg-violet-900 text-sm font-semibold px-4 py-2 ring-1 ring-inset ring-gray-300 dark:ring-neutral-900 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100  focus:outline-offset-0`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className="flex items-center justify-between  bg-transparent  py-3">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-violet-900"
            aria-label="Pagination"
          >
            <button
              className={`relative inline-flex items-center rounded-l-md bg-violet-900 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-neutral-900 d ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <span className="sr-only">Previous</span>
              <CaretLeft />
            </button>
            {renderPageNumbers()}
            <button
              className={`relative inline-flex items-center rounded-r-md bg-violet-900 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-neutral-900 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <span className="sr-only">Next</span>
              <CaretRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
