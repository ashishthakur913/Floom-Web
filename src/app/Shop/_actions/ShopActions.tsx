import * as Immutable from 'immutable';
import { Dispatch, AnyAction } from "redux";
import { createAjaxAction, AjaxResponse } from '../../Common/_actions/AjaxAction';
import { createAction } from '../../Common/_actions/Action';
import FlowerStore from '../../Flower/_stores/FlowerStore'

export enum ShopActionType {
	SetFlowers	= "SET_FLOWERS",
}

export const SetFlowers = (flowers: Immutable.OrderedMap<string, FlowerStore>) => createAction(ShopActionType.SetFlowers, {
	flowers: flowers
});


export const FetchFlowers = () => createAjaxAction({
	url: "api/v1.0/flower/",
	method: "GET",
	onSuccess: (response, dispatch) => {
		dispatch(SetFlowers(response.flowers))
	},
	onFailure: (response, dispatch) => {
		console.log('Something went wrong')
	}
});


export type ShopAction = 
	ReturnType<typeof SetFlowers>

	