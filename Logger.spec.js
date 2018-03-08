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
		logger.warn();
		logger.info();
		logger.debug();

		expect(callConsoleFnSpy).to.have.been.called.exactly(1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);
	});

	it('when current level is WARN, should log warn, error.', function() {
		logger.setLevel(logger.level.WARN);
		assert.strictEqual(logger.getLevel(), logger.level.WARN);

		logger.error();
		logger.warn();
		logger.info();
		logger.debug();

		expect(callConsoleFnSpy).to.have.been.called.exactly(2);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn);
	});

	it('when current level is INFO, should log info, warn, error.', function() {
		logger.setLevel(logger.level.INFO);
		assert.strictEqual(logger.getLevel(), logger.level.INFO);

		logger.error();
		logger.warn();
		logger.info();
		logger.debug();

		expect(callConsoleFnSpy).to.have.been.called.exactly(3);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info);
	});

	it('when current level is DEBUG, should log debug, info, warn, error.', function() {
		logger.setLevel(logger.level.DEBUG);
		assert.strictEqual(logger.getLevel(), logger.level.DEBUG);

		logger.error();
		logger.warn();
		logger.info();
		logger.debug();

		expect(callConsoleFnSpy).to.have.been.called.exactly(4);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug);
	});

	it('should pass all arguments to console.error method.', function() {
		let msg1 = 'test';
		let msg2 = 'test2';
		let obj = {'testKey': 'testVal'};
		let arr = [1];

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
});

describe('Context', function() {
	let logger;
	let callConsoleFnSpy;

	beforeEach(function() {
		logger = new Logger();

		callConsoleFnSpy = chai.spy.on(logger, 'callConsoleFn');
	});

	it('should pass context to error function if specified.', function() {
		let msg1 = 'test';
		let contextMsg = 'context';
		let loggerWithContext = logger.context(contextMsg);

		logger.setLevel(logger.level.DEBUG);

		loggerWithContext.error(msg1);

		expect(callConsoleFnSpy).to.have.been.called.with(console.error, contextMsg, msg1);
		expect(callConsoleFnSpy).to.have.been.called.exactly(1);
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