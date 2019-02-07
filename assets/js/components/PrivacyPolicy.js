import React from 'react';

const PrivacyPolicy = (props) => (
    <div className='jd-document'>
        <div className="jd-document-header">
            <div onClick={props.history.goBack} className="jd-back">&#8249;</div>
            <h2 className="jd-center">Privacy Policy</h2>
        </div>
        <p>
            My Company (change this) («us», «we», or «our») operates http://www.mysite.com (change this) (the «Site»). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.</p>
        <h3>Information Collection And Use</h3>
        <p>
            While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name («Personal Information»).
        </p>
        <h3>Log Data</h3>
        <p>
            Like many site operators, we collect information that your browser sends whenever you visit our Site («Log Data»). This Log Data may include information such as your computer’s Internet Protocol («IP») address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics. In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this …
        </p>
        <h3>Communications</h3>
        <p>
            We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that …
        </p>
    </div>
);

export default PrivacyPolicy;
