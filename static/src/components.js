import React, { Component, createRef, Fragment } from 'react';
import {
    Button, ButtonGroup,
    InputGroup, Form,
    Row, Col,
    Card,
} from 'react-bootstrap';
import { faVolumeOff, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    handleAppend = vowel => {
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
                        this.props.handleGoogle(result);
                    });
            });
        maoriTranslate(this.state.text)
            .then(result => {
                this.props.handleMaori(result);
            });
    }

    render() {
        const longVowel = ["ā", "ē", "ī", "ō", "ū"];
        return (
            <Fragment>
                <Row>
                    <Col md={12} className="text-center">
                        <ButtonGroup className="mt-2" size="lg">
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
        const { google, maori } = this.props;
        if (!google) {
            return false;
        }
        return (
            <Fragment>
                <Card bg="light">
                    <Card.Body>
                        <Card.Text> {google} </Card.Text>
                    </Card.Body>
                </Card>
                {maori && maori.length > 0 && maori.map((item, index) => (
                    <Card bg="light" key={index}>
                        <Card.Body>
                            {item.map((i, index) =>
                                <Fragment key={index}>
                                    {i.lookup && <b>{i.lookup}</b>}
                                    &nbsp;&nbsp;
                                    {i.audio_href && <AudioPlayer src={i.audio_href} />}
                                    <hr/>
                                    {i.translation && <i>{i.translation}</i>}
                                </Fragment>
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </Fragment>
        );
    }
}

class AudioPlayer extends Component {
    state = {
        isPlaying: false,
        count: 0,
    }

    onClick = () => {
        const audio = new Audio(this.props.src);
        if (this.state.count > 0) {
            audio.playbackRate = 0.5;
        }
        audio.addEventListener("ended", () => {
            this.setState(prevState => ({
                isPlaying: false,
                count: prevState.count + 1,
            }));
        });
        audio.play();
        this.setState({ isPlaying: true });
    }

    render() {
        return (
            this.state.isPlaying
            ? <AudioAnimatePlayer />
            : <FontAwesomeIcon icon={faVolumeUp} onClick={this.onClick} fixedWidth />
        );
    }
}

class AudioAnimatePlayer extends Component {
    state = {
        count: 0,
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState(prevState => ({ count: prevState.count + 1 })),
            500
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const iconChoices = [faVolumeOff, faVolumeDown, faVolumeUp, faVolumeDown];
        return (
            <FontAwesomeIcon icon={iconChoices[this.state.count % 4]} fixedWidth />
        );
    }
}
