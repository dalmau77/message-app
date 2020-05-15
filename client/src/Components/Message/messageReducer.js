const defaultState = {
  message: '',
  messages: []
  };
  
  export default function messageReducer(state = defaultState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case "GET_MESSAGE": {
        return {
            ...state,
            message: payload
        }
    }
      case "ADD_MESSAGE": {
        return {
            ...state,
            messages: {...state.messages, message: action.payload}
        }
    }

     
      default: {
        return state;
      }
    }
  }