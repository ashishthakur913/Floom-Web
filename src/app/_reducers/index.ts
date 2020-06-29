import { combineReducers } from 'redux-immutable';
import ShopReducer from '../Shop/_reducers/ShopReducer';
import PanelReducer from '../Panel/_reducers/PanelReducer';
import { ShopAction } from '../Shop/_actions/ShopActions'
import Store from '../_stores/Store';

const CreateReducer = (store:Store = new Store(), action: ShopAction):Store => {
	return combineReducers({
		shop: ShopReducer,
		panel: PanelReducer
	})(store, action) as Store;
}

export default CreateReducer;