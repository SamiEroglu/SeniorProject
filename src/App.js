import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Page';
import SignInSide from './Components/Sign/SignInSide';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/login">
						<SignInSide />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
