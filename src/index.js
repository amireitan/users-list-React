import 'babel-polyfill';
window.Promise = window.Promise || require('es6-promise');
import React from 'react';
import {render} from 'react-dom';

import App from 'components/App';
import './assets/style.scss';


render(<App/>, document.getElementById("root"));