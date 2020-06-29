import * as Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import ShopStore from '../_stores/ShopStore';
import { ShopAction, ShopActionType } from '../_actions/ShopActions';
import FlowerStore, { IFlowerStore } from '../../Flower/_stores/FlowerStore'

const ShopReducer = (store:ShopStore = new ShopStore(), action: ShopAction):ShopStore => {
	switch (action.type) {
		case ShopActionType.SetFlowers:
			return store.withMutations(store => {
				let flowers = Immutable.Set<FlowerStore>(
					action.flowers.map((flowerObj) => {
						const flower = new FlowerStore({
							id: flowerObj.Id,
							image_url: flowerObj.ImageURL,
							name: flowerObj.Name,
							price: flowerObj.Price,
							rating: flowerObj.Rating
						});
						return flower;
					})
				);
				store.set('flowers', flowers);
			});
			break;
	}

	return store;
}

export default ShopReducer