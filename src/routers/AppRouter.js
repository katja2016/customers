import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import CustomerDashboardPage from '../components/CustomerDashboardPage';
import AddCustomerPage from '../components/AddCustomerPage';
import EditCustomerPageItem from '../components/EditCustomerPageItem';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={CustomerDashboardPage} />
                <PrivateRoute path="/create" component={AddCustomerPage} />
                <PrivateRoute path="/edit/:id" component={EditCustomerPageItem} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;