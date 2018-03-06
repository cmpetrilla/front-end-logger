module.exports = class Logger {
	constructor() {
		this.levels = Object.freeze({
			ERROR: 4,
			WARN: 3,
			INFO: 2,
			DEBUG: 1,
			OFF: 0
		});

		// Wacky syntax for this, but it ensures that the current level is private
		var _currentLevel = this.levels.OFF;

		this.getLevel = function() {
			return _currentLevel;
		};

		this.setLevel = function(newLevel) {
			let levelIsValid = false;

			for (let level in this.levels) {
				if (this.levels[level] === newLevel) {
					levelIsValid = true;
				}
			}
			if (levelIsValid) {
				_currentLevel = newLevel;
			} else {
				console.warn('Current level is not valid. Turning debugging off.');
				_currentLevel = this.levels.OFF;
			}
		}
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

	callConsoleFn(consoleMethod) {
		if (this.getLevel() !== this.levels.OFF && this.getLevel() <= this.levels[consoleMethod.toUpperCase()]) {
			console[consoleMethod](...arguments[1]);
		}
	}
};