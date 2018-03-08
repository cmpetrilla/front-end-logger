module.exports = class Logger {
	constructor() {
		this.level = Object.freeze({
			ERROR: 4,
			WARN: 3,
			INFO: 2,
			DEBUG: 1,
			OFF: 0
		});

		// Wacky syntax for this, but it ensures that the current level is private
		let _currentLevel = this.level.OFF;

		this.getLevel = () => _currentLevel;

		this.setLevel = (newLevel) => {
			let levelIsValid = false;

			for (let level in this.level) {
				if (this.level[level] === newLevel) {
					levelIsValid = true;
				}
			}
			if (levelIsValid) {
				_currentLevel = newLevel;
			} else {
				console.warn('Current level is not valid. Turning debugging off.');
				_currentLevel = this.level.OFF;
			}
		}
	}

	error() {
		if (this.checkCallConsoleFn(this.level.ERROR)) {
			this.callConsoleFn(console.error, ...arguments);
		}
	}

	warn() {
		if (this.checkCallConsoleFn(this.level.WARN)) {
			this.callConsoleFn(console.warn, ...arguments);
		}
	}

	info() {
		if (this.checkCallConsoleFn(this.level.INFO)) {
			this.callConsoleFn(console.info, ...arguments);
		}
	}

	debug() {
		if (this.checkCallConsoleFn(this.level.DEBUG)) {
			this.callConsoleFn(console.debug, ...arguments);
		}
	}

	checkCallConsoleFn(level) {
		let currentLevel = this.getLevel();

		return currentLevel !== this.level.OFF && currentLevel <= level;
	}

	callConsoleFn(fn) {
		fn(arguments[1]);
	}

	context(contextMsg) {
		return {
			error: function() {
				this.error(contextMsg, ...arguments);
			}.bind(this),
			warn: function() {
				this.warn(contextMsg, ...arguments);
			}.bind(this),
			info: function() {
				this.info(contextMsg, ...arguments);
			}.bind(this),
			debug: function() {
				this.debug(contextMsg, ...arguments);
			}.bind(this)
		}
	}
};