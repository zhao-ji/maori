import React, { Component, createRef, Fragment } from 'react';
import {
    Button,
    InputGroup, Form,
    Row, Col,
    Card,
} from 'react-bootstrap';
import { faVolumeOff, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    googleDetect,
    googleTranslate,
    baiduTranslate,
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

    handleChange = event => {
        this.setState({ text: event.target.value });
    }

    handleSearch = () => {
        if (!this.state.text) {
            return;
        }
        googleDetect(this.state.text)
            .then(language => {
                googleTranslate({ text: this.state.text, language })
                    .then(result => {
                        this.props.handleGoogle(result);
                    });
                baiduTranslate({ text: this.state.text, language })
                    .then(result => {
                        this.props.handleBaidu(result);
                    });
            });
        maoriTranslate(this.state.text)
            .then(result => {
                this.props.handleMaori(result);
            });
    }

    handleKeyDown = (event) => {
        if(event.key === "Enter") {
            this.handleSearch();
        }
    }

    render() {
        const longVowel = ["ā", "ē", "ī", "ō", "ū"];
        return (
            <Fragment>
                <Row>
                    <Col md={12} className="vowels">
                        {longVowel.map((vowel, index) =>
                            <Button key={index} variant="outline-secondary" className="vowel"
                                onClick={()=>this.handleAppend(vowel)}>
                                {vowel}
                            </Button>
                        )}
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
                        onKeyDown={this.handleKeyDown}
                        value={this.state.text}
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
        const { google, baidu, maori } = this.props;
        if (!google) {
            return false;
        }
        return (
            <Fragment>
                <Card bg="light">
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            {google}
                            <cite className="blockquote-footer float-right mt-1">
                                Google
                            </cite>
                        </blockquote>
                    </Card.Body>
                </Card>
                <Card bg="light">
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            {baidu}
                            <cite className="blockquote-footer float-right mt-1">
                                Baidu
                            </cite>
                        </blockquote>
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
