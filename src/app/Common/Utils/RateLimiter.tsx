export default class RateLimiter {
	private running:boolean;
	private interval:NodeJS.Timeout;
	private rate:number;
	private queue:Function[];
	private lastAction:Function;

	constructor(rate:number){
		this.queue = [];
		this.rate = rate;
		this.start()
	}

	private execute = () => {
		if(!this.queue.length && !this.lastAction) {
			this.stop();
			return;
		}
		this.next();
	}

	private next = () => {
		if(!this.queue.length){
			if(this.lastAction){
				this.lastAction();
				this.lastAction = null;
				return;
			} else return;
		}
		let action = this.queue.shift();
		if(action === this.lastAction) this.lastAction = null;
		action();
	}

	private restart = () => {
		this.stop();
		this.start();
	}

	public start = () => {
		if(!this.running)
			this.interval = setInterval(this.execute, this.rate);
		this.running = true;
	}

	public stop = () => {
		if(this.running)
			clearInterval(this.interval);
		this.lastAction = null;
		this.queue = [];
		this.running = false;
	}

	public setRate = (rate:number) => {
		this.rate = rate;
		this.restart();
	}

	public enqueue = (action:Function) => {
		this.lastAction = action;
		this.queue.push(action);
		this.start();
	}

	public throttle = (action:Function) => {
		this.lastAction = action;
		//if(!this.queue.length)
		//	this.enqueue(action);
		this.start();
	}
}