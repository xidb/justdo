import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => (
    <div className='jd-footer'>
        <div>By accessing your account, you agree to our</div>
        <div>
            <Link to="/terms-and-conditions">Terms And Conditions</Link>
            &nbsp;and&nbsp;
            <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
    </div>
);

export default Footer;