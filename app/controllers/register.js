import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveUser(user) {
      const errorLogger = this.get("errorLogger");

      let newUser;
      try {
        newUser = this.get('store').createRecord('user', user);
        await newUser.save();

        this.transitionToRoute('index');
      }
      catch(e) {
        e.user = newUser;
        this.send('error', e);
        const err = await errorLogger.createError(e);
        await this.get("store").createRecord("error", err).save();
      }
    },

    error(error) {
      this.set('errors', error.user.errors);
      return false;
    }
  },

  resetErrors() {
    this.set('errors', {});
  }
});
