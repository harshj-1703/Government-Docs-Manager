import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userQueriesDocumentsServices from "../../services/user-queries.services";
import Circularloading from "../CircularLoading";
import "../../css/userquerydetail.css";

function UserQueryDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const queryData = await userQueriesDocumentsServices.getUserQueryFromId(
        id
      );
      setData(queryData);
      console.log(queryData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsChecked = async () => {
    try {
      setIsLoading(true);
      await userQueriesDocumentsServices.updateuserQueries(id, { status: 0 });
      navigate("../");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading || !data ? (
    <Circularloading />
  ) : (
    <div className="query-details-main">
      <div className="query-details">
        <h1>User Details</h1>
        <img src={data.profileImage} height={100} width={100} />
        <h4>{data.fullName}</h4>
        <h1 className="user-query-detail-h1">Query</h1>
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        <button className="query-submit-button" onClick={markAsChecked}>
          Mark as Checked
        </button>
      </div>
    </div>
  );
}

export default UserQueryDetail;
