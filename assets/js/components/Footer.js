import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => (
    <div className='jd-footer'>
        <p>By accessing your account, you agree to our</p>
        <p>
            <Link to="/terms-and-conditions">Terms And Conditions</Link>
            &nbsp;and&nbsp;
            <Link to="/privacy-policy">Privacy Policy</Link>
        </p>
    </div>
);

export default Footer;