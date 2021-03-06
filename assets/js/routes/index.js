import React from 'react';
import {Route, Switch} from 'react-router';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import PasswordForgot from '../containers/PasswordForgot';
import PasswordReset from '../containers/PasswordReset';
import Activate from '../components/Activate';
import TermsAndConditions from '../components/TermsAndConditions';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Task from '../components/Task';
import NotFound from '../components/NotFound';

const routes = (
    <Switch>
        <Route exact path="/" component={SignUp}/>
        <Route path="/sign-in" component={SignIn}/>
        <Route path="/sign-up" component={SignUp}/>
        <Route path="/forgot-password" component={PasswordForgot}/>
        <Route path="/reset-password/:token" component={PasswordReset}/>
        <Route path="/activate/:token" component={Activate}/>
        <Route path="/terms-and-conditions" component={TermsAndConditions}/>
        <Route path="/privacy-policy" component={PrivacyPolicy}/>
        <Route path="/task" component={Task}/>
        <Route component={NotFound}/>
    </Switch>
);

export default routes;
