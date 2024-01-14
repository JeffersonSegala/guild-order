import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import ReactDOM from 'react-dom';
import { initThinBackend } from 'thin-backend';
import { ThinBackend } from 'thin-backend-react';

initThinBackend({
    host: 'https://guild-order.thinbackend.app'
});

ReactDOM.render(
    <React.StrictMode>
        <ThinBackend>
            <App />
        </ThinBackend>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  reportWebVitals(sendToVercelAnalytics);