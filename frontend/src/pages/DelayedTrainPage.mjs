import React from 'react';
// import './App.css';
import MainView from '../components/MainView.mjs'

export default function DelayedTrainPage() {
  return (
    <div className="App">
      <header className="App-header">
        Tåginformation
      </header>
      <div className="container">
        <MainView />
      </div>
    </div>    
  );
}
