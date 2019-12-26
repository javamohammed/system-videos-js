import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { createStore, combineReducers,applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import userReducer from "./store/reducers/user";
import videosReducer from "./store/reducers/videos";
const rootReducer = combineReducers({
  user: userReducer,
  videos: videosReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const Application = <Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>
ReactDOM.render(Application, document.getElementById('root'));

