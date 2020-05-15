import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import { Input, Result } from "./components";

class App extends Component {
    state = {
        google: null,
        baidu: null,
        maori: null,
    }

    handleGoogle = translateObject => {
        this.setState({ google: translateObject });
    }

    handleBaidu = translateObject => {
        this.setState({ baidu: translateObject });
    }

    handleMaori = translateObject => {
        this.setState({ maori: translateObject });
    }

    render() {
        const { google, baidu, maori } = this.state;
        return (
            <Container>
                <Input
                    handleGoogle={this.handleGoogle}
                    handleBaidu={this.handleBaidu}
                    handleMaori={this.handleMaori}
                />
                <Result
                    google={google}
                    baidu={baidu}
                    maori={maori}
                />
            </Container>
        );
    }
}

export default App;
