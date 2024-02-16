import React, { useEffect, useState } from "react";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import CircularLoading from "../CircularLoading";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import MyUploadedDocsDataTable from "./MyUploadedDocsDataTable";

function MyUploadedDocs({ isMenuShow }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const mobile = localStorage.getItem("mobile");
      const uploadedDocuments =
        await uploadedByUsersDocumentService.getAllUploadeByUserDocumentsFromUserMobile(
          mobile
        );
      const documents = uploadedDocuments.map((doc, id) => {
        return {
          id: doc.id,
          banner: doc.data.banner,
          title: doc.data.title,
          ministry: doc.data.ministry,
        };
      });
      setData(documents);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="document-detail-main-div">
      <div
        className={
          isMenuShow ? "document-detail-div-blur" : "document-detail-div"
        }
      >
        {isLoading && <CircularLoading />}
        {!isLoading && (
          <LazyLoadComponent>
            <MyUploadedDocsDataTable documents={data} />
          </LazyLoadComponent>
        )}
      </div>
    </div>
  );
}

export default MyUploadedDocs;
