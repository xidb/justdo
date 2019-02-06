import React from 'react';
import {Route, Switch} from 'react-router';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import TermsAndConditions from '../components/TermsAndConditions';
import PrivacyPolicy from '../components/PrivacyPolicy';
import NotFound from '../components/NotFound';

const routes = (
    <Switch>
        <Route exact path="/" component={SignIn}/>
        <Route path="/sign-in" component={SignIn}/>
        <Route path="/sign-up" component={SignUp}/>
        <Route path="/terms-and-conditions" component={TermsAndConditions}/>
        <Route path="/privacy-policy" component={PrivacyPolicy}/>
        <Route component={NotFound}/>
    </Switch>
);

export default routes;
