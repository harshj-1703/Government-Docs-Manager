import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserDashboard/UserNavbar";
import "../css/userdashboard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CircularLoading from "../components/CircularLoading";

const Skeleton = () => <div className="skeleton-grid"></div>;

function RenderSmoothImage({ src }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="smooth-image-wrapper">
      {!imageLoaded && <Skeleton />}
      <LazyLoadImage
        src={src}
        style={{ opacity: imageLoaded ? 1 : 0 }}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

function UserDashboard() {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const cardsPerPage = 12;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        setGridData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = gridData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(gridData.length / cardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-dashboard">
      <UserNavbar isMenuShow={isMenuShow} setIsMenuShow={setIsMenuShow} />
      <div
        className={
          isMenuShow
            ? "user-dashboard-main-content-blur"
            : "user-dashboard-main-content"
        }
      >
        {isLoading ? (
          <div><CircularLoading/></div>
        ) : (
          <div className="grid-container">
            {currentCards.map((item) => (
              <div key={item.id} className="card">
                <RenderSmoothImage src={item.url} />
                <div className="card__content">
                  <p className="card__title">{item.title}</p>
                  <p className="card__description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {!isLoading && (
        <div className="pagination">
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
