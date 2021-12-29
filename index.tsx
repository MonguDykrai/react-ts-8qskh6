import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import DualAxes from './DualAxes';

function App() {
  return (
    <div
      style={{
        padding: '120px 32px',
      }}
    >
      <DualAxes />
    </div>
  );
}

render(<App />, document.getElementById('root'));
