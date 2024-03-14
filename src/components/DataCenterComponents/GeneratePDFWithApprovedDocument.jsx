import React, { useEffect, useState } from "react";
import "../../css/pdfmodal.css";
import approvedDocumentsServices from "../../services/approved-document.services";
import ToastMessage from "../ToastMessage";
import CircularLoading from "../CircularLoading";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function GeneratePDFWithApprovedDocument() {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { mobile, docId } = useParams();
  const [isImageDownloading, setIsImageDownloading] = useState(false);

  const fetchData = async () => {
    try {
      const documentData =
        await approvedDocumentsServices.getapprovedDocumentsFromDocIdAndUserMobile(
          docId,
          mobile
        );
      // console.log(documentData);
      setDocumentData(documentData);
      setLoading(false);
    } catch (e) {
      ToastMessage({
        message: "Document is Not Verified/Not Found!",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownloadImage = async () => {
    setIsImageDownloading(true);
    const element = document.getElementById("download-photo"),
      scale = 5,
      canvas = await html2canvas(element, { scale }),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = `${documentData.doc.userFullName}-${documentData.doc.title}-approved-certificate.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsImageDownloading(false);
  };

  const handleDownloadPDF = async () => {
    setIsImageDownloading(true);
    const element = document.getElementById("download-photo"),
      scale = 3;
    const canvas = await html2canvas(element, { scale });
    const imageData = canvas.toDataURL("image/jpeg");
    const aspectRatio = canvas.height / canvas.width;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [210, 297],
    });

    pdf.addImage(imageData, "JPEG", 0, 0, 210, 210 * aspectRatio);
    pdf.save(
      `${documentData.doc.userFullName}-${documentData.doc.title}-approved-certificate.pdf`
    );

    setIsImageDownloading(false);
  };

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : documentData ? (
        <div className="pdf-modal-main-div">
          <div className="pdf-modal-download-button">
            <button
              className={"download-btn"}
              onClick={() => {
                const pdf = window.confirm(
                  "Press Ok for PDF or Cancle for Image Download"
                );
                if (pdf) {
                  handleDownloadPDF();
                } else {
                  handleDownloadImage();
                }
              }}
              disabled={isImageDownloading}
              style={{
                backgroundColor: isImageDownloading ? "green" : "darkblue",
              }}
            >
              <i
                className={`material-icons ${isImageDownloading ? "spin" : ""}`}
              >
                {isImageDownloading ? "refresh" : "get_app"}
              </i>
              Download Certificate
            </button>
          </div>
          <div id="download-photo">
            <h4>Document Approved Certificate</h4>
            <div className="qr-code-div">
              <div className="user-photo-print">
                <img
                  src={documentData.doc.userProfileImage}
                  alt="user-photo"
                  className="userprofile-image-pdf"
                />
                {/* <p style={{ fontFamily: "monospace", textAlign: "center" }}>
                  User Photo
                </p> */}
              </div>
              <div className="user-photo-print">
                <img
                  src={documentData.doc.banner}
                  alt="banner-photo"
                  className="banner-image-pdf"
                />
              </div>
              <div>
                <QRCode
                  className="qr-code"
                  style={{ height: "150px", width: "150px" }}
                  value={`${process.env.HOST_LINK}/generatepdf-approved-document/${mobile}/${docId}`}
                />
                <p style={{ fontFamily: "monospace", textAlign: "center" }}>
                  Scan QR & verify
                </p>
              </div>
            </div>
            <div>
              <div className="main-certificate-text">
                This certificate certifies that{" "}
                <b>
                  Mr./Mrs./Ms. {documentData.doc.userFullName} (Mobile No.:{" "}
                  {documentData.doc.userMobile})
                </b>{" "}
                has affirmed that their documents for{" "}
                <b>{documentData.doc.title}</b> from the{" "}
                <b>{documentData.doc.ministry}</b> ministry have been approved.
              </div>
              <div className="main-certificate-text">
                The request for the document was created on{" "}
                <b>{documentData.doc.createdAt.slice(0, -9)}</b>.
              </div>
              <div className="main-certificate-text">
                The {documentData.doc.title} required the following documents
                for verification, and they are given as :&nbsp;
                {Object.entries(documentData.doc.fields).map(
                  ([fieldName, fileType], index, array) => (
                    <span key={fieldName}>
                      <b>{fieldName}</b>
                      {index !== array.length - 1 ? ", " : ""}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="signature-of-verified">
              <img src="../../images/Signature.png" alt="Harsh Jolapara" />
            </div>
          </div>
          {/* <hr /> */}
          <div className="attached-files-pdf">
            <h4>Attached Files</h4>
            {Object.entries(documentData.doc.fields).map(
              ([fieldName, fileType]) => (
                <div key={fieldName} className="field-name-file">
                  <h5 className="fieldname-main-pdf">{fieldName}</h5>
                  {fileType === "image" ? (
                    <img
                      src={documentData.doc[fieldName]}
                      alt={fieldName}
                      style={{ maxWidth: "100%" }}
                    />
                  ) : fileType === "file" ? (
                    <embed
                      src={documentData.doc[fieldName]}
                      type="application/pdf"
                      width="100%"
                      height="500px"
                    />
                  ) : (
                    <p>{documentData.doc[fieldName]}</p>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            id="error-page-div"
            style={{ backgroundColor: "darkblue", textAlign: "center" }}
          >
            <h1 style={{ color: "white", letterSpacing: "4px" }}>
              Not Verified
            </h1>
          </div>
        </>
      )}
    </>
  );
}

export default GeneratePDFWithApprovedDocument;
