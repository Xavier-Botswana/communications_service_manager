import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

import Header from "./components/HorizontalLayout/Header";
import Dashboard from "./pages/Dashboard/index";
import ProjectsList from "./pages/Projects/projects-list";
import ProjectsGrid from "./pages/Projects/projects-grid";
import EcommerceShops from "./pages/Ecommerce/EcommerceShops";
import EcommerceAddProduct from "./pages/Ecommerce/EcommerceAddProduct";
import EcommerceOrders from "./pages/Ecommerce/EcommerceOrders";
import Login from "./pages/Authentication/Login";
import Logout from "./pages/Authentication/Logout";
import Footer from "./components/HorizontalLayout/Footer";

import AuthProvider from "./AuthProvider";
import EmoneyNew from "./pages/Projects/emoneynew";
import TeamDeliveries from "./pages/Projects/teamrequest";

const App = (props) => {
  const Layout = HorizontalLayout;

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path="/emoney-requests" component={ProjectsList} />
          <Route exact path="/emoneynew" component={EmoneyNew} />
          <Route exact path="/delivery-requests" component={ProjectsGrid} />
          <Route
            exact
            path="/teamdelivery-requests"
            component={TeamDeliveries}
          />
          <Route exact path="/withdrawal-requests" component={EcommerceShops} />
          <Route exact path="/add-users" component={EcommerceAddProduct} />
          <Route exact path="/reward-payments" component={EcommerceOrders} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
