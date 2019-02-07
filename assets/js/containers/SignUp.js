import React from 'react';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';

const handleSubmit = (values) => {
    console.log(values);
};

const SignUp = () => (
    <div className="jd-page jd-page-footer">
        <div className="jd-center-container">
            <SignUpForm onSubmit={handleSubmit}/>
        </div>
        <Footer/>
    </div>
);

export default SignUp;
