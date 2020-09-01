import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Shortlisted from './Shortlisted/shortlisted';
import Allcities from './All Cities/allcities';
import * as _ from 'lodash';

class App extends React.Component {

  constructor(props){
    super(props);
    window.addEventListener('scroll', this.getScroll,true);
  }


  getScroll(){
    let el = document.getElementById('top');
    if(!_.isEmpty(el)){
        if(window.scrollY > window.innerHeight){
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    }
}

goToTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

  render() {

    return (
      <Router>
        <div>
          <div id="top" className="goToTop" onClick={(() => this.goToTop())}>
            <span>Top</span>
          </div>
          <div className="navigation-menu">
            <div>
              <Link to="/">All Cities</Link>
            </div>
            <div>
              <Link to="/shortlisted">Shortlisted</Link>
            </div>
          </div>
          <Switch>
            <Route exact path="/">
              <Allcities />
            </Route>
            <Route path="/shortlisted">
              <Shortlisted />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
