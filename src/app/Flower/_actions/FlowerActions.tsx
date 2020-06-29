import { Dispatch, AnyAction } from "redux";
import { createAjaxAction, AjaxResponse } from '../../Common/_actions/AjaxAction';
import { createAction } from '../../Common/_actions/Action';

export enum FlowerActionType {
	UpdateName					= "UPDATE_FLOWER_NAME",
}

export const UpdateName = (name: string) => createAction(FlowerActionType.UpdateName, {
	name: name
});

export type FlowerAction = 
	ReturnType<typeof UpdateName>

	