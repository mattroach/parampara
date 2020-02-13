/**
 * Setup the winston logger.
 *
 * Documentation: https://github.com/winstonjs/winston
 */

import { createLogger, format, transports } from 'winston'

// Import Functions
const { Console } = transports

// Init Logger
const winstonLogger = createLogger({
  level: 'info',
})

const errorStackFormat = format((info) => {
  if (info.stack) {
    // tslint:disable-next-line:no-console
    console.log(info.stack)
    return false
  }
  return info
})
const consoleTransport = new Console({
  format: format.combine(
    format.colorize(),
    format.simple(),
    errorStackFormat(),
  ),
})
winstonLogger.add(consoleTransport)

// Export logger
export const logger = winstonLogger
