import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import ApiSw from '../pages/ApiSw';
import ApiLudopedia from '../pages/ApiLudopedia';
import List from '../pages/List';

const AppRoutes: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/apisw" exact component={ApiSw} />
            <Route path="/api-ludopedia" exact component={ApiLudopedia} />
            <Route path="/list/:type" exact component={List} />
        </Switch>
    </Layout>
);

export default AppRoutes;