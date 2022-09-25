import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  dataService: service("data"),
  queryParams: {
    search: {
      refreshModel: false,
    },
  },
  async model({ search }) {
     return search
          ? await this.get("dataService").getSpeakers(search)
          : await this.get("dataService").getSpeakers();
  },

  setupController(controller) {
    this._super(...arguments);
    if (this.get("modelPromise")) {
      controller.set("isLoading", true);
    }
  },

  actions: {
    refreshRoute() {
      this.refresh();
    },

    searchSpeakers(search) {
      let promise = new Promise(async (resolve, reject) => {
        try {
          let speakers = search
            ? await this.get("dataService").getSpeakers(search)
            : await this.get("dataService").getSpeakers();
          resolve(speakers);
        } catch (e) {
          reject("Connection failed");
        }
      })
        .then((speakers) => {
          this.set("controller.model", speakers);
        })
        .finally(() => {
          if (promise === this.get("modelPromise")) {
            this.set("controller.isLoading", false);
          }
        });

      this.set("modelPromise", promise);
    },
  },
});
