import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import { AjaxAction, AjaxActionType, createAjaxActionStart, createAjaxActionEnd, AjaxActionPayload, AjaxResponse } from '../_actions/AjaxAction';
import { createAction } from '../_actions/Action';
import { MiddlewareAPI, Dispatch, Middleware, AnyAction } from "redux";
import RateLimiter from '../Utils/RateLimiter';
import { API_HOST } from '../../config/config.json';

// Rate Limiters & Abort Controllers
let tracker:string[] = [];
let rateLimiters:{[key:string]:RateLimiter} = {};
let abortControllers:{[key:string]:AbortController} = {};

const AjaxMiddleware: Middleware<Dispatch> = ({dispatch}: MiddlewareAPI) => next => (action: AnyAction | AjaxAction) => {
	let { url, method = "GET", data, limit, abortPrevious, preventDuplicates, onSuccess, onFailure, onAbort, raw } = action;
	const {type, ...payload} = action;

	if (type != AjaxActionType) return next(action);

	let controller = new AbortController();

	let callable = async () => {
		dispatch(createAjaxActionStart(payload as AjaxActionPayload));

		let options:RequestInit = {
			method: method,
			signal: controller.signal,
			mode: 'cors',
		};

		if(data){
			if(method == "GET"){
				let dataObject:{[key:string]:string} = {};
				data.forEach((v:string, k:string) => {dataObject[encodeURIComponent(k)] = encodeURIComponent(v)});
				url = url + "?" + new URLSearchParams(Object.entries(dataObject));
			} else if (method == "POST") {
				options.body = data;
			}
		}

		let end = () => dispatch(createAjaxActionEnd(payload as AjaxActionPayload));

		return fetch(API_HOST + url, options)
			.then(response => { 
				if(preventDuplicates && (tracker.indexOf(url) !== -1)){
					tracker.splice(tracker.indexOf(url), 1);
				}
				if(response.type != "basic") raw = true;
				return response.json()
			})
			.then(response => {
				if(!raw && response.code !== 200) throw response;
				onSuccess && onSuccess(response as AjaxResponse, dispatch)
				end();
			})
			.catch(response => {
				if(response.name === 'AbortError') return onAbort && onAbort(response as AjaxResponse, dispatch);
				let out = onFailure && onFailure(response as AjaxResponse, dispatch);
				end();
				return out;
			})
	}

	if(preventDuplicates){
		if(tracker.indexOf(url) !== -1) return
		tracker.push(url);
	}

	if(abortPrevious) {
		if(abortControllers[url]) abortControllers[url].abort();
		abortControllers[url] = controller;
	}

	if(limit) {
		if(!rateLimiters[url]) rateLimiters[url] = new RateLimiter(limit);
		rateLimiters[url].throttle(callable);
	} else return callable();
};

export default AjaxMiddleware;