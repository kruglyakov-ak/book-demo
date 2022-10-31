"use strict";



define('book-demo/abilities/book', ['exports', 'ember-can'], function (exports, _emberCan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCan.Ability.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),

    // only the person who wrote a post can edit it
    canEdit: Ember.computed(function () {
      var _this = this;

      if (!this.get('session.isAuthenticated')) {
        return false;
      }

      return new Ember.RSVP.Promise(function (resolve, reject) {
        return _this.get('model.user').then(function (user) {
          resolve(user.get('email') === _this.get('currentUser.user.email'));
        }).catch(function () {
          reject(false);
        });
      });
    }).volatile()
  });
});
define('book-demo/abilities/meeting', ['exports', 'ember-can'], function (exports, _emberCan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCan.Ability.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),

    // only the person who wrote a post can edit it
    canEdit: Ember.computed(function () {
      var _this = this;

      if (!this.get('session.isAuthenticated')) {
        return false;
      }

      return new Ember.RSVP.Promise(function (resolve, reject) {
        return _this.get('model.user').then(function (user) {
          resolve(user.get('email') === _this.get('currentUser.user.email'));
        }).catch(function () {
          reject(false);
        });
      });
    }).volatile()
  });
});
define('book-demo/abilities/speaker', ['exports', 'ember-can'], function (exports, _emberCan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCan.Ability.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),

    // only the person who wrote a post can edit it
    canEdit: Ember.computed(function () {
      var _this = this;

      if (!this.get('session.isAuthenticated')) {
        return false;
      }

      return new Ember.RSVP.Promise(function (resolve, reject) {
        return _this.get('model.user').then(function (user) {
          resolve(user.get('email') === _this.get('currentUser.user.email'));
        }).catch(function () {
          reject(false);
        });
      });
    }).volatile()
  });
});
define("book-demo/adapters/application", ["exports", "ember-data", "book-demo/config/environment"], function (exports, _emberData, _environment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    host: _environment.default.backendURL,
    session: Ember.inject.service(),

    headers: Ember.computed(function () {
      var resultHeaders = {
        "Content-Type": "application/json"
      };

      if (this.get("session.isAuthenticated")) {
        resultHeaders["Authorization"] = "Bearer " + this.session.data.authenticated.token;
      }

      return resultHeaders;
    }).volatile(),

    buildURL: function buildURL(modelName, id, snapshot, requestType) {
      var url = this._super.apply(this, arguments);

      if (modelName === "meeting" && (requestType === "query" || requestType === "findRecord")) {
        url += "?_embed=reports&_limit=1";
      }
      if (modelName === "report" && requestType === "findRecord" && id) {
        url += "?_expand=speaker&_expand=book";
      }

      return url;
    },
    handleResponse: function handleResponse(status, headers, payload) {
      var meta = {
        total: headers["x-total-count"]
      };

      payload.meta = meta;

      return this._super(status, headers, payload);
    }
  });
});
define('book-demo/adapters/user', ['exports', 'book-demo/adapters/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    urlForQueryRecord: function urlForQueryRecord(query) {
      if (query.me) {
        delete query.me;

        return this._super.apply(this, arguments) + '/me';
      }

      return this._super.apply(this, arguments);
    }
  });
});
define('book-demo/app', ['exports', 'book-demo/resolver', 'ember-load-initializers', 'book-demo/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('book-demo/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _basicDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
});
define('book-demo/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _contentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentElement.default;
    }
  });
});
define('book-demo/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('book-demo/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define("book-demo/components/book-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Component.extend({
    currentUser: Ember.inject.service(),

    actions: {
      submitForm: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt) {
          var errorLogger, uploadData, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  evt.preventDefault();
                  errorLogger = this.get("errorLogger");
                  _context.prev = 2;

                  this.set("isUploadingFile", true);
                  uploadData = this.get("uploadData");
                  _context.next = 7;
                  return this.onsubmit(evt, {
                    id: this.get("id"),
                    title: this.get("title"),
                    authorName: this.get("authorName"),
                    pageCount: this.get("pageCount"),
                    descriptionLink: this.get("descriptionLink"),
                    rate: Math.floor(Math.random() * 100),
                    tags: this.get("tags"),
                    coverURL: this.get("coverURL"),
                    user: this.get("currentUser.user")
                  }, uploadData);

                case 7:

                  this.set("isUploadingFile", false);
                  _context.next = 17;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](2);
                  _context.next = 14;
                  return errorLogger.createError(_context.t0);

                case 14:
                  err = _context.sent;
                  _context.next = 17;
                  return this.get("store").createRecord("error", err).save();

                case 17:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 10]]);
        }));

        function submitForm(_x) {
          return _ref.apply(this, arguments);
        }

        return submitForm;
      }(),
      changeTags: function changeTags(newTags) {
        this.set("tags", [].concat(_toConsumableArray(newTags)));
      },
      changeUploadData: function changeUploadData(uploadData) {
        this.set("uploadData", uploadData);
      }
    },

    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);

      this.setProperties({
        id: this.get("book.id"),
        title: this.get("book.title"),
        authorName: this.get("book.authorName"),
        pageCount: this.get("book.pageCount"),
        descriptionLink: this.get("book.descriptionLink"),
        tags: this.get("book.tags"),
        coverURL: this.get("book.coverURL")
      });
    }
  });
});
define("book-demo/components/book-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    session: Ember.inject.service(),
    actions: {
      route: function route(tag) {
        this.routeByTag(tag);
      }
    },

    rateWidth: Ember.computed(function () {
      return Ember.String.htmlSafe("width: " + this.get("book.rate") * 20 + "%;");
    }),
    rate: Ember.computed(function () {
      return Ember.String.htmlSafe(this.get("book.rate") * 20);
    })
  });
});
define('book-demo/components/bs-accordion', ['exports', 'ember-bootstrap/components/bs-accordion'], function (exports, _bsAccordion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAccordion.default;
    }
  });
});
define('book-demo/components/bs-accordion/item', ['exports', 'ember-bootstrap/components/bs-accordion/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('book-demo/components/bs-accordion/item/body', ['exports', 'ember-bootstrap/components/bs-accordion/item/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('book-demo/components/bs-accordion/item/title', ['exports', 'ember-bootstrap/components/bs-accordion/item/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('book-demo/components/bs-alert', ['exports', 'ember-bootstrap/components/bs-alert'], function (exports, _bsAlert) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAlert.default;
    }
  });
});
define('book-demo/components/bs-button-group', ['exports', 'ember-bootstrap/components/bs-button-group'], function (exports, _bsButtonGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButtonGroup.default;
    }
  });
});
define('book-demo/components/bs-button-group/button', ['exports', 'ember-bootstrap/components/bs-button-group/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('book-demo/components/bs-button', ['exports', 'ember-bootstrap/components/bs-button'], function (exports, _bsButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButton.default;
    }
  });
});
define('book-demo/components/bs-carousel', ['exports', 'ember-bootstrap/components/bs-carousel'], function (exports, _bsCarousel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsCarousel.default;
    }
  });
});
define('book-demo/components/bs-carousel/slide', ['exports', 'ember-bootstrap/components/bs-carousel/slide'], function (exports, _slide) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _slide.default;
    }
  });
});
define('book-demo/components/bs-collapse', ['exports', 'ember-bootstrap/components/bs-collapse'], function (exports, _bsCollapse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsCollapse.default;
    }
  });
});
define('book-demo/components/bs-dropdown', ['exports', 'ember-bootstrap/components/bs-dropdown'], function (exports, _bsDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsDropdown.default;
    }
  });
});
define('book-demo/components/bs-dropdown/button', ['exports', 'ember-bootstrap/components/bs-dropdown/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('book-demo/components/bs-dropdown/menu', ['exports', 'ember-bootstrap/components/bs-dropdown/menu'], function (exports, _menu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _menu.default;
    }
  });
});
define('book-demo/components/bs-dropdown/menu/divider', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/divider'], function (exports, _divider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _divider.default;
    }
  });
});
define('book-demo/components/bs-dropdown/menu/item', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('book-demo/components/bs-dropdown/menu/link-to', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('book-demo/components/bs-dropdown/toggle', ['exports', 'ember-bootstrap/components/bs-dropdown/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('book-demo/components/bs-form', ['exports', 'ember-bootstrap/components/bs-form'], function (exports, _bsForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsForm.default;
    }
  });
});
define('book-demo/components/bs-form/element', ['exports', 'ember-bootstrap/components/bs-form/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('book-demo/components/bs-form/element/control', ['exports', 'ember-bootstrap/components/bs-form/element/control'], function (exports, _control) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _control.default;
    }
  });
});
define('book-demo/components/bs-form/element/control/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/control/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('book-demo/components/bs-form/element/control/input', ['exports', 'ember-bootstrap/components/bs-form/element/control/input'], function (exports, _input) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _input.default;
    }
  });
});
define('book-demo/components/bs-form/element/control/radio', ['exports', 'ember-bootstrap/components/bs-form/element/control/radio'], function (exports, _radio) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _radio.default;
    }
  });
});
define('book-demo/components/bs-form/element/control/textarea', ['exports', 'ember-bootstrap/components/bs-form/element/control/textarea'], function (exports, _textarea) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textarea.default;
    }
  });
});
define('book-demo/components/bs-form/element/errors', ['exports', 'ember-bootstrap/components/bs-form/element/errors'], function (exports, _errors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _errors.default;
    }
  });
});
define('book-demo/components/bs-form/element/feedback-icon', ['exports', 'ember-bootstrap/components/bs-form/element/feedback-icon'], function (exports, _feedbackIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _feedbackIcon.default;
    }
  });
});
define('book-demo/components/bs-form/element/help-text', ['exports', 'ember-bootstrap/components/bs-form/element/help-text'], function (exports, _helpText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _helpText.default;
    }
  });
});
define('book-demo/components/bs-form/element/label', ['exports', 'ember-bootstrap/components/bs-form/element/label'], function (exports, _label) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _label.default;
    }
  });
});
define('book-demo/components/bs-form/element/layout/horizontal', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal'], function (exports, _horizontal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _horizontal.default;
    }
  });
});
define('book-demo/components/bs-form/element/layout/horizontal/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('book-demo/components/bs-form/element/layout/inline', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline'], function (exports, _inline) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inline.default;
    }
  });
});
define('book-demo/components/bs-form/element/layout/inline/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('book-demo/components/bs-form/element/layout/vertical', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical'], function (exports, _vertical) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _vertical.default;
    }
  });
});
define('book-demo/components/bs-form/element/layout/vertical/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('book-demo/components/bs-form/group', ['exports', 'ember-bootstrap/components/bs-form/group'], function (exports, _group) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _group.default;
    }
  });
});
define('book-demo/components/bs-modal-simple', ['exports', 'ember-bootstrap/components/bs-modal-simple'], function (exports, _bsModalSimple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModalSimple.default;
    }
  });
});
define('book-demo/components/bs-modal', ['exports', 'ember-bootstrap/components/bs-modal'], function (exports, _bsModal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModal.default;
    }
  });
});
define('book-demo/components/bs-modal/body', ['exports', 'ember-bootstrap/components/bs-modal/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('book-demo/components/bs-modal/dialog', ['exports', 'ember-bootstrap/components/bs-modal/dialog'], function (exports, _dialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dialog.default;
    }
  });
});
define('book-demo/components/bs-modal/footer', ['exports', 'ember-bootstrap/components/bs-modal/footer'], function (exports, _footer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _footer.default;
    }
  });
});
define('book-demo/components/bs-modal/header', ['exports', 'ember-bootstrap/components/bs-modal/header'], function (exports, _header) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
});
define('book-demo/components/bs-modal/header/close', ['exports', 'ember-bootstrap/components/bs-modal/header/close'], function (exports, _close) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _close.default;
    }
  });
});
define('book-demo/components/bs-modal/header/title', ['exports', 'ember-bootstrap/components/bs-modal/header/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('book-demo/components/bs-nav', ['exports', 'ember-bootstrap/components/bs-nav'], function (exports, _bsNav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNav.default;
    }
  });
});
define('book-demo/components/bs-nav/item', ['exports', 'ember-bootstrap/components/bs-nav/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('book-demo/components/bs-nav/link-to', ['exports', 'ember-bootstrap/components/bs-nav/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('book-demo/components/bs-navbar', ['exports', 'ember-bootstrap/components/bs-navbar'], function (exports, _bsNavbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNavbar.default;
    }
  });
});
define('book-demo/components/bs-navbar/content', ['exports', 'ember-bootstrap/components/bs-navbar/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('book-demo/components/bs-navbar/link-to', ['exports', 'ember-bootstrap/components/bs-navbar/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('book-demo/components/bs-navbar/nav', ['exports', 'ember-bootstrap/components/bs-navbar/nav'], function (exports, _nav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
});
define('book-demo/components/bs-navbar/toggle', ['exports', 'ember-bootstrap/components/bs-navbar/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('book-demo/components/bs-popover', ['exports', 'ember-bootstrap/components/bs-popover'], function (exports, _bsPopover) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsPopover.default;
    }
  });
});
define('book-demo/components/bs-popover/element', ['exports', 'ember-bootstrap/components/bs-popover/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('book-demo/components/bs-progress', ['exports', 'ember-bootstrap/components/bs-progress'], function (exports, _bsProgress) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsProgress.default;
    }
  });
});
define('book-demo/components/bs-progress/bar', ['exports', 'ember-bootstrap/components/bs-progress/bar'], function (exports, _bar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bar.default;
    }
  });
});
define('book-demo/components/bs-tab', ['exports', 'ember-bootstrap/components/bs-tab'], function (exports, _bsTab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTab.default;
    }
  });
});
define('book-demo/components/bs-tab/pane', ['exports', 'ember-bootstrap/components/bs-tab/pane'], function (exports, _pane) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pane.default;
    }
  });
});
define('book-demo/components/bs-tooltip', ['exports', 'ember-bootstrap/components/bs-tooltip'], function (exports, _bsTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTooltip.default;
    }
  });
});
define('book-demo/components/bs-tooltip/element', ['exports', 'ember-bootstrap/components/bs-tooltip/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('book-demo/components/ember-popper-targeting-parent', ['exports', 'ember-popper/components/ember-popper-targeting-parent'], function (exports, _emberPopperTargetingParent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopperTargetingParent.default;
    }
  });
});
define('book-demo/components/ember-popper', ['exports', 'ember-popper/components/ember-popper'], function (exports, _emberPopper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
});
define('book-demo/components/g-recaptcha-invisible', ['exports', 'ember-cli-google-recaptcha/components/g-recaptcha-invisible'], function (exports, _gRecaptchaInvisible) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gRecaptchaInvisible.default;
    }
  });
});
define('book-demo/components/g-recaptcha-v2', ['exports', 'ember-cli-google-recaptcha/components/g-recaptcha-v2'], function (exports, _gRecaptchaV) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gRecaptchaV.default;
    }
  });
});
define("book-demo/components/input-file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    isFileChoosen: Ember.computed("uploadData", function () {
      return this.get("uploadData") && this.get("uploadData").files.length;
    }),

    ifRemoveButtonDisabled: Ember.computed("isFileChoosen", function () {
      return !this.get("isFileChoosen");
    }),

    fileName: Ember.computed("isFileChoosen", function () {
      return this.get("isFileChoosen") ? this.get("uploadData").files[0].name : this.get("coverURL") ? this.get("coverURL") : "Выберите файл";
    }),

    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      var onFileAdd = function onFileAdd(e, uploadData) {
        _this.get("uploadDataChanged")(uploadData);
      };

      if (!this.$(".custom-file-input").fileupload("instance")) {
        // Initialize jQuery fileupload plugin (https://github.com/blueimp/jQuery-File-Upload/wiki/API).
        this.$(".custom-file-input").fileupload({
          // Disable autoUpload.
          autoUpload: false,

          // Type of data that is expected back from the server.
          dataType: "json",

          // Maximum number of files to be selected and uploaded.
          maxNumberOfFiles: 1,

          // Enable single file uploads.
          singleFileUploads: true,

          // Disable drag&drop file adding.
          dropZone: null,

          // File add handler.
          add: onFileAdd
        });
      }
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (this.$(".custom-file-input").fileupload("instance")) {
        this.$(".custom-file-input").fileupload("destroy");
      }
    },


    actions: {
      removeFile: function removeFile() {
        Ember.set(this, "uploadData", null);
      }
    }
  });
});
define("book-demo/components/input-tags", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  exports.default = Ember.Component.extend({
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);

      var el = this.$();

      Ember.set(this, "addTag", function (e) {
        _this.tagAdded(e.item);
      });

      Ember.set(this, "removeTag", function (e) {
        _this.tagRemoved(e.item);
      });

      el.on("itemAdded", this.addTag);
      el.on("itemRemoved", this.removeTag);
    },
    didReceiveAttrs: function didReceiveAttrs() {
      var tags = Ember.get(this, "tags");
      (true && !(Ember.typeOf(tags) === "array") && Ember.assert("Passed tags must be an array", Ember.typeOf(tags) === "array"));

      Ember.set(this, "_tags", [].concat(_toConsumableArray(tags)));
    },
    didRender: function didRender() {
      var arraysAreEqual = function arraysAreEqual(arr1, arr2) {
        arr2 = arr2.itemsArray ? arr2.itemsArray : arr2;
        return Ember.$(arr1).not(arr2).length === 0 && Ember.$(arr2).not(arr1).length === 0;
      };

      var el = this.$();
      var currentValues = el.tagsinput("items");
      var tags = Ember.get(this, "_tags");

      if (!arraysAreEqual(tags, currentValues)) {
        el.tagsinput("removeAll");
        tags.forEach(function (tag) {
          el.tagsinput("add", tag);
        });
      }
    },
    tagAdded: function tagAdded(newTag) {
      Ember.get(this, "_tags").push(newTag);
      this.get("onChange")(this._tags);
    },
    tagRemoved: function tagRemoved(tag) {
      var tagIndex = Ember.get(this, "_tags").indexOf(tag);
      if (tagIndex > -1) {
        var part1 = Ember.get(this, "_tags").slice(0, tagIndex);
        var part2 = Ember.get(this, "_tags").slice(tagIndex + 1);
        Ember.set(this, "_tags", [].concat(_toConsumableArray(part1), _toConsumableArray(part2)));
        this.get("onChange")(this._tags);
      }
    },
    willDestroyElement: function willDestroyElement() {
      var el = this.$();
      el.off("itemAdded", this.addTag);
      el.off("itemRemoved", this.removeTag);
    }
  });
});
define("book-demo/components/login-form", ["exports", "ember-cp-validations"], function (exports, _emberCpValidations) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Validations = (0, _emberCpValidations.buildValidations)({
    email: [(0, _emberCpValidations.validator)("presence", true), (0, _emberCpValidations.validator)("format", { type: "email" })],
    password: [(0, _emberCpValidations.validator)("presence", true)]
  });

  exports.default = Ember.Component.extend(Validations, {
    isInvalid: false,

    actions: {
      login: function login(e) {
        e.preventDefault();

        this.set("isInvalid", !this.get("validations.isValid"));
        if (!this.get("isInvalid")) {
          this.get("onSubmit")({
            email: this.email,
            password: this.password
          });
        }
      }
    },

    didReceiveAttrs: function didReceiveAttrs() {
      this.setProperties({
        email: this.get("user.email"),
        password: this.get("user.password")
      });
    }
  });
});
define("book-demo/components/meeting-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Component.extend({
    currentUser: Ember.inject.service(),
    actions: {
      submitForm: function submitForm(evt) {
        evt.preventDefault();

        this.onsubmit(evt, {
          id: this.get("id"),
          date: this.get("date"),
          reports: this.get("reports"),
          user: this.get("currentUser.user")
        });
      },
      deleteReport: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(report) {
          var errorLogger, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorLogger = this.get("errorLogger");
                  _context.prev = 1;
                  _context.next = 4;
                  return report.destroyRecord();

                case 4:
                  _context.next = 6;
                  return this.get("store").unloadRecord(report);

                case 6:
                  _context.next = 15;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  _context.next = 12;
                  return errorLogger.createError(_context.t0);

                case 12:
                  err = _context.sent;
                  _context.next = 15;
                  return this.get("store").createRecord("error", err).save();

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 8]]);
        }));

        function deleteReport(_x) {
          return _ref.apply(this, arguments);
        }

        return deleteReport;
      }()
    },

    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);
      this.setProperties({
        reports: this.get("meeting.reports"),
        date: this.get("meeting.date")
      });
    }
  });
});
define("book-demo/components/meeting-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('book-demo/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _powerSelectMultiple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectMultiple.default;
    }
  });
});
define('book-demo/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('book-demo/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _powerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelect.default;
    }
  });
});
define('book-demo/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _beforeOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _beforeOptions.default;
    }
  });
});
define('book-demo/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _options) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _options.default;
    }
  });
});
define('book-demo/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _placeholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _placeholder.default;
    }
  });
});
define('book-demo/components/power-select/power-select-group', ['exports', 'ember-power-select/components/power-select/power-select-group'], function (exports, _powerSelectGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectGroup.default;
    }
  });
});
define('book-demo/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _searchMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _searchMessage.default;
    }
  });
});
define('book-demo/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define("book-demo/components/register-form", ["exports", "fetch", "book-demo/config/environment", "ember-cp-validations"], function (exports, _fetch, _environment, _emberCpValidations) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var Validations = (0, _emberCpValidations.buildValidations)({
    email: [(0, _emberCpValidations.validator)("ds-error"), (0, _emberCpValidations.validator)("presence", true), (0, _emberCpValidations.validator)("format", {
      type: "email"
    })],
    password: [(0, _emberCpValidations.validator)("ds-error"), (0, _emberCpValidations.validator)("presence", true), (0, _emberCpValidations.validator)("length", {
      min: 4,
      max: 8
    })]
  });

  exports.default = Ember.Component.extend(Validations, {
    iAmRobot: true,
    reset: false,

    actions: {
      saveUser: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
          var errorLogger, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e.preventDefault();
                  errorLogger = this.get("errorLogger");
                  _context.prev = 2;

                  this.set("isInvalid", !this.get("validations.isValid"));
                  if (!this.get("isInvalid")) {
                    this.get("onSubmit")({
                      email: this.email,
                      password: this.password
                    });
                  }
                  _context.next = 14;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](2);
                  _context.next = 11;
                  return errorLogger.createError(_context.t0);

                case 11:
                  err = _context.sent;
                  _context.next = 14;
                  return this.get("store").createRecord("error", err).save();

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 7]]);
        }));

        function saveUser(_x) {
          return _ref.apply(this, arguments);
        }

        return saveUser;
      }(),
      verified: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {
          var errorLogger, _ref3, success, err;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  errorLogger = this.get("errorLogger");
                  _context2.prev = 1;
                  _context2.next = 4;
                  return (0, _fetch.default)(_environment.default.backendURL + "/recaptcha?key=" + key);

                case 4:
                  _context2.next = 6;
                  return _context2.sent.json();

                case 6:
                  _ref3 = _context2.sent;
                  success = _ref3.success;


                  this.set("iAmRobot", !success);
                  _context2.next = 19;
                  break;

                case 11:
                  _context2.prev = 11;
                  _context2.t0 = _context2["catch"](1);

                  this.set("reset", true);
                  _context2.next = 16;
                  return errorLogger.createError(_context2.t0);

                case 16:
                  err = _context2.sent;
                  _context2.next = 19;
                  return this.get("store").createRecord("error", err).save();

                case 19:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[1, 11]]);
        }));

        function verified(_x2) {
          return _ref2.apply(this, arguments);
        }

        return verified;
      }(),
      expired: function expired() {
        this.set("iAmRobot", true);
      }
    },

    didReceiveAttrs: function didReceiveAttrs() {
      this.setProperties({
        email: this.get("user.email"),
        password: this.get("user.password")
      });
    }
  });
});
define("book-demo/components/report-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    selectedSpeaker: Ember.computed("model.report.speaker", function () {
      var speaker = this.get("model.report.speaker");

      return speaker ? this.get("model.speakers").findBy("id", speaker.get("id")) : null;
    }),

    selectedBook: Ember.computed("model.report.book", function () {
      var book = this.get("model.report.book");

      return book ? this.get("model.books").findBy("id", book.get("id")) : null;
    }),

    actions: {
      submitForm: function submitForm(evt) {
        evt.preventDefault();

        this.onsubmit(evt, {
          meeting: this.get("model.report.meeting"),
          rate: this.get("model.report.rate"),
          URLPresentation: this.get("model.report.URLPresentation"),
          URLVideo: this.get("model.report.URLVideo"),
          book: this.get("model.report.book"),
          speaker: this.get("model.report.speaker"),
          review: this.get("model.report.review")
        }, this.get("model.report.meeting.id"));
      }
    }
  });
});
define("book-demo/components/report-item", ["exports", "book-demo/config/environment"], function (exports, _environment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    rateWidth: Ember.computed("report.rate", function () {
      return Ember.String.htmlSafe("width: " + this.get("report.rate") * 20 + "%;");
    }),
    rate: Ember.computed(function () {
      return Ember.String.htmlSafe(this.get("report.rate") * 20);
    }),
    rootURL: Ember.computed(function () {
      return _environment.default.rootURL;
    })
  });
});
define("book-demo/components/speaker-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    currentUser: Ember.inject.service(),
    actions: {
      submitForm: function submitForm(evt) {
        evt.preventDefault();

        this.onsubmit(evt, {
          id: this.get("id"),
          name: this.get("nameValue"),
          surname: this.get("surnameValue"),
          patronymic: this.get("patronymicValue"),
          user: this.get("currentUser.user")
        });
      }
    },

    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);

      this.setProperties({
        nameValue: this.get("speaker.name"),
        surnameValue: this.get("speaker.surname"),
        patronymicValue: this.get("speaker.patronymic"),
        name: this.get("speaker.name"),
        surname: this.get("speaker.surname"),
        patronymic: this.get("speaker.patronymic"),
        id: this.get("speaker.id")
      });
    }
  });
});
define("book-demo/components/speaker-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('book-demo/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define("book-demo/controllers/application", ["exports", "book-demo/config/environment"], function (exports, _environment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    i18n: Ember.inject.service(),

    currentLocale: _environment.default.i18n.defaultLocale,

    isRussian: Ember.computed("currentLocale", function () {
      return this.get("currentLocale") === "ru";
    }),

    isEnglish: Ember.computed("currentLocale", function () {
      return this.get("currentLocale") === "en";
    }),

    actions: {
      logout: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e.preventDefault();

                  this.get("session").invalidate();

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function logout(_x) {
          return _ref.apply(this, arguments);
        }

        return logout;
      }(),
      changeLocale: function changeLocale(e) {
        this.set('currentLocale', e.target.value);
        this.set('i18n.locale', this.get('currentLocale'));
      }
    },

    init: function init() {
      this._super.apply(this, arguments);
      this.set("i18n.locale", this.get("currentLocale"));
    }
  });
});
define("book-demo/controllers/book/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service("data"),
    actions: {
      saveBook: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt, book, uploadData) {
          var errorLogger, newBook, uploadBook, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  evt.preventDefault();
                  errorLogger = this.get("errorLogger");

                  if (!(evt.submitter.dataset.name === "save")) {
                    _context.next = 21;
                    break;
                  }

                  _context.prev = 3;
                  _context.next = 6;
                  return this.get("store").createRecord("book", book);

                case 6:
                  newBook = _context.sent;
                  _context.next = 9;
                  return newBook.save();

                case 9:
                  uploadBook = _context.sent;
                  _context.next = 12;
                  return this.get("dataService").uploadBookData(uploadBook, uploadData);

                case 12:
                  _context.next = 21;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](3);
                  _context.next = 18;
                  return errorLogger.createError(_context.t0);

                case 18:
                  err = _context.sent;
                  _context.next = 21;
                  return this.get("store").createRecord("error", err).save();

                case 21:

                  this.transitionToRoute("book.index");

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 14]]);
        }));

        function saveBook(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return saveBook;
      }()
    }
  });
});
define("book-demo/controllers/book/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service("data"),
    actions: {
      saveBook: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt, book, uploadData) {
          var bookModel, errorLogger, uploadBook, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  evt.preventDefault();
                  bookModel = this.get("model");
                  errorLogger = this.get("errorLogger");

                  if (!(evt.submitter.dataset.name === "save")) {
                    _context.next = 27;
                    break;
                  }

                  _context.prev = 4;

                  bookModel.set("title", book.title);
                  bookModel.set("authorName", book.authorName);
                  bookModel.set("pageCount", book.pageCount);
                  bookModel.set("descriptionLink", book.descriptionLink);
                  bookModel.set("rate", Math.floor(Math.random() * 5));
                  bookModel.set("tags", book.tags);
                  bookModel.set("coverURL", book.coverURL);

                  _context.next = 14;
                  return bookModel.save();

                case 14:
                  uploadBook = _context.sent;

                  if (!uploadData) {
                    _context.next = 18;
                    break;
                  }

                  _context.next = 18;
                  return this.get("dataService").uploadBookData(uploadBook, uploadData);

                case 18:
                  _context.next = 27;
                  break;

                case 20:
                  _context.prev = 20;
                  _context.t0 = _context["catch"](4);
                  _context.next = 24;
                  return errorLogger.createError(_context.t0);

                case 24:
                  err = _context.sent;
                  _context.next = 27;
                  return this.get("store").createRecord("error", err).save();

                case 27:

                  this.transitionToRoute("book.index");

                case 28:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[4, 20]]);
        }));

        function saveBook(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return saveBook;
      }()
    }
  });
});
define("book-demo/controllers/book/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),
    search: "",
    searchByTags: "",

    actions: {
      deleteBook: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(book) {
          var errorLogger, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorLogger = this.get("errorLogger");
                  _context.prev = 1;
                  _context.next = 4;
                  return book.destroyRecord();

                case 4:
                  _context.next = 6;
                  return this.get("store").unloadRecord(book);

                case 6:
                  _context.next = 15;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  _context.next = 12;
                  return errorLogger.createError(_context.t0);

                case 12:
                  err = _context.sent;
                  _context.next = 15;
                  return this.get("store").createRecord("error", err).save();

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 8]]);
        }));

        function deleteBook(_x) {
          return _ref.apply(this, arguments);
        }

        return deleteBook;
      }(),
      clickOnCreateButton: function clickOnCreateButton() {
        this.transitionToRoute("book.create");
      },
      clickOnEditButton: function clickOnEditButton(id) {
        this.transitionToRoute("/books/" + id + "/edit");
      },
      search: function search(_ref2) {
        var target = _ref2.target;

        Ember.run.debounce(this, this.set, 'search', target.value, 1000);
      },
      searchByTags: function searchByTags(_ref3) {
        var target = _ref3.target;

        Ember.run.debounce(this, this.set, 'searchByTags', target.value, 1000);
      },
      routeByTag: function routeByTag(tag) {
        this.set("searchByTags", tag);
      }
    }
  });
});
define("book-demo/controllers/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),

    actions: {
      login: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
          var errorLogger, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorLogger = this.get("errorLogger");
                  _context.prev = 1;
                  _context.next = 4;
                  return this.get("session").authenticate("authenticator:jwt", {
                    email: user.email,
                    password: user.password
                  });

                case 4:
                  _context.next = 14;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](1);

                  this.send("error", _context.t0);
                  _context.next = 11;
                  return errorLogger.createError(_context.t0.statusText);

                case 11:
                  err = _context.sent;
                  _context.next = 14;
                  return this.get("store").createRecord("error", err).save();

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 6]]);
        }));

        function login(_x) {
          return _ref.apply(this, arguments);
        }

        return login;
      }(),
      error: function error(_error) {
        if (_error instanceof Error) {
          return true;
        }

        this.set("errors", _error.json.errors);
        return false;
      }
    },

    resetErrors: function resetErrors() {
      this.set("errors", {});
    }
  });
});
define("book-demo/controllers/meeting/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    actions: {
      saveMeeting: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt, meeting) {
          var errorLogger, newMeeting, uploadMeeting, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorLogger = this.get("errorLogger");

                  if (!(evt.submitter.dataset.name === "save")) {
                    _context.next = 19;
                    break;
                  }

                  _context.prev = 2;
                  _context.next = 5;
                  return this.get("store").createRecord("meeting", meeting);

                case 5:
                  newMeeting = _context.sent;
                  _context.next = 8;
                  return newMeeting.save();

                case 8:
                  uploadMeeting = _context.sent;


                  this.transitionToRoute("/meetings/" + uploadMeeting.get("id") + "/edit");
                  _context.next = 19;
                  break;

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context["catch"](2);
                  _context.next = 16;
                  return errorLogger.createError(_context.t0);

                case 16:
                  err = _context.sent;
                  _context.next = 19;
                  return this.get("store").createRecord("error", err).save();

                case 19:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 12]]);
        }));

        function saveMeeting(_x, _x2) {
          return _ref.apply(this, arguments);
        }

        return saveMeeting;
      }(),
      clickOnCreateReport: function clickOnCreateReport() {
        alert("Please save meeting!");
      }
    }
  });
});
define("book-demo/controllers/meeting/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    actions: {
      saveMeeting: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt, meeting) {
          var meetingModel, errorLogger, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  evt.preventDefault();
                  meetingModel = this.get("model");
                  errorLogger = this.get("errorLogger");

                  if (!(evt.submitter.dataset.name === "save")) {
                    _context.next = 18;
                    break;
                  }

                  _context.prev = 4;

                  meetingModel.set("date", meeting.date);
                  meetingModel.set("reports", meeting.reports);

                  _context.next = 9;
                  return meetingModel.save();

                case 9:
                  _context.next = 18;
                  break;

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](4);
                  _context.next = 15;
                  return errorLogger.createError(_context.t0);

                case 15:
                  err = _context.sent;
                  _context.next = 18;
                  return this.get("store").createRecord("error", err).save();

                case 18:

                  this.transitionToRoute("meeting.index");

                case 19:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[4, 11]]);
        }));

        function saveMeeting(_x, _x2) {
          return _ref.apply(this, arguments);
        }

        return saveMeeting;
      }(),
      clickOnCreateReport: function clickOnCreateReport() {
        this.transitionToRoute("meeting.report.create");
      }
    }
  });
});
define("book-demo/controllers/meeting/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var PER_PAGE = exports.PER_PAGE = 1;

  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),
    queryParams: ["speaker", "page", "book", "date"],
    speaker: "",
    book: "",
    date: "",
    page: 1,
    speakerValue: "",
    bookValue: "",
    dateValue: "",

    selectedSpeaker: Ember.computed("speakerValue", function () {
      var speaker = this.get("speakerValue");

      return speaker ? this.get("model.speakers").findBy("id", speaker) : null;
    }),

    selectedBook: Ember.computed("bookValue", function () {
      var book = this.get("bookValue");

      return book ? this.get("model.books").findBy("id", book) : null;
    }),

    pages: Ember.computed("model.meetings.meta.total", function () {
      var total = Number(this.get("model.meetings.meta.total"));
      if (Number.isNaN(total) || total <= 0) {
        return [];
      }

      return new Array(Math.ceil(total / PER_PAGE)).fill().map(function (value, index) {
        return index + 1;
      });
    }),

    isNextActive: Ember.computed("page", function () {
      return this.get("pages").length !== this.get("page");
    }),

    isPrevActive: Ember.computed("page", function () {
      return 1 !== this.get("page");
    }),

    hasQuery: Ember.computed("book", "speaker", "date", function () {
      return !this.get("book") && !this.get("speaker") && !this.get("date");
    }),

    actions: {
      clickOnCreateButton: function clickOnCreateButton() {
        this.transitionToRoute("meeting.create");
      },
      clickOnEditButton: function clickOnEditButton(id) {
        this.transitionToRoute("/meetings/" + id + "/edit");
      },
      changeSpeaker: function changeSpeaker(speaker) {
        this.set("speakerValue", speaker ? speaker.get("id") : "");
      },
      changeBook: function changeBook(book) {
        this.set("bookValue", book ? book.get("id") : "");
      },
      filterReports: function filterReports(evt) {
        evt.preventDefault();
        this.setProperties({
          book: this.get("bookValue"),
          speaker: this.get("speakerValue"),
          date: this.get("dateValue"),
          page: 1
        });
      },
      resetFilters: function resetFilters(evt) {
        evt.preventDefault();
        this.setProperties({
          book: "",
          speaker: "",
          date: "",
          bookValue: "",
          speakerValue: "",
          dateValue: "",
          page: 1
        });
      },
      clickNext: function clickNext(evt) {
        evt.preventDefault();
        if (this.get("pages").length !== this.get("page")) {
          this.set("page", this.get("page") + 1);
        }
      },
      clickPrev: function clickPrev(evt) {
        evt.preventDefault();
        if (1 !== this.get("page")) {
          this.set("page", this.get("page") - 1);
        }
      },
      deleteMeeting: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(meeting) {
          var errorLogger, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorLogger = this.get("errorLogger");
                  _context.prev = 1;
                  _context.next = 4;
                  return meeting.destroyRecord();

                case 4:
                  _context.next = 6;
                  return this.get("store").unloadRecord(meeting);

                case 6:
                  this.set("page", this.get("page") - 1);
                  _context.next = 16;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context["catch"](1);
                  _context.next = 13;
                  return errorLogger.createError(_context.t0);

                case 13:
                  err = _context.sent;
                  _context.next = 16;
                  return this.get("store").createRecord("error", err).save();

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 9]]);
        }));

        function deleteMeeting(_x) {
          return _ref.apply(this, arguments);
        }

        return deleteMeeting;
      }()
    }
  });
});
define("book-demo/controllers/meeting/report/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    actions: {
      saveReport: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt, report, id) {
          var errorLogger, newReport, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorLogger = this.get("errorLogger");

                  if (!(evt.submitter.dataset.name === "save")) {
                    _context.next = 17;
                    break;
                  }

                  _context.prev = 2;
                  _context.next = 5;
                  return this.get("store").createRecord("report", report);

                case 5:
                  newReport = _context.sent;
                  _context.next = 8;
                  return newReport.save();

                case 8:
                  _context.next = 17;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](2);
                  _context.next = 14;
                  return errorLogger.createError(_context.t0);

                case 14:
                  err = _context.sent;
                  _context.next = 17;
                  return this.get("store").createRecord("error", err).save();

                case 17:

                  this.transitionToRoute("meeting.edit", id);

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 10]]);
        }));

        function saveReport(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return saveReport;
      }(),
      changeSpeaker: function changeSpeaker(speaker) {
        this.set("model.report.speaker", speaker ? speaker : "");
      },
      changeBook: function changeBook(book) {
        this.set("model.report.book", book ? book : "");
      },
      changeReview: function changeReview(review) {
        this.set("model.report.review", review.target.value);
      }
    }
  });
});
define("book-demo/controllers/meeting/report/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    actions: {
      saveReport: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt, report, id) {
          var reportModel, errorLogger, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  evt.preventDefault();
                  reportModel = this.get("model.report");
                  errorLogger = this.get("errorLogger");

                  if (!(evt.submitter.dataset.name === "save")) {
                    _context.next = 16;
                    break;
                  }

                  _context.prev = 4;
                  _context.next = 7;
                  return reportModel.save();

                case 7:
                  _context.next = 16;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context["catch"](4);
                  _context.next = 13;
                  return errorLogger.createError(_context.t0);

                case 13:
                  err = _context.sent;
                  _context.next = 16;
                  return this.get("store").createRecord("error", err).save();

                case 16:

                  this.transitionToRoute("meeting.edit", id);

                case 17:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[4, 9]]);
        }));

        function saveReport(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return saveReport;
      }(),
      changeSpeaker: function changeSpeaker(speaker) {
        this.set("model.report.speaker", speaker ? speaker : "");
      },
      changeBook: function changeBook(book) {
        this.set("model.report.book", book ? book : "");
      },
      changeReview: function changeReview(review) {
        this.set("model.report.review", review.target.value);
      }
    }
  });
});
define('book-demo/controllers/register', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    actions: {
      saveUser: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
          var errorLogger, newUser, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorLogger = this.get("errorLogger");
                  newUser = void 0;
                  _context.prev = 2;

                  newUser = this.get('store').createRecord('user', user);
                  _context.next = 6;
                  return newUser.save();

                case 6:

                  this.transitionToRoute('index');
                  _context.next = 18;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context['catch'](2);

                  _context.t0.user = newUser;
                  this.send('error', _context.t0);
                  _context.next = 15;
                  return errorLogger.createError(_context.t0);

                case 15:
                  err = _context.sent;
                  _context.next = 18;
                  return this.get("store").createRecord("error", err).save();

                case 18:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 9]]);
        }));

        function saveUser(_x) {
          return _ref.apply(this, arguments);
        }

        return saveUser;
      }(),
      error: function error(_error) {
        this.set('errors', _error.user.errors);
        return false;
      }
    },

    resetErrors: function resetErrors() {
      this.set('errors', {});
    }
  });
});
define("book-demo/controllers/speaker/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    actions: {
      saveSpeaker: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt, speaker) {
          var errorLogger, newSpeaker, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorLogger = this.get("errorLogger");

                  if (!(evt.submitter.dataset.name === "save")) {
                    _context.next = 17;
                    break;
                  }

                  _context.prev = 2;
                  _context.next = 5;
                  return this.get("store").createRecord("speaker", speaker);

                case 5:
                  newSpeaker = _context.sent;
                  _context.next = 8;
                  return newSpeaker.save();

                case 8:
                  _context.next = 17;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](2);
                  _context.next = 14;
                  return errorLogger.createError(_context.t0);

                case 14:
                  err = _context.sent;
                  _context.next = 17;
                  return this.get("store").createRecord("error", err).save();

                case 17:

                  this.transitionToRoute("speaker.index");

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 10]]);
        }));

        function saveSpeaker(_x, _x2) {
          return _ref.apply(this, arguments);
        }

        return saveSpeaker;
      }()
    }
  });
});
define("book-demo/controllers/speaker/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    actions: {
      saveSpeaker: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt, speaker) {
          var speakerModel;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  evt.preventDefault();
                  speakerModel = this.get("model");

                  if (!(evt.submitter.dataset.name === "save")) {
                    _context.next = 8;
                    break;
                  }

                  speakerModel.set("name", speaker.name);
                  speakerModel.set("surname", speaker.surname);
                  speakerModel.set("patronymic", speaker.patronymic);

                  _context.next = 8;
                  return speakerModel.save();

                case 8:

                  this.transitionToRoute("speaker.index");

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function saveSpeaker(_x, _x2) {
          return _ref.apply(this, arguments);
        }

        return saveSpeaker;
      }()
    }
  });
});
define("book-demo/controllers/speaker/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend({
    search: "",
    session: Ember.inject.service(),

    actions: {
      deleteSpeaker: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(speaker) {
          var errorLogger, err;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  errorLogger = this.get("errorLogger");
                  _context.prev = 1;
                  _context.next = 4;
                  return speaker.destroyRecord();

                case 4:
                  _context.next = 6;
                  return this.get("store").unloadRecord(speaker);

                case 6:
                  _context.next = 15;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  _context.next = 12;
                  return errorLogger.createError(_context.t0);

                case 12:
                  err = _context.sent;
                  _context.next = 15;
                  return this.get("store").createRecord("error", err).save();

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 8]]);
        }));

        function deleteSpeaker(_x) {
          return _ref.apply(this, arguments);
        }

        return deleteSpeaker;
      }(),
      clickOnCreateButton: function clickOnCreateButton() {
        this.transitionToRoute("speaker.create");
      },
      clickOnEditButton: function clickOnEditButton(id) {
        this.transitionToRoute("/speakers/" + id + "/edit");
      },
      search: function search(_ref2) {
        var target = _ref2.target;

        Ember.run.debounce(this, this.set, 'search', target.value, 1000);
      }
    }
  });
});
define('book-demo/helpers/-link-to-params', ['exports', 'ember-angle-bracket-invocation-polyfill/helpers/-link-to-params'], function (exports, _linkToParams) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkToParams.default;
    }
  });
});
define('book-demo/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
define('book-demo/helpers/app-version', ['exports', 'book-demo/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('book-demo/helpers/await', ['exports', 'ember-promise-helpers/helpers/await'], function (exports, _await) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _await.default;
    }
  });
});
define('book-demo/helpers/bs-contains', ['exports', 'ember-bootstrap/helpers/bs-contains'], function (exports, _bsContains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsContains.default;
    }
  });
  Object.defineProperty(exports, 'bsContains', {
    enumerable: true,
    get: function () {
      return _bsContains.bsContains;
    }
  });
});
define('book-demo/helpers/bs-eq', ['exports', 'ember-bootstrap/helpers/bs-eq'], function (exports, _bsEq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsEq.default;
    }
  });
  Object.defineProperty(exports, 'eq', {
    enumerable: true,
    get: function () {
      return _bsEq.eq;
    }
  });
});
define('book-demo/helpers/can', ['exports', 'ember-can/helpers/can'], function (exports, _can) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _can.default;
    }
  });
});
define('book-demo/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _cancelAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
});
define('book-demo/helpers/cannot', ['exports', 'ember-can/helpers/cannot'], function (exports, _cannot) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cannot.default;
    }
  });
});
define('book-demo/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectIsGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('book-demo/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectIsSelected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('book-demo/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectTrueStringIfPresent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('book-demo/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(exports, 'equal', {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
define('book-demo/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(exports, 'gt', {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
define('book-demo/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
define('book-demo/helpers/is-after', ['exports', 'ember-moment/helpers/is-after'], function (exports, _isAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isAfter.default;
    }
  });
});
define('book-demo/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
define('book-demo/helpers/is-before', ['exports', 'ember-moment/helpers/is-before'], function (exports, _isBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBefore.default;
    }
  });
});
define('book-demo/helpers/is-between', ['exports', 'ember-moment/helpers/is-between'], function (exports, _isBetween) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBetween.default;
    }
  });
});
define('book-demo/helpers/is-empty', ['exports', 'ember-truth-helpers/helpers/is-empty'], function (exports, _isEmpty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
define('book-demo/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('book-demo/helpers/is-fulfilled', ['exports', 'ember-promise-helpers/helpers/is-fulfilled'], function (exports, _isFulfilled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isFulfilled.default;
    }
  });
  Object.defineProperty(exports, 'isFulfilled', {
    enumerable: true,
    get: function () {
      return _isFulfilled.isFulfilled;
    }
  });
});
define('book-demo/helpers/is-pending', ['exports', 'ember-promise-helpers/helpers/is-pending'], function (exports, _isPending) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isPending.default;
    }
  });
  Object.defineProperty(exports, 'isPending', {
    enumerable: true,
    get: function () {
      return _isPending.isPending;
    }
  });
});
define('book-demo/helpers/is-rejected', ['exports', 'ember-promise-helpers/helpers/is-rejected'], function (exports, _isRejected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isRejected.default;
    }
  });
  Object.defineProperty(exports, 'isRejected', {
    enumerable: true,
    get: function () {
      return _isRejected.isRejected;
    }
  });
});
define('book-demo/helpers/is-same-or-after', ['exports', 'ember-moment/helpers/is-same-or-after'], function (exports, _isSameOrAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrAfter.default;
    }
  });
});
define('book-demo/helpers/is-same-or-before', ['exports', 'ember-moment/helpers/is-same-or-before'], function (exports, _isSameOrBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrBefore.default;
    }
  });
});
define('book-demo/helpers/is-same', ['exports', 'ember-moment/helpers/is-same'], function (exports, _isSame) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSame.default;
    }
  });
});
define('book-demo/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
define('book-demo/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
define('book-demo/helpers/moment-add', ['exports', 'ember-moment/helpers/moment-add'], function (exports, _momentAdd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentAdd.default;
    }
  });
});
define('book-demo/helpers/moment-calendar', ['exports', 'ember-moment/helpers/moment-calendar'], function (exports, _momentCalendar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentCalendar.default;
    }
  });
});
define('book-demo/helpers/moment-diff', ['exports', 'ember-moment/helpers/moment-diff'], function (exports, _momentDiff) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDiff.default;
    }
  });
});
define('book-demo/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _momentDuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDuration.default;
    }
  });
});
define('book-demo/helpers/moment-format', ['exports', 'ember-moment/helpers/moment-format'], function (exports, _momentFormat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFormat.default;
    }
  });
});
define('book-demo/helpers/moment-from-now', ['exports', 'ember-moment/helpers/moment-from-now'], function (exports, _momentFromNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFromNow.default;
    }
  });
});
define('book-demo/helpers/moment-from', ['exports', 'ember-moment/helpers/moment-from'], function (exports, _momentFrom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFrom.default;
    }
  });
});
define('book-demo/helpers/moment-subtract', ['exports', 'ember-moment/helpers/moment-subtract'], function (exports, _momentSubtract) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentSubtract.default;
    }
  });
});
define('book-demo/helpers/moment-to-date', ['exports', 'ember-moment/helpers/moment-to-date'], function (exports, _momentToDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToDate.default;
    }
  });
});
define('book-demo/helpers/moment-to-now', ['exports', 'ember-moment/helpers/moment-to-now'], function (exports, _momentToNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToNow.default;
    }
  });
});
define('book-demo/helpers/moment-to', ['exports', 'ember-moment/helpers/moment-to'], function (exports, _momentTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentTo.default;
    }
  });
});
define('book-demo/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
define('book-demo/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moment.default;
    }
  });
});
define('book-demo/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
define('book-demo/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
define('book-demo/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _now) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _now.default;
    }
  });
});
define('book-demo/helpers/on-document', ['exports', 'ember-on-helper/helpers/on-document'], function (exports, _onDocument) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _onDocument.default;
    }
  });
});
define('book-demo/helpers/on-window', ['exports', 'ember-on-helper/helpers/on-window'], function (exports, _onWindow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _onWindow.default;
    }
  });
});
define('book-demo/helpers/on', ['exports', 'ember-on-helper/helpers/on'], function (exports, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _on.default;
    }
  });
});
define('book-demo/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
define('book-demo/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _perform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
});
define('book-demo/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('book-demo/helpers/promise-all', ['exports', 'ember-promise-helpers/helpers/promise-all'], function (exports, _promiseAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseAll.default;
    }
  });
  Object.defineProperty(exports, 'promiseAll', {
    enumerable: true,
    get: function () {
      return _promiseAll.promiseAll;
    }
  });
});
define('book-demo/helpers/promise-hash', ['exports', 'ember-promise-helpers/helpers/promise-hash'], function (exports, _promiseHash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseHash.default;
    }
  });
  Object.defineProperty(exports, 'promiseHash', {
    enumerable: true,
    get: function () {
      return _promiseHash.promiseHash;
    }
  });
});
define('book-demo/helpers/promise-rejected-reason', ['exports', 'ember-promise-helpers/helpers/promise-rejected-reason'], function (exports, _promiseRejectedReason) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseRejectedReason.default;
    }
  });
});
define('book-demo/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('book-demo/helpers/t', ['exports', 'ember-i18n/helper'], function (exports, _helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _helper.default;
    }
  });
});
define('book-demo/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _task) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
});
define('book-demo/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
define('book-demo/helpers/utc', ['exports', 'ember-moment/helpers/utc'], function (exports, _utc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _utc.default;
    }
  });
  Object.defineProperty(exports, 'utc', {
    enumerable: true,
    get: function () {
      return _utc.utc;
    }
  });
});
define('book-demo/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
define('book-demo/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'book-demo/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('book-demo/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('book-demo/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
});
define('book-demo/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('book-demo/initializers/ember-i18n-cp-validations', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    // intentionally left blank to not break upgrade path
  }

  exports.default = {
    name: 'ember-i18n-cp-validations',
    initialize: initialize
  };
});
define('book-demo/initializers/ember-i18n', ['exports', 'ember-i18n/initializers/ember-i18n'], function (exports, _emberI18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberI18n.default;
});
define('book-demo/initializers/ember-simple-auth', ['exports', 'book-demo/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service', 'ember-simple-auth/initializers/setup-session-restoration'], function (exports, _environment, _configuration, _setupSession, _setupSessionService, _setupSessionRestoration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _environment.default['ember-simple-auth'] || {};
      config.rootURL = _environment.default.rootURL || _environment.default.baseURL;
      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
      (0, _setupSessionRestoration.default)(registry);
    }
  };
});
define('book-demo/initializers/export-application-global', ['exports', 'book-demo/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('book-demo/initializers/load-bootstrap-config', ['exports', 'book-demo/config/environment', 'ember-bootstrap/config'], function (exports, _environment, _config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{
    _config.default.load(_environment.default['ember-bootstrap'] || {});
  }

  exports.default = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };
});
define('book-demo/initializers/setup-ember-can', ['exports', 'ember-can/initializers/setup-ember-can'], function (exports, _setupEmberCan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _setupEmberCan.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _setupEmberCan.initialize;
    }
  });
});
define('book-demo/initializers/simple-auth-token', ['exports', 'ember-simple-auth-token/authenticators/token', 'ember-simple-auth-token/authenticators/jwt'], function (exports, _token, _jwt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth-token',
    before: 'ember-simple-auth',
    initialize: function initialize(container) {
      container.register('authenticator:token', _token.default);
      container.register('authenticator:jwt', _jwt.default);
    }
  };
});
define("book-demo/initializers/start-application", ["exports", "book-demo/loggers/error-logger"], function (exports, _errorLogger) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize(application) {
    application.register("logger:error", _errorLogger.default);

    application.inject("component", "errorLogger", "logger:error");
    application.inject("route", "errorLogger", "logger:error");
    application.inject("controller", "errorLogger", "logger:error");
  }

  exports.default = {
    initialize: initialize
  };
});
define("book-demo/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('book-demo/instance-initializers/ember-i18n', ['exports', 'ember-i18n/instance-initializers/ember-i18n'], function (exports, _emberI18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberI18n.default;
});
define('book-demo/instance-initializers/ember-simple-auth', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize() {}
  };
});
define("book-demo/locales/en/config", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    // rtl: [true|FALSE],
    //
    // pluralForm: function(count) {
    //   if (count === 0) { return 'zero'; }
    //   if (count === 1) { return 'one'; }
    //   if (count === 2) { return 'two'; }
    //   if (count < 5) { return 'few'; }
    //   if (count >= 5) { return 'many'; }
    //   return 'other';
    // }
  };
});
define("book-demo/locales/en/translations", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    errors: {
      description: "This field",
      inclusion: "{{description}} is not included in the list",
      exclusion: "{{description}} is reserved",
      invalid: "{{description}} is invalid",
      confirmation: "{{description}} doesn't match {{on}}",
      accepted: "{{description}} must be accepted",
      empty: "{{description}} can't be empty",
      blank: "{{description}} can't be blank",
      present: "{{description}} must be blank",
      collection: "{{description}} must be a collection",
      singular: "{{description}} can't be a collection",
      tooLong: "{{description}} is too long (maximum is {{max}} characters)",
      tooShort: "{{description}} is too short (minimum is {{min}} characters)",
      before: "{{description}} must be before {{before}}",
      after: "{{description}} must be after {{after}}",
      wrongDateFormat: "{{description}} must be in the format of {{format}}",
      wrongLength: "{{description}} is the wrong length (should be {{is}} characters)",
      notANumber: "{{description}} must be a number",
      notAnInteger: "{{description}} must be an integer",
      greaterThan: "{{description}} must be greater than {{gt}}",
      greaterThanOrEqualTo: "{{description}} must be greater than or equal to {{gte}}",
      equalTo: "{{description}} must be equal to {{is}}",
      lessThan: "{{description}} must be less than {{lt}}",
      lessThanOrEqualTo: "{{description}} must be less than or equal to {{lte}}",
      otherThan: "{{description}} must be other than {{value}}",
      odd: "{{description}} must be odd",
      even: "{{description}} must be even",
      positive: "{{description}} must be positive",
      date: "{{description}} must be a valid date",
      onOrAfter: "{{description}} must be on or after {{onOrAfter}}",
      onOrBefore: "{{description}} must be on or before {{onOrBefore}}",
      email: "{{description}} must be a valid email address",
      phone: "{{description}} must be a valid phone number",
      url: "{{description}} must be a valid url"
    },
    menu: {
      speakers: "Speakers",
      speaker: "Speaker",
      books: "Books",
      book: "Book",
      meetings: "Meetings of club",
      meeting: "Meeting of club",
      meetingDate: "Meeting date",
      reports: "Reports list",
      register: "Register",
      login: "Login",
      logout: "Logout",
      desktop: "Desktop",
      request: "Submit request",
      plan: "Plan",
      english: "English",
      russian: "Russian",
      logoTitle: "Book club",
      review: "Review",
      rating: "Rating",
      links: "Links"
    }
  };
});
define("book-demo/locales/ru/config", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    // rtl: [true|FALSE],
    //
    // pluralForm: function(count) {
    //   if (count === 0) { return 'zero'; }
    //   if (count === 1) { return 'one'; }
    //   if (count === 2) { return 'two'; }
    //   if (count < 5) { return 'few'; }
    //   if (count >= 5) { return 'many'; }
    //   return 'other';
    // }
  };
});
define("book-demo/locales/ru/translations", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    errors: {
      description: "Это поле",
      inclusion: "{{description}} is not included in the list",
      exclusion: "{{description}} is reserved",
      invalid: "{{description}} is invalid",
      confirmation: "{{description}} не совпадает с {{on}}",
      accepted: "{{description}} must be accepted",
      empty: "{{description}} не может быть пустым",
      blank: "{{description}} должно быть заполнено",
      present: "{{description}} must be blank",
      collection: "{{description}} must be a collection",
      singular: "{{description}} can't be a collection",
      tooLong: "{{description}} слишком длинное (максимальная длина {{max}})",
      tooShort: "{{description}} слишком короткое (минимальная длинна {{min}})",
      before: "{{description}} must be before {{before}}",
      after: "{{description}} must be after {{after}}",
      wrongDateFormat: "{{description}} must be in the format of {{format}}",
      wrongLength: "{{description}} is the wrong length (should be {{is}} characters)",
      notANumber: "{{description}} должно быть числом",
      notAnInteger: "{{description}} must be an integer",
      greaterThan: "{{description}} must be greater than {{gt}}",
      greaterThanOrEqualTo: "{{description}} must be greater than or equal to {{gte}}",
      equalTo: "{{description}} must be equal to {{is}}",
      lessThan: "{{description}} must be less than {{lt}}",
      lessThanOrEqualTo: "{{description}} must be less than or equal to {{lte}}",
      otherThan: "{{description}} должен отличаться от {{value}}",
      odd: "{{description}} must be odd",
      even: "{{description}} must be even",
      positive: "{{description}} must be positive",
      date: "{{description}} must be a valid date",
      onOrAfter: "{{description}} must be on or after {{onOrAfter}}",
      onOrBefore: "{{description}} must be on or before {{onOrBefore}}",
      email: "{{description}} должно иметь корректный формат e-mail адреса",
      phone: "{{description}} must be a valid phone number",
      url: "{{description}} должно быть в формате URL"
    },
    menu: {
      speakers: "Спикеры",
      speaker: "Спикер",
      books: "Книги",
      book: "Книга",
      meetings: "Встречи клуба",
      meeting: "Встреча клуба",
      meetingDate: "Дата встречи",
      reports: "Список докладов",
      register: "Регистрация",
      login: "Войти",
      logout: "Выйти",
      desktop: "Рабочий стол",
      request: "Оставить заявку",
      plan: "Запланировать",
      english: "Английский",
      russian: "Русский",
      logoTitle: "Книжный клуб",
      review: "Отзыв",
      rating: "Оценка",
      links: "Ссылки"
    }
  };
});
define("book-demo/loggers/error-logger", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Object.extend({
    createError: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", {
                  date: new Date(),
                  userIP: null,
                  pageURL: window.location.href,
                  message: err
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createError(_x) {
        return _ref.apply(this, arguments);
      }

      return createError;
    }()
  });
});
define("book-demo/models/book", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    title: _emberData.default.attr("string"),
    authorName: _emberData.default.attr("string"),
    pageCount: _emberData.default.attr("number"),
    descriptionLink: _emberData.default.attr("string"),
    tags: _emberData.default.attr(),
    coverURL: _emberData.default.attr("string"),
    rate: _emberData.default.attr("number"),

    user: _emberData.default.belongsTo('user')
  });
});
define("book-demo/models/error", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    date: _emberData.default.attr("date"),
    userIP: _emberData.default.attr("string"),
    pageURL: _emberData.default.attr("string"),
    message: _emberData.default.attr("string")
  });
});
define("book-demo/models/meeting", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    date: _emberData.default.attr("date-string"),

    reports: _emberData.default.hasMany("report"),
    user: _emberData.default.belongsTo('user')
  });
});
define("book-demo/models/report", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    rate: _emberData.default.attr("number"),
    URLPresentation: _emberData.default.attr("string"),
    URLVideo: _emberData.default.attr("string"),
    review: _emberData.default.attr("string"),

    book: _emberData.default.belongsTo("book"),
    speaker: _emberData.default.belongsTo("speaker"),
    meeting: _emberData.default.belongsTo("meeting")
  });
});
define("book-demo/models/speaker", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr("string"),
    surname: _emberData.default.attr("string"),
    patronymic: _emberData.default.attr("string"),

    fullName: Ember.computed('surname', 'name', function () {
      return this.get('surname') + " " + this.get('name');
    }),
    user: _emberData.default.belongsTo('user')
  });
});
define("book-demo/models/user", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    email: _emberData.default.attr("string"),
    password: _emberData.default.attr(),

    books: _emberData.default.hasMany('book'),
    speakers: _emberData.default.hasMany('speaker'),
    meetings: _emberData.default.hasMany('meeting')
  });
});
define('book-demo/modifiers/focus-trap', ['exports', 'ember-focus-trap/modifiers/focus-trap'], function (exports, _focusTrap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _focusTrap.default;
    }
  });
});
define('book-demo/modifiers/ref', ['exports', 'ember-ref-modifier/modifiers/ref'], function (exports, _ref) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ref.default;
    }
  });
});
define('book-demo/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define("book-demo/router", ["exports", "book-demo/config/environment"], function (exports, _environment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
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

      this.route('report', function () {
        this.route('create', { path: ":id/create" });
        this.route('edit', { path: ":id/edit/:report_id" });
      });
    });
    this.route("error", { path: ":error" });
    this.route("404", { path: "*path" });
    this.route('login');
    this.route('register');
  });

  exports.default = Router;
});
define('book-demo/routes/404', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define("book-demo/routes/application", ["exports", "ember-simple-auth/mixins/application-route-mixin"], function (exports, _applicationRouteMixin) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_applicationRouteMixin.default, {
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),

    beforeModel: function beforeModel() {
      this._super.apply(this, arguments);

      this.loadUser();
    },
    sessionAuthenticated: function sessionAuthenticated() {
      this._super.apply(this, arguments);

      this.loadUser();
    },
    sessionInvalidated: function sessionInvalidated() {
      this.get("currentUser").resetCurrentUser();
      window.location.replace("/login");
    },
    loadUser: function loadUser() {
      if (this.get("session.isAuthenticated")) {
        this.get("currentUser").load();
      }
    },


    actions: {
      error: function error(_error, transition) {
        if (transition) {
          transition.abort();
        }
        this.intermediateTransitionTo("error", { error: _error.message });
        return true;
      }
    }
  });
});
define("book-demo/routes/book/create", ["exports", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _authenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    model: function model() {
      return Ember.Object.create({
        title: "",
        authorName: "",
        pageCount: "",
        descriptionLink: "",
        tags: [],
        coverURL: ""
      });
    },
    setupController: function setupController(controller /*, model*/) {
      this._super.apply(this, arguments);
      controller.set("uploadData", null);
    }
  });
});
define("book-demo/routes/book/edit", ["exports", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _authenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    model: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var id = _ref.id;
        var errorLogger, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errorLogger = this.get("errorLogger");
                _context.prev = 1;
                return _context.abrupt("return", this.get("store").findRecord("book", id));

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](1);
                _context.next = 9;
                return errorLogger.createError(_context.t0);

              case 9:
                err = _context.sent;
                _context.next = 12;
                return this.get("store").createRecord("error", err).save();

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 5]]);
      }));

      function model(_x) {
        return _ref2.apply(this, arguments);
      }

      return model;
    }(),
    setupController: function setupController(controller /*, model*/) {
      this._super.apply(this, arguments);
      controller.set("uploadData", null);
    }
  });
});
define("book-demo/routes/book/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend({
    queryParams: {
      search: {
        refreshModel: true
      },
      searchByTags: {
        refreshModel: true
      }
    },
    model: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var search = _ref.search,
            searchByTags = _ref.searchByTags;
        var query, errorLogger, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = {};
                errorLogger = this.get("errorLogger");


                if (search) {
                  query.q = search;
                }

                if (searchByTags) {
                  query.tags_like = searchByTags;
                }

                _context.prev = 4;
                return _context.abrupt("return", this.get("store").query("book", query));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](4);
                _context.next = 12;
                return errorLogger.createError(_context.t0);

              case 12:
                err = _context.sent;
                _context.next = 15;
                return this.get("store").createRecord("error", err).save();

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 8]]);
      }));

      function model(_x) {
        return _ref2.apply(this, arguments);
      }

      return model;
    }()
  });
});
define('book-demo/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define("book-demo/routes/login", ["exports", "ember-simple-auth/mixins/unauthenticated-route-mixin"], function (exports, _unauthenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
    model: function model() {
      return {
        email: "",
        password: ""
      };
    },
    resetController: function resetController(controller, isExiting) {
      this._super.apply(this, arguments);
      if (isExiting) {
        controller.resetErrors();
      }
    }
  });
});
define("book-demo/routes/meeting/create", ["exports", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _authenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    moment: Ember.inject.service(),
    model: function model() {
      return Ember.Object.create({
        date: this.get("moment").moment(new Date()).format("YYYY-MM-DD"),
        reports: []
      });
    }
  });
});
define("book-demo/routes/meeting/edit", ["exports", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _authenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    model: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var id = _ref.id;
        var errorLogger, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errorLogger = this.get("errorLogger");
                _context.prev = 1;
                return _context.abrupt("return", this.get("store").findRecord("meeting", id));

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](1);
                _context.next = 9;
                return errorLogger.createError(_context.t0);

              case 9:
                err = _context.sent;
                _context.next = 12;
                return this.get("store").createRecord("error", err).save();

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 5]]);
      }));

      function model(_x) {
        return _ref2.apply(this, arguments);
      }

      return model;
    }()
  });
});
define("book-demo/routes/meeting/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend({
    queryParams: {
      page: {
        refreshModel: true
      },
      speaker: {
        refreshModel: true
      },
      book: {
        refreshModel: true
      },
      date: {
        refreshModel: true
      }
    },

    model: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var book = _ref.book,
            speaker = _ref.speaker,
            date = _ref.date,
            page = _ref.page;
        var errorLogger, query, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errorLogger = this.get("errorLogger");
                query = {
                  _page: page
                };


                if (book) {
                  query.book = book;
                }

                if (speaker) {
                  query.speaker = speaker;
                }

                if (date) {
                  query.date_like = date;
                }

                _context.prev = 5;
                return _context.abrupt("return", Ember.RSVP.hash({
                  speakers: this.get("store").findAll("speaker"),
                  books: this.get("store").findAll("book"),
                  meetings: this.get("store").query("meeting", query)
                }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](5);
                _context.next = 13;
                return errorLogger.createError(_context.t0);

              case 13:
                err = _context.sent;
                _context.next = 16;
                return this.get("store").createRecord("error", err).save();

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 9]]);
      }));

      function model(_x) {
        return _ref2.apply(this, arguments);
      }

      return model;
    }()
  });
});
define("book-demo/routes/meeting/report/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend({
    model: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var id = _ref.id;
        var speakers, books, meeting, report;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.get("store").findAll("speaker");

              case 2:
                speakers = _context.sent;
                _context.next = 5;
                return this.get("store").findAll("book");

              case 5:
                books = _context.sent;
                _context.next = 8;
                return this.get("store").findRecord("meeting", id);

              case 8:
                meeting = _context.sent;
                report = Ember.Object.create({
                  date: meeting.date,
                  meeting: meeting,
                  rate: "",
                  URLPresentation: "",
                  URLVideo: "",
                  book: null,
                  speaker: null,
                  review: ""
                });
                return _context.abrupt("return", Ember.RSVP.hash({
                  speakers: speakers,
                  books: books,
                  meeting: meeting,
                  report: report
                }));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function model(_x) {
        return _ref2.apply(this, arguments);
      }

      return model;
    }()
  });
});
define("book-demo/routes/meeting/report/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend({
    model: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var id = _ref.id,
            report_id = _ref.report_id;
        var errorLogger, speakers, books, meeting, report, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errorLogger = this.get("errorLogger");
                _context.prev = 1;
                _context.next = 4;
                return this.get("store").findAll("speaker");

              case 4:
                speakers = _context.sent;
                _context.next = 7;
                return this.get("store").findAll("book");

              case 7:
                books = _context.sent;
                _context.next = 10;
                return this.get("store").findRecord("meeting", id);

              case 10:
                meeting = _context.sent;
                _context.next = 13;
                return this.get("store").findRecord("report", report_id);

              case 13:
                report = _context.sent;

                report.set("date", meeting.get("date"));

                return _context.abrupt("return", Ember.RSVP.hash({
                  speakers: speakers,
                  books: books,
                  meeting: meeting,
                  report: report
                }));

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](1);
                _context.next = 22;
                return errorLogger.createError(_context.t0);

              case 22:
                err = _context.sent;
                _context.next = 25;
                return this.get("store").createRecord("error", err).save();

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 18]]);
      }));

      function model(_x) {
        return _ref2.apply(this, arguments);
      }

      return model;
    }()
  });
});
define("book-demo/routes/register", ["exports", "ember-simple-auth/mixins/unauthenticated-route-mixin"], function (exports, _unauthenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
    model: function model() {
      return {
        email: "",
        password: ""
      };
    },
    resetController: function resetController(controller, isExiting) {
      this._super.apply(this, arguments);
      if (isExiting) {
        controller.resetErrors();
      }
    }
  });
});
define("book-demo/routes/speaker/create", ["exports", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _authenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    model: function model() {
      return Ember.Object.create({
        name: "",
        surname: "",
        patronymic: ""
      });
    }
  });
});
define("book-demo/routes/speaker/edit", ["exports", "ember-simple-auth/mixins/authenticated-route-mixin"], function (exports, _authenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    model: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var id = _ref.id;
        var errorLogger, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errorLogger = this.get("errorLogger");
                _context.prev = 1;
                return _context.abrupt("return", this.get("store").findRecord("speaker", id));

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](1);
                _context.next = 9;
                return errorLogger.createError(_context.t0);

              case 9:
                err = _context.sent;
                _context.next = 12;
                return this.get("store").createRecord("error", err).save();

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 5]]);
      }));

      function model(_x) {
        return _ref2.apply(this, arguments);
      }

      return model;
    }()
  });
});
define("book-demo/routes/speaker/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend({
    queryParams: {
      search: {
        refreshModel: true
      }
    },
    model: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var search = _ref.search;
        var query, errorLogger, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = {};


                if (search) {
                  query.q = search;
                }

                errorLogger = this.get("errorLogger");
                _context.prev = 3;
                return _context.abrupt("return", this.get("store").query("speaker", query));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](3);
                _context.next = 11;
                return errorLogger.createError(_context.t0);

              case 11:
                err = _context.sent;
                _context.next = 14;
                return this.get("store").createRecord("error", err).save();

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 7]]);
      }));

      function model(_x) {
        return _ref2.apply(this, arguments);
      }

      return model;
    }()
  });
});
define("book-demo/serializers/application", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONSerializer.extend({
    normalize: function normalize() {
      return this._super.apply(this, arguments);
    },
    keyForRelationship: function keyForRelationship(key, typeClass) {
      if (typeClass === "belongsTo") {
        return key + "Id";
      }

      return this._super.apply(this, arguments);
    },
    extractRelationship: function extractRelationship() {
      return this._super.apply(this, arguments);
    },
    serializeBelongsTo: function serializeBelongsTo(snapshot, json, relationship) {
      var key = relationship.key;
      var belongsTo = snapshot.belongsTo(key);

      key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo", "serialize") : key;
      json[key] = Ember.isNone(belongsTo) ? belongsTo : parseInt(belongsTo.record.get("id"));
    }
  });
});
define('book-demo/serializers/book', ['exports', 'book-demo/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({});
});
define("book-demo/serializers/meeting", ["exports", "book-demo/serializers/application", "ember-data"], function (exports, _application, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend(_emberData.default.EmbeddedRecordsMixin, {
    attrs: {
      reports: {
        serialize: false,
        deserialize: "records"
      }
    }
  });
});
define("book-demo/serializers/report", ["exports", "book-demo/serializers/application"], function (exports, _application) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({});
});
define('book-demo/serializers/speaker', ['exports', 'book-demo/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({});
});
define('book-demo/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('book-demo/services/can', ['exports', 'ember-can/services/can'], function (exports, _can) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _can.default;
    }
  });
});
define('book-demo/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _cookies) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cookies.default;
});
define("book-demo/services/current-user", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Service.extend({
    store: Ember.inject.service(),
    user: null,

    load: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.get("store").queryRecord("user", { me: true });

              case 2:
                user = _context.sent;

                this.set("user", user);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _ref.apply(this, arguments);
      }

      return load;
    }(),
    resetCurrentUser: function resetCurrentUser() {
      this.set("user", null);
    }
  });
});
define("book-demo/services/data", ["exports", "book-demo/config/environment"], function (exports, _environment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Service.extend({
    session: Ember.inject.service(),

    uploadBookData: function uploadBookData(savedBook, uploadData) {
      var _this = this;

      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:

                  if (!uploadData) {
                    resolve();
                  }
                  uploadData.url = "" + _environment.default.fileUploadURL;
                  uploadData.submit().done(function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(result) {
                      var dataToUpload;
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              dataToUpload = {
                                entityName: "books",
                                id: savedBook.id,
                                fileName: result.filename
                              };
                              _context.next = 4;
                              return fetch(_environment.default.backendURL + "/books/" + dataToUpload.id, {
                                method: "PATCH",
                                headers: {
                                  "Content-Type": "application/json",
                                  "Authorization": "Bearer " + _this.session.data.authenticated.token
                                },
                                body: JSON.stringify({ coverURL: "uploads/" + dataToUpload.fileName })
                              });

                            case 4:

                              // eslint-disable-next-line no-console
                              console.log("Ok");
                              resolve();
                              _context.next = 11;
                              break;

                            case 8:
                              _context.prev = 8;
                              _context.t0 = _context["catch"](0);

                              reject(_context.t0);

                            case 11:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, _this, [[0, 8]]);
                    }));

                    return function (_x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }()).fail(function (jqXhr, textStatus, errorThrown) {
                    reject(errorThrown);
                  });

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  });
});
define('book-demo/services/g-recaptcha-v3', ['exports', 'ember-cli-google-recaptcha/services/g-recaptcha-v3'], function (exports, _gRecaptchaV) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gRecaptchaV.default;
    }
  });
});
define('book-demo/services/g-recaptcha', ['exports', 'ember-cli-google-recaptcha/services/g-recaptcha'], function (exports, _gRecaptcha) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gRecaptcha.default;
    }
  });
});
define('book-demo/services/i18n', ['exports', 'ember-i18n/services/i18n'], function (exports, _i18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _i18n.default;
    }
  });
});
define('book-demo/services/moment', ['exports', 'ember-moment/services/moment', 'book-demo/config/environment'], function (exports, _moment, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get;
  exports.default = _moment.default.extend({
    defaultFormat: get(_environment.default, 'moment.outputFormat')
  });
});
define('book-demo/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _session.default;
});
define('book-demo/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _textMeasurer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textMeasurer.default;
    }
  });
});
define('book-demo/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _adaptive) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adaptive.default.extend();
});
define("book-demo/templates/404", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fFcrsEsV", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row align-items-center h-100\"],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/images/404image.jpg\"],[10,\"alt\",\"Error 404\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/404.hbs" } });
});
define("book-demo/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "irMO1RAL", "block": "{\"symbols\":[],\"statements\":[[6,\"nav\"],[10,\"class\",\"navbar fixed-top navbar-expand-lg navbar-light bg-light\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"    \"],[6,\"img\"],[11,\"src\",[27,[[20,\"rootURL\"],\"images/logo-dark.png\"]]],[10,\"width\",\"30\"],[10,\"height\",\"30\"],[10,\"class\",\"d-inline-block align-top\"],[10,\"alt\",\"\"],[10,\"loading\",\"lazy\"],[8],[9],[0,\"\\n    \"],[1,[26,\"t\",[\"menu.logoTitle\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"button\"],[10,\"class\",\"navbar-toggler\"],[10,\"data-toggle\",\"collapse\"],[10,\"data-target\",\"#navbarContent\"],[10,\"aria-controls\",\"navbarSupportedContent\"],[10,\"aria-expanded\",\"false\"],[10,\"aria-label\",\"Открыть меню\"],[10,\"type\",\"button\"],[8],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"navbar-toggler-icon\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"collapse navbar-collapse\"],[10,\"id\",\"navbarContent\"],[8],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"nav navbar-nav navigation-main\"],[8],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"nav-item active\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          \"],[1,[26,\"t\",[\"menu.desktop\"],null],false],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"sr-only\"],[8],[0,\"(текущий)\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"nav-item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"meeting.index\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          \"],[1,[26,\"t\",[\"menu.meetings\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"nav-item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"book.index\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          \"],[1,[26,\"t\",[\"menu.books\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"nav-item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"speaker.index\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          \"],[1,[26,\"t\",[\"menu.speakers\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"nav-item\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"nav-link text-success\"],[10,\"href\",\"#\"],[8],[1,[26,\"t\",[\"menu.request\"],null],false],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"nav-item\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"nav-link text-primary\"],[10,\"href\",\"#\"],[8],[1,[26,\"t\",[\"menu.plan\"],null],false],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"nav-item\"],[8],[0,\"\\n      \"],[6,\"select\"],[10,\"id\",\"languageSelect\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"changeLocale\"],null],null],[8],[0,\"\\n        \"],[6,\"option\"],[10,\"value\",\"ru\"],[11,\"selected\",[20,\"isRussian\"],null],[8],[1,[26,\"t\",[\"menu.russian\"],null],false],[9],[0,\"\\n        \"],[6,\"option\"],[10,\"value\",\"en\"],[11,\"selected\",[20,\"isEnglish\"],null],[8],[1,[26,\"t\",[\"menu.english\"],null],false],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"nav navbar-nav\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"        \"],[6,\"li\"],[8],[6,\"a\"],[10,\"href\",\"#\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"logout\"],null],null],[8],[1,[26,\"t\",[\"menu.logout\"],null],false],[9],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"li\"],[10,\"class\",\"nav-item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"register\"],[[\"class\"],[\"nav-link text-info\"]],{\"statements\":[[0,\"            \"],[1,[26,\"t\",[\"menu.register\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n        \"],[6,\"li\"],[10,\"class\",\"nav-item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"login\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"            \"],[1,[26,\"t\",[\"menu.login\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[20,\"outlet\"],false],[0,\"\\n\\n\"],[6,\"footer\"],[10,\"class\",\"footer\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n    \"],[6,\"span\"],[8],[0,\"© New Platform Ltd., 2022\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/application.hbs" } });
});
define("book-demo/templates/book/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zx3lqMKS", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"book-form\",null,[[\"book\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"saveBook\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/book/create.hbs" } });
});
define("book-demo/templates/book/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2zwYHQBk", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"book-form\",null,[[\"book\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"saveBook\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/book/edit.hbs" } });
});
define("book-demo/templates/book/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sn5ol7OA", "block": "{\"symbols\":[\"book\"],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"htop\"],[8],[0,\"\\n    \"],[6,\"h2\"],[10,\"class\",\"text-center\"],[8],[1,[26,\"t\",[\"menu.books\"],null],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-row navbar-panel justify-content-between\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"          \"],[6,\"button\"],[10,\"class\",\"btn btn-outline-primary my-2\"],[10,\"title\",\"Добавить книгу\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"clickOnCreateButton\"],null],null],[10,\"type\",\"button\"],[8],[0,\"\\n            \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-plus card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n              \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n        \"],[6,\"form\"],[10,\"class\",\"form-inline\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"class\",\"form-control mr-2 search-long\"],[10,\"placeholder\",\"Найти по полям\"],[10,\"aria-label\",\"Найти по полям\"],[11,\"oninput\",[26,\"action\",[[21,0,[]],\"search\"],null],null],[11,\"defaultValue\",[20,\"search\"],null],[10,\"type\",\"search\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n        \"],[6,\"form\"],[10,\"class\",\"form-inline\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"class\",\"form-control mr-2\"],[10,\"placeholder\",\"Поиск по тегам\"],[10,\"aria-label\",\"Найти по тегам\"],[11,\"oninput\",[26,\"action\",[[21,0,[]],\"searchByTags\"],null],null],[11,\"defaultValue\",[20,\"searchByTags\"],null],[10,\"type\",\"search\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[21,0,[\"isLoading\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"row align-items-center justify-content-center h-100\"],[8],[0,\"\\n          \"],[6,\"img\"],[10,\"src\",\"/images/loading.gif\"],[10,\"alt\",\"Loading\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"row row-cols-1 row-cols-md-3 fix-margin\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"          \"],[1,[26,\"book-item\",null,[[\"book\",\"deleteAction\",\"editAction\",\"routeByTag\"],[[21,1,[]],[26,\"action\",[[21,0,[]],\"deleteBook\",[21,1,[]]],null],[26,\"action\",[[21,0,[]],\"clickOnEditButton\",[21,1,[\"id\"]]],null],[26,\"action\",[[21,0,[]],\"routeByTag\"],null]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/book/index.hbs" } });
});
define("book-demo/templates/components/book-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gggNYUyK", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"htop\"],[8],[0,\"\\n    \"],[6,\"h2\"],[10,\"class\",\"text-center\"],[8],[0,\"Создание книги: \"],[1,[22,[\"book\",\"title\"]],false],[9],[0,\"\\n    \"],[6,\"form\"],[10,\"class\",\"edit-form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputTitle\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Название\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"text\",\"form-control form-control-lg\",\"inputTitle\",\"Полное название книги\",[22,[\"title\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputAuthor\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Автор\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"text\",\"form-control form-control-lg\",\"inputAuthor\",\"Фамилия И.О. автора\",[22,[\"authorName\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputPagesCount\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Объем\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"number\",\"form-control form-control-lg\",\"inputPagesCount\",\"Количество страниц книги\",[22,[\"pageCount\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputDescriptionURL\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Описание\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"url\",\"form-control form-control-lg\",\"inputDescriptionURL\",\"Ссылка на сайт с описанием книги\",[22,[\"descriptionLink\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"customFile\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Обложка\"],[9],[0,\"\\n        \"],[1,[26,\"input-file\",null,[[\"class\",\"uploadData\",\"coverURL\",\"uploadDataChanged\"],[\"input-group input-group-lg col-sm-10\",[22,[\"uploadData\"]],[22,[\"coverURL\"]],[26,\"action\",[[21,0,[]],\"changeUploadData\"],null]]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputTags\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Теги\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n\"],[0,\"          \"],[1,[26,\"input-tags\",null,[[\"tags\",\"onChange\"],[[22,[\"tags\"]],[26,\"action\",[[21,0,[]],\"changeTags\"],null]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-12 text-right\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"data-name\",\"save\"],[10,\"class\",\"btn btn-primary btn-lg\"],[10,\"type\",\"submit\"],[8],[0,\"Сохранить\"],[9],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-outline-secondary btn-lg\"],[10,\"type\",\"submit\"],[8],[0,\"Отмена\"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/book-form.hbs" } });
});
define("book-demo/templates/components/book-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hiFurV+J", "block": "{\"symbols\":[\"tag\"],\"statements\":[[6,\"div\"],[10,\"class\",\"col mb-4\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"card\"],[8],[0,\"\\n    \"],[6,\"img\"],[11,\"src\",[26,\"if\",[[22,[\"book\",\"coverURL\"]],[22,[\"book\",\"coverURL\"]],\"images/book-cover.jpg\"],null],null],[10,\"class\",\"card-img-top\"],[10,\"alt\",\"Обложка книги\"],[8],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"card-header\"],[8],[0,\"\\n      \"],[6,\"h5\"],[10,\"class\",\"card-title\"],[8],[1,[22,[\"book\",\"title\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"list-group list-group-flush\"],[8],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"list-group-item\"],[8],[0,\"\\n        \"],[6,\"div\"],[8],[6,\"strong\"],[8],[0,\"Автор\"],[9],[0,\": \"],[1,[22,[\"book\",\"authorName\"]],false],[9],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"strong\"],[8],[0,\"Количество страниц\"],[9],[0,\":\\n          \"],[1,[22,[\"book\",\"pageCount\"]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"strong\"],[8],[0,\"Теги\"],[9],[0,\":\\n\"],[4,\"each\",[[22,[\"book\",\"tags\"]]],null,{\"statements\":[[4,\"link-to\",[\"book.index\"],[[\"class\"],[\"tag-link\"]],{\"statements\":[[0,\"              \"],[6,\"span\"],[10,\"class\",\"small\"],[11,\"onClick\",[26,\"action\",[[21,0,[]],\"route\",[21,1,[]]],null],null],[8],[0,\"#\"],[1,[21,1,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"list-group-item\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n            Рейтинг:\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"col\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"progress\"],[8],[0,\"\\n              \"],[6,\"div\"],[10,\"class\",\"progress-bar\"],[10,\"role\",\"progressbar\"],[11,\"style\",[20,\"rateWidth\"],null],[10,\"aria-valuenow\",\"25\"],[10,\"aria-valuemin\",\"0\"],[10,\"aria-valuemax\",\"100\"],[8],[1,[20,\"rate\"],false],[0,\"%\"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"card-footer\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col\"],[8],[0,\"\\n          \"],[6,\"a\"],[11,\"href\",[22,[\"book\",\"descriptionLink\"]],null],[10,\"class\",\"card-link line-offset\"],[8],[0,\"Описание\"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"edit book\",[22,[\"book\"]]],null]],null]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"col text-right\"],[8],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"btn btn-edit\"],[11,\"onclick\",[20,\"editAction\"],null],[10,\"type\",\"button\"],[8],[0,\"\\n              \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-pencil card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n                \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"btn btn-trash\"],[11,\"onClick\",[20,\"deleteAction\"],null],[10,\"type\",\"button\"],[8],[0,\"\\n              \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-trash card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n                \"],[6,\"path\"],[10,\"d\",\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"],[8],[9],[0,\"\\n                \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/book-item.hbs" } });
});
define('book-demo/templates/components/ember-popper-targeting-parent', ['exports', 'ember-popper/templates/components/ember-popper-targeting-parent'], function (exports, _emberPopperTargetingParent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopperTargetingParent.default;
    }
  });
});
define('book-demo/templates/components/ember-popper', ['exports', 'ember-popper/templates/components/ember-popper'], function (exports, _emberPopper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
});
define("book-demo/templates/components/input-file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "oSFIuiUg", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"custom-file\"],[8],[0,\"\\n  \"],[6,\"input\"],[10,\"class\",\"custom-file-input\"],[10,\"id\",\"customFile\"],[10,\"lang\",\"ru\"],[10,\"type\",\"file\"],[8],[9],[0,\"\\n  \"],[6,\"label\"],[11,\"class\",[27,[\"custom-file-label form-control-lg \",[26,\"if\",[[22,[\"isFileChoosen\"]],\"\",\"placeholder-color\"],null]]]],[10,\"for\",\"customFile\"],[10,\"data-browse\",\"Выбрать\"],[8],[1,[20,\"fileName\"],false],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"input-group-append\"],[8],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-outline-secondary custom-file-clear\"],[11,\"disabled\",[20,\"ifRemoveButtonDisabled\"],null],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"removeFile\"],null],null],[10,\"type\",\"button\"],[8],[0,\"X\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/input-file.hbs" } });
});
define("book-demo/templates/components/input-tags", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fZYaKSZS", "block": "{\"symbols\":[\"tag\"],\"statements\":[[6,\"select\"],[10,\"multiple\",\"multiple\"],[10,\"data-role\",\"tagsinput\"],[10,\"id\",\"inputTags\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"tags\"]]],null,{\"statements\":[[0,\"    \"],[6,\"option\"],[11,\"value\",[27,[[21,1,[]]]]],[10,\"selected\",\"selected\"],[8],[1,[21,1,[]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/input-tags.hbs" } });
});
define("book-demo/templates/components/login-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zH7ykvjD", "block": "{\"symbols\":[\"error\"],\"statements\":[[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"login\"],null],null],[8],[0,\"\\n  \"],[6,\"img\"],[10,\"class\",\"mb-4\"],[10,\"src\",\"images/logo-dark.png\"],[10,\"alt\",\"\"],[10,\"height\",\"57\"],[8],[9],[0,\"\\n  \"],[6,\"h1\"],[10,\"class\",\"h3 mb-3 fw-normal\"],[8],[0,\"Вход\"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"errors\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"error-alert\"],[8],[1,[21,1,[\"detail\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[6,\"div\"],[10,\"class\",\"form-floating\"],[8],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"email\",\"form-control\",\"floatingInput\",\"name@example.com\",[22,[\"email\"]]]]],false],[0,\"\\n\"],[4,\"if\",[[26,\"and\",[[22,[\"isInvalid\"]],[26,\"get\",[[26,\"get\",[[21,0,[\"validations\",\"attrs\"]],\"email\"],null],\"isInvalid\"],null]],null]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n        \"],[1,[26,\"get\",[[26,\"get\",[[21,0,[\"validations\",\"attrs\"]],\"email\"],null],\"message\"],null],false],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-floating\"],[8],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"floatingPassword\",\"Пароль\",[22,[\"password\"]]]]],false],[0,\"\\n\"],[4,\"if\",[[26,\"and\",[[22,[\"isInvalid\"]],[26,\"get\",[[26,\"get\",[[21,0,[\"validations\",\"attrs\"]],\"password\"],null],\"isInvalid\"],null]],null]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n        \"],[1,[26,\"get\",[[26,\"get\",[[21,0,[\"validations\",\"attrs\"]],\"password\"],null],\"message\"],null],false],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"checkbox mb-3\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"\\n      \"],[6,\"input\"],[10,\"value\",\"remember-me\"],[10,\"type\",\"checkbox\"],[8],[9],[0,\"\\n      Запомнить\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"w-100 btn btn-lg btn-primary mb-3\"],[10,\"href\",\"index.html\"],[10,\"type\",\"submit\"],[8],[0,\"Войти\"],[9],[0,\"\\n  \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"w-100\"]],{\"statements\":[[0,\"Назад\"]],\"parameters\":[]},null],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/login-form.hbs" } });
});
define("book-demo/templates/components/meeting-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "E+Iu15k/", "block": "{\"symbols\":[\"report\"],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"htop\"],[8],[0,\"\\n    \"],[6,\"h2\"],[10,\"class\",\"text-center\"],[8],[0,\"Редактирование встречи\"],[9],[0,\"\\n    \"],[6,\"form\"],[10,\"class\",\"edit-form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"border border-dark rounded p-4 mb-4\"],[8],[0,\"\\n        \"],[6,\"h4\"],[8],[0,\"Дата встречи\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"row h-100 justify-content-between mb-4\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"datepicker datepicker-meeting date input-group p-0\"],[8],[0,\"\\n              \"],[1,[26,\"input\",null,[[\"type\",\"placeholder\",\"class\",\"id\",\"value\"],[\"date\",\"Дата...\",\"form-control\",\"meetingDate\",[22,[\"date\"]]]]],false],[0,\"\\n              \"],[6,\"div\"],[10,\"class\",\"input-group-append\"],[8],[0,\"\\n                \"],[6,\"span\"],[10,\"class\",\"input-group-text px-4\"],[8],[0,\"\\n                  \"],[6,\"svg\"],[10,\"width\",\"1em\"],[10,\"height\",\"1em\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-clock\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n                    \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z\"],[8],[9],[0,\"\\n                    \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z\"],[8],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"row h-100 justify-content-between\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n            \"],[6,\"h4\"],[8],[0,\"Список докладов\"],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"meeting\",\"id\"]]],null,{\"statements\":[[4,\"link-to\",[\"meeting.report.create\",[22,[\"meeting\",\"id\"]]],[[\"class\"],[\"btn btn-edit\"]],{\"statements\":[[0,\"                \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-plus-square card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n                  \"],[6,\"path\"],[10,\"d\",\"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z\"],[8],[9],[0,\"\\n                  \"],[6,\"path\"],[10,\"d\",\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},{\"statements\":[[0,\"              \"],[6,\"button\"],[10,\"class\",\"btn btn-edit\"],[11,\"onclick\",[20,\"clickOnCreateReport\"],null],[10,\"type\",\"button\"],[8],[0,\"\\n                \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-plus-square card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n                  \"],[6,\"path\"],[10,\"d\",\"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z\"],[8],[9],[0,\"\\n                  \"],[6,\"path\"],[10,\"d\",\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"ul\"],[10,\"class\",\"list-group\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"reports\"]]],null,{\"statements\":[[0,\"            \"],[1,[26,\"report-item\",null,[[\"report\",\"isEdit\",\"class\",\"tagName\",\"meetingId\",\"deleteAction\"],[[21,1,[]],true,\"list-group-item\",\"li\",[22,[\"meeting\",\"id\"]],[26,\"action\",[[21,0,[]],\"deleteReport\",[21,1,[]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-12 text-right\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-primary btn-lg\"],[10,\"data-name\",\"save\"],[10,\"type\",\"submit\"],[8],[0,\"Сохранить\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"meeting.index\"],[[\"class\"],[\"btn btn-outline-secondary btn-lg\"]],{\"statements\":[[0,\"            Отмена\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/meeting-form.hbs" } });
});
define("book-demo/templates/components/meeting-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "iYUmA+yR", "block": "{\"symbols\":[\"report\"],\"statements\":[[6,\"h4\"],[8],[1,[26,\"t\",[\"menu.meetingDate\"],null],false],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"row h-100 justify-content-between mb-4\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"datepicker datepicker-meeting date input-group p-0\"],[8],[0,\"\\n      \"],[6,\"input\"],[10,\"placeholder\",\"Дата встречи\"],[10,\"class\",\"form-control meeting-date\"],[11,\"value\",[26,\"moment-format\",[[22,[\"meeting\",\"date\"]],\"Do MMMM YYYY\"],null],null],[10,\"disabled\",\"disabled\"],[10,\"type\",\"text\"],[8],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"input-group-append\"],[8],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"input-group-text px-4\"],[8],[0,\"\\n          \"],[6,\"svg\"],[10,\"width\",\"1em\"],[10,\"height\",\"1em\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-clock\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n            \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z\"],[8],[9],[0,\"\\n            \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"edit meeting\",[22,[\"meeting\"]]],null]],null]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-edit\"],[11,\"onclick\",[20,\"editAction\"],null],[10,\"type\",\"button\"],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-pencil card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n          \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-trash\"],[11,\"onClick\",[20,\"deleteAction\"],null],[10,\"type\",\"button\"],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-trash card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n          \"],[6,\"path\"],[10,\"d\",\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"],[8],[9],[0,\"\\n          \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"],[6,\"h4\"],[8],[1,[26,\"t\",[\"menu.reports\"],null],false],[9],[0,\"\\n\"],[6,\"ul\"],[10,\"class\",\"list-group\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"meeting\",\"reports\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"report-item\",null,[[\"report\",\"class\",\"tagName\"],[[21,1,[]],\"list-group-item\",\"li\"]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/meeting-item.hbs" } });
});
define("book-demo/templates/components/register-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1bLD6jkt", "block": "{\"symbols\":[],\"statements\":[[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"saveUser\"],null],null],[8],[0,\"\\n  \"],[6,\"img\"],[10,\"class\",\"mb-4\"],[10,\"src\",\"images/logo-dark.png\"],[10,\"alt\",\"\"],[10,\"height\",\"57\"],[8],[9],[0,\"\\n  \"],[6,\"h1\"],[10,\"class\",\"h3 mb-3 fw-normal\"],[8],[0,\"Регистрация\"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"form-floating\"],[8],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"email\",\"form-control\",\"floatingInput\",\"name@example.com\",[22,[\"email\"]]]]],false],[0,\"\\n\\n\"],[4,\"if\",[[26,\"get\",[[26,\"get\",[[21,0,[\"validations\",\"attrs\"]],\"email\"],null],\"isInvalid\"],null]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n        \"],[1,[26,\"get\",[[26,\"get\",[[21,0,[\"validations\",\"attrs\"]],\"email\"],null],\"message\"],null],false],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-floating\"],[8],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"floatingPassword\",\"Пароль\",[22,[\"password\"]]]]],false],[0,\"\\n\\n\"],[4,\"if\",[[26,\"get\",[[26,\"get\",[[21,0,[\"validations\",\"attrs\"]],\"password\"],null],\"isInvalid\"],null]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n        \"],[1,[26,\"get\",[[26,\"get\",[[21,0,[\"validations\",\"attrs\"]],\"password\"],null],\"message\"],null],false],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"form-floating\"],[8],[0,\"\\n    \"],[1,[26,\"g-recaptcha-v2\",null,[[\"verified\",\"expired\",\"reset\"],[[26,\"action\",[[21,0,[]],\"verified\"],null],[26,\"action\",[[21,0,[]],\"expired\"],null],[22,[\"reset\"]]]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"button\"],[10,\"class\",\"w-100 btn btn-lg btn-primary mb-3\"],[10,\"href\",\"index.html\"],[11,\"disabled\",[20,\"iAmRobot\"],null],[10,\"type\",\"submit\"],[8],[0,\"Зарегистрироваться\"],[9],[0,\"\\n  \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"w-100\"]],{\"statements\":[[0,\"Назад\"]],\"parameters\":[]},null],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/register-form.hbs" } });
});
define("book-demo/templates/components/report-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QxkwirtW", "block": "{\"symbols\":[\"speaker\",\"book\"],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"htop\"],[8],[0,\"\\n    \"],[6,\"h2\"],[10,\"class\",\"text-center\"],[8],[0,\"Редактирование доклада\"],[9],[0,\"\\n    \"],[6,\"form\"],[10,\"class\",\"edit-form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"reportDate\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Дата\\n          доклада\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"datepicker datepicker-meeting date input-group p-0\"],[8],[0,\"\\n            \"],[6,\"input\"],[10,\"placeholder\",\"Дата...\"],[10,\"class\",\"form-control form-control-lg\"],[10,\"id\",\"reportDate\"],[11,\"value\",[26,\"moment-format\",[[22,[\"model\",\"report\",\"date\"]],\"Do MMMM YYYY\"],null],null],[10,\"disabled\",\"disabled\"],[10,\"type\",\"text\"],[8],[9],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"input-group-append\"],[8],[0,\"\\n              \"],[6,\"span\"],[10,\"class\",\"input-group-text px-4\"],[8],[0,\"\\n                \"],[6,\"svg\"],[10,\"width\",\"1em\"],[10,\"height\",\"1em\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-clock\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n                  \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z\"],[8],[9],[0,\"\\n                  \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputMark\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Оценка\\n          книги\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"min\",\"max\",\"class\",\"id\",\"placeholder\",\"value\"],[\"number\",\"1\",\"5\",\"form-control form-control-lg\",\"inputMark\",\"Введите оценку\",[22,[\"model\",\"report\",\"rate\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputPresentation\"],[10,\"class\",\"col-sm-2 col-form-label text-right big\"],[8],[0,\"URL презентации\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"url\",\"form-control form-control-lg\",\"inputPresentation\",\"Введите URL презентации\",[22,[\"model\",\"report\",\"URLPresentation\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputVideo\"],[10,\"class\",\"col-sm-2 col-form-label text-right big\"],[8],[0,\"URL видео\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"url\",\"form-control form-control-lg\",\"inputVideo\",\"Введите URL видео\",[22,[\"model\",\"report\",\"URLVideo\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputBook\"],[10,\"class\",\"col-sm-2 col-form-label text-right big\"],[8],[0,\"Книга\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n\"],[4,\"power-select\",null,[[\"class\",\"options\",\"selected\",\"onchange\",\"searchField\",\"allowClear\"],[\"selectpicker form-control form-control-lg\",[22,[\"model\",\"books\"]],[22,[\"selectedBook\"]],[22,[\"changeBook\"]],\"title\",true]],{\"statements\":[[0,\"            \"],[1,[21,2,[\"title\"]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputSpeaker\"],[10,\"class\",\"col-sm-2 col-form-label text-right big\"],[8],[0,\"Спикер\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n\"],[4,\"power-select\",null,[[\"class\",\"options\",\"selected\",\"onchange\",\"searchField\",\"allowClear\"],[\"selectpicker form-control form-control-lg\",[22,[\"model\",\"speakers\"]],[22,[\"selectedSpeaker\"]],[22,[\"changeSpeaker\"]],\"fullName\",true]],{\"statements\":[[0,\"            \"],[1,[21,1,[\"fullName\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputReview\"],[10,\"class\",\"col-sm-2 col-form-label text-right big\"],[8],[0,\"Рецензия\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[6,\"textarea\"],[10,\"id\",\"inputReview\"],[10,\"class\",\"form-control form-control-lg\"],[10,\"id\",\"inputPatronymic\"],[10,\"placeholder\",\"Введите рецензию\"],[10,\"rows\",\"4\"],[11,\"oninput\",[20,\"changeReview\"],null],[8],[1,[22,[\"model\",\"report\",\"review\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-12 text-right\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-primary btn-lg\"],[10,\"data-name\",\"save\"],[10,\"type\",\"submit\"],[8],[0,\"Сохранить\"],[9],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-outline-secondary btn-lg\"],[10,\"type\",\"submit\"],[8],[0,\"Отмена\"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/report-form.hbs" } });
});
define("book-demo/templates/components/report-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PIbpLGo5", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"row h-100 justify-content-between\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-2 text-center\"],[8],[0,\"\\n    \"],[6,\"h5\"],[10,\"class\",\"py-2\"],[8],[1,[26,\"t\",[\"menu.speaker\"],null],false],[9],[0,\"\\n    \"],[6,\"img\"],[11,\"src\",[27,[[20,\"rootURL\"],\"images/speaker.jpg\"]]],[10,\"class\",\"rounded w-100\"],[10,\"alt\",\"Спикер\"],[8],[9],[0,\"\\n    \"],[6,\"p\"],[8],[1,[22,[\"report\",\"speaker\",\"fullName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-2 text-center\"],[8],[0,\"\\n    \"],[6,\"h5\"],[10,\"class\",\"py-2\"],[8],[1,[26,\"t\",[\"menu.book\"],null],false],[9],[0,\"\\n    \"],[6,\"p\"],[8],[1,[22,[\"report\",\"book\",\"title\"]],false],[9],[0,\"\\n    \"],[6,\"p\"],[8],[1,[22,[\"report\",\"book\",\"authorName\"]],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row align-items-center m-0\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-auto pl-0\"],[8],[0,\"\\n        \"],[1,[26,\"t\",[\"menu.rating\"],null],false],[0,\":\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col p-0\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"progress\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"progress-bar\"],[10,\"role\",\"progressbar\"],[11,\"style\",[20,\"rateWidth\"],null],[11,\"aria-valuenow\",[22,[\"report\",\"rate\"]],null],[10,\"aria-valuemin\",\"0\"],[10,\"aria-valuemax\",\"100\"],[8],[1,[20,\"rate\"],false],[0,\"%\"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[11,\"class\",[26,\"if\",[[22,[\"isEdit\"]],\"col-md-4\",\"col-md-6\"],null],null],[8],[0,\"\\n    \"],[6,\"h5\"],[10,\"class\",\"text-center py-2\"],[8],[1,[26,\"t\",[\"menu.review\"],null],false],[9],[0,\"\\n    \"],[6,\"p\"],[8],[0,\"\\n      \"],[1,[22,[\"report\",\"review\"]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-2 text-center col-filter\"],[8],[0,\"\\n    \"],[6,\"h5\"],[10,\"class\",\"py-2\"],[8],[1,[26,\"t\",[\"menu.links\"],null],false],[9],[0,\"\\n    \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"btn btn-video\"],[10,\"title\",\"Посмотреть запись доклада\"],[8],[0,\"\\n      \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-camera-reels card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n        \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M0 8a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8zm11.5 5.175l3.5 1.556V7.269l-3.5 1.556v4.35zM2 7a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2z\"],[8],[9],[0,\"\\n        \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\"],[8],[9],[0,\"\\n        \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M9 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"btn btn-present\"],[10,\"title\",\"Скачать презентацию\"],[8],[0,\"\\n      \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-file-ppt card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n        \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z\"],[8],[9],[0,\"\\n        \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M6 4a.5.5 0 0 1 .5.5V12a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 6 4z\"],[8],[9],[0,\"\\n        \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M8.5 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"isEdit\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"col-md-2 row align-items-center\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"meeting.report.edit\",[22,[\"meetingId\"]],[22,[\"report\",\"id\"]]],[[\"class\"],[\"btn pl-2 pr-2 col-md-6 text-right\"]],{\"statements\":[[0,\"        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-pencil card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n          \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[6,\"button\"],[10,\"class\",\"btn pl-2 pr-2 col-md-6 text-left\"],[11,\"onclick\",[20,\"deleteAction\"],null],[10,\"type\",\"button\"],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-trash card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n          \"],[6,\"path\"],[10,\"d\",\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"],[8],[9],[0,\"\\n          \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/report-item.hbs" } });
});
define("book-demo/templates/components/speaker-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2Lo+cIki", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"htop\"],[8],[0,\"\\n    \"],[6,\"h2\"],[10,\"class\",\"text-center\"],[8],[0,\"Редактирование спикера: \"],[1,[20,\"name\"],false],[0,\" \"],[1,[20,\"surname\"],false],[9],[0,\"\\n    \"],[6,\"form\"],[10,\"class\",\"edit-form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputSurname\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Фамилия\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"text\",\"form-control form-control-lg\",\"inputSurname\",\"Введите фамилию\",[22,[\"surnameValue\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputName\"],[10,\"class\",\"col-sm-2 col-form-label text-right\"],[8],[0,\"Имя\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"text\",\"form-control form-control-lg\",\"inputName\",\"Введите имя\",[22,[\"nameValue\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"inputPatronymic\"],[10,\"class\",\"col-sm-2 col-form-label text-right big\"],[8],[0,\"Отчество\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"text\",\"form-control form-control-lg\",\"inputPatronymic\",\"Введите отчество\",[22,[\"patronymicValue\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-12 text-right\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"data-name\",\"save\"],[10,\"class\",\"btn btn-primary btn-lg\"],[10,\"type\",\"submit\"],[8],[0,\"Сохранить\"],[9],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-outline-secondary btn-lg\"],[10,\"type\",\"submit\"],[8],[0,\"Отмена\"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/speaker-form.hbs" } });
});
define("book-demo/templates/components/speaker-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4LqJHfWU", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col mb-4\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"card\"],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"images/speaker.jpg\"],[10,\"class\",\"card-img-top\"],[10,\"alt\",\"Фото спикера\"],[8],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"card-body\"],[8],[0,\"\\n      \"],[6,\"h5\"],[10,\"class\",\"card-title\"],[8],[0,\"\\n        \"],[1,[22,[\"speaker\",\"surname\"]],false],[0,\"\\n        \"],[1,[22,[\"speaker\",\"name\"]],false],[0,\"\\n        \"],[1,[22,[\"speaker\",\"patronymic\"]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"card-footer\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col\"],[8],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col text-right\"],[8],[0,\"\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"edit speaker\",[22,[\"speaker\"]]],null]],null]],null,{\"statements\":[[0,\"            \"],[6,\"button\"],[10,\"class\",\"btn btn-edit\"],[11,\"onclick\",[20,\"editAction\"],null],[10,\"type\",\"button\"],[8],[0,\"\\n              \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-pencil card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n                \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"btn btn-trash\"],[11,\"onClick\",[20,\"deleteAction\"],null],[10,\"type\",\"button\"],[8],[0,\"\\n              \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-trash card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n                \"],[6,\"path\"],[10,\"d\",\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"],[8],[9],[0,\"\\n                \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/components/speaker-item.hbs" } });
});
define("book-demo/templates/error", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "HWEoMJrP", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row align-items-center justify-content-center h-100\"],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/images/error.gif\"],[10,\"alt\",\"Error\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/error.hbs" } });
});
define("book-demo/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MsOA/1je", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row align-items-center h-100 home-page-nav\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"meeting.index\"],[[\"class\"],[\"card text-center\"]],{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"card-body\"],[8],[0,\"\\n          \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-people desktop-icon\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n            \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"h3\"],[8],[1,[26,\"t\",[\"menu.meetings\"],null],false],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"book.index\"],[[\"class\"],[\"card text-center\"]],{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"card-body\"],[8],[0,\"\\n          \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-book desktop-icon\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n            \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M1 2.828v9.923c.918-.35 2.107-.692 3.287-.81 1.094-.111 2.278-.039 3.213.492V2.687c-.654-.689-1.782-.886-3.112-.752-1.234.124-2.503.523-3.388.893zm7.5-.141v9.746c.935-.53 2.12-.603 3.213-.493 1.18.12 2.37.461 3.287.811V2.828c-.885-.37-2.154-.769-3.388-.893-1.33-.134-2.458.063-3.112.752zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"h3\"],[8],[1,[26,\"t\",[\"menu.books\"],null],false],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"speaker.index\"],[[\"class\"],[\"card text-center\"]],{\"statements\":[[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"card-body\"],[8],[0,\"\\n          \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-mic desktop-icon\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n            \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z\"],[8],[9],[0,\"\\n            \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"h3\"],[8],[1,[26,\"t\",[\"menu.speakers\"],null],false],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/index.hbs" } });
});
define("book-demo/templates/loading", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "G0iuL08/", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row align-items-center justify-content-center h-100\"],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/images/loading.gif\"],[10,\"alt\",\"Loading\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/loading.hbs" } });
});
define("book-demo/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4DijMrqL", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"form-signin-wrapper\"],[8],[0,\"\\n  \"],[6,\"main\"],[10,\"class\",\"form-signin text-center\"],[8],[0,\"\\n    \"],[1,[26,\"login-form\",null,[[\"user\",\"errors\",\"onSubmit\"],[[22,[\"model\"]],[22,[\"errors\"]],[26,\"action\",[[21,0,[]],\"login\"],null]]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/login.hbs" } });
});
define("book-demo/templates/meeting/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "p6MDNsYp", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"meeting-form\",null,[[\"meeting\",\"onsubmit\",\"clickOnCreateReport\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"saveMeeting\"],null],[26,\"action\",[[21,0,[]],\"clickOnCreateReport\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/meeting/create.hbs" } });
});
define("book-demo/templates/meeting/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dUXjR1Vy", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"meeting-form\",null,[[\"meeting\",\"onsubmit\",\"clickOnCreateReport\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"saveMeeting\"],null],[26,\"action\",[[21,0,[]],\"clickOnCreateReport\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/meeting/edit.hbs" } });
});
define("book-demo/templates/meeting/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "f4mSEkeg", "block": "{\"symbols\":[\"page\",\"meeting\",\"book\",\"speaker\"],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"htop\"],[8],[0,\"\\n    \"],[6,\"h2\"],[10,\"class\",\"text-center\"],[8],[1,[26,\"t\",[\"menu.meetings\"],null],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-row navbar-panel justify-content-between align-items-end\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"col-md-1\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-outline-primary my-2\"],[10,\"title\",\"Добавить встречу\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"clickOnCreateButton\"],null],null],[10,\"type\",\"button\"],[8],[0,\"\\n            \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-plus card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n              \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[6,\"div\"],[10,\"class\",\"col-md-3 align-top\"],[8],[0,\"\\n        \"],[6,\"h5\"],[8],[1,[26,\"t\",[\"menu.speaker\"],null],false],[9],[0,\"\\n\"],[4,\"power-select\",null,[[\"class\",\"options\",\"selected\",\"onchange\",\"searchField\",\"allowClear\"],[\"selectpicker form-control dropdown-filter-control\",[22,[\"model\",\"speakers\"]],[22,[\"selectedSpeaker\"]],[26,\"action\",[[21,0,[]],\"changeSpeaker\"],null],\"fullName\",true]],{\"statements\":[[0,\"          \"],[1,[21,4,[\"fullName\"]],false],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n        \"],[6,\"h5\"],[8],[1,[26,\"t\",[\"menu.book\"],null],false],[9],[0,\"\\n\"],[4,\"power-select\",null,[[\"class\",\"options\",\"selected\",\"onchange\",\"searchField\",\"allowClear\"],[\"selectpicker form-control dropdown-filter-control\",[22,[\"model\",\"books\"]],[22,[\"selectedBook\"]],[26,\"action\",[[21,0,[]],\"changeBook\"],null],\"title\",true]],{\"statements\":[[0,\"          \"],[1,[21,3,[\"title\"]],false],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n        \"],[6,\"h5\"],[8],[1,[26,\"t\",[\"menu.meetingDate\"],null],false],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group py-2 my-0\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"datepicker date input-group p-0 w-100\"],[8],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"type\",\"placeholder\",\"class\",\"id\",\"value\"],[\"date\",\"Дата...\",\"form-control\",\"meetingDateFilter\",[22,[\"dateValue\"]]]]],false],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"input-group-append\"],[8],[0,\"\\n              \"],[6,\"span\"],[10,\"class\",\"input-group-text px-4\"],[8],[0,\"\\n                \"],[6,\"svg\"],[10,\"width\",\"1em\"],[10,\"height\",\"1em\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-clock\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n                  \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z\"],[8],[9],[0,\"\\n                  \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-auto text-right col-filter\"],[8],[0,\"\\n        \"],[6,\"button\"],[10,\"class\",\"btn btn-outline-primary my-2\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"filterReports\"],null],null],[10,\"type\",\"button\"],[8],[0,\"\\n          \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-funnel card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n            \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"button\"],[10,\"class\",\"btn btn-outline-secondary my-2\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"resetFilters\"],null],null],[11,\"disabled\",[20,\"hasQuery\"],null],[10,\"type\",\"button\"],[8],[0,\"\\n          \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-x card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n            \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"model\",\"meetings\"]]],null,{\"statements\":[[0,\"      \"],[1,[26,\"meeting-item\",null,[[\"class\",\"meeting\",\"editAction\",\"deleteAction\"],[\"border border-dark rounded p-4 mb-4\",[21,2,[]],[26,\"action\",[[21,0,[]],\"clickOnEditButton\",[21,2,[\"id\"]]],null],[26,\"action\",[[21,0,[]],\"deleteMeeting\",[21,2,[]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n    \"],[6,\"nav\"],[10,\"aria-label\",\"Page navigation example\"],[8],[0,\"\\n      \"],[6,\"ul\"],[10,\"class\",\"pagination justify-content-end\"],[8],[0,\"\\n        \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[22,[\"isPrevActive\"]],\"page-item\",\"page-item disabled\"],null],null],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"page-link\"],[10,\"href\",\"#\"],[10,\"aria-label\",\"Previous\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"clickPrev\"],null],null],[8],[0,\"\\n            \"],[6,\"span\"],[10,\"aria-hidden\",\"true\"],[8],[0,\"«\"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"pages\"]]],null,{\"statements\":[[0,\"          \"],[6,\"li\"],[10,\"class\",\"page-item\"],[10,\"aria-current\",\"page\"],[8],[0,\"\\n            \"],[4,\"link-to\",[\"meeting\",[26,\"query-params\",null,[[\"page\"],[[21,1,[]]]]]],[[\"class\"],[\"page-link\"]],{\"statements\":[[1,[21,1,[]],false]],\"parameters\":[]},null],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[22,[\"isNextActive\"]],\"page-item\",\"page-item disabled\"],null],null],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"page-link\"],[10,\"href\",\"#\"],[10,\"aria-label\",\"Next\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"clickNext\"],null],null],[8],[0,\"\\n            \"],[6,\"span\"],[10,\"aria-hidden\",\"true\"],[8],[0,\"»\"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/meeting/index.hbs" } });
});
define("book-demo/templates/meeting/report/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "24xyODCH", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"report-form\",null,[[\"model\",\"changeSpeaker\",\"changeBook\",\"changeReview\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"changeSpeaker\"],null],[26,\"action\",[[21,0,[]],\"changeBook\"],null],[26,\"action\",[[21,0,[]],\"changeReview\"],null],[26,\"action\",[[21,0,[]],\"saveReport\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/meeting/report/create.hbs" } });
});
define("book-demo/templates/meeting/report/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "NxQw65wy", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"report-form\",null,[[\"model\",\"changeSpeaker\",\"changeBook\",\"changeReview\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"changeSpeaker\"],null],[26,\"action\",[[21,0,[]],\"changeBook\"],null],[26,\"action\",[[21,0,[]],\"changeReview\"],null],[26,\"action\",[[21,0,[]],\"saveReport\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/meeting/report/edit.hbs" } });
});
define("book-demo/templates/register", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vCoRkx1B", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"form-signin-wrapper\"],[8],[0,\"\\n  \"],[6,\"main\"],[10,\"class\",\"form-signin text-center\"],[8],[0,\"\\n    \"],[1,[26,\"register-form\",null,[[\"user\",\"errors\",\"onSubmit\"],[[22,[\"model\"]],[22,[\"errors\"]],[26,\"action\",[[21,0,[]],\"saveUser\"],null]]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/register.hbs" } });
});
define("book-demo/templates/speaker/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xY1zwjIP", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"speaker-form\",null,[[\"speaker\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"saveSpeaker\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/speaker/create.hbs" } });
});
define("book-demo/templates/speaker/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dbFBkEwA", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"speaker-form\",null,[[\"speaker\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"saveSpeaker\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/speaker/edit.hbs" } });
});
define("book-demo/templates/speaker/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QDT1VopL", "block": "{\"symbols\":[\"speaker\"],\"statements\":[[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"htop\"],[8],[0,\"\\n    \"],[6,\"h2\"],[10,\"class\",\"text-center\"],[8],[1,[26,\"t\",[\"menu.speakers\"],null],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-row navbar-panel justify-content-between\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-outline-primary my-2\"],[10,\"title\",\"Добавить спикера\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"clickOnCreateButton\"],null],null],[10,\"type\",\"button\"],[8],[0,\"\\n            \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 16 16\"],[10,\"class\",\"bi bi-plus card-button\"],[10,\"fill\",\"currentColor\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n              \"],[6,\"path\"],[10,\"fill-rule\",\"evenodd\"],[10,\"d\",\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[6,\"div\"],[10,\"class\",\"col-md-auto\"],[8],[0,\"\\n        \"],[6,\"form\"],[10,\"class\",\"form-inline\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"class\",\"form-control mr-2 search-long search-only\"],[10,\"placeholder\",\"ФИО\"],[10,\"aria-label\",\"Спикер\"],[11,\"oninput\",[26,\"action\",[[21,0,[]],\"search\"],null],null],[11,\"defaultValue\",[20,\"search\"],null],[10,\"type\",\"search\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[21,0,[\"isLoading\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"container h-100\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"row align-items-center justify-content-center h-100\"],[8],[0,\"\\n          \"],[6,\"img\"],[10,\"src\",\"/images/loading.gif\"],[10,\"alt\",\"Loading\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"row row-cols-1 row-cols-md-3\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"          \"],[1,[26,\"speaker-item\",null,[[\"speaker\",\"deleteAction\",\"editAction\",\"tagName\"],[[21,1,[]],[26,\"action\",[[21,0,[]],\"deleteSpeaker\",[21,1,[]]],null],[26,\"action\",[[21,0,[]],\"clickOnEditButton\",[21,1,[\"id\"]]],null],\"\"]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "book-demo/templates/speaker/index.hbs" } });
});
define('book-demo/transforms/date-string', ['exports', 'ember-data/transforms/date'], function (exports, _date) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _date.default.extend({
    moment: Ember.inject.service(),
    deserialize: function deserialize(serialized) {
      var date = this._super(serialized);
      if (date instanceof Date && !isNaN(date)) {
        var formattedDate = this.get('moment').moment(date).format('YYYY-MM-DD');
        return formattedDate;
      }

      return null;
    },
    serialize: function serialize(deserialized) {
      var deserializedDate = deserialized ? this.get('moment').moment(deserialized).toDate() : null;
      return this._super(deserializedDate);
    }
  });
});
define('book-demo/utils/i18n/compile-template', ['exports', 'ember-i18n/utils/i18n/compile-template'], function (exports, _compileTemplate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compileTemplate.default;
    }
  });
});
define('book-demo/utils/i18n/missing-message', ['exports', 'ember-i18n/utils/i18n/missing-message'], function (exports, _missingMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _missingMessage.default;
    }
  });
});
define('book-demo/validators/alias', ['exports', 'ember-cp-validations/validators/alias'], function (exports, _alias) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _alias.default;
    }
  });
});
define('book-demo/validators/belongs-to', ['exports', 'ember-cp-validations/validators/belongs-to'], function (exports, _belongsTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _belongsTo.default;
    }
  });
});
define('book-demo/validators/collection', ['exports', 'ember-cp-validations/validators/collection'], function (exports, _collection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _collection.default;
    }
  });
});
define('book-demo/validators/confirmation', ['exports', 'ember-cp-validations/validators/confirmation'], function (exports, _confirmation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _confirmation.default;
    }
  });
});
define('book-demo/validators/date', ['exports', 'ember-cp-validations/validators/date'], function (exports, _date) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _date.default;
    }
  });
});
define('book-demo/validators/dependent', ['exports', 'ember-cp-validations/validators/dependent'], function (exports, _dependent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dependent.default;
    }
  });
});
define('book-demo/validators/ds-error', ['exports', 'ember-cp-validations/validators/ds-error'], function (exports, _dsError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dsError.default;
    }
  });
});
define('book-demo/validators/exclusion', ['exports', 'ember-cp-validations/validators/exclusion'], function (exports, _exclusion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _exclusion.default;
    }
  });
});
define('book-demo/validators/format', ['exports', 'ember-cp-validations/validators/format'], function (exports, _format) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _format.default;
    }
  });
});
define('book-demo/validators/has-many', ['exports', 'ember-cp-validations/validators/has-many'], function (exports, _hasMany) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasMany.default;
    }
  });
});
define('book-demo/validators/inclusion', ['exports', 'ember-cp-validations/validators/inclusion'], function (exports, _inclusion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inclusion.default;
    }
  });
});
define('book-demo/validators/length', ['exports', 'ember-cp-validations/validators/length'], function (exports, _length) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _length.default;
    }
  });
});
define('book-demo/validators/messages', ['exports', 'ember-i18n-cp-validations/validators/messages'], function (exports, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _messages.default;
    }
  });
});
define('book-demo/validators/number', ['exports', 'ember-cp-validations/validators/number'], function (exports, _number) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _number.default;
    }
  });
});
define('book-demo/validators/presence', ['exports', 'ember-cp-validations/validators/presence'], function (exports, _presence) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _presence.default;
    }
  });
});


define('book-demo/config/environment', [], function() {
  var prefix = 'book-demo';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("book-demo/app")["default"].create({"name":"book-demo","version":"0.0.0+7a021dc0"});
}
//# sourceMappingURL=book-demo.map
