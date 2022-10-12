import Component from "@ember/component";
import fetch from "fetch";
import ENV from "book-demo/config/environment";
import { validator, buildValidations } from "ember-cp-validations";

const Validations = buildValidations({
  email: [
    validator("ds-error"),
    validator("presence", true),
    validator("format", {
      type: "email",
    }),
  ],
  password: [
    validator("ds-error"),
    validator("presence", true),
    validator("length", {
      min: 4,
      max: 8,
    }),
  ],
});

export default Component.extend(Validations, {
  iAmRobot: true,
  reset: false,

  actions: {
    async saveUser(e) {
      e.preventDefault();
      this.set("isInvalid", !this.get("validations.isValid"));
      if (!this.get("isInvalid")) {
        this.get("onSubmit")({
          email: this.email,
          password: this.password,
        });
      }
    },

    async verified(key) {
      try {
        const { success } = await (
          await fetch(`${ENV.backendURL}/recaptcha?key=${key}`)
        ).json();

        this.set("iAmRobot", !success);
      } catch (error) {
        this.set("reset", true);
      }
    },

    expired() {
      this.set("iAmRobot", true);
    },
  },

  didReceiveAttrs() {
    this.setProperties({
      email: this.get("user.email"),
      password: this.get("user.password"),
    });
  },
});
