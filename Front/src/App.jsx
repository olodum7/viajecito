import './App.css'

import {Body} from './routes/Body';
import {Detail} from './routes/Detail';
import {ImageGallery} from './routes/ImageGallery';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

 function App() {
  
  return (
    <Router> 
        <Switch>
          <Route path="/" exact component={Body} />
          <Route path="/tour/:id" component={Detail} />
          <Route path="/image-gallery" component={ImageGallery} />
        </Switch>
    </Router>
    
  )
}

export default App;


/*  function App() {
  
  return (
    <>
      <Body />
    </>
  )
}*/


/*<Switch>
            <Route path="/" element={<Navigate to="/body"/>} />
            <Route path="/body" element={<Body/>} />
            <Route path="/tour/:id" element={<Detail/>} />
          </Routes>
        */


