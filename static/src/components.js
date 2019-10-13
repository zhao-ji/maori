import React, { Component, createRef, Fragment } from 'react';
import { 
    Button, ButtonGroup,
    InputGroup, Form,
    Row, Col,
    Card,
} from 'react-bootstrap';

import { 
    googleTranslate, googleDetect,
    maoriTranslate,
} from "./utils";

export class Input extends Component {
    state = {
        text: "",
    }

    constructor(props) {
        super(props);
        this.input = createRef();
    }

    append = vowel => {
        this.setState(
            prevState => ({ text: prevState.text + vowel }),
            () => {
                this.input.current.focus()
            }
        );
    }

    handleChange = (event) => {
        this.setState({ text: event.target.value });
    }

    handleSearch = () => {
        googleDetect(this.state.text)
            .then(language => {
                googleTranslate({ text: this.state.text, language })
                    .then(result => {
                        this.props.handleGoogle({ [this.state.text]: result });
                    });
            });
        maoriTranslate({ text: this.state.text })
            .then(result => {
                this.props.handleMaori({ [this.state.text]: result });
            });
    }

    render() {
        const longVowel = ["Ā", "Ē", "Ī", "Ō", "Ū"];
        return (
            <Fragment>
                <Row>
                    <Col md={12} className="text-center">
                        <ButtonGroup>
                            {longVowel.map(
                                (vowel, index) =>
                                <Button key={index} variant="outline-dark"
                                    onClick={()=>this.handleAppend(vowel)}>
                                    {vowel}
                                </Button>
                            )}
                        </ButtonGroup>
                    </Col>
                </Row>
                <InputGroup size="lg" id="search-component">
                    <Form.Control
                        as="input"
                        type="search"
                        autoComplete="off"
                        autoFocus
                        placeholder="input here..."
                        ref={this.input}
                        onChange={this.handleChange}
                        defaultValue={this.state.text}
                        key={this.state.text}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-dark" type="button" onClick={this.handleSearch} block>
                            Search
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Fragment>
        );
    }
}

export class Result extends Component {
    render() {
        console.log(this.props);
        const { google, maori } = this.props;
        return (
            <Fragment>
                {Object.entries(google).map(([key, value]) => (
                    <Card bg="light" key={key}>
                        <Card.Body>
                            <Card.Text> {value} </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
                {Object.entries(maori).map(([key, value]) => (
                    false
                ))}
            </Fragment>
        );
    }
}
