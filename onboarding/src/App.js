import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Form, Input, TextArea, Button, Select } from "semantic-ui-react";
import OnboardForm from "./Form"
function App() {
  return (
    <div className="App">
      <OnboardForm />
    </div>
  );
}

export default App;
