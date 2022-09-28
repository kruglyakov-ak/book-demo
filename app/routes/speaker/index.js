import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  dataService: service("data"),
  queryParams: {
    search: {
      refreshModel: true,
    },
  },
  async model() {
    // return {
    //   isLoading: true,
    // };
    return this.get("store").findAll("speaker");
  },

  setupController() {
    this._super(...arguments);
    // let promise = new Promise(async (resolve, reject) => {
    //     try {
    //       let speakers = controller.get("search")
    //         ? await this.get("dataService").getSpeakers(controller.get("search"))
    //         : await this.get("dataService").getSpeakers();
    //       resolve(speakers);
    //     } catch (e) {
    //       reject("Connection failed");
    //     }
    // })
    //   .then((speakers) => {
    //     this.set("controller.model", speakers);
    //   })
    //   .finally(() => {
    //     if (promise === this.get("modelPromise")) {
    //       this.set("controller.isLoading", false);
    //     }
    //   });

    // this.set("modelPromise", promise);

    // if (this.get("modelPromise")) {
    //   controller.set("isLoading", true);
    // }
  },

  actions: {
    refreshRoute() {
      this.refresh();
    },
  },
});
