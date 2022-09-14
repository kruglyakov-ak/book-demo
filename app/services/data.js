import Service from "@ember/service";
import ENV from "book-demo/config/environment";

export default Service.extend({
  async getBooks() {
    const response = await fetch(`${ENV.backendURL}/books`);
    return await response.json();
  },

  async getSpeakers() {
    const response = await fetch(`${ENV.backendURL}/speakers`);
    return await response.json();
  },

  async deleteSpeaker(id) {
    const response = await fetch(`${ENV.backendURL}/speakers/${id}`, {method: "DELETE"});
    return await response.json();
  },
});
