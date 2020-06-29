import * as React from 'react';
import Router from './Router';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';

export default class Floom extends React.Component {
	render = () =>	<div className="body-container">
		<Router />
	</div>
}
