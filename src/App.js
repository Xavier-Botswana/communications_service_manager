import React from 'react'

import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { connect } from 'react-redux'

// Import Routes all
import { userRoutes, authRoutes } from './routes/allRoutes'

// Import all middleware
import Authmiddleware from './routes/middleware/Authmiddleware'

// layouts Format
import VerticalLayout from './components/VerticalLayout/'
import HorizontalLayout from './components/HorizontalLayout/'
import NonAuthLayout from './components/NonAuthLayout'

// Import scss
import './assets/scss/theme.scss'

import Header from './components/HorizontalLayout/Header'
import Dashboard from './pages/Dashboard/index'
import ProjectsList from './pages/Projects/projects-list'
import ProjectsGrid from './pages/Projects/projects-grid'
import EcommerceShops from './pages/Ecommerce/EcommerceShops'
import EcommerceAddProduct from './pages/Ecommerce/EcommerceAddProduct'
import EcommerceOrders from './pages/Ecommerce/EcommerceOrders'
import Login from './pages/Authentication/Login'
import Logout from './pages/Authentication/Logout'
import Error404 from './pages/Utility/pages-404'
import Footer from './components/HorizontalLayout/Footer'

import AuthProvider from './AuthProvider'
import EmoneyNew from './pages/Projects/emoneynew'
import TeamDeliveries from './pages/Projects/teamrequest'
import EcommerceCustomers from './pages/Ecommerce/FinanceNewE'
import FinanceEmoneyExisting from './pages/Ecommerce/FinanceNewExis'
import DatatableTables from './pages/Projects/declinerequests'
import DeclinedDeliveries from './pages/Projects/declineddeliveries'
import DeclinedWithdrawals from './pages/Projects/declinedwithdrawals'
import Queries from './pages/Projects/queries'

const App = (props) => {
  const Layout = HorizontalLayout

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute
            exact
            path="/emoney-requests"
            component={ProjectsList}
          />
          <PrivateRoute exact path="/feedback" component={DeclinedDeliveries} />
          <PrivateRoute
            exact
            path="/declinedrequests"
            component={DatatableTables}
          />
          <PrivateRoute exact path="/emoneynew" component={EmoneyNew} />
          <PrivateRoute
            exact
            path="/pending-enquiries"
            component={ProjectsGrid}
          />
          <PrivateRoute
            exact
            path="/revisit-enquiries"
            component={TeamDeliveries}
          />
          <PrivateRoute exact path="/enquiries" component={EcommerceShops} />
          <PrivateRoute
            exact
            path="/bulk-communication"
            component={EcommerceAddProduct}
          />
          <PrivateRoute
            exact
            path="/reward-payments"
            component={EcommerceOrders}
          />
          <PrivateRoute
            exact
            path="/finemoneynew"
            component={EcommerceCustomers}
          />
          <PrivateRoute
            exact
            path="/declineddeliveries"
            component={DeclinedDeliveries}
          />
          <PrivateRoute
            exact
            path="/declinedwithdrawals"
            component={DeclinedWithdrawals}
          />
          <PrivateRoute
            exact
            path="/finemoneyexist"
            component={FinanceEmoneyExisting}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route path="/404" component={Error404} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
