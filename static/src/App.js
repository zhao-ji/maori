import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { Input, Result } from "./components";

class App extends Component {
    state = {
        google: {},
        maori: {},
    }

    handleGoogle = translateObject => {
        this.setState({ google: { ...translateObject } });
    }

    handleMaori = translateObject => {
        this.setState({ maori: { ...translateObject } });
    }

    render() {
        const { google, maori } = this.state;
        return (
            <Container>
                <Input handleGoogle={this.handleGoogle} handleMaori={this.handleMaori} />
                <Result google={google} maori={maori} />
            </Container>
        );
    }
}

export default App;
