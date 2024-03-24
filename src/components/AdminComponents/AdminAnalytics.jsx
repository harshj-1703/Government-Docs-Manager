import React, { useEffect, useState } from "react";
import userService from "../../services/user.services";
import dataCenterServices from "../../services/data-center.services";
import documentService from "../../services/document.services";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import approvedDocumentsServices from "../../services/approved-document.services";
import rejectedDocumentsServices from "../../services/rejected-document.services";
import userQueriesDocumentsServices from "../../services/user-queries.services";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function AdminAnalytics() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [totalActiveUsers, setTotalActiveUsers] = useState(null);
  const [isLoadingActiveUsers, setIsLoadingActiveUsers] = useState(true);
  const [totalInActiveUsers, setTotalInActiveUsers] = useState(null);
  const [isLoadingInActiveUsers, setIsLoadingInActiveUsers] = useState(true);
  const [totalDataCenters, setTotalDataCenters] = useState(null);
  const [isLoadingDataCenters, setIsLoadingDataCenters] = useState(true);
  const [totalDocuments, setTotalDocuments] = useState(null);
  const [isLoadingTotalDocuments, setIsLoadingTotalDocuments] = useState(true);
  const [totalUploadedDocuments, setTotalUploadedDocuments] = useState(null);
  const [isLoadingTotalUploadedDocuments, setIsLoadingTotalUploadedDocuments] =
    useState(true);
  const [totalApprovedDocuments, setTotalApprovedDocuments] = useState(null);
  const [isLoadingTotalApprovedDocuments, setIsLoadingTotalApprovedDocuments] =
    useState(true);
  const [totalRejectedDocuments, setTotalRejectedDocuments] = useState(null);
  const [isLoadingTotalRejectedDocuments, setIsLoadingTotalRejectedDocuments] =
    useState(true);
  const [totalUserQueries, setTotalUserQueries] = useState(null);
  const [isLoadingTotalUserQueries, setIsLoadingTotalUserQueries] =
    useState(true);
  const [totalSolvedUserQueries, setTotalSolvedUserQueries] = useState(null);
  const [isLoadingTotalSolvedUserQueries, setIsLoadingTotalSolvedUserQueries] =
    useState(true);
  const [totalWebsiteVisits, setTotalWebsiteVisits] = useState(null);
  const [isLoadingTotalWebsiteVisits, setIsLoadingTotalWebsiteVisits] =
    useState(true);

  const fetchTotalUsers = async () => {
    try {
      const noOfUsers = await userService.getAllNumberOfUsers();
      setTotalUsers(noOfUsers);
      setIsLoadingUsers(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalActiveUsers = async () => {
    try {
      const noOfUsers = await userService.getAllNumberOfActiveUsers();
      setTotalActiveUsers(noOfUsers);
      setIsLoadingActiveUsers(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalInActiveUsers = async () => {
    try {
      const noOfUsers = await userService.getAllNumberOfInActiveUsers();
      setTotalInActiveUsers(noOfUsers);
      setIsLoadingInActiveUsers(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalDataCenters = async () => {
    try {
      const noOf = await dataCenterServices.getTotalDataCenters();
      setTotalDataCenters(noOf);
      setIsLoadingDataCenters(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalDocuments = async () => {
    try {
      const noOf = await documentService.getTotalDocuments();
      setTotalDocuments(noOf);
      setIsLoadingTotalDocuments(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalUploadedDocuments = async () => {
    try {
      const noOf =
        await uploadedByUsersDocumentService.getTotalUploadedDocuments();
      setTotalUploadedDocuments(noOf);
      setIsLoadingTotalUploadedDocuments(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalApprovedDocuments = async () => {
    try {
      const noOf = await approvedDocumentsServices.getTotalApprovedDocuments();
      setTotalApprovedDocuments(noOf);
      setIsLoadingTotalApprovedDocuments(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalRejectedDocuments = async () => {
    try {
      const noOf = await rejectedDocumentsServices.getTotalRejectedDocuments();
      setTotalRejectedDocuments(noOf);
      setIsLoadingTotalRejectedDocuments(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalUserQueries = async () => {
    try {
      const noOf = await userQueriesDocumentsServices.getTotalUserQueries();
      setTotalUserQueries(noOf);
      setIsLoadingTotalUserQueries(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalUserSolvedQueries = async () => {
    try {
      const noOf =
        await userQueriesDocumentsServices.getTotalSolvedUserQueries();
      setTotalSolvedUserQueries(noOf);
      setIsLoadingTotalSolvedUserQueries(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalWebsiteVisites = async () => {
    const websiteLoadDataRef = collection(db, "WebsiteLoadData");
    const totalVisits = await getDocs(websiteLoadDataRef);
    setTotalWebsiteVisits(totalVisits.size);
    setIsLoadingTotalWebsiteVisits(false);
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalActiveUsers();
    fetchTotalInActiveUsers();
    fetchTotalDataCenters();
    fetchTotalDocuments();
    fetchTotalUploadedDocuments();
    fetchTotalApprovedDocuments();
    fetchTotalRejectedDocuments();
    fetchTotalUserQueries();
    fetchTotalUserSolvedQueries();
    fetchTotalWebsiteVisites();
  }, []);

  return (
    <>
      <div className="analytics-card">
        <div className="analytics-icon" style={{ backgroundColor: "darkblue" }}>
          <span className="material-icons">group</span>
        </div>
        <div className="analytics-content">
          {isLoadingUsers ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkblue" }}>
              {totalUsers}
            </div>
          )}
          <div className="analytics-label">Total Users</div>
        </div>
      </div>

      <div className="analytics-card total-active-users">
        <div className="analytics-icon" style={{ backgroundColor: "darkcyan" }}>
          <span className="material-icons">person</span>
        </div>
        <div className="analytics-content">
          {isLoadingActiveUsers ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkcyan" }}>
              {totalActiveUsers}
            </div>
          )}
          <div className="analytics-label">Total Active Users</div>
        </div>
      </div>

      <div className="analytics-card total-blocked-users">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkgoldenrod" }}
        >
          <span className="material-icons">block</span>
        </div>
        <div className="analytics-content">
          {isLoadingInActiveUsers ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkgoldenrod" }}>
              {totalInActiveUsers}
            </div>
          )}
          <div className="analytics-label">Total Blocked Users</div>
        </div>
      </div>

      <div className="analytics-card total-datacenters">
        <div className="analytics-icon" style={{ backgroundColor: "darkred" }}>
          <span className="material-icons">business</span>
        </div>
        <div className="analytics-content">
          {isLoadingDataCenters ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkred" }}>
              {totalDataCenters}
            </div>
          )}
          <div className="analytics-label">Total Datacenters</div>
        </div>
      </div>

      <div className="analytics-card total-documents">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkgreen" }}
        >
          <span className="material-icons">description</span>
        </div>
        <div className="analytics-content">
          {isLoadingTotalDocuments ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkgreen" }}>
              {totalDocuments}
            </div>
          )}
          <div className="analytics-label">Total Documents</div>
        </div>
      </div>

      <div className="analytics-card total-uploaded-documents">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkorange" }}
        >
          <span className="material-icons">cloud_upload</span>
        </div>
        <div className="analytics-content">
          {isLoadingTotalUploadedDocuments ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkred" }}>
              {totalUploadedDocuments}
            </div>
          )}
          <div className="analytics-label">Total Uploaded Documents</div>
        </div>
      </div>

      <div className="analytics-card total-approved-documents">
        <div className="analytics-icon" style={{ backgroundColor: "darkblue" }}>
          <span className="material-icons">check_circle</span>
        </div>
        <div className="analytics-content">
          {isLoadingTotalApprovedDocuments ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkblue" }}>
              {totalApprovedDocuments}
            </div>
          )}
          <div className="analytics-label">Total Approved Documents</div>
        </div>
      </div>

      <div className="analytics-card total-rejected-documents">
        <div className="analytics-icon" style={{ backgroundColor: "darkred" }}>
          <span className="material-icons">cancel</span>
        </div>
        <div className="analytics-content">
          {isLoadingTotalRejectedDocuments ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkred" }}>
              {totalRejectedDocuments}
            </div>
          )}
          <div className="analytics-label">Total Rejected Documents</div>
        </div>
      </div>

      <div className="analytics-card total-user-queries">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkgreen" }}
        >
          <span className="material-icons">question_answer</span>
        </div>
        <div className="analytics-content">
          {isLoadingTotalUserQueries ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkgreen" }}>
              {totalUserQueries}
            </div>
          )}
          <div className="analytics-label">Total User Queries</div>
        </div>
      </div>

      <div className="analytics-card total-user-queries-solved">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkorange" }}
        >
          <span className="material-icons">done_all</span>
        </div>
        <div className="analytics-content">
          {isLoadingTotalSolvedUserQueries ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkorange" }}>
              {totalSolvedUserQueries}
            </div>
          )}
          <div className="analytics-label">Total User Queries Solved</div>
        </div>
      </div>

      <div className="analytics-card total-website-visits">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkviolet" }}
        >
          <span className="material-icons">visibility</span>
        </div>
        <div className="analytics-content">
          {isLoadingTotalWebsiteVisits ? (
            <div className="loading-spinner-an"></div>
          ) : (
            <div className="analytics-value" style={{ color: "darkviolet" }}>
              {totalWebsiteVisits}
            </div>
          )}
          <div className="analytics-label">Total Website Visits</div>
        </div>
      </div>
    </>
  );
}

export default AdminAnalytics;
