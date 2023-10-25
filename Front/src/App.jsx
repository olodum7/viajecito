import {Body} from './routes/Body';
import './App.css'
import {Detail} from './routes/Detail';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

/*<Switch>
            <Route path="/" element={<Navigate to="/body"/>} />
            <Route path="/body" element={<Body/>} />
            <Route path="/tour/:id" element={<Detail/>} />
          </Routes>
        */
 function App() {
  
  return (
    <Router> 
        <Switch>
          <Route path="/" exact component={Body} />
          <Route path="/tour/:id" component={Detail} />
        </Switch>
    </Router>
    
  )
}

 

/*  function App() {
  
  return (
    <>
      <Body />
    </>
  )
}*/



export default App;
