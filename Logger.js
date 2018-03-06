const levels = require('./levels');

module.exports = class Logger {
	constructor() {
		this.currentLevel = levels.OFF;
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

		for (let level in levels) {
			if (levels[level] === newLevel) {
				levelIsValid = true;
				console.log('level is set');
			}
		}
		if (levelIsValid) {
			this.currentLevel = newLevel;
		} else {
			console.warn('Current level is not valid. Turning debugging off.');
			this.currentLevel = levels.OFF;
		}
	}

	callConsoleFn(consoleMethod) {
		if (this.currentLevel !== levels.OFF && this.currentLevel <= levels[consoleMethod.toUpperCase()]) {
			console[consoleMethod](...arguments[1]);
		}
	}
};