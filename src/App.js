import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Container from './components/layout/Container';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project'


function App() {
  return (

    <Router>
     <Navbar />
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/project">
            <Projects />
          </Route>
          <Route exact path="/company">
            <Company />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/newproject">
            <NewProject />
          </Route>
          <Route exact path="/project/:id">
            <Project />
          </Route>
        </Container>
      </Switch>
      <Footer />
    </Router >

  );
}

export default App;
