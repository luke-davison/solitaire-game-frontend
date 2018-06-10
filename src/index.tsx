import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Table } from './Components/Table/Table';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Route path="/:game" component={Table} />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
