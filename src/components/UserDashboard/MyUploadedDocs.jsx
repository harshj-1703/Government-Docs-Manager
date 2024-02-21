import React, { useEffect, useState } from "react";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import CircularLoading from "../CircularLoading";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import MyUploadedDocsDataTable from "./MyUploadedDocsDataTable";
import "../../css/myuploadeddocs.css";
import "../../css/documentpage.css";

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
      // const documents = [
      //   {
      //     banner:
      //       "https://www.gstsuvidhacenters.com/WebsiteAssets/images/AyushmanBharat/Banner1.jpg",
      //     id: "1",
      //     ministry: "Ministry Health and Family Welfare",
      //     title: "AAYUSHMAN BHARAT YOJNAaaaaaa http://127.0.0.1:5173/",
      //   },
      //   {
      //     banner:
      //       "https://www.gstsuvidhacenters.com/WebsiteAssets/images/AyushmanBharat/Banner1.jpg",
      //     id: "12345678",
      //     ministry: "Ministry o Health and Family Welfare",
      //     title: "AAYUSHMAN BHARAT YOJNA",
      //   },
      //   {
      //     banner:
      //       "https://www.gstsuvidhacenters.com/WebsiteAssets/images/AyushmanBharat/Banner1.jpg",
      //     id: "1234567",
      //     ministry:
      //       "Ministry of and Family Welfarssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssse",
      //     title: "AAYUSHMAN BHARAT YOJNA",
      //   },
      //   {
      //     banner:
      //       "https://www.gstsuvidhacenters.com/WebsiteAssets/images/AyushmanBharat/Banner1.jpg",
      //     id: "123456",
      //     ministry: "Ministry of Health Family Welfare",
      //     title: "AAYUSHMAN BHARAT YOJNA",
      //   },
      //   {
      //     banner:
      //       "https://www.gstsuvidhacenters.com/WebsiteAssets/images/AyushmanBharat/Banner1.jpg",
      //     id: "12345",
      //     ministry: "Ministry of Health and Welfare",
      //     title: "AAYUSHMAN BHARAT YOJNA",
      //   },
      //   {
      //     banner:
      //       "https://www.gstsuvidhacenters.com/WebsiteAssets/images/AyushmanBharat/Banner1.jpg",
      //     id: "1234",
      //     ministry: "Ministry of Health and Family",
      //     title: "AAYUSHMAN BHARAT YOJNA",
      //   },
      // ];
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
        {!isLoading && (
          <div className="myuploads-user-datatable-main">
            {data.length !== 0 ? (
              <LazyLoadComponent>
                <h1>My Uploaded Documents</h1>
                <MyUploadedDocsDataTable documents={data} />
              </LazyLoadComponent>
            ) : (
              <h1>No Uploaded Documents</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyUploadedDocs;
