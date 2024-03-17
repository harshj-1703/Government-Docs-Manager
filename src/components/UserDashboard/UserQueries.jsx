import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import userQueriesDocumentsServices from "../../services/user-queries.services";
import "../../css/user-query.css";
import CircularLoading from "../CircularLoading";
import ToastMessage from "../ToastMessage";
import { useNavigate } from "react-router-dom";

function UserQueries({ isMenuShow }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [queryError, setQueryError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateQueries = (value) => {
    if (value.trim() === "") {
      setQueryError("Query is required.");
      return false;
    } else if (value.length > 700) {
      setQueryError("Query Length Must Less Then 500 letters");
      return false;
    } else {
      setQueryError("");
      return true;
    }
  };

  const submitQuery = async () => {
    const isQueryValid = validateQueries(content);
    if (isQueryValid) {
      setLoading(true);
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
      try {
        await userQueriesDocumentsServices.adduserQueriesDocuments({
          content,
          mobile: localStorage.getItem("mobile"),
          fullName: localStorage.getItem("fullName"),
          profileImage: localStorage.getItem("profileImage"),
          createdAt: new Date().toLocaleString("en-US", timestampOptions),
          status: 1,
        });
        ToastMessage({
          message: "Query Submitted Successfully!",
          type: "success",
        });
        navigate("../");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="user-query-content-main">
      {!loading ? (
        <div
          className={
            isMenuShow
              ? "user-query-main-content-blur"
              : "user-query-main-content"
          }
        >
          <h2>Enter Your Query</h2>
          <div className="joi-editor-container">
            <JoditEditor
              className="joi-editor-query"
              ref={editor}
              value={content}
              tabIndex={1}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
          </div>
          {queryError && <span className="error">{queryError}</span>}
          <button
            onClick={submitQuery}
            className="login-button"
            style={{ maxWidth: "250px" }}
          >
            Submit Query
          </button>
        </div>
      ) : (
        <CircularLoading />
      )}
    </div>
  );
}

export default UserQueries;
