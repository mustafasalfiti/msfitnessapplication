import React from 'react';
import { Store } from './context/store'
import { render } from 'react-dom';
import App from './components/App';
import './index.css';



render(<Store.Provider value={{}}><App /></Store.Provider> , document.getElementById('root'));