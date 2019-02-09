import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { num_convert } from './helper_funciton.js';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('returns true', () => {
  let number = 455.32;
  expect(num_convert(number)).toBe('45.32')
})