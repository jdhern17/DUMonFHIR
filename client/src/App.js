import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Jump from "./pages/Jump";
import Books from "./pages/Books";
import Searchers from "./pages/Searchers";
import WhatIsDoF from "./pages/WhatIsDoF";
import WhatIsSoF from "./pages/WhatIsSoF";

import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
//import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Jump} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/Searchers" component={Searchers} />
          <Route exact path="/WhatIsDoF" component={WhatIsDoF} />
          <Route exact path="/WhatIsSoF" component={WhatIsSoF} />
          <Route exact path="/books/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
