import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  dataService: service("data"),
  queryParams: {
    search: {
      refreshModel: true,
    },
    searchByTags: {
      refreshModel: true,
    },
  },
  async model() {
    return {
      isLoading: true,
    };
  },

  setupController(controller) {
    this._super(...arguments);

    let promise = new Promise(async (resolve, reject) => {
      try {
        let books = await this.get("dataService").getBooks(
          controller.get("search"),
          controller.get("searchByTags")
        );
        resolve(books);
      } catch (e) {
        reject("Connection failed");
      }
    })
      .then((books) => {
        this.set("controller.model", books);
      })
      .finally(() => {
        if (promise === this.get("modelPromise")) {
          this.set("controller.isLoading", false);
        }
      });

    if (this.get("modelPromise")) {
      controller.set("isLoading", true);
    }
  },

  actions: {
    refreshRoute() {
      this.refresh();
    },
  },
});
