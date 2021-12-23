// import Login from "./Login";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from "./Component/Homepage/Homepage";
import ChatOnline from "./Component/ChatOnline/ChatOnline";
import Login from "./Component/Login";
import SignUp from "./Component/Signup";
import Qoute from "./Component/Qoute/Qoute"
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/chat-online">
            <ChatOnline />
          </Route>
          <Route path="/homepage">
            <Homepage />
          </Route>
          <Route path="/qoute">
            <Qoute />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
