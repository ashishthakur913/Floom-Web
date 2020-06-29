export type ActionType = string;

export type ActionPayload = { [x: string]: any }

export interface Action<T extends string, ActionPayload> {type: T; [x: string]: any}

export const createAction = function<T extends string, ActionPayload>(type: T, payload?: ActionPayload): Action<T, ActionPayload> {
	return payload ? { type, ...payload} : { type }
}