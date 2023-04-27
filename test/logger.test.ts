import pinoLogger from "pino";
import {createWriteStream, Sentry} from "../src";

test('Test logger creation', () => {
  const SENTRY_DSN = "https://123@123.ingest.sentry.io/123";

  const options = {
    level: "info"
  };

  const stream = createWriteStream({ dsn: SENTRY_DSN, initializeSentry: true });

  const logger = pinoLogger(options, stream);
  expect(Sentry.init).toHaveBeenCalled();

  logger.info('testtt info log');
  logger.error('testtt log');
});


test("should not initialize sentry when initializeSentry is false", () => {
  const SENTRY_DSN = "https://123@123.ingest.sentry.io/123";

  const options = {
    level: "info"
  };

  const stream = createWriteStream({ dsn: SENTRY_DSN, initializeSentry: true });

  pinoLogger(options, stream);

  expect(Sentry.init).toHaveBeenCalled();
});
