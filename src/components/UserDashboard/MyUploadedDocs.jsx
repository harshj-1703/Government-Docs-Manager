import React, { useEffect, useState } from "react";
import userService from "../../services/user.services";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import documentService from "../../services/document.services";
import CircularLoading from "../CircularLoading";

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
          returnDocuments.push({ docData, id });
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
      const user = await userService.getUserFromMobile(mobile);
      const uploadedDocuments =
        await uploadedByUsersDocumentService.getAllUploadeByUserDocumentsFromUserId(
          user.id
        );
      const documents = await getDocuments(uploadedDocuments);
      // for (let x of documents) {
      //   console.log(
      //     x.docData["banner"] +
      //       "=>" +
      //       x.docData["title"] +
      //       "=>" +
      //       x.docData["ministry"] +
      //       "=>" +
      //       x["id"]
      //   );
      // }
      setData(documents);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <div className="document-detail-main-div">
      <div
        className={
          isMenuShow ? "document-detail-div-blur" : "document-detail-div"
        }
      >
        {isLoading && <CircularLoading />}
        {!isLoading && <p>Loaded</p>}
      </div>
    </div>
  );
}

export default MyUploadedDocs;
