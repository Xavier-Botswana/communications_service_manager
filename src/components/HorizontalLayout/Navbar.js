import React, { useState, useEffect } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

//i18n
import { withNamespaces } from "react-i18next";

import { connect } from "react-redux";

const Navbar = (props) => {
  const [dashboard, setdashboard] = useState(false);
  const [ui, setui] = useState(false);
  const [app, setapp] = useState(false);
  const [email, setemail] = useState(false);
  const [ecommerce, setecommerce] = useState(false);
  const [crypto, setcrypto] = useState(false);
  const [project, setproject] = useState(false);
  const [task, settask] = useState(false);
  const [contact, setcontact] = useState(false);
  const [component, setcomponent] = useState(false);
  const [form, setform] = useState(false);
  const [table, settable] = useState(false);
  const [chart, setchart] = useState(false);
  const [icon, seticon] = useState(false);
  const [map, setmap] = useState(false);
  const [extra, setextra] = useState(false);
  const [invoice, setinvoice] = useState(false);
  const [auth, setauth] = useState(false);
  const [utility, setutility] = useState(false);

  useEffect(() => {
    let matchingMenuItem = null;
    let ul = document.getElementById("navigation");
    let items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });
  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li>
                  <Link to="/" className="dropdown-item">
                    <i className="bx bx-calendar"></i>
                    <span> {props.t("Dashboard")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/emoney-requests" className="dropdown-item">
                    <i className="bx bx-money"></i>
                    <span> {props.t("E-money Requests")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/delivery-requests" className="dropdown-item">
                    <i className="bx bxs-truck"></i>
                    <span> {props.t("Delivery Requests")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/withdrawal-requests" className="dropdown-item">
                    <i className="bx bx-money"></i>
                    <span> {props.t("Withdrawal Requests")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/add-users" className="dropdown-item">
                    <i className="bx bx-user"></i>
                    <span> {props.t("Add Users")}</span>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {})(withNamespaces()(Navbar))
);
