import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { Input, Result } from "./components";

class App extends Component {
    state = {
        google: {},
        maori: {},
    }

    handleGoogleTranslate = translateObject => {
        this.setState({ google: { ...translateObject } });
    }

    render() {
        const { google, maori } = this.state;
        return (
            <Container>
                <Input handleGoogle={this.handleGoogleTranslate} />
                <Result google={google} maori={maori} />
            </Container>
        );
    }
}

export default App;
