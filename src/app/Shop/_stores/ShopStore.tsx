import * as Immutable from 'immutable';
import FlowerStore from '../../Flower/_stores/FlowerStore'

export interface IFlowerStore {
	flowers: Immutable.Set<FlowerStore>
}

const defaultStore = Immutable.Record<IFlowerStore>({
	flowers: Immutable.Set<FlowerStore>()
});

export default class ShopStore extends defaultStore implements IFlowerStore {}