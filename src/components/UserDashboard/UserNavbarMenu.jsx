import React, { useState } from "react";
import "../../css/user-menu.scss";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Skeleton = () => <div className="skeleton"></div>;

function UserNavbarMenu() {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="user-menu">
      <LazyLoadComponent>
        <div className="orbital-menu">
          <ul className="orbital-menu__list">
            <li className="orbital-menu__item">
              <Link
                className="orbital-menu__link"
                onClick={() => {
                  signOut(auth);
                  navigate("/");
                }}
              >
                <span className="orbital-menu__link-icon">
                  <i data-feather="log-out" className="material-icons">
                    logout
                  </i>
                </span>
                <span className="orbital-menu__link-text">LogOut</span>
              </Link>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="map" className="material-icons"></i>
                </span>
                <span className="orbital-menu__link-text">
                  Travel & Requisitions
                </span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="alert-circle" className="material-icons"></i>
                </span>
                <span className="orbital-menu__link-text">Disciplinary</span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="activity" className="material-icons"></i>
                </span>
                <span className="orbital-menu__link-text">
                  Analytics & Reporting
                </span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="calendar" className="material-icons"></i>
                </span>
                <span className="orbital-menu__link-text">
                  Time & Attendance
                </span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="user-plus" className="material-icons"></i>
                </span>
                <span className="orbital-menu__link-text">Onboarding</span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="archive" className="material-icons"></i>
                </span>
                <span className="orbital-menu__link-text">
                  HR Information System
                </span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="sun" className="material-icons"></i>
                </span>
                <span className="orbital-menu__link-text">
                  Leaves & Holidays
                </span>
              </a>
            </li>
          </ul>
          <div className="orbital-menu__center-pic">
            {!imageLoaded && <Skeleton />}
            <img
              src={localStorage.getItem("profileImage")}
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              alt=""
            />
          </div>
        </div>
      </LazyLoadComponent>
    </div>
  );
}

export default UserNavbarMenu;
