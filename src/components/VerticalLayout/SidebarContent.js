import React, { useEffect } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

const SidebarContent = (props) => {
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    var pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      var matchingMenuItem = null;
      var ul = document.getElementById("side-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  }

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">{props.t("Menu")}</li>

          <li>
            <Link to="dashboard" className=" waves-effect">
              <i className="bx bx-calendar"></i>
              <span> {props.t("Dashboard")}</span>
            </Link>
          </li>

          <li>
            <Link to="projects-list" className=" waves-effect">
              <i className="bx bx-calendar"></i>
              <span> {props.t("E-money Requests")}</span>
            </Link>
          </li>

          <li>
            <Link to="projects-grid" className=" waves-effect">
              <i className="bx bx-calendar"></i>
              <span> {props.t("Delivery Requests")}</span>
            </Link>
          </li>

          <li>
            <Link to="ecommerce-shops" className=" waves-effect">
              <i className="bx bx-calendar"></i>
              <span> {props.t("Withdrawal Requests")}</span>
            </Link>
          </li>

          <li>
            <Link to="projects-create" className=" waves-effect">
              <i className="bx bx-calendar"></i>
              <span> {props.t("Reward Payments")}</span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withNamespaces()(SidebarContent));
