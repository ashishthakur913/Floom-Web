import * as React from 'react';
import FlowerStore from '../_stores/FlowerStore';
import StarRatings from 'react-star-ratings';

export type Props = {
	flower: FlowerStore
};

type State = {
	addedToCart: boolean
}

export default class Flower extends React.Component<Props> {

	state = {
		addedToCart: false,
	} as State

	private toggleAddToCart() {
		this.setState({addedToCart: !this.state.addedToCart})
	}

	render = () => {
		let imageURL = this.props.flower.get('image_url')
		// added a placeholder if there is no image
		imageURL = imageURL ? imageURL : "/assets/img/flower.png"
		let addToCartText = this.state.addedToCart ? 'Remove from cart' : 'Add to cart';
		let addToCartVisibility = this.state.addedToCart ? 'visible' : '';
		return <div className="flower-container" >
			<div className="image-container">
				<img className="image" src={imageURL}  />
				<div className="add-to-cart-overlay" onClick={this.toggleAddToCart.bind(this)}>
					<div className="add-to-cart-btn">{addToCartText}</div>
				</div>
				<div className={"in-cart-btn " + addToCartVisibility}>In cart</div>
			</div>
			<div className="meta-data">
				<div className="name">{this.props.flower.get('name')}</div>
				<div className="price">${this.props.flower.get('price')}</div>
				<StarRatings
					rating={Number(this.props.flower.get('rating'))}
					starDimension="15px"
					starSpacing="3px"
					numberOfStars={5}
					starRatedColor="#454549"
					name='rating'
					x={false}
				/>
			</div>
		</div>
	}
}