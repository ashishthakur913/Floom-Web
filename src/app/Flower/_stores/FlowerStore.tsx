import * as Immutable from 'immutable';

export interface IFlowerStore {
	id: string
	image_url: string
	name: string
	price: string
	rating: string
}

const defaultStore = Immutable.Record<IFlowerStore>({
	id: "0",
	image_url: "",
	name: "",
	price: "",
	rating: ""
});

export default class FlowerStore extends defaultStore implements IFlowerStore {}