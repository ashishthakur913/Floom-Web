import * as React from 'react';
import { Link } from "react-router-dom";

export default class Class extends React.Component {

	render = () => {
		return <div className="header">
			<Link to="/">
				<span className="logo">Floom</span>
			</Link>
			<Link to="/panel">
				<span className="panel-link">Panel</span>
			</Link>
    	</div>
	}
}