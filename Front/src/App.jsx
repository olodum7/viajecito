import { Body } from './components/Body'
import RegistrarTour from './Routes/Registrar_Tour.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/body" component={Body} />
        <Route path="/Registrar_Tour" component={RegistrarTour} />
      </Switch>
    </Router>
  )
}

export default App
