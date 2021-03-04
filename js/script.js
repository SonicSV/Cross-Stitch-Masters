// require('es6-promise').polyfill();
// import 'jquery';
// import 'nodelist-foreach-polyfill';

import './modules/loadImg';
import {buttonAdd} from './modules/buttonAdd';
import './modules/editImg'

//loadImg();
buttonAdd("#myFileInput", "#myImg", "#input_file");