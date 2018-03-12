# Front-end logger

This is a customizable front-end Javascript logger that wraps the `console` functions.

## Usage
Included is a single `Logger` class that you can use to create instances of the custom logger. It's turned off by default, but you can set a threshold for the messages. For example, if you only want error-level messages, you can use this custom logger to suppress info, warn, and debug messages.

This also allows you to create a logger with a context, which is a message that is prepended to the corresponding console function.

See below for usage examples. You can test this live for yourself through the index file—a new logger instance will be available on `window.logger`.

## Example with errors
This assumes you want to create a custom logger that only shows error messages.

1. Create a new logger with `new Logger()`.
2. Set the level with `logger.setLevel(logger.level.ERROR)`.
3. Call the console function with `logger.ERROR('test')`.

This also applies to the `warn`, `info`, and `debug`.

## Example with context
This assumes you've already instantiated Logger on variable `logger`.

1. Create a new context with `let loggerWithContext = logger.context('new context')`.
2. Call the console function with `loggerWithContext.error('test')` (output will be `new context error`).

The context shares the same threshold as `logger`.

## Test coverage
This uses Mocha and Chai for unit tests. To set up the repo locally and run unit tests, follow these steps:
1. Clone this repo.
2. In the root directory of this repo, run `npm install`.
3. In the same directory, run `npm test` to run unit tests.
