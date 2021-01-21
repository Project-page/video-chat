import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import "./App.css";
import RoomAdmin from "./routes/RoomAdmin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
          <Route path="/admin/:roomID" component={RoomAdmin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
