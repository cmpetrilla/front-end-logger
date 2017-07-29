let Logger = (function() {
	// Logger is a singleton
	let instance;

	function init() {
		let level = {
			ERROR: 4,
			WARN: 3,
			INFO: 2,
			DEBUG: 1,
			OFF: 0
		};
		let currentLevel = 0;

		function debug() {
			return callConsoleFn('debug', arguments);
		}

		function info() {
			return callConsoleFn('info', arguments);
		}

		function warn() {
			return callConsoleFn('warn', arguments);
		}

		function error() {
			return callConsoleFn('error', arguments);
		}

		function setLevel(newLevel) {
			let levelIsValid = false;

			for (let key in level) {
				if (level[key] === newLevel) {
					levelIsValid = true;
				}
			}

			if (levelIsValid) {
				currentLevel = newLevel;
			} else {
				console.warn('Current level is not valid. Turning debugging off.');
			}
		}

		function getLevel() {
			return currentLevel;
		}

		function callConsoleFn(consoleMethod) {
			if (currentLevel !== level.OFF && currentLevel <= level[consoleMethod.toUpperCase()]) {
				console[consoleMethod](...arguments[1]);
			}
		}

		function context(contextMsg) {
			return {
				error: function() {
					error(contextMsg, ...arguments);
				},
				warn: function() {
					warn(contextMsg, ...arguments);
				},
				info: function() {
					info(contextMsg, ...arguments);
				},
				debug: function() {
					debug(contextMsg, ...arguments);
				}
			}
		}

		function resetValues() {
			// Used primarily to reset test cases, but doesn't hurt to be publicly available
			level = {
				ERROR: 4,
				WARN: 3,
				INFO: 2,
				DEBUG: 1,
				OFF: 0
			};
			currentLevel = level.OFF;
			contextMsg = '';
		}

		return {
			debug: debug,
			info: info,
			warn: warn,
			error: error,
			setLevel: setLevel,
			getLevel: getLevel,
			context: context,
			resetValues: resetValues,
			level: level
		};
	}

	return {
		// Get the singleton instance if one exists or create one if it doesn't
		getInstance: function () {
			if (!instance) {
				instance = init();
			}

			return instance;
		}
	};
})();

window.logger = Logger.getInstance();