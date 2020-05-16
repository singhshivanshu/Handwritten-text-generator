import React from 'react';
import './App.css';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Imagebox from './Imagebox';
import Output from './Output';

function App() {
  return (
    <div className="App">
      <Header/>
      <Imagebox/>
      {/* <Output/> */}
    </div>
  );
}

export default App;
