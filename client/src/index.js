import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from "./globalStyle";
import Theme from "./data/theme";

ReactDOM.render(
    <React.StrictMode>
        <Theme >
            <GlobalStyle />
            <App />
        </Theme>
    </React.StrictMode>,
  document.getElementById('root')
);
