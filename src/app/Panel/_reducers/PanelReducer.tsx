import * as Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import PanelStore from '../_stores/PanelStore';
import { PanelAction, PanelActionType } from '../_actions/PanelActions';
import FlowerStore, { IFlowerStore } from '../../Flower/_stores/FlowerStore'

const ShopReducer = (store:PanelStore = new PanelStore(), action: PanelAction):PanelStore => {
	switch (action.type) {
		case PanelActionType.SetImageUrl:
			return store.withMutations(store => {
				store.set('uploadedImageUrl', action.url);
			});
			break;
	}

	return store;
}

export default ShopReducer