import React, { useEffect, useState } from "react";
import userService from "../../services/user.services";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import documentService from "../../services/document.services";
import CircularLoading from "../CircularLoading";
import MyUploadedDocsDataTable from "./MyUploadedDocsDataTable";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function MyUploadedDocs({ isMenuShow }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDocuments = async (documents) => {
    try {
      const returnDocuments = [];
      for (const document of documents) {
        const docData = await documentService.getDocumentFromId(
          document.data.docId
        );
        const id = document.id;
        if (docData) {
          returnDocuments.push({ ...docData, id });
        }
      }
      return returnDocuments;
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const mobile = localStorage.getItem("mobile");
      const uploadedDocuments =
        await uploadedByUsersDocumentService.getAllUploadeByUserDocumentsFromUserId(
          mobile
        );
      const documents = await getDocuments(uploadedDocuments);
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
          <div>
            <LazyLoadComponent>
              <MyUploadedDocsDataTable documents={data} />
            </LazyLoadComponent>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyUploadedDocs;
