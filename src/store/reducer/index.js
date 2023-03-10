import {combineReducers} from 'redux';
import loginStatus from './loginStatus';
import refresh from './refresh';
import tutorsByLocation from './tutorsByLocation';
// import hideLogo from './hideLogo';
const rootreducer = combineReducers({
  login: loginStatus,
  refresh: refresh,
  tutorsByLocation: tutorsByLocation
});

export default rootreducer;
