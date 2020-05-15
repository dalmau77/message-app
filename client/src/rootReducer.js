import { combineReducers } from 'redux';
import messageReducer from './Components/Message/messageReducer'
// import joinReducer from './components/Message/joinReducer';

const rootReducer = combineReducers({
  message: messageReducer,
  // join: joinReducer,
});
export default rootReducer;