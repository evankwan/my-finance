/**
 * @class Logger
 * @classdesc a general logging class to write to a log file for the current date
 * @function info(): void
 * @function error(): void
 */
class Logger {
	constructor() { }
	/**
	* @private holds the file that the Logger will write to
	* @static
	*/
	static #currentLogFile;
	/**
	* @private sets the currentLogFile that the Logger will write to
	* checks for a Log file for the current date, if one does not exist it creates one
	* @static
	*/
	static #setCurrentLogFile() { }
	/**
	* @private writes a log to the currentLogFile
	* @param {string} type - one of ["info", "error"]
	*/
	#log() { }
	/**
	* writes an info log to the currentLogFile
	*/
	info() { }
	/**
	* writes an error log to the currentLogFile
	*/
	error() { }
}

const logger = new Logger()

export default logger