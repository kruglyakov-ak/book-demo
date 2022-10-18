import EmberObject from "@ember/object";

export default EmberObject.extend({
  async createError(err) {
    return {
      date: new Date(),
      userIP: null,
      pageURL: window.location.href,
      message: err,
    };
  },
});
