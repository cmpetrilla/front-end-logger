const Logger = require('./Logger');
const Context = require('./Context');
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

	it('should be defined.', function() {
		assert.isDefined(logger, 'Logger has been defined');
	});

	it('should be turned off by default.', function() {
		assert.strictEqual(logger.getLevel(), logger.levels.OFF);
	});

	it('should not anything log when turned off.', function() {
		logger.error();
		logger.warn();
		logger.info();
		logger.debug();

		expect(callConsoleFnSpy).to.not.have.been.called();
	});

	it('should log Error current level is Error.', function() {
		logger.setLevel(logger.levels.ERROR);
		assert.strictEqual(logger.getLevel(), logger.levels.ERROR);

		logger.error();
		logger.warn();
		logger.info();
		logger.debug();

		expect(callConsoleFnSpy).to.have.been.called.exactly(1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);
	});

	it('should log Warn and up when current level is Warn.', function() {
		logger.setLevel(logger.levels.WARN);
		assert.strictEqual(logger.getLevel(), logger.levels.WARN);

		logger.error();
		logger.warn();
		logger.info();
		logger.debug();

		expect(callConsoleFnSpy).to.have.been.called.exactly(2);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn);
	});

	it('should log Info and up when current level is Info.', function() {
		logger.setLevel(logger.levels.INFO);
		assert.strictEqual(logger.getLevel(), logger.levels.INFO);

		logger.error();
		logger.warn();
		logger.info();
		logger.debug();

		expect(callConsoleFnSpy).to.have.been.called.exactly(3);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info);
	});

	it('should log Debug and up when current level is Debug.', function() {
		logger.setLevel(logger.levels.DEBUG);
		assert.strictEqual(logger.getLevel(), logger.levels.DEBUG);

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

	it('should pass all arguments to appropriate console method.', function() {
		let msg1 = 'test';
		let obj = {'testKey': 'testVal'};

		logger.setLevel(logger.levels.DEBUG);

		// error
		logger.error(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, msg1);

		logger.error(obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, obj);

		logger.error(msg1, obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.error, msg1, obj);

		// warn
		logger.warn(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, msg1);

		logger.warn(obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, obj);

		logger.warn(msg1, obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.warn, msg1, obj);

		// info
		logger.info(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, msg1);

		logger.info(obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, obj);

		logger.info(msg1, obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.info, msg1, obj);

		//debug
		logger.debug(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, msg1);

		logger.debug(obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, obj);

		logger.debug(msg1, obj);
		expect(callConsoleFnSpy).to.have.been.called.with(console.debug, msg1, obj);
	});
});

describe('Context', function() {
	let logger;
	let callConsoleFnSpy;

	beforeEach(function() {
		logger = new Logger();
		logger.context = function(contextMsg) {
			return new Context(contextMsg);
		};

		callConsoleFnSpy = chai.spy.on(logger, 'callConsoleFn');
	});

	it.skip('should pass context if specified.', function() {
		let msg1 = 'test';
		let contextMsg = 'context';

		let loggerWithContext = logger.context(contextMsg);

		logger.setLevel(logger.levels.ERROR);
		loggerWithContext.error(msg1);
		expect(callConsoleFnSpy).to.have.been.called.with(contextMsg, msg1);
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