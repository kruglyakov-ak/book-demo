import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    return new Array(5).fill();
  },
});
