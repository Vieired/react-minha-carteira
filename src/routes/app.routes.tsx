import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import { BigSpinner } from '../components/BigSpinner';
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
            <Suspense fallback={<BigSpinner/>}>
                <Route path="/" exact component={Dashboard} />
                <Route path="/apisw" exact component={ApiSw} />
                <Route path="/apigitlab" exact component={ApiGitLab} />
                <Route path="/list/:type" exact component={List} />
                <Route path="/budget" exact component={BudgetManagement} />
                    {/* <Route path="/budget" exact component={BudgetManagement} /> */}
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