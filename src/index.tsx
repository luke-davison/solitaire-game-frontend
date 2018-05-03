import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Table } from './Components/Table/Table';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Table />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
