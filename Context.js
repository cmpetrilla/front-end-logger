const Logger = require('./Logger');

module.exports = class Context extends Logger {
	constructor(contextMsg) {
		super();

		let _contextMsg = contextMsg;

		this.getContextMsg = function() {
			return _contextMsg;
		}
	}

	error() {
		super.error(this.getContextMsg(), ...arguments);
	}
	warn() {
		super.warn(this.getContextMsg(), ...arguments);
	}

	info() {
		super.info(this.getContextMsg(), ...arguments);
	}

	debug() {
		super.debug(this.getContextMsg(), ...arguments);
	}
};