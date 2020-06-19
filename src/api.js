import React from 'react';
import Axios from 'axios';

export default class CoordinatesList extends React.Component {
    state = {
        coordinates: [],
    };

    componentDidMount() {
        Axios.get('http://localhost:3333/coordinates')
        .then(res => {
            console.log(res);
            this.setState({coordinates: res.data});
            return this;
        });
    }

    render () {
        const { coordenadas } = this.state;
        return (
        <div>{coordenadas}</div>
        );
    }
}

