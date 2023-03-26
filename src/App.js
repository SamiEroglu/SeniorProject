import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import SignInSide from './Components/Sign/SignInSide';

function App() {
	return (
		<Router>
			<div>
				{/* <nav>
					<ul>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</ul>
				</nav> */}

				<Switch>
					<Route path="/login">
						<SignInSide />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
