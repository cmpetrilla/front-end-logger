const Logger = require('./Logger');
const chai = require('chai');
const spies = require('chai-spies');
const assert = chai.assert;
const expect = chai.expect;

chai.use(spies);

global.console.error = () => {};
global.console.warn = () => {};
global.console.info = () => {};
global.console.debug = () => {};

describe('Logger', function() {
	let logger;
	let callConsoleFnSpy;

	beforeEach(function() {
		logger = new Logger();

		callConsoleFnSpy = chai.spy.on(logger, 'callConsoleFn');
	});

	it('should be defined when initialized.', function() {
		assert.isDefined(logger, 'Logger has been defined');
	});

	it('should be turned off by default.', function() {
		assert.strictEqual(logger.getLevel(), logger.level.OFF);
	});

	it('should not log anything when turned off.', function() {
		logger.error();
		logger.warn();
		logger.info();
		logger.debug();

		expect(callConsoleFnSpy).to.not.have.been.called();
	});

	it('when current level is ERROR, should log error.', function() {
		logger.setLevel(logger.level.ERROR);
		assert.strictEqual(logger.getLevel(), logger.level.ERROR);

		logger.error();
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);

		logger.warn();
		logger.info();
		logger.debug();
		expect(callConsoleFnSpy).to.have.been.called.exactly(1);
	});

	it('when current level is WARN, should log warn, error.', function() {
		logger.setLevel(logger.level.WARN);
		assert.strictEqual(logger.getLevel(), logger.level.WARN);

		logger.error();
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);

		logger.warn();
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn);

		logger.info();
		logger.debug();
		expect(callConsoleFnSpy).to.have.been.called.exactly(2);
	});

	it('when current level is INFO, should log info, warn, error.', function() {
		logger.setLevel(logger.level.INFO);
		assert.strictEqual(logger.getLevel(), logger.level.INFO);

		logger.error();
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);

		logger.warn();
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn);

		logger.info();
		expect(callConsoleFnSpy).to.have.been.called.with(console.info);

		logger.debug();
		expect(callConsoleFnSpy).to.have.been.called.exactly(3);
	});

	it('when current level is DEBUG, should log debug, info, warn, error.', function() {
		logger.setLevel(logger.level.DEBUG);
		assert.strictEqual(logger.getLevel(), logger.level.DEBUG);

		logger.error();
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);

		logger.warn();
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn);

		logger.info();
		expect(callConsoleFnSpy).to.have.been.called.with(console.info);

		logger.debug();
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug);
		expect(callConsoleFnSpy).to.have.been.called.exactly(4);
	});

	it('should pass all arguments to console.error method.', function() {
		let msg1 = 'msg1';
		let msg2 = 'msg2';
		let obj = {};
		let arr = [];

		logger.setLevel(logger.level.ERROR);

		// No params
		logger.error();
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);

		// Single string
		logger.error(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, msg1);

		// Single object
		logger.error(obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, obj);

		// Single array
		logger.error(arr);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, arr);

		// Combination of params
		logger.error(msg1, msg2);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, msg1, msg2);

		logger.error(msg1, msg2, obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, msg1, msg2, obj);

		logger.error(msg1, msg2, obj, arr);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, msg1, msg2, obj, arr);
	});

	it('should pass all arguments to console.warn method.', function() {
		let msg1 = 'msg1';
		let msg2 = 'msg2';
		let obj = {};
		let arr = [];

		logger.setLevel(logger.level.WARN);

		// No params
		logger.warn();
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn);

		// Single string
		logger.warn(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, msg1);

		// Single object
		logger.warn(obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, obj);

		// Single array
		logger.warn(arr);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, arr);

		// Combination of params
		logger.warn(msg1, msg2);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, msg1, msg2);

		logger.warn(msg1, msg2, obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, msg1, msg2, obj);

		logger.warn(msg1, msg2, obj, arr);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, msg1, msg2, obj, arr);
	});

	it('should pass all arguments to console.info method.', function() {
		let msg1 = 'msg1';
		let msg2 = 'msg2';
		let obj = {};
		let arr = [];

		logger.setLevel(logger.level.INFO);

		// No params
		logger.info();
		expect(callConsoleFnSpy).to.have.been.called.with(console.info);

		// Single string
		logger.info(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, msg1);

		// Single object
		logger.info(obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, obj);

		// Single array
		logger.info(arr);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, arr);

		// Combination of params
		logger.info(msg1, msg2);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, msg1, msg2);

		logger.info(msg1, msg2, obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, msg1, msg2, obj);

		logger.info(msg1, msg2, obj, arr);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, msg1, msg2, obj, arr);
	});

	it('should pass all arguments to console.debug method.', function() {
		let msg1 = 'msg1';
		let msg2 = 'msg2';
		let obj = {};
		let arr = [];

		logger.setLevel(logger.level.DEBUG);

		// No params
		logger.debug();
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug);

		// Single string
		logger.debug(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, msg1);

		// Single object
		logger.debug(obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, obj);

		// Single array
		logger.debug(arr);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, arr);

		// Combination of params
		logger.debug(msg1, msg2);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, msg1, msg2);

		logger.debug(msg1, msg2, obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, msg1, msg2, obj);

		logger.debug(msg1, msg2, obj, arr);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, msg1, msg2, obj, arr);
	});
});

describe('Context', function() {
	let logger;
	let callConsoleFnSpy;

	beforeEach(function() {
		logger = new Logger();

		callConsoleFnSpy = chai.spy.on(logger, 'callConsoleFn');
	});

	it('should pass context to error function if specified.', function() {
		let contextMsg = 'context';
		let msg1 = 'msg1';
		let loggerWithContext = logger.context(contextMsg);

		logger.setLevel(logger.level.ERROR);
		loggerWithContext.error();
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, contextMsg);

		loggerWithContext.error(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, contextMsg, msg1);
	});

	it('should pass context to warn function if specified.', function() {
		let contextMsg = 'context';
		let msg1 = 'msg1';
		let loggerWithContext = logger.context(contextMsg);

		logger.setLevel(logger.level.WARN);
		loggerWithContext.warn();
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, contextMsg);

		loggerWithContext.warn(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, contextMsg, msg1);
	});

	it('should pass context to info function if specified.', function() {
		let contextMsg = 'context';
		let msg1 = 'msg1';
		let loggerWithContext = logger.context(contextMsg);

		logger.setLevel(logger.level.INFO);
		loggerWithContext.info();
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, contextMsg);

		loggerWithContext.info(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, contextMsg, msg1);
	});

	it('should pass context to debug function if specified.', function() {
		let contextMsg = 'context';
		let msg1 = 'msg1';
		let loggerWithContext = logger.context(contextMsg);

		logger.setLevel(logger.level.DEBUG);
		loggerWithContext.debug();
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, contextMsg);

		loggerWithContext.debug(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, contextMsg, msg1);
	});

	it.skip('should separate context from other calls.', function() {
		let msg1 = 'hello';
		let msg2 = 'world';
		let contextMsg = 'new context';
		let loggerWithContext = logger.context(contextMsg);

		logger.setLevel(logger.level.ERROR);

		loggerWithContext.error(msg1, msg2);
		expect(consoleErrorSpy).toHaveBeenCalledWith(contextMsg, msg1, msg2);

		logger.error(msg1, msg2);
		expect(consoleErrorSpy).toHaveBeenCalledWith(msg1, msg2);
	});
});