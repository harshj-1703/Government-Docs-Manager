import React, { useState, useEffect } from "react";
import "../css/userdashboard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CircularLoading from "../components/CircularLoading";
import documentService from "../services/document.services";
import { Link } from "react-router-dom";

const Skeleton = () => <div className="skeleton-grid"></div>;

function RenderSmoothImage({ src }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="smooth-image-wrapper-grid">
      {!imageLoaded && <Skeleton />}
      <LazyLoadImage
        src={src}
        style={{ opacity: imageLoaded ? 1 : 0 }}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

function UserDashboard({ isMenuShow }) {
  const [gridData, setGridData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const cardsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await documentService.getAllDocuments(
          currentPage,
          cardsPerPage,
          // searchTerm
        );
        setGridData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = gridData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(gridData.length / cardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-dashboard">
      <div
        className={
          isMenuShow
            ? "user-dashboard-main-content-blur"
            : "user-dashboard-main-content"
        }
      >
        {isLoading ? (
          <div>
            <CircularLoading />
          </div>
        ) : (
          <div className="search-and-grid-main-div">
            <div className="search-div">
              <div className="inputs">
                <input
                  type="text"
                  name="search-doc"
                  className="search-doc"
                  placeholder="Search Document"
                  required=" "
                  
                />
              </div>
            </div>
            <div className="grid-container">
              {currentCards.map((item) => (
                <div key={item.id} className="card">
                  <Link to={`/user-dashboard/docdetails/${item.id}`}>
                    <RenderSmoothImage src={item.data.banner} />
                    <div className="card__content">
                      <p className="card__title">{item.data.title}</p>
                      <p className="card__description">
                        {item.data.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Pagination */}
      {!isLoading && (
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
