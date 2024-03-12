import React, { useEffect, useState } from "react";
import "../../css/pdfmodal.css";
import approvedDocumentsServices from "../../services/approved-document.services";
import ToastMessage from "../ToastMessage";
import CircularLoading from "../CircularLoading";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";

function GeneratePDFWithApprovedDocument() {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { mobile, docId } = useParams();
  const [generatingPDF, setGeneratingPDF] = useState(false);

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

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <div className="pdf-modal-main-div">
          <div className="pdf-modal-download-button">
            <button
              className={"download-btn"}
              disabled={generatingPDF ? true : false}
              onClick={() => {
                if (!loading && !generatingPDF && documentData) {
                  setGeneratingPDF(true);
                  setTimeout(() => {
                    const iframe = document.createElement("iframe");
                    iframe.style.display = "none";
                    document.body.appendChild(iframe);
                    const htmlContent = document.documentElement.outerHTML;
                    const iframeDoc = iframe.contentWindow.document;
                    iframeDoc.write(htmlContent);
                    iframeDoc.close();
                    iframe.onload = () => {
                      setGeneratingPDF(false);
                      iframe.contentWindow.print();
                    };
                  }, 1500);
                } else {
                  ToastMessage({
                    message: "Data is not available to print.",
                    type: "warning",
                  });
                }
              }}
              style={{ backgroundColor: generatingPDF ? "green" : "darkblue" }}
            >
              <i className="material-icons">
                {generatingPDF ? "refresh" : "get_app"}
              </i>
              {generatingPDF ? "Generating..." : "Print as PDF"}
            </button>
          </div>
          <h4>Document Certificate</h4>
          <div className="qr-code-div">
            <div>
              <img
                src={documentData.doc.userProfileImage}
                alt="user-photo"
                className="userprofile-image-pdf"
              />
              <p style={{ fontFamily: "monospace", textAlign: "center" }}>
                User Photo
              </p>
            </div>
            <div>
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
                value={documentData.id}
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
              The {documentData.doc.title} required the following documents for
              verification, and they are attached in this PDF:
              {Object.entries(documentData.doc.fields).map(
                ([fieldName, fileType]) => (
                  <p key={fieldName} className="needed-fields-pdf">
                    <b>{fieldName}:</b> {fileType}
                  </p>
                )
              )}{" "}
            </div>
          </div>
          <div className="signature-of-verified">
            <img src="../../images/Signature.png" alt="Harsh Jolapara" />
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
      )}
    </>
  );
}

export default GeneratePDFWithApprovedDocument;
