import React, { useEffect, useState } from "react";
import "../../css/documentpage.css";
import { useLocation, useNavigate } from "react-router-dom";
import documentService from "../../services/document.services";
import CircularLoading from "../CircularLoading";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Skeleton = () => <div className="skeleton"></div>;

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

function DocumentPage({ isMenuShow }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const id = location.state;
    if (!id) {
      navigate("../");
    } else {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await documentService.getDocumentFromId(id);
          setData(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="document-detail-main-div">
          <div
            className={
              isMenuShow ? "document-detail-div-blur" : "document-detail-div"
            }
          >
            <div className="document-page-banner-image">
              <RenderSmoothImage src={data.banner} />
            </div>
            <div className="document-page-title">{data.title}</div>
            <div className="document-page-ministry">{data.ministry}</div>
            <hr className="line" />
            <div className="document-page-description">{data.description}</div>
            <div className="document-page-state">
              <div id="orange">Applicable&nbsp;</div>
              <div id="white">in&nbsp;</div>
              <div id="green">
                {data.state == "india" ? "Whole India" : data.state}
              </div>
            </div>
            <hr className="line" />
            <div className="document-page-example-image">
              <RenderSmoothImage src={data.photoExample} />
            </div>
          </div>
        </div>
      ) : (
        <CircularLoading />
      )}
    </>
  );
}

export default DocumentPage;
