import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import { BigSpinner } from '../components/BigSpinner';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const ApiSw = lazy(() => import('../pages/ApiSw'));
const ApiGitLab = lazy(() => import('../pages/ApiGitLab'));
const List = lazy(() => import('../pages/List'));
const BudgetManagement = lazy(() => import('../pages/BudgetManagement'));
const AddBudget = lazy(() => import('../pages/BudgetManagement/AddBudget'));
const EditBudget = lazy(() => import('../pages/BudgetManagement/EditBudget'));

const AppRoutes: React.FC = () => (
    <Layout>
        <Switch>
            <Suspense fallback={<BigSpinner/>}>
                <Route path="/" exact component={Dashboard} />
                <Route path="/apisw" exact component={ApiSw} />
                <Route path="/apigitlab" exact component={ApiGitLab} />
                <Route path="/list/:type" exact component={List} />
                <Route path="/budget" exact component={BudgetManagement} />
                <Route path="/addbudget" exact component={AddBudget} />
                <Route path="/budget/edit/:id" exact component={EditBudget} />
            </Suspense>

            {/* <Route path="/budget" component={BudgetManagement}>
                <Route path="add" component={AddBudget} />
                <Route path="edit/:id" component={EditBudget} />
            </Route> */}

            {/* <Route path="/budget" component={BudgetManagement} children={
                <>
                    <Route path="add" component={AddBudget} />
                    <Route path="edit/:id" component={EditBudget} />                
                </>
            }/> */}
        </Switch>
    </Layout>
);

export default AppRoutes;