import Component from "@ember/component";

export default Component.extend({
  actions: {
    async saveUser(e) {
      e.preventDefault();

      this.get("onSubmit")({
        email: this.email,
        password: this.password,
      });
    },
  },

  didReceiveAttrs() {
    this.setProperties({
      email: this.get("user.email"),
      password: this.get("user.password"),
    });
  },
});


// ember-can@1.1.1
// ember-cli-google-recaptcha@2.4.0
// ember-cp-validations@3.5.2
// ember-fetch@8.1.1
// ember-promise-helpers@1.0.6
// ember-simple-auth@2.1.1
// ember-simple-auth-token@4.0.3
// embercasts-library-styles@1.1.2
// jsonwebtoken@8.5.1
// node-fetch@2.6.2
