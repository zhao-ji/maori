import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from '@sentry/browser';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

Sentry.init({dsn: "https://6328f7df3e6947bf8bfe9c05e8a732c7@o374324.ingest.sentry.io/5197506"});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
