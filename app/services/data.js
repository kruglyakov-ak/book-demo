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

  async deleteBook(id) {
    return await fetch(`${ENV.backendURL}/books/${id}`, { method: "DELETE" });
  },

  async deleteSpeaker(id) {
    return await fetch(`${ENV.backendURL}/speakers/${id}`, {
      method: "DELETE",
    });
  },

  async createBook(book) {
    return await fetch(`${ENV.backendURL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
  },

  async createSpeaker(speaker) {
    return await fetch(`${ENV.backendURL}/speakers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(speaker),
    });
  },
});
