import React, { useEffect, useState } from "react";
import "../../css/documentpage.css";
import { useLocation, useNavigate } from "react-router-dom";
import documentService from "../../services/document.services";
import CircularLoading from "../CircularLoading";

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
            {console.log(data)}
          </div>
        </div>
      ) : (
        <CircularLoading />
      )}
    </>
  );
}

export default DocumentPage;
