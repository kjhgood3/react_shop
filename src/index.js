import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';  //HashRouter도 있다..
// HashRouter는 라우터를 좀더 안전하게 할 수 있다../#/을 넣기때문에 서버에 전송되지 않는다.

import { Provider } from 'react-redux'; // 1번
import { combineReducers, createStore } from 'redux'; //3번


let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === "close") {
    state = false;
    return state
  } else {
    return state
  }
}

let 초기값 = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '멋진신발2', quan: 1 }
];

function reducer(state = 초기값, 액션) {

  if (액션.type === '항목추가') {
    let found = state.findIndex((a) => { return a.id === 액션.payload.id });
    if (found >= 0) {
      let copy = [...state];
      copy[found].quan++;
      return copy
    } else {
      let copy = [...state];
      copy.push(액션.payload);
      return copy
    }
  } else if (액션.type === '수량증가') {
    let copy = [...state];
    copy[액션.payload].quan++;
    return copy
  } else if (액션.type === '수량감소') {
    let copy = [...state];
    copy[액션.payload].quan--;
    return copy
  } else {
    return state     //reducer는 항상 state를 return해야함
  }
}
let store = createStore(combineReducers({ reducer, reducer2 }));  //4번

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> {/* 2번 Provider태그 넣기    // 5번 태그안에 props전송할 state 넣기 */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
