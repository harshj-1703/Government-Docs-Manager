import React from "react";

function Pagination({
  isLoading,
  currentCards,
  isMenuShow,
  currentPage,
  setCurrentPage,
  totalPages
}) {
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      {!isLoading && currentCards.length > 0 && (
        <div className={!isMenuShow ? "pagination" : "pagination-blur"}>
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>
            {"<<"}
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {[currentPage, currentPage + 1]
            .filter((page) => page <= totalPages)
            .map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      )}
    </>
  );
}

export default Pagination;
