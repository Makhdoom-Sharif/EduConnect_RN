import {combineReducers} from 'redux';
import loginStatus from './loginStatus';
// import hideLogo from './hideLogo';
const rootreducer = combineReducers({
  login: loginStatus,
});

export default rootreducer;
