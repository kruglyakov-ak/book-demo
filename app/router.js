import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('books');
  this.route('Книжный');
  this.route('speakers');
  this.route('edit-book');
  this.route('edit-speaker');
});

export default Router;
