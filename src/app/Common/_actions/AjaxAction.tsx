import { Dispatch } from 'redux';
import { Action, ActionPayload } from './Action';

type HTTPMethod = "GET" | "POST";

export type AjaxResponse = any;

export type AjaxActionType = "AJAX_ACTION";
export const AjaxActionType = "AJAX_ACTION";
export type AjaxActionStartType = "AJAX_ACTION_START";
export const AjaxActionStartType = "AJAX_ACTION_START";
export type AjaxActionEndType = "AJAX_ACTION_END";
export const AjaxActionEndType = "AJAX_ACTION_END";

export type AjaxActionPayload = {
	url: string
	limit?:number
	abortPrevious?:boolean
	preventDuplicates?:boolean
	method?: HTTPMethod
	onSuccess?: AjaxCallback
	onFailure?: AjaxCallback
	onAbort?: AjaxCallback
	data?: any
	raw?: boolean
	isMultiPart?: boolean
}

export interface AjaxAction extends AjaxActionPayload {
	type: AjaxActionType
}

export interface AjaxActionStart extends AjaxActionPayload {
	type: AjaxActionStartType
}

export interface AjaxActionEnd extends AjaxActionPayload {
	type: AjaxActionEndType
}

export type AjaxCallback = (response:AjaxResponse, dispatch:Dispatch) => void

export function createAjaxAction(payload: AjaxActionPayload): AjaxAction {
	return { type: AjaxActionType, ...payload}
}

export function createAjaxActionStart(payload: AjaxActionPayload): AjaxActionStart {
	return { type: AjaxActionStartType, ...payload}
}

export function createAjaxActionEnd(payload: AjaxActionPayload): AjaxActionEnd {
	return { type: AjaxActionEndType, ...payload}
}