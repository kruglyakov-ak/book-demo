import Service from "@ember/service";

export default Service.extend({
  async getBooks() {
    const response = await fetch("http://localhost:3000/books");
    return await response.json();
  },
  async getSpeakers() {
    const response = await fetch("http://localhost:3000/speakers");
    return await response.json();
  },
});
