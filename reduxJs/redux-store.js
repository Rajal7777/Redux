const redux = require("redux");

//reducer{counterReducer} function which will be called when we dispatch an action
const counterReducer = (state = { counter: 0 }, action) => {
    if(action.type === 'increment'){
        return {
          counter: state.counter + 1,
        };
 }

 if(action.type === 'decrement'){
    return {
        counter: state.counter - 1,
    }
 }
    return state;
};

//createStore is redux function which will create a store for us and we have to pass the reducer function as an argument to it

const store = redux.createStore(counterReducer);

//createStore provides getState, dispatch and subscribe methods to interact with the store
//getState is a method of store which will return the latest state of the store
// console.log(store.getState());

const counterSubscriber = () =>{
    const latestState = store.getState();
    console.log(latestState);
}


//subscribe is a method of store which will allow us to listen to changes in the store and it takes a function as an argument which will be called whenever the state of the store changes  
store.subscribe(counterSubscriber);


//dispatch is a method of store which will allow us to dispatch an action to the store and it takes an action object as an argument which should have a type property which will be used to identify the action and it can also have a payload property which can be used to pass additional data to the reducer function
store.dispatch({type : 'increment'});
store.dispatch({type : 'decrement'});