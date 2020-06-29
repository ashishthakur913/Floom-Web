import * as Immutable from 'immutable';
import ShopStore from './../Shop/_stores/ShopStore';
import PanelStore from './../Panel/_stores/PanelStore';

export interface IStore {
	shop: ShopStore
	panel: PanelStore
}

export const defaultStore = Immutable.Record<IStore>({
	shop: new ShopStore(),
	panel: new PanelStore(),
});

export default class Store extends defaultStore implements IStore {}