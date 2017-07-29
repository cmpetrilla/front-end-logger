describe('Logger', function() {
	let logger = window.logger;

	let consoleErrorSpy;
	let consoleWarnSpy;
	let consoleInfoSpy;
	let consoleDebugSpy;

	beforeEach(function() {
		consoleErrorSpy = spyOn(console, 'error');
		consoleWarnSpy = spyOn(console, 'warn');
		consoleInfoSpy = spyOn(console, 'info');
		consoleDebugSpy = spyOn(console, 'debug');

		logger.resetValues();
	});

	it('should be defined.', function() {
		expect(logger).toBeDefined();
	});

	it('should be turned off by default.', function() {
		expect(logger.getLevel()).toBe(logger.level.OFF);
	});

	it('should log Debug and up when current level is Debug.', function() {
		logger.setLevel(logger.level.DEBUG);
		expect(logger.getLevel()).toBe(logger.level.DEBUG);

		logger.error();
		expect(consoleErrorSpy).toHaveBeenCalled();

		logger.warn();
		expect(consoleWarnSpy).toHaveBeenCalled();

		logger.info();
		expect(consoleInfoSpy).toHaveBeenCalled();

		logger.debug();
		expect(consoleDebugSpy).toHaveBeenCalled();
	});

	it('should log Info and up when current level is Info.', function() {
		logger.setLevel(logger.level.INFO);
		expect(logger.getLevel()).toBe(logger.level.INFO);

		logger.error();
		expect(consoleErrorSpy).toHaveBeenCalled();

		logger.warn();
		expect(consoleWarnSpy).toHaveBeenCalled();

		logger.info();
		expect(consoleInfoSpy).toHaveBeenCalled();

		logger.debug();
		expect(consoleDebugSpy).not.toHaveBeenCalled();
	});

	it('should log Warn and up when current level is Warn.', function() {
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

	it('should log Error and up when current level is Error.', function() {
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

	it('should not log when turned off, which is the default state.', function() {
		logger.error();
		expect(consoleErrorSpy).not.toHaveBeenCalled();

		logger.warn();
		expect(consoleWarnSpy).not.toHaveBeenCalled();

		logger.info();
		expect(consoleInfoSpy).not.toHaveBeenCalled();

		logger.debug();
		expect(consoleDebugSpy).not.toHaveBeenCalled();
	});

	it('should pass all arguments to appropriate console method.', function() {
		let msg1 = 'hello';
		let msg2 = 'world';
		let msg3 = '!!!';

		logger.setLevel(logger.level.ERROR);

		logger.error(msg1, msg2);
		expect(consoleErrorSpy).toHaveBeenCalledWith(msg1, msg2);

		logger.error(msg1, msg2, msg3);
		expect(consoleErrorSpy).toHaveBeenCalledWith(msg1, msg2, msg3);
	});

	it('should pass context if specified.', function() {
		let msg1 = 'hello';
		let msg2 = 'world';
		let contextMsg = 'new context';

		let loggerWithContext = logger.context(contextMsg);

		logger.setLevel(logger.level.ERROR);
		loggerWithContext.error(msg1, msg2);
		expect(consoleErrorSpy).toHaveBeenCalledWith(contextMsg, msg1, msg2);
	});

	it('should separate context from other calls.', function() {
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