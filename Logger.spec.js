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

	let consoleErrorSpy;
	let consoleWarnSpy;
	let consoleInfoSpy;
	let consoleDebugSpy;

	beforeEach(function() {
		logger = new Logger();

		consoleErrorSpy = chai.spy.on(logger, 'error');
		consoleWarnSpy = chai.spy.on(logger, 'warn');
		consoleInfoSpy = chai.spy.on(logger, 'info');
		consoleDebugSpy = chai.spy.on(logger, 'debug');
	});

	it('should be defined.', function() {
		assert.isDefined(logger, 'Logger has been defined');
	});

	it('should be turned off by default.', function() {
		assert.strictEqual(logger.currentLevel, logger.levels.OFF);
	});

	it('should log Debug and up when current level is Debug.', function() {
		logger.setLevel(logger.levels.DEBUG);
		assert.strictEqual(logger.currentLevel, logger.levels.DEBUG);

		logger.error();
		expect(consoleErrorSpy).to.have.been.called();

		logger.warn();
		expect(consoleWarnSpy).to.have.been.called();

		logger.info();
		expect(consoleInfoSpy).to.have.been.called();

		logger.debug();
		expect(consoleDebugSpy).to.have.been.called();
	});

	it.skip('should log Info and up when current level is Info.', function() {
		logger.setLevel(logger.levels.INFO);
		console.log('current level =>', logger.currentLevel);
		assert.strictEqual(logger.currentLevel, logger.levels.INFO);

		logger.error();
		expect(consoleErrorSpy).to.have.been.called();

		logger.warn();
		expect(consoleWarnSpy).to.have.been.called();

		logger.info();
		expect(consoleInfoSpy).to.have.been.called();

		logger.debug();
		expect(consoleDebugSpy).to.not.have.been.called();
	});

	it.skip('should log Warn and up when current level is Warn.', function() {
		logger.setLevel(logger.level.WARN);
		expect(logger.getLevel()).toBe(logger.level.WARN);

		logger.error();
		expect(consoleErrorSpy).toHaveBeenCalled();

		logger.warn();
		expect(consoleWarnSpy).toHaveBeenCalled();

		logger.info();
		expect(consoleInfoSpy).not.toHaveBeenCalled();

		logger.debug();
		expect(consoleDebugSpy).not.toHaveBeenCalled();
	});

	it.skip('should log Error and up when current level is Error.', function() {
		logger.setLevel(logger.level.ERROR);
		expect(logger.getLevel()).toBe(logger.level.ERROR);

		logger.error();
		expect(consoleErrorSpy).toHaveBeenCalled();

		logger.warn();
		expect(consoleWarnSpy).not.toHaveBeenCalled();

		logger.info();
		expect(consoleInfoSpy).not.toHaveBeenCalled();

		logger.debug();
		expect(consoleDebugSpy).not.toHaveBeenCalled();
	});

	it.skip('should not log when turned off, which is the default state.', function() {
		logger.error();
		expect(consoleErrorSpy).not.toHaveBeenCalled();

		logger.warn();
		expect(consoleWarnSpy).not.toHaveBeenCalled();

		logger.info();
		expect(consoleInfoSpy).not.toHaveBeenCalled();

		logger.debug();
		expect(consoleDebugSpy).not.toHaveBeenCalled();
	});

	it.skip('should pass all arguments to appropriate console method.', function() {
		let msg1 = 'hello';
		let msg2 = 'world';
		let msg3 = '!!!';

		logger.setLevel(logger.level.ERROR);

		logger.error(msg1, msg2);
		expect(consoleErrorSpy).toHaveBeenCalledWith(msg1, msg2);

		logger.error(msg1, msg2, msg3);
		expect(consoleErrorSpy).toHaveBeenCalledWith(msg1, msg2, msg3);
	});

	it.skip('should pass context if specified.', function() {
		let msg1 = 'hello';
		let msg2 = 'world';
		let contextMsg = 'new context';

		let loggerWithContext = logger.context(contextMsg);

		logger.setLevel(logger.level.ERROR);
		loggerWithContext.error(msg1, msg2);
		expect(consoleErrorSpy).toHaveBeenCalledWith(contextMsg, msg1, msg2);
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
	})
});