const Logger = require('./Logger');

module.exports = class Context extends Logger {
	constructor(contextMsg) {
		super();
		this.contextMsg = contextMsg;
	}

	error() {
		super.error(this.contextMsg, ...arguments);
	}
	warn() {
		super.warn(this.contextMsg, ...arguments);
	}

	info() {
		super.info(this.contextMsg, ...arguments);
	}

	debug() {
		super.debug(this.contextMsg, ...arguments);
	}
};