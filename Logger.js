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
		if (this.checkCallConsoleFn(this.levels.ERROR)) {
			this.callConsoleError(...arguments);
		}
	}

	warn() {
		if (this.checkCallConsoleFn(this.levels.WARN)) {
			this.callConsoleWarn(...arguments);
		}
	}

	info() {
		if (this.checkCallConsoleFn(this.levels.INFO)) {
			this.callConsoleInfo(...arguments);
		}
	}

	debug() {
		if (this.checkCallConsoleFn(this.levels.DEBUG)) {
			this.callConsoleDebug(...arguments);
		}
	}

	checkCallConsoleFn(level) {
		let currentLevel = this.getLevel();

		return currentLevel !== this.levels.OFF && currentLevel <= level;
	}

	static callConsoleError() {
		console.error(arguments);
	}

	static callConsoleWarn() {
		console.warn(arguments);
	}

	static callConsoleInfo() {
		console.info(arguments);
	}

	static callConsoleDebug() {
		console.debug(arguments);
	}
};