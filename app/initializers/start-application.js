import ErrorLogger from "../loggers/error-logger";

export function initialize(application) {
  application.register("logger:error", ErrorLogger);

  application.inject("component", "errorLogger", "logger:error");
  application.inject("route", "errorLogger", "logger:error");
  application.inject("controller", "errorLogger", "logger:error");
}

export default {
  initialize,
};
