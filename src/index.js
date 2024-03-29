// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { Firebase } from './firebase/config';
// import { FirebaseContext } from "./store/Context";
// import Context from "./store/Context";
// ReactDOM.render(
//   <FirebaseContext.Provider value={Firebase}>
//     <Context>
//     <App />
//     </Context>
//   </FirebaseContext.Provider>,
//   document.getElementById("root")
// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context';
import { Firebase } from './firebase/config';
import Context from './store/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{Firebase}}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);