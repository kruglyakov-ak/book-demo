import Component from "@ember/component";
import { validator, buildValidations } from "ember-cp-validations";

const Validations = buildValidations({
  email: [validator("presence", true), validator("format", { type: "email" })],
  password: [validator("presence", true)],
});

export default Component.extend(Validations, {
  isInvalid: false,

  actions: {
    login(e) {
      e.preventDefault();

      this.set("isInvalid", !this.get("validations.isValid"));
      if (!this.get("isInvalid")) {
        this.get("onSubmit")({
          email: this.email,
          password: this.password,
        });
      }
    },
  },

  didReceiveAttrs() {
    this.setProperties({
      email: this.get("user.email"),
      password: this.get("user.password"),
    });
  },
});
