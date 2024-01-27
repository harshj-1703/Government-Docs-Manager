import React, { useState } from "react";
import "../../css/user-menu.scss";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const Skeleton = () => <div className="skeleton"></div>;

function UserNavbarMenu() {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="user-menu">
      <LazyLoadComponent>
        <div className="orbital-menu">
          <ul className="orbital-menu__list">
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="log-out"></i>
                </span>
                <span className="orbital-menu__link-text">
                  Exit & Off-branding
                </span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="map"></i>
                </span>
                <span className="orbital-menu__link-text">
                  Travel & Requisitions
                </span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="alert-circle"></i>
                </span>
                <span className="orbital-menu__link-text">Disciplinary</span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="activity"></i>
                </span>
                <span className="orbital-menu__link-text">
                  Analytics & Reporting
                </span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="calendar"></i>
                </span>
                <span className="orbital-menu__link-text">
                  Time & Attendance
                </span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="user-plus"></i>
                </span>
                <span className="orbital-menu__link-text">Onboarding</span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="archive"></i>
                </span>
                <span className="orbital-menu__link-text">
                  HR Information System
                </span>
              </a>
            </li>
            <li className="orbital-menu__item">
              <a href="" className="orbital-menu__link">
                <span className="orbital-menu__link-icon">
                  <i data-feather="sun"></i>
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
