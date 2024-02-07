import React, { useState, useEffect } from "react";
import "../css/userdashboard.css";
import CircularLoading from "../components/CircularLoading";
import documentService from "../services/document.services";
import { Link } from "react-router-dom";
import RenderSmoothImage from "../components/DocumentsComponents/RenderSmoothImage";

const Skeleton = () => <div className="skeleton-grid"></div>;

function UserDashboard({ isMenuShow }) {
  const [gridData, setGridData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const cardsPerPage = 12;
  const [searchQuery, setSearchQuery] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await documentService.getAllUploadeByUserDocuments(
          currentPage,
          cardsPerPage,
          searchQuery
        );

        if (data.length === 0) {
          setNoDataFound(true);
        } else {
          setNoDataFound(false);
        }

        setGridData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    let timeForSearch;

    if (currentPage !== 1 || searchQuery !== "") {
      timeForSearch = setTimeout(() => {
        fetchData();
      }, 300);
    } else {
      fetchData();
    }

    return () => {
      clearTimeout(timeForSearch);
    };
  }, [currentPage, searchQuery]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = gridData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(gridData.length / cardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="user-dashboard">
      <div
        className={
          isMenuShow
            ? "user-dashboard-main-content-blur"
            : "user-dashboard-main-content"
        }
      >
        <div className="search-and-grid-main-div">
          <div className="search-div">
            <div className="inputs">
              <input
                type="text"
                name="search-doc"
                className="search-doc"
                placeholder="Search Document"
                required=" "
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="grid-container">
            {!isLoading ? (
              currentCards.length > 0 ? (
                currentCards.map((item) => (
                  <div key={item.id} className="card">
                    <Link to={`/user-dashboard/docdetails/`} state={item.id}>
                      <RenderSmoothImage
                        src={item.data.banner}
                        Skeleton={Skeleton}
                      />
                      <div className="card__content">
                        <p className="card__title">{item.data.title}</p>
                        <p className="card__description">
                          {item.data.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div id="error-page-div">
                  <h1>No Data Found</h1>
                </div>
              )
            ) : (
              <CircularLoading />
            )}
          </div>
        </div>
      </div>
      {/* Pagination */}
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
    </div>
  );
}

export default UserDashboard;
