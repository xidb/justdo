import React from 'react';

const NoMatch = (props) => (
    <div>
        <div onClick={props.history.goBack} className='jd-back'>Back</div>
        <div>Page not found</div>
    </div>
);

export default NoMatch;
