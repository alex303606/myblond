/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import axios from "axios";
axios.defaults.baseURL = 'https://myblond-b0d9b.firebaseio.com/';
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
	GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent(appName, () => App);
