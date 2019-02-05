import React from 'react';
import ReactDOM from 'react-dom';
import '../css/JustDo.scss';

class JustDo extends React.Component {
    render() {
        return (
            <p>JustDo!</p>
        )
    }
}

ReactDOM.render(<JustDo/>, document.getElementById('root'));