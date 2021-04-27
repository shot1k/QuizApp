import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./components/welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Quiz from "./components/quiz";
import { Form, Col } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Form >
        <Form.Row className="justify-content-md-center">
          <Col sm={6}>


            <Router>
              <div>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                  <Route path="/quiz/:id/:difficulty" exact>
                    <Quiz />
                  </Route>
                  <Route path="/">
                    <Welcome />
                  </Route>
                </Switch>
              </div>
            </Router>


          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}

export default App;
