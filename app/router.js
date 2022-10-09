import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route("book", { path: "books" }, function () {
    this.route("edit", { path: ":id/edit" });
    this.route("create");
  });
  this.route("speaker", { path: "speakers" }, function () {
    this.route("edit", { path: ":id/edit" });
    this.route("create");
  });
  this.route("meeting", { path: "meetings" }, function () {
    this.route('edit', { path: ":id/edit" });
    this.route('create');

    this.route('report', function() {
      this.route('create', { path: ":id/create" });
      this.route('edit', { path: ":id/edit/:report_id" });
    });
  });
  this.route("error", { path: ":error" });
  this.route("404", { path: "*path" });
  this.route('login');
  this.route('register');
});

export default Router;
