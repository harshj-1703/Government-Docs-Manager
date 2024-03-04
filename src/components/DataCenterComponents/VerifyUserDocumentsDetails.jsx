import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import CircularLoading from "../CircularLoading";
import "../../css/verifyuserdocumentsdetails.css";
import dataCenterServices from "../../services/data-center.services";
import approvedDocumentsServices from "../../services/approved-document.services";
import rejectedDocumentsServices from "../../services/rejected-document.services";
import remarksDocumentsServices from "../../services/remarks.services";
import ToastMessage from "../ToastMessage";

function VerifyUserDocumentsDetails() {
  const location = useLocation();
  const uploadedDocId = location.state;
  const [documentData, setDocumentData] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [remarksError, setRemarksError] = useState("");
  const [loading, setLoading] = useState(false);

  const timestampOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
    timeZone: "Asia/Kolkata",
  };

  const fetchData = async () => {
    const uploadedDocumentData =
      await uploadedByUsersDocumentService.getDocumentFromId(uploadedDocId);
    setDocumentData(uploadedDocumentData);
    // console.log(uploadedDocumentData);
  };

  const validateRemarks = (remark) => {
    if (remark.trim() === "" || remark === null) {
      setRemarksError("Remarks Must Be Required!");
      return false;
    } else {
      setRemarksError("");
      return true;
    }
  };

  const getTotalDataCenters = async () => {
    const totalDataCenters = await dataCenterServices.getTotalDataCenters();
    return totalDataCenters;
  };

  const approveDocument = async () => {
    if (validateRemarks(remarks)) {
      const confirm = window.confirm("Are you sure want to approve document?");
      if (confirm) {
        if (documentData.randomDataCenterId !== 0) {
          setLoading(true);
          try {
            const newDocumentUpdateObject = {
              verifyRatio: 100,
              numbersDataCenterChecked: 1,
              approveStatus: "Approved",
            };
            await uploadedByUsersDocumentService.updateUploadedByUsersDocument(
              uploadedDocId,
              newDocumentUpdateObject
            );
            const approvedDocumentObject = documentData;

            approvedDocumentObject.createdAt = new Date().toLocaleString(
              "en-US",
              timestampOptions
            );
            approvedDocumentObject.updatedAt = new Date().toLocaleString(
              "en-US",
              timestampOptions
            );
            approvedDocumentObject.verifyRatio = 100;
            approvedDocumentObject.approveStatus = "Approved";

            await approvedDocumentsServices.addapprovedDocuments(
              approvedDocumentObject
            );

            await remarksDocumentsServices.addremarksDocuments({
              remarks,
              status: "Approved",
              documentId: uploadedDocId,
              createdAt: new Date().toLocaleString("en-US", timestampOptions),
              updatedAt: new Date().toLocaleString("en-US", timestampOptions),
            });

            ToastMessage({
              message: "Document Approved Successfully!",
              type: "success",
            });
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(true);
          const totalDataCenters = await getTotalDataCenters();
          const ratio =
            ((documentData.numbersDataCenterChecked + 1) / totalDataCenters) *
            100;
          if (ratio > 90) {
            let newDocumentUpdateObject = {};
            if (documentData.verifyRatio > 0) {
              const approvedDocumentObject = documentData;
              newDocumentUpdateObject = {
                verifyRatio: 100,
                numbersDataCenterChecked: totalDataCenters,
                approveStatus: "Approved",
              };
              approvedDocumentObject.verifyRatio = 100;
              approvedDocumentObject.approveStatus = "Approved";
              approvedDocumentObject.createdAt = new Date().toLocaleString(
                "en-US",
                timestampOptions
              );
              approvedDocumentObject.updatedAt = new Date().toLocaleString(
                "en-US",
                timestampOptions
              );
              approvedDocumentObject.verifyRatio = 100;
              approvedDocumentObject.approveStatus = "Approved";
              approvedDocumentObject.numbersDataCenterChecked =
                totalDataCenters;

              await approvedDocumentsServices.addapprovedDocuments(
                approvedDocumentObject
              );
            } else {
              const rejectedDocumentObject = documentData;
              newDocumentUpdateObject = {
                verifyRatio: 0,
                numbersDataCenterChecked: totalDataCenters,
                approveStatus: "Rejected",
              };
              rejectedDocumentObject.verifyRatio = 0;
              rejectedDocumentObject.approveStatus = "Rejected";
              rejectedDocumentObject.createdAt = new Date().toLocaleString(
                "en-US",
                timestampOptions
              );
              rejectedDocumentObject.updatedAt = new Date().toLocaleString(
                "en-US",
                timestampOptions
              );
              rejectedDocumentObject.verifyRatio = 0;
              rejectedDocumentObject.approveStatus = "Rejected";
              rejectedDocumentObject.numbersDataCenterChecked =
                totalDataCenters;

              await rejectedDocumentsServices.addrejectedDocuments(
                rejectedDocumentObject
              );
            }
            await uploadedByUsersDocumentService.updateUploadedByUsersDocument(
              uploadedDocId,
              newDocumentUpdateObject
            );

            await remarksDocumentsServices.addremarksDocuments({
              remarks,
              status: "Approved",
              documentId: uploadedDocId,
              createdAt: new Date().toLocaleString("en-US", timestampOptions),
              updatedAt: new Date().toLocaleString("en-US", timestampOptions),
            });

            ToastMessage({
              message: "Document Approved Successfully!",
              type: "success",
            });
          } else {
            const newDocumentUpdateObject = {
              verifyRatio:
                documentData.verifyRatio + (1 / totalDataCenters) * 100,
              numbersDataCenterChecked:
                documentData.numbersDataCenterChecked + 1,
            };
            await uploadedByUsersDocumentService.updateUploadedByUsersDocument(
              uploadedDocId,
              newDocumentUpdateObject
            );

            await remarksDocumentsServices.addremarksDocuments({
              remarks,
              status: "Approved",
              documentId: uploadedDocId,
              createdAt: new Date().toLocaleString("en-US", timestampOptions),
              updatedAt: new Date().toLocaleString("en-US", timestampOptions),
            });

            ToastMessage({
              message: "Document Approved Successfully!",
              type: "success",
            });
          }
          setLoading(false);
        }
      }
    }
  };

  const rejectDocument = async () => {
    const confirm = window.confirm("Are you sure want to reject document?");
    if (confirm) {
      if (documentData.randomDataCenterId !== 0) {
        setLoading(true);
        try {
          const newDocumentUpdateObject = {
            verifyRatio: 0,
            numbersDataCenterChecked: 1,
            approveStatus: "Rejected",
          };

          await uploadedByUsersDocumentService.updateUploadedByUsersDocument(
            uploadedDocId,
            newDocumentUpdateObject
          );

          const rejectedDocumentObject = documentData;

          rejectedDocumentObject.createdAt = new Date().toLocaleString(
            "en-US",
            timestampOptions
          );
          rejectedDocumentObject.updatedAt = new Date().toLocaleString(
            "en-US",
            timestampOptions
          );
          rejectedDocumentObject.verifyRatio = 0;
          rejectedDocumentObject.approveStatus = "Rejected";

          await rejectedDocumentsServices.addrejectedDocuments(
            rejectedDocumentObject
          );

          await remarksDocumentsServices.addremarksDocuments({
            remarks,
            status: "Rejected",
            documentId: uploadedDocId,
            createdAt: new Date().toLocaleString("en-US", timestampOptions),
            updatedAt: new Date().toLocaleString("en-US", timestampOptions),
          });

          ToastMessage({
            message: "Document Rejected Successfully!",
            type: "warning",
          });
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        const totalDataCenters = await getTotalDataCenters();
        const ratio =
          ((documentData.numbersDataCenterChecked + 1) / totalDataCenters) *
          100;
        if (ratio > 90) {
          let newDocumentUpdateObject = {};
          if (documentData.verifyRatio > 0) {
            const approvedDocumentObject = documentData;
            newDocumentUpdateObject = {
              verifyRatio: 100,
              numbersDataCenterChecked: totalDataCenters,
              approveStatus: "Approved",
            };
            approvedDocumentObject.verifyRatio = 100;
            approvedDocumentObject.approveStatus = "Approved";
            approvedDocumentObject.createdAt = new Date().toLocaleString(
              "en-US",
              timestampOptions
            );
            approvedDocumentObject.updatedAt = new Date().toLocaleString(
              "en-US",
              timestampOptions
            );
            approvedDocumentObject.verifyRatio = 100;
            approvedDocumentObject.approveStatus = "Approved";
            approvedDocumentObject.numbersDataCenterChecked = totalDataCenters;

            await approvedDocumentsServices.addapprovedDocuments(
              approvedDocumentObject
            );
          } else {
            const rejectedDocumentObject = documentData;
            newDocumentUpdateObject = {
              verifyRatio: 0,
              numbersDataCenterChecked: totalDataCenters,
              approveStatus: "Rejected",
            };
            rejectedDocumentObject.verifyRatio = 0;
            rejectedDocumentObject.approveStatus = "Rejected";
            rejectedDocumentObject.createdAt = new Date().toLocaleString(
              "en-US",
              timestampOptions
            );
            rejectedDocumentObject.updatedAt = new Date().toLocaleString(
              "en-US",
              timestampOptions
            );
            rejectedDocumentObject.verifyRatio = 0;
            rejectedDocumentObject.approveStatus = "Rejected";
            rejectedDocumentObject.numbersDataCenterChecked = totalDataCenters;

            await rejectedDocumentsServices.addrejectedDocuments(
              rejectedDocumentObject
            );
          }
          await uploadedByUsersDocumentService.updateUploadedByUsersDocument(
            uploadedDocId,
            newDocumentUpdateObject
          );

          await remarksDocumentsServices.addremarksDocuments({
            remarks,
            status: "Rejected",
            documentId: uploadedDocId,
            createdAt: new Date().toLocaleString("en-US", timestampOptions),
            updatedAt: new Date().toLocaleString("en-US", timestampOptions),
          });

          ToastMessage({
            message: "Document Rejected Successfully!",
            type: "success",
          });
        } else {
          const newDocumentUpdateObject = {
            verifyRatio:
              documentData.verifyRatio - (1 / totalDataCenters) * 100,
            numbersDataCenterChecked: documentData.numbersDataCenterChecked + 1,
          };
          await uploadedByUsersDocumentService.updateUploadedByUsersDocument(
            uploadedDocId,
            newDocumentUpdateObject
          );

          await remarksDocumentsServices.addremarksDocuments({
            remarks,
            status: "Rejected",
            documentId: uploadedDocId,
            createdAt: new Date().toLocaleString("en-US", timestampOptions),
            updatedAt: new Date().toLocaleString("en-US", timestampOptions),
          });

          ToastMessage({
            message: "Document Rejected Successfully!",
            type: "success",
          });
        }
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="vudd-container">
      {documentData ? (
        !loading ? (
          <div className="vudd-details">
            <h1>{documentData.title}</h1>
            <p>{documentData.ministry}</p>
            <img
              src={documentData.banner}
              alt="Banner"
              className="vudd-banner"
            />
            <div className="vudd-user-info">
              <img
                src={documentData.userProfileImage}
                alt="User Profile"
                className="vudd-profile-image"
              />
              <div>
                <p>
                  <i className="material-icons">person</i>{" "}
                  {documentData.userFullName}
                </p>
                <p>
                  <i className="material-icons">phone</i>{" "}
                  {documentData.userMobile}
                </p>
              </div>
            </div>
            <div className="vudd-fields">
              {Object.entries(documentData.fields).map(
                ([fieldName, fieldValue]) => (
                  <div className="vudd-field" key={fieldName}>
                    <h2>{fieldName}</h2>
                    {fieldValue === "file" ||
                    fieldValue === "image" ||
                    fieldValue === "video" ? (
                      <a
                        href={documentData[fieldName]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Document
                      </a>
                    ) : (
                      <p>{documentData[fieldName]}</p>
                    )}
                  </div>
                )
              )}
            </div>
            <p className="vudd-updatedat">
              <i className="material-icons">schedule</i> &nbsp;
              {documentData.updatedAt}
            </p>
            <p className="vudd-progress-text">
              Verification Progress: {documentData.verifyRatio}%
            </p>
            {parseInt(documentData.verifyRatio) >= 0 && (
              <div className="vudd-progress-bar">
                <div
                  className="vudd-progress-fill"
                  style={{ width: `${documentData.verifyRatio}%` }}
                />
              </div>
            )}
            <div className="vudd-hr"></div>
            <div className="vudd-dc-verify-remarks">
              <textarea
                placeholder="Add remarks here"
                className="data-center-remark-input"
                type="text"
                rows={3}
                maxLength={300}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
              {remarksError && <p style={{ color: "red" }}>{remarksError}</p>}
            </div>
            <div className="vudd-buttons">
              <button onClick={approveDocument}>Approve</button>
              <button onClick={rejectDocument}>Reject</button>
            </div>
          </div>
        ) : (
          <CircularLoading />
        )
      ) : (
        <CircularLoading />
      )}
    </div>
  );
}

export default VerifyUserDocumentsDetails;
