import React, { useEffect, useState } from "react";
import "../../css/pdfmodal.css";
import approvedDocumentsServices from "../../services/approved-document.services";
import ToastMessage from "../ToastMessage";
import CircularLoading from "../CircularLoading";
import QRCode from "react-qr-code";

function GeneratePDFWithApprovedDocument({ targetRef, mobile, docId }) {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);

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
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <div ref={targetRef} className="pdf-modal-main-div">
          <div className="qr-code">
            <QRCode
              size={128}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={documentData.id}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default GeneratePDFWithApprovedDocument;
