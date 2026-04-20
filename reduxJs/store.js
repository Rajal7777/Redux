const store = require('redux');


const coterReducer = ( state = {counter: 0}, action) => {
    return state;

}

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
}

store.subscribe(counterSubscriber);


//dispatch action has a property called type which is used to identify the action and it can also have a payload property which can be used to pass additional data to the reducer function
store.dispatch({type:'increment'});
store.dispatch({type: 'decrement'});