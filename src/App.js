import logo from './logo.svg';
import './App.css';
import {Header} from './components/Header'
import {Footer} from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header title="My app" />
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
