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

		consoleErrorSpy = chai.spy.on(logger, 'callConsoleError');
		consoleWarnSpy = chai.spy.on(logger, 'callConsoleWarn');
		consoleInfoSpy = chai.spy.on(logger, 'callConsoleInfo');
		consoleDebugSpy = chai.spy.on(logger, 'callConsoleDebug');
	});

	it('should be defined.', function() {
		assert.isDefined(logger, 'Logger has been defined');
	});

	it('should be turned off by default.', function() {
		assert.strictEqual(logger.getLevel(), logger.levels.OFF);
	});

	it('should not anything log when turned off.', function() {
		logger.error();
		expect(consoleErrorSpy).to.not.have.been.called();

		logger.warn();
		expect(consoleWarnSpy).to.not.have.been.called();

		logger.info();
		expect(consoleInfoSpy).to.not.have.been.called();

		logger.debug();
		expect(consoleDebugSpy).to.not.have.been.called();
	});

	it('should log Error current level is Error.', function() {
		logger.setLevel(logger.levels.ERROR);
		assert.strictEqual(logger.getLevel(), logger.levels.ERROR);

		logger.error();
		expect(consoleErrorSpy).to.have.been.called();

		logger.warn();
		expect(consoleWarnSpy).to.not.have.been.called();

		logger.info();
		expect(consoleInfoSpy).to.not.have.been.called();

		logger.debug();
		expect(consoleDebugSpy).to.not.have.been.called();
	});

	it('should log Warn and up when current level is Warn.', function() {
		logger.setLevel(logger.levels.WARN);
		assert.strictEqual(logger.getLevel(), logger.levels.WARN);

		logger.error();
		expect(consoleErrorSpy).to.have.been.called();

		logger.warn();
		expect(consoleWarnSpy).to.have.been.called();

		logger.info();
		expect(consoleInfoSpy).to.not.have.been.called();

		logger.debug();
		expect(consoleDebugSpy).to.not.have.been.called();
	});

	it('should log Info and up when current level is Info.', function() {
		logger.setLevel(logger.levels.INFO);
		assert.strictEqual(logger.getLevel(), logger.levels.INFO);

		logger.error();
		expect(consoleErrorSpy).to.have.been.called();

		logger.warn();
		expect(consoleWarnSpy).to.have.been.called();

		logger.info();
		expect(consoleInfoSpy).to.have.been.called();

		logger.debug();
		expect(consoleDebugSpy).to.not.have.been.called();
	});

	it('should log Debug and up when current level is Debug.', function() {
		logger.setLevel(logger.levels.DEBUG);
		assert.strictEqual(logger.getLevel(), logger.levels.DEBUG);

		logger.error();
		expect(consoleErrorSpy).to.have.been.called();

		logger.warn();
		expect(consoleWarnSpy).to.have.been.called();

		logger.info();
		expect(consoleInfoSpy).to.have.been.called();

		logger.debug();
		expect(consoleDebugSpy).to.have.been.called();
	});

	it.skip('should pass all arguments to appropriate console method.', function() {
		let msg1 = 'test';

		logger.setLevel(logger.levels.ERROR);

		logger.error(msg1, msg2);
		expect(consoleErrorSpy).to.have.been.called.with(msg1, msg2);

		logger.error(msg1, msg2, msg3);
		expect(consoleErrorSpy).to.have.been.called.with(msg1, msg2, msg3);

		logger.warn(msg1, msg2);
		expect(consoleWarnSpy).to.have.been.called.with(msg1, msg2);

		logger.warn(msg1, msg2, msg3);
		expect(consoleWarnSpy).to.have.been.called.with(msg1, msg2, msg3);

		logger.info(msg1, msg2);
		expect(consoleInfoSpy).to.have.been.called.with(msg1, msg2);

		logger.info(msg1, msg2, msg3);
		expect(consoleInfoSpy).to.have.been.called.with(msg1, msg2, msg3);

		logger.debug(msg1, msg2);
		expect(consoleDebugSpy).to.have.been.called.with(msg1, msg2);

		logger.debug(msg1, msg2, msg3);
		expect(consoleDebugSpy).to.have.been.called.with(msg1, msg2, msg3);
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