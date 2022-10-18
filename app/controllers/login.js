import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  session: service(),

  actions: {
    async login(user) {
      const errorLogger = this.get("errorLogger");

      try {
        await this.get("session").authenticate("authenticator:jwt", {
          email: user.email,
          password: user.password,
        });
      } catch (e) {
        this.send("error", e);
        const err = await errorLogger.createError(e);
        await this.get("store").createRecord("error", err).save();
      }
    },

    error(error) {
      if (error instanceof Error) {
        return true;
      }

      this.set("errors", error.json.errors);
      return false;
    },
  },

  resetErrors() {
    this.set("errors", {});
  },
});
