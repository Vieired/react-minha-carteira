import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import ApiSw from '../pages/ApiSw';
import ApiGitLab from '../pages/ApiGitLab';
import List from '../pages/List';
import BudgetManagement from '../pages/BudgetManagement';
import AddBudget from '../pages/BudgetManagement/AddBudget';
import EditBudget from '../pages/BudgetManagement/EditBudget';


const AppRoutes: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/apisw" exact component={ApiSw} />
            <Route path="/apigitlab" exact component={ApiGitLab} />
            <Route path="/list/:type" exact component={List} />
            <Route path="/budget" exact component={BudgetManagement} />
            <Route path="/addbudget" exact component={AddBudget} />
            <Route path="/budget/edit/:id" exact component={EditBudget} />
        </Switch>
    </Layout>
);

export default AppRoutes;