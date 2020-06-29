import * as Immutable from 'immutable';
import FlowerStore from '../../Flower/_stores/FlowerStore'

export interface IPanelStore {
	uploadedImageUrl: string
}

const defaultStore = Immutable.Record<IPanelStore>({
	uploadedImageUrl: ""
});

export default class PanelStore extends defaultStore implements IPanelStore {}