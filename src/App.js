import logo from './logo.svg';
import './App.css';
import {Header} from './components/Header'
import {Footer} from './components/Footer'
import { Route } from 'react-router-dom';

const RouteData = [
  {name: "Home", path: "/"},
  {name: "About", path: "/about"},
  {name: "Contact", path: "/contact"}
]

function App() {
  return (
    <div className="App">
      <Header title="My app" nav={RouteData} />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h3>Column 1</h3>
          </div>
          <div className="col">
            <h3>Column 2</h3>
          </div>
          <div className="col">
            <h3>Column 3</h3>
          </div>
        </div>
      </div>
      <Footer year="2022" />
    </div>
  );
}

export default App;
