import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import UserNavbar from "../components/UserDashboard/UserNavbar";
import "../css/userdashboard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Skeleton = () => <div className="skeleton"></div>;

function UserDashboard() {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.slingacademy.com/v1/sample-data/photos?offset=${
            page * 10
          }&limit=10`
        );
        const data = await response.json();
        setGridData((prevData) => [...prevData, ...data.photos]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

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
        <div className="grid-container">
          {gridData.map((item, index) => (
            <Suspense key={item.id} fallback={<Skeleton />}>
              <div className="card">
                <div ref={index === gridData.length - 1 ? lastItemRef : null}>
                  <LazyLoadImage src={item.url} alt={item.title} />
                  <div className="card__content">
                    <p className="card__title">{item.title}</p>
                    <p className="card__description">{item.description}</p>
                  </div>
                </div>
              </div>
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
