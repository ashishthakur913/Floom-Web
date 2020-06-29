import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ShopContainer from './Shop/_containers/ShopContainer';
import PanelContainer from './Panel/_containers/PanelContainer';
import HeaderContainer from './Header/_containers/HeaderContainer'

export class Router extends React.Component {
	render = () => <>
		<BrowserRouter>
			<HeaderContainer />
			<Switch>
				<Route
					exact
					path="/"
					render={(props) => <ShopContainer />}
				/>
				<Route
					exact
					path="/panel"
					render={(props) => <PanelContainer />}
				/>
			</Switch>
		</BrowserRouter>
	</>
}

export default connect(
	null, null
)(Router);

