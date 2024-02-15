import React, { useEffect, useState } from "react";
import "../../css/documentpage.css";
import { useLocation, useNavigate } from "react-router-dom";
import documentService from "../../services/document.services";
import CircularLoading from "../CircularLoading";
import RenderSmoothImage from "./RenderSmoothImage";
import DocumentFields from "./DocumentFields";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import userService from "../../services/user.services";

const Skeleton = () => <div className="skeleton"></div>;

function DocumentPage({ isMenuShow }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showFields, setShowFields] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const getDocumentSubmittedOrNot = async (docId) => {
    const mobile = localStorage.getItem("mobile");
    const user = await userService.getUserFromMobile(mobile);
    const available =
      await uploadedByUsersDocumentService.getDocumentFromIdAndUserId(
        docId,
        user.id
      );
    if (available) {
      setShowFields(false);
    }
  };

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
      getDocumentSubmittedOrNot(id);
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
              <RenderSmoothImage src={data.banner} Skeleton={Skeleton} />
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
              <RenderSmoothImage src={data.photoExample} Skeleton={Skeleton} />
            </div>
            <hr className="line" />
            <div className="field-component">
              {showFields ? (
                <DocumentFields
                  fields={data.fields}
                  docId={location.state}
                  verificationType={data.verification}
                />
              ) : (
                <h2 className="applied-or-not">
                  You Have Already Applied For This Document
                </h2>
              )}
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
