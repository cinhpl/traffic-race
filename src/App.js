import './App.css';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { Chrono } from './Pages/Chrono';
import { HomePage } from './Pages/HomePage';
import Rules from './Pages/Rules';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/chrono" element={<Chrono />} />
          <Route path="/rules" element={<Rules />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

// add logo with sound f1 et apparaission en bounce, ensuite ça descend et ça présente les règles du jeu avec animation (ligne après ligne par exemple)