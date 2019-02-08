import React from 'react';

const NoMatch = ({history}) => (
    <div className='jd-document'>
        <div className="jd-document-header">
            <div onClick={history.goBack} className="jd-back">&#8249;</div>
            <h2 className="jd-center">Page not found</h2>
        </div>
    </div>
);

export default NoMatch;
