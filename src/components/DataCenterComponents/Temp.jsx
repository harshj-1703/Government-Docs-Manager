import React, { useEffect, useState } from "react";
import "../../css/pdfmodal.css";
import approvedDocumentsServices from "../../services/approved-document.services";
import ToastMessage from "../ToastMessage";
import CircularLoading from "../CircularLoading";
import QRCode from "react-qr-code";

function Temp({ mobile = "9727023832", docId = "gqmh8nLPH7YBWNz4Pzy9" }) {
  const [documentData, setDocumentData] = useState({
    doc: {
      "Address proof":
        "https://firebasestorage.googleapis.com/v0/b/government-docs-fb805.appspot.com/o/UserUploadedDocs%2F1.pdf71d3ca89-bc2b-4707-a7ad-78a4e2215b7c?alt=media&token=525187c9-ec2b-4094-8b17-ac447adacbd2",
      "Certificate saying that your family qualifies for below-the-poverty line":
        "https://firebasestorage.googleapis.com/v0/b/government-docs-fb805.appspot.com/o/UserUploadedDocs%2F1.pdfba5e0fbd-4574-4d67-8f92-e6aaaa2e63db?alt=media&token=4a5d1bcd-801f-4c63-9c65-056cedf50b06",
      "Identification proof":
        "https://firebasestorage.googleapis.com/v0/b/government-docs-fb805.appspot.com/o/UserUploadedDocs%2F1.pdfea3cd3eb-316f-4b6d-83c0-34e4db67ab30?alt=media&token=34c97b11-e853-42f1-bc3f-4ee639cc4503",
      "Proof of income":
        "https://firebasestorage.googleapis.com/v0/b/government-docs-fb805.appspot.com/o/UserUploadedDocs%2F1.pdf52f17993-6746-4536-a453-490fc44fa6b4?alt=media&token=bae5f0e6-2f2d-4388-be4a-532b3122e18d",
      approveStatus: "Approved",
      banner:
        "https://images.ctfassets.net/uwf0n1j71a7j/3jEMklpRCV88Lw9SU2B5lO/77578c8e66f0eae27e6e9baa90413f8d/mukhyamantri-amrutum-yojana.png",
      checkedByDCMNumber: ["8128203856", "1234567890", "9664649910"],
      createdAt: "March 9, 2024 at 6:37:45 PM GMT+5:30",
      docId: "gqmh8nLPH7YBWNz4Pzy9",
      fields: {
        "Proof of income": "file",
        "Address proof": "file",
        "Certificate saying that your family qualifies for below-the-poverty line":
          "file",
        "Identification proof": "file",
      },
      ministry: "National Health Ministry",
      numbersDataCenterChecked: 3,
      randomDataCenterId: 0,
      status: 1,
      title: "MAA CARD YOJNA",
      updatedAt: "March 9, 2024 at 6:37:45 PM GMT+5:30",
      uploadedDocId: "A4GCah3dqd9fhoDTIyWZ",
      userFullName: "Dev",
      userMobile: "9727023832",
      userProfileImage:
        "https://firebasestorage.googleapis.com/v0/b/government-docs-fb805.appspot.com/o/ProfilePhotos%2F1000080044.jpg6369954c-ba74-4bce-8044-ce2e8e1fbda6?alt=media&token=59b75694-4c9f-483a-9fb2-db9133ced97a",
      verifyRatio: 100,
    },
    id: "sBQ4STwjY1ZLZ0IEaIpJ",
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const documentData =
        await approvedDocumentsServices.getapprovedDocumentsFromDocIdAndUserMobile(
          docId,
          mobile
        );
      console.log(documentData);
      setDocumentData(documentData);
    } catch (e) {
      ToastMessage({
        message: "Error PDF Generating",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <div className="pdf-modal-main-div">
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
              The document required the following documents for verification,
              and they are attached in this PDF:
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
            <img src="./images/Signature.png" alt="Harsh Jolapara" />
          </div>
          <hr />
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

export default Temp;
