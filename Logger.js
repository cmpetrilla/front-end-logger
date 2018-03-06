module.exports = class Logger {
	constructor() {
		this.levels = Object.freeze({
			ERROR: 4,
			WARN: 3,
			INFO: 2,
			DEBUG: 1,
			OFF: 0
		});
		this.currentLevel = this.levels.OFF;
	}

	error() {
		this.callConsoleFn('error', arguments);
	}

	warn() {
		this.callConsoleFn('warn', arguments);
	}

	info() {
		this.callConsoleFn('info', arguments);
	}

	debug() {
		this.callConsoleFn('debug', arguments);
	}

	setLevel(newLevel) {
		let levelIsValid = false;

		for (let level in this.levels) {
			if (this.levels[level] === newLevel) {
				levelIsValid = true;
				console.log('level is set');
			}
		}
		if (levelIsValid) {
			this.currentLevel = newLevel;
		} else {
			console.warn('Current level is not valid. Turning debugging off.');
			this.currentLevel = this.levels.OFF;
		}
	}

	getLevel() {
		return this.currentLevel;
	}

	callConsoleFn(consoleMethod) {
		if (this.currentLevel !== this.levels.OFF && this.currentLevel <= this.levels[consoleMethod.toUpperCase()]) {
			console[consoleMethod](...arguments[1]);
		}
	}
};