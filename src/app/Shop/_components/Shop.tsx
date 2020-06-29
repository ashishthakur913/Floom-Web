import * as Immutable from 'immutable';
import * as React from 'react';
import FlowerStore from '../../Flower/_stores/FlowerStore'
import FlowerContainer from '../../Flower/_containers/FlowerContainer'
import { Link } from "react-router-dom";

export type Props = {
	flowers?: Immutable.Set<FlowerStore>,
	fetchFlowers?: Function
};

export default class Shop extends React.Component<Props> {

	componentDidMount() {
		this.props.fetchFlowers()
	}

	render = () => {
		return <div className="shop-container">
			<div className="catalogue">
				{this.props.flowers && this.props.flowers.map((flower) => {
					return <FlowerContainer flower={flower} />
				})}
				{!this.props.flowers.size &&
					<div className="no-content-placeholder">
						<img className="placeholder-image" src="/assets/img/empty-state.jpg" />
						<span className="message">No flowers in the shop</span>
						<Link to="/panel">
							<div className="add-more-btn">Add flowers</div>
						</Link>
					</div>
				}
			</div>
		</div>
	}
}