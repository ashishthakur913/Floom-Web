import * as Immutable from 'immutable';
import { Dispatch, AnyAction } from "redux";
import { createAjaxAction, AjaxResponse } from '../../Common/_actions/AjaxAction';
import { createAction } from '../../Common/_actions/Action';
import FlowerStore from '../../Flower/_stores/FlowerStore'

export enum PanelActionType {
	SetImageUrl	= "SET_IMAGE_URL",
}

export const SetImageUrl = (url: string) => createAction(PanelActionType.SetImageUrl, {
	url: url
});


export const AddFlower = (flower: FlowerStore) => createAjaxAction({
	url: "api/v1.0/flower/",
	method: "POST",
	data: JSON.stringify(flower),
	onSuccess: (response, dispatch) => {
		console.log(response, 'Done!')
	},
	onFailure: (response, dispatch) => {
		console.log('Something went wrong')
	}
});

export const UploadImage = (fd: FormData) => createAjaxAction({
	url: "api/v1.0/file/",
	method: "POST",
	data: fd,
	isMultiPart: true,
	onSuccess: (response, dispatch) => {
		console.log(response, 'Done!')
		dispatch(SetImageUrl(response.url))
	},
	onFailure: (response, dispatch) => {
		console.log('Something went wrong')
	}
});


export type PanelAction = 
	ReturnType<typeof SetImageUrl>

	