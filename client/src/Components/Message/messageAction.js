export function updateMessage(message) {
  return {
    type: 'GET_MESSAGE',
    payload: message
  }
}

export function addMessage(message){
  return {
    type:'ADD_MESSAGE',
    payload: [...message]
  }
}