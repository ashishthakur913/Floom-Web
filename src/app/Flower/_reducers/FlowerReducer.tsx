import * as Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import FlowerStore from '../_stores/FlowerStore';
import { FlowerAction, FlowerActionType } from '../_actions/FlowerActions';

const ClassReducer = (store:FlowerStore = new FlowerStore(), action: FlowerAction):FlowerStore => {
	switch (action.type) {
		case FlowerActionType.UpdateName:
			return store.withMutations(store => {
				store.set('name', action.name);
			});
			break;
	}

	return store;
}

export default ClassReducer