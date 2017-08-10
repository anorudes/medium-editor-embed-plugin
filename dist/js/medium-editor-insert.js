(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MediumEditorInsert"] = factory();
	else
		root["MediumEditorInsert"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Core = __webpack_require__(3);

	var _Core2 = _interopRequireDefault(_Core);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MediumEditorInsert = MediumEditor.Extension.extend({
	    name: 'insert',

	    addons: {
	        images: true,
	        embeds: true,
	        chapters: true
	    },

	    _initializedAddons: {},

	    init: function init() {
	        MediumEditor.Extension.prototype.init.apply(this, arguments);

	        this.core = new _Core2.default(this);
	    },

	    destroy: function destroy() {
	        this.core.removeButtons();
	    },

	    getCore: function getCore() {
	        return this.core;
	    },

	    getAddons: function getAddons() {
	        return this._initializedAddons;
	    },

	    getAddon: function getAddon(name) {
	        return this._initializedAddons[name];
	    }
	});

	exports.default = MediumEditorInsert;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var utils = {
	    ucfirst: function ucfirst(str) {
	        return str.charAt(0).toUpperCase() + str.slice(1);
	    },

	    generateRandomString: function generateRandomString() {
	        var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15;

	        return Math.random().toString(36).substr(2, length);
	    },

	    getClosestWithClassName: function getClosestWithClassName(el, className) {
	        return MediumEditor.util.traverseUp(el, function (element) {
	            return element.classList.contains(className);
	        });
	    },

	    isChildOf: function isChildOf(el, parent) {
	        return MediumEditor.util.traverseUp(el, function (element) {
	            return element === parent;
	        }) ? true : false;
	    },

	    getElementsByClassName: function getElementsByClassName(parents, className) {
	        var results = [];

	        Array.prototype.forEach.call(parents, function (editor) {
	            var elements = editor.getElementsByClassName(className);

	            Array.prototype.forEach.call(elements, function (element) {
	                results.push(element);
	            });
	        });

	        return results;
	    },

	    getElementsByTagName: function getElementsByTagName(parents, tagName) {
	        var results = [];

	        Array.prototype.forEach.call(parents, function (editor) {
	            var elements = editor.getElementsByTagName(tagName);

	            Array.prototype.forEach.call(elements, function (element) {
	                results.push(element);
	            });
	        });

	        return results;
	    }
	};

	exports.default = utils;
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _ToolbarButton = __webpack_require__(4);

	var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MediumEditorToolbar = MediumEditor.extensions.toolbar;

	var Toolbar = function (_MediumEditorToolbar) {
	    _inherits(Toolbar, _MediumEditorToolbar);

	    function Toolbar(options) {
	        _classCallCheck(this, Toolbar);

	        var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, options));

	        _this.name = options.type + 'Toolbar';

	        options.buttons.forEach(function (buttonOptions) {
	            var button = new _ToolbarButton2.default(Object.assign({}, {
	                window: _this.plugin.window,
	                document: _this.plugin.document,
	                base: _this.plugin.base
	            }, buttonOptions));

	            button.init();
	            _this.plugin.base.extensions.push(button);
	        });

	        _this.window = options.plugin.window;
	        _this.document = options.plugin.document;
	        _this.base = options.plugin.base;

	        _this.init();
	        return _this;
	    }

	    _createClass(Toolbar, [{
	        key: 'createToolbar',
	        value: function createToolbar() {
	            var toolbar = this.document.createElement('div');

	            toolbar.id = 'medium-editor-insert-' + this.type + '-toolbar-' + this.getEditorId();
	            toolbar.className = 'medium-editor-toolbar';

	            if (this.static) {
	                toolbar.className += ' static-toolbar';
	            } else if (this.relativeContainer) {
	                toolbar.className += ' medium-editor-relative-toolbar';
	            } else {
	                toolbar.className += ' medium-editor-stalker-toolbar';
	            }

	            toolbar.appendChild(this.createToolbarButtons());

	            // Add any forms that extensions may have
	            this.forEachExtension(function (extension) {
	                if (extension.hasForm) {
	                    toolbar.appendChild(extension.getForm());
	                }
	            });

	            this.attachEventHandlers();

	            return toolbar;
	        }
	    }, {
	        key: 'createToolbarButtons',
	        value: function createToolbarButtons() {
	            var _this2 = this;

	            var ul = this.document.createElement('ul');
	            var li = void 0,
	                btn = void 0,
	                buttons = void 0,
	                extension = void 0,
	                buttonName = void 0,
	                buttonOpts = void 0;

	            ul.id = 'medium-editor-insert-' + this.type + '-toolbar-actions' + this.getEditorId();
	            ul.className = 'medium-editor-toolbar-actions';
	            ul.style.display = 'block';

	            this.buttons.forEach(function (button) {
	                if (typeof button === 'string') {
	                    buttonName = button;
	                    buttonOpts = null;
	                } else {
	                    buttonName = button.name;
	                    buttonOpts = button;
	                }

	                // If the button already exists as an extension, it'll be returned
	                // othwerise it'll create the default built-in button
	                extension = _this2.base.addBuiltInExtension(buttonName, buttonOpts);

	                if (extension && typeof extension.getButton === 'function') {
	                    btn = extension.getButton(_this2.base);
	                    li = _this2.document.createElement('li');
	                    if (MediumEditor.util.isElement(btn)) {
	                        li.appendChild(btn);
	                    } else {
	                        li.innerHTML = btn;
	                    }
	                    ul.appendChild(li);
	                }
	            }, this);

	            buttons = ul.querySelectorAll('button');
	            if (buttons.length > 0) {
	                buttons[0].classList.add(this.firstButtonClass);
	                buttons[buttons.length - 1].classList.add(this.lastButtonClass);
	            }

	            return ul;
	        }
	    }, {
	        key: 'checkState',
	        value: function checkState() {
	            var _this3 = this;

	            var activeElements = void 0;

	            if (this.base.preventSelectionUpdates) {
	                return;
	            }

	            // Wait for elements to be selected
	            setTimeout(function () {
	                activeElements = _utils2.default.getElementsByClassName(_this3.getEditorElements(), _this3.activeClassName);

	                // Hide toolbar when no elements are selected
	                if (activeElements.length === 0) {
	                    return _this3.hideToolbar();
	                }

	                // Now we know there's a focused editable with a selection
	                _this3.showAndUpdateToolbar();
	            }, 10);
	        }
	    }, {
	        key: 'setToolbarPosition',
	        value: function setToolbarPosition() {
	            var container = _utils2.default.getElementsByClassName(this.getEditorElements(), this.activeClassName)[0];
	            var anchorPreview = void 0;

	            // If there isn't a valid selection, bail
	            if (!container) {
	                return this;
	            }

	            this.showToolbar();
	            this.positionStaticToolbar(container);

	            anchorPreview = this.base.getExtensionByName('anchor-preview');

	            if (anchorPreview && typeof anchorPreview.hidePreview === 'function') {
	                anchorPreview.hidePreview();
	            }
	        }
	    }]);

	    return Toolbar;
	}(MediumEditorToolbar);

	exports.default = Toolbar;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _Images = __webpack_require__(7);

	var _Images2 = _interopRequireDefault(_Images);

	var _Embeds = __webpack_require__(6);

	var _Embeds2 = _interopRequireDefault(_Embeds);

	var _Chapters = __webpack_require__(5);

	var _Chapters2 = _interopRequireDefault(_Chapters);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Core = function () {
	    function Core(plugin) {
	        _classCallCheck(this, Core);

	        this._plugin = plugin;
	        this._editor = this._plugin.base;

	        this.initAddons();
	        this.addButtons();
	        this.events();
	    }

	    _createClass(Core, [{
	        key: 'events',
	        value: function events() {
	            var _this = this;

	            var addonActions = void 0;

	            // This could be chained when medium-editor 5.15.2 is released
	            // https://github.com/yabwe/medium-editor/pull/1046
	            this._plugin.on(document, 'click', this.toggleButtons.bind(this));
	            this._plugin.on(document, 'keyup', this.toggleButtons.bind(this));
	            this._plugin.on(this.buttons.getElementsByClassName('medium-editor-insert-buttons-show')[0], 'click', this.toggleAddons.bind(this));

	            // This could be written in one statement when medium-editor 5.15.2 is released
	            // https://github.com/yabwe/medium-editor/pull/1046
	            addonActions = this.buttons.getElementsByClassName('medium-editor-insert-action');
	            Array.prototype.forEach.call(addonActions, function (action) {
	                // this._plugin.on(action, 'mousedown', this.handleAddonMouseDown.bind(this));
	                _this._plugin.on(action, 'click', _this.handleAddonClick.bind(_this));
	            });

	            this._plugin.on(window, 'resize', this.positionButtons.bind(this));
	        }
	    }, {
	        key: 'initAddons',
	        value: function initAddons() {
	            var _this2 = this;

	            // Initialize all default addons, we'll delete ones we don't need later
	            this._plugin._initializedAddons = {
	                images: new _Images2.default(this._plugin, this._plugin.addons.images),
	                embeds: new _Embeds2.default(this._plugin, this._plugin.addons.embeds),
	                chapters: new _Chapters2.default(this._plugin, this._plugin.addons.chapters)
	            };

	            Object.keys(this._plugin.addons).forEach(function (name) {
	                var addonOptions = _this2._plugin.addons[name];

	                // If the addon is custom one
	                if (!_this2._plugin._initializedAddons[name]) {
	                    if (typeof addonOptions === 'function') {
	                        _this2._plugin._initializedAddons[name] = new addonOptions(_this2._plugin);
	                    } else {
	                        window.console.error('I don\'t know how to initialize custom "' + name + '" addon!');
	                    }
	                }

	                // Delete disabled addon
	                if (!addonOptions) {
	                    delete _this2._plugin._initializedAddons[name];
	                }
	            });
	        }
	    }, {
	        key: 'addButtons',
	        value: function addButtons() {
	            var addons = this._plugin.getAddons();
	            var html = void 0;

	            this.buttons = document.createElement('div');
	            this.buttons.id = 'medium-editor-insert-' + this._plugin.getEditorId();
	            this.buttons.classList.add('medium-editor-insert-buttons');
	            this.buttons.setAttribute('contentediable', false);

	            html = '<a class="medium-editor-insert-buttons-show">+</a>\n            <ul class="medium-editor-insert-buttons-addons">';

	            Object.keys(addons).forEach(function (name) {
	                var addon = addons[name];

	                html += '<li><a class="medium-editor-insert-action" data-addon="' + name + '">' + addon.label + '</a></li>';
	            });

	            html += '</ul>';

	            this.buttons.innerHTML = html;

	            document.body.appendChild(this.buttons);
	        }
	    }, {
	        key: 'removeButtons',
	        value: function removeButtons() {
	            this.buttons.remove();
	        }
	    }, {
	        key: 'positionButtons',
	        value: function positionButtons() {
	            var el = void 0,
	                elPosition = void 0,
	                addons = void 0,
	                addonButton = void 0,
	                addonsStyle = void 0,
	                addonButtonStyle = void 0,
	                position = void 0;

	            // Don't position buttons if they aren't active
	            if (this.buttons.classList.contains('medium-editor-insert-buttons-active') === false) {
	                return;
	            }

	            el = this._editor.getSelectedParentElement();
	            elPosition = el.getBoundingClientRect();
	            addons = this.buttons.getElementsByClassName('medium-editor-insert-buttons-addons')[0];
	            addonButton = this.buttons.getElementsByClassName('medium-editor-insert-action')[0];
	            addonsStyle = window.getComputedStyle(addons);
	            addonButtonStyle = window.getComputedStyle(addonButton);

	            // Calculate position
	            position = {
	                top: window.scrollY + elPosition.top,
	                left: window.scrollX + elPosition.left - parseInt(addonsStyle.left, 10) - parseInt(addonButtonStyle.marginLeft, 10)
	            };

	            // If left position is lower than 0, the buttons would be out of the viewport.
	            // In that case, align buttons with the editor
	            position.left = position.left < 0 ? elPosition.left : position.left;

	            this.buttons.style.left = position.left + 'px';
	            this.buttons.style.top = position.top + 'px';
	        }
	    }, {
	        key: 'toggleButtons',
	        value: function toggleButtons() {
	            var el = this._editor.getSelectedParentElement();

	            if (this.shouldDisplayButtonsOnElement(el)) {
	                this.selectElement(el);
	                this.showButtons();
	            } else {
	                this.hideButtons();
	            }
	        }
	    }, {
	        key: 'shouldDisplayButtonsOnElement',
	        value: function shouldDisplayButtonsOnElement(el) {
	            var addons = this._plugin.getAddons(),
	                addonClassNames = [];
	            var isAddon = false,
	                belongsToEditor = false;

	            // Don't show buttons when the element has text
	            if (el.innerText.trim() !== '') {
	                return false;
	            }

	            // Don't show buttons when the editor doesn't belong to editor
	            this._plugin.getEditorElements().forEach(function (editor) {
	                if (_utils2.default.isChildOf(el, editor)) {
	                    belongsToEditor = true;
	                    return;
	                }
	            });

	            if (!belongsToEditor) {
	                return false;
	            }

	            // Get class names used by addons
	            Object.keys(addons).forEach(function (addonName) {
	                var addon = addons[addonName];
	                if (addon.elementClassName) {
	                    addonClassNames.push(addon.elementClassName);
	                }
	            });

	            // Don't show buttons if the element is an addon element
	            // - when the element has an addon class, or some of its parents have it
	            addonClassNames.forEach(function (className) {
	                if (el.classList.contains(className) || _utils2.default.getClosestWithClassName(el, className)) {
	                    isAddon = true;
	                    return;
	                }
	            });

	            return !isAddon;
	        }
	    }, {
	        key: 'selectElement',
	        value: function selectElement(el) {
	            this.selectedElement = el;
	        }
	    }, {
	        key: 'showButtons',
	        value: function showButtons() {
	            this.buttons.classList.add('medium-editor-insert-buttons-active');
	            this.positionButtons();
	        }
	    }, {
	        key: 'hideButtons',
	        value: function hideButtons() {
	            this.buttons.classList.remove('medium-editor-insert-buttons-active');
	            this.buttons.classList.remove('medium-editor-insert-addons-active');
	        }
	    }, {
	        key: 'toggleAddons',
	        value: function toggleAddons() {
	            this.buttons.classList.toggle('medium-editor-insert-addons-active');
	        }

	        // handleAddonMouseDown(e) {
	        //     const name = e.currentTarget.getAttribute('data-addon');
	        //     e.preventDefault();

	        //     console.log(this._plugin.getAddon(name));
	        //     this._plugin.getAddon(name).handleMouseDown(e);
	        // }

	    }, {
	        key: 'handleAddonClick',
	        value: function handleAddonClick(e) {
	            var name = e.currentTarget.getAttribute('data-addon');
	            e.preventDefault();

	            this._plugin.getAddon(name).handleClick(e);
	            this.hideButtons();
	        }
	    }]);

	    return Core;
	}();

	exports.default = Core;
	module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ToolbarButton = MediumEditor.extensions.button.extend({
	    init: function init() {
	        this.button = this.document.createElement('button');
	        this.button.classList.add('medium-editor-action');
	        this.button.classList.add(this.className);
	        this.button.innerHTML = '<b>' + this.label + '</b>';

	        this.on(this.button, 'click', this.handleClick.bind(this));
	    },

	    getButton: function getButton() {
	        return this.button;
	    },

	    handleClick: function handleClick(evt) {
	        this.onClick(evt);
	    }
	});

	exports.default = ToolbarButton;
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _Toolbar = __webpack_require__(2);

	var _Toolbar2 = _interopRequireDefault(_Toolbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Chapters = function () {
	  function Chapters(plugin, options) {
	    _classCallCheck(this, Chapters);

	    this.options = {
	      label: '<span class="fa fa-bars"></span>',
	      captions: true,
	      storeMeta: false,
	      styles: {
	        left: {
	          label: '<span class="fa fa-align-left"></span>'
	        },
	        wide: {
	          label: '<span class="fa fa-align-justify"></span>'
	        }
	      },
	      actions: {
	        remove: {
	          label: '<span class="fa fa-times"></span>',
	          clicked: function clicked() {
	            // var $event = $.Event('keydown');

	            // $event.which = 8;
	            // $(document).trigger($event);
	          }
	        }
	      },
	      parseOnPaste: false
	    };

	    Object.assign(this.options, options);

	    this._plugin = plugin;
	    this._editor = this._plugin.base;

	    this.activeClassName = 'medium-editor-insert-embed-chapters-active';
	    this.elementClassName = 'medium-editor-insert-embed-chapters';

	    this.alignLeftClassName = 'align-left';
	    this.alignCenterClassName = 'align-center-wide';

	    this.label = this.options.label;
	    this.descriptionPlaceholder = this.options.descriptionPlaceholder;

	    this.initToolbar();
	    this.events();
	  }

	  _createClass(Chapters, [{
	    key: 'events',
	    value: function events() {
	      var _this = this;

	      this._plugin.on(document, 'click', this.unselectEmbed.bind(this));
	      this._plugin.on(document, 'keydown', this.handleKey.bind(this));

	      this._plugin.getEditorElements().forEach(function (editor) {
	        _this._plugin.on(editor, 'click', _this.selectEmbed.bind(_this));
	      });
	    }
	  }, {
	    key: 'selectEmbed',
	    value: function selectEmbed(e) {
	      var el = e.target;
	      if (this.getClosestElementByClassName(el, this.elementClassName)) {
	        this.selectEmbedCore(el, event);
	        e && e.stopPropagation();
	        e && e.preventDefault();
	      }
	    }
	  }, {
	    key: 'getClosestElementByClassName',
	    value: function getClosestElementByClassName(el, className) {
	      while (el) {
	        if (el.classList && el.classList.contains(className)) return el;
	        el = el.parentNode;
	      }
	    }
	  }, {
	    key: 'selectEmbedCore',
	    value: function selectEmbedCore(el) {
	      var element = this.getClosestElementByClassName(el, this.elementClassName);
	      element.classList.add(this.activeClassName);
	      var currentSelection = window.getSelection();
	    }
	  }, {
	    key: 'unselectEmbed',
	    value: function unselectEmbed(e) {
	      var el = e.target;
	      this.unselectEmbedCore(el);
	    }
	  }, {
	    key: 'unselectEmbedCore',
	    value: function unselectEmbedCore(el) {
	      var _this2 = this;

	      var clickedEmbed = void 0,
	          clickedEmbedPlaceholder = void 0,
	          chapters = void 0,
	          embedsPlaceholders = void 0;

	      chapters = _utils2.default.getElementsByClassName(this._plugin.getEditorElements(), this.elementClassName);
	      if (!chapters || !chapters.length) {
	        return false;
	      }

	      if (chapters) {
	        Array.prototype.forEach.call(chapters, function (chapters) {
	          if (chapters !== clickedEmbed) {
	            chapters.classList.remove(_this2.activeClassName);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'getSiblingParagraph',
	    value: function getSiblingParagraph(el) {
	      if (!el) return false;

	      var nextSiblingDOM = el.nextSibling;
	      var nextSiblingParagraphDOM = void 0;

	      while (nextSiblingDOM && !nextSiblingParagraphDOM) {
	        if (nextSiblingDOM && nextSiblingDOM.tagName === 'P') {
	          nextSiblingParagraphDOM = nextSiblingDOM;
	        } else {
	          nextSiblingDOM = nextSiblingDOM.nextSibling;
	        }
	      }

	      return nextSiblingParagraphDOM;
	    }
	  }, {
	    key: 'handleKey',
	    value: function handleKey(e) {
	      var target = e.target;

	      // Enter key
	      if (e.which === 40 || e.which === 13) {
	        // Detect selected chapters
	        var selectedEmbedDOM = document.querySelector('.' + this.activeClassName);

	        if (selectedEmbedDOM) {
	          var nextSiblingParagraphDOM = this.getSiblingParagraph(selectedEmbedDOM);

	          if (!nextSiblingParagraphDOM) {
	            // Insert paragraph and focus
	            var paragraph = document.createElement('p');
	            paragraph.innerHTML = '<br>';
	            selectedEmbedDOM.insertAdjacentElement('afterend', paragraph);
	          }

	          // Focus next paragraph
	          nextSiblingParagraphDOM = this.getSiblingParagraph(selectedEmbedDOM);

	          if (nextSiblingParagraphDOM) {
	            if (!nextSiblingParagraphDOM.innerHTML) {
	              nextSiblingParagraphDOM.innerHTML = '<br>';
	            }
	            window.getSelection().removeAllRanges();
	            this._plugin.getCore()._editor.selectElement(nextSiblingParagraphDOM);
	            selectedEmbedDOM.classList.remove(this.activeClassName);
	            MediumEditor.selection.clearSelection(document, true);
	            selectedEmbedDOM.classList.remove(this.activeClassName);
	            e.preventDefault();
	          }
	        }
	      }
	      // Backspace, delete
	      if ([MediumEditor.util.keyCode.BACKSPACE, MediumEditor.util.keyCode.DELETE].indexOf(e.which) > -1) {
	        this.removeEmbed(e);
	      } else if (document.querySelector('.' + this.activeClassName)) {
	        // Block all keys
	        e.preventDefault();
	      }
	    }
	  }, {
	    key: 'setFocusOnElement',
	    value: function setFocusOnElement(el) {
	      // this._editor.elements[0].focus();
	      setTimeout(function () {
	        var currentSelection = window.getSelection();
	        var range = document.createRange();
	        range.setStart(el, 0);
	        currentSelection.removeAllRanges();
	        currentSelection.addRange(range);
	      }, 300);
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      this.el = this._plugin.getCore().selectedElement;
	      this.setFocusOnElement(this.el);
	      this.embedChapter(this.el);
	    }
	  }, {
	    key: 'removeEmbed',
	    value: function removeEmbed(e) {
	      var selectedEmbedDOM = document.querySelector('.' + this.activeClassName);
	      if (selectedEmbedDOM) {
	        selectedEmbedDOM.remove();
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    }

	    /**
	     * Init Toolbar for tuning chapters position
	     *
	     * @param {string} url
	     * @param {pasted} boolean
	     * @return {void}
	     */

	  }, {
	    key: 'initToolbar',
	    value: function initToolbar() {
	      this.toolbar = new _Toolbar2.default({
	        plugin: this._plugin,
	        type: 'chapters',
	        activeClassName: this.activeClassName,
	        buttons: [{
	          name: 'chapters-align-left',
	          action: 'align-left',
	          className: 'btn-align-left',
	          label: 'Left',
	          onClick: function (evt) {
	            this.changeAlign(this.alignLeftClassName, 'chapters-align-left', evt);
	          }.bind(this)
	        }, {
	          name: 'chapters-align-center-wide',
	          action: 'align-center-wide',
	          className: 'btn-align-center-wide',
	          label: 'Center',
	          onClick: function (evt) {
	            this.changeAlign(this.alignCenterClassName, 'chapters-align-center', evt);
	          }.bind(this)
	        }]
	      });

	      this._editor.extensions.push(this.toolbar);
	    }
	  }, {
	    key: 'changeAlign',
	    value: function changeAlign(className, action, evt) {
	      if (evt) {
	        evt.preventDefault();
	        evt.stopPropagation();
	      }

	      var el = document.querySelector('.' + this.activeClassName);
	      el.classList.remove(this.alignLeftClassName, this.alignCenterClassName);
	      el.classList.add(className);

	      this.toolbar.setToolbarPosition();

	      if (this.options.onChange) {
	        this.options.onChange(action);
	      }
	    }

	    /**
	     * Add html to page
	     *
	     * @param {string} html
	     * @param {string} pastedUrl
	     * @return {void}
	     */

	  }, {
	    key: 'embedChapter',
	    value: function embedChapter(el) {
	      var chapter = document.createElement('div');
	      chapter.classList.add(this.elementClassName);
	      if (this.options.contentHTML) {
	        if (typeof this.options.contentHTML === 'function') {
	          chapter.innerHTML = this.options.contentHTML();
	        } else {
	          chapter.innerHTML = this.options.contentHTML;
	        }
	      }
	      el.replaceWith(chapter);

	      this.options.onInsert && this.options.onInsert();

	      return true;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.cancelEmbed();
	    }
	  }]);

	  return Chapters;
	}();

	exports.default = Chapters;
	module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _Toolbar = __webpack_require__(2);

	var _Toolbar2 = _interopRequireDefault(_Toolbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Embeds = function () {
	  function Embeds(plugin, options) {
	    _classCallCheck(this, Embeds);

	    this.options = {
	      label: '<span class="fa fa-youtube-play"></span>',
	      placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter',
	      oembedProxy: 'http://medium.iframe.ly/api/oembed?omit_script=1&iframe=1',
	      captions: true,
	      captionPlaceholder: 'Type caption (optional)',
	      storeMeta: false,
	      styles: {
	        wide: {
	          label: '<span class="fa fa-align-justify"></span>'
	          // added: function ($el) {},
	          // removed: function ($el) {}
	        },
	        left: {
	          label: '<span class="fa fa-align-left"></span>'
	          // added: function ($el) {},
	          // removed: function ($el) {}
	        },
	        right: {
	          label: '<span class="fa fa-align-right"></span>'
	          // added: function ($el) {},
	          // removed: function ($el) {}
	        }
	      },
	      actions: {
	        remove: {
	          label: '<span class="fa fa-times"></span>',
	          clicked: function clicked() {
	            // var $event = $.Event('keydown');

	            // $event.which = 8;
	            // $(document).trigger($event);
	          }
	        }
	      },
	      parseOnPaste: false,
	      onChange: function onChange(action) {
	        console.log('Embed change: ', action);
	      }
	    };

	    Object.assign(this.options, options);

	    this._plugin = plugin;
	    this._editor = this._plugin.base;

	    this.activeClassName = 'medium-editor-insert-embeds-active';
	    this.placeholderClassName = 'medium-editor-insert-embeds-placeholder';
	    this.elementClassName = 'medium-editor-insert-embeds';
	    this.loadingClassName = 'medium-editor-insert-embeds-loading';
	    this.activeClassName = 'medium-editor-insert-embed-active';
	    this.descriptionContainerClassName = 'medium-editor-embed-embed-description-container';
	    this.descriptionClassName = 'medium-editor-embed-embed-description';
	    this.overlayClassName = 'medium-editor-insert-embeds-overlay';

	    this.alignLeftClassName = 'align-left';
	    this.alignRightClassName = 'align-right';
	    this.alignCenterClassName = 'align-center';
	    this.alignCenterWideClassName = 'align-center-wide';
	    this.alignCenterFullClassName = 'align-center-full';

	    this.label = this.options.label;
	    this.descriptionPlaceholder = this.options.descriptionPlaceholder;

	    this.initToolbar();
	    this.events();
	  }

	  _createClass(Embeds, [{
	    key: 'events',
	    value: function events() {
	      var _this = this;

	      this._plugin.on(document, 'click', this.unselectEmbed.bind(this));
	      this._plugin.on(document, 'keydown', this.handleKey.bind(this));

	      this._plugin.getEditorElements().forEach(function (editor) {
	        _this._plugin.on(editor, 'click', _this.selectEmbed.bind(_this));
	      });
	    }
	  }, {
	    key: 'selectEmbed',
	    value: function selectEmbed(e) {
	      var el = e.target;
	      this.selectEmbedCore(el);
	    }
	  }, {
	    key: 'selectEmbedCore',
	    value: function selectEmbedCore(el) {
	      if (el.classList.contains(this.overlayClassName)) {
	        var selectedEl = _utils2.default.getClosestWithClassName(el, this.elementClassName);
	        if (!selectedEl.classList.contains(this.loadingClassName)) {
	          selectedEl.classList.add(this.activeClassName);
	          this._editor.selectElement(selectedEl);
	          this.activeEmbedElement = selectedEl;
	        }
	      }
	    }
	  }, {
	    key: 'unselectEmbed',
	    value: function unselectEmbed(e) {
	      var el = e.target;
	      this.unselectEmbedCore(el);
	    }
	  }, {
	    key: 'unselectEmbedCore',
	    value: function unselectEmbedCore(el) {
	      var _this2 = this;

	      var clickedEmbed = void 0,
	          clickedEmbedPlaceholder = void 0,
	          embeds = void 0,
	          embedsPlaceholders = void 0;

	      if (el.classList.contains(this.descriptionClassName)) return false;

	      embeds = _utils2.default.getElementsByClassName(this._plugin.getEditorElements(), this.elementClassName);

	      if (!embeds || !embeds.length) {
	        return false;
	      }

	      // Unselect all selected images. If an image is clicked, unselect all except this one.
	      if (el.classList.contains(this.overlayClassName)) {
	        clickedEmbed = _utils2.default.getClosestWithClassName(el, this.elementClassName);
	      }

	      if (embeds) {
	        Array.prototype.forEach.call(embeds, function (embed) {
	          if (embed !== clickedEmbed) {
	            embed.classList.remove(_this2.activeClassName);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'getSiblingParagraph',
	    value: function getSiblingParagraph(el) {
	      if (!el) return false;

	      var nextSiblingDOM = el.nextSibling;
	      var nextSiblingParagraphDOM = void 0;

	      while (nextSiblingDOM && !nextSiblingParagraphDOM) {
	        if (nextSiblingDOM && nextSiblingDOM.tagName === 'P') {
	          nextSiblingParagraphDOM = nextSiblingDOM;
	        } else {
	          nextSiblingDOM = nextSiblingDOM.nextSibling;
	        }
	      }

	      return nextSiblingParagraphDOM;
	    }
	  }, {
	    key: 'handleKey',
	    value: function handleKey(e) {
	      var target = e.target;
	      var isDescriptionElement = target && target.classList && target.classList.contains(this.descriptionClassName);

	      // Enter key in description
	      if ([MediumEditor.util.keyCode.ENTER].indexOf(e.which) > -1) {
	        if (isDescriptionElement) {
	          e.preventDefault();
	        }
	      }

	      // Backspace, delete
	      if ([MediumEditor.util.keyCode.BACKSPACE, MediumEditor.util.keyCode.DELETE].indexOf(e.which) > -1 && !isDescriptionElement) {
	        this.removeEmbed(e);
	      }

	      // Down, enter
	      if (e.which === 40 || e.which === 13) {
	        // Detect selected image
	        var selectedEmbedDOM = document.querySelector('.' + this.activeClassName);

	        if (selectedEmbedDOM) {
	          var nextSiblingParagraphDOM = this.getSiblingParagraph(selectedEmbedDOM);

	          if (!nextSiblingParagraphDOM) {
	            // Insert paragraph and focus
	            var paragraph = document.createElement('p');
	            paragraph.innerHTML = '<br>';
	            selectedEmbedDOM.insertAdjacentElement('afterend', paragraph);
	          }

	          // Focus next paragraph
	          nextSiblingParagraphDOM = this.getSiblingParagraph(selectedEmbedDOM);

	          if (nextSiblingParagraphDOM) {
	            if (!nextSiblingParagraphDOM.innerHTML) {
	              nextSiblingParagraphDOM.innerHTML = '<br>';
	            }
	            window.getSelection().removeAllRanges();
	            this._plugin.getCore()._editor.selectElement(nextSiblingParagraphDOM);
	            selectedEmbedDOM.classList.remove(this.activeClassName);
	            MediumEditor.selection.clearSelection(document, true);
	            selectedEmbedDOM.classList.remove(this.activeClassName);
	            e.preventDefault();
	          }
	        }
	      }
	    }
	  }, {
	    key: 'setFocusOnElement',
	    value: function setFocusOnElement(el) {
	      // this._editor.elements[0].focus();
	      setTimeout(function () {
	        var currentSelection = window.getSelection();
	        var range = document.createRange();
	        range.setStart(el, 0);
	        currentSelection.removeAllRanges();
	        currentSelection.addRange(range);
	      }, 300);
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      this.el = this._plugin.getCore().selectedElement;
	      this.el.classList.add(this.loadingClassName);
	      this.el.classList.add(this.placeholderClassName);
	      this.el.setAttribute('data-placeholder', this.options.placeholder);

	      this.instanceHandlePaste = this.handlePaste.bind(this);
	      this.instanceHandleKeyDown = this.handleKeyDown.bind(this);

	      this._plugin.on(document, 'paste', this.instanceHandlePaste);
	      this._plugin.on(document, 'keydown', this.instanceHandleKeyDown);

	      // FIXME: it doesn't work yet.  :(
	      this._plugin.on(this.el, 'blur', this.handleBlur.bind(this));

	      this.setFocusOnElement(this.el);
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(evt) {
	      if (evt.which !== 17 && evt.which !== 91 && evt.which !== 224 // Cmd or Ctrl pressed (user probably preparing to paste url via hot keys)
	      && (evt.which === 27 || this._plugin.selectedElement !== this.el)) {
	        // Escape
	        this.cancelEmbed();
	        return false;
	      }
	      return true;
	    }
	  }, {
	    key: 'handlePaste',
	    value: function handlePaste(evt) {
	      var pastedUrl = evt.clipboardData.getData('text');
	      var linkRegEx = new RegExp('^(http(s?):)?\/\/', 'i');
	      var linkRegEx2 = new RegExp('^(www\.)?', 'i');

	      if (linkRegEx.test(pastedUrl) || linkRegEx2.test(pastedUrl)) {
	        var html = this.options.oembedProxy ? this.oembed(pastedUrl, true) : this.parseUrl(pastedUrl, true);
	      }

	      this.cancelEmbed();
	    }
	  }, {
	    key: 'removeEmbed',
	    value: function removeEmbed(e) {
	      var selectedEmbedDOM = document.querySelector('.' + this.activeClassName);
	      if (selectedEmbedDOM) {
	        selectedEmbedDOM.remove();
	      }
	    }

	    /**
	     * Init Toolbar for tuning embed position
	     *
	     * @param {string} url
	     * @param {pasted} boolean
	     * @return {void}
	     */

	  }, {
	    key: 'initToolbar',
	    value: function initToolbar() {
	      this.toolbar = new _Toolbar2.default({
	        plugin: this._plugin,
	        type: 'embeds',
	        activeClassName: this.activeClassName,
	        buttons: [{
	          name: 'embed-align-left',
	          action: 'align-left',
	          className: 'btn-align-left',
	          label: 'Left',
	          onClick: function (evt) {
	            this.changeAlign(this.alignLeftClassName, 'embed-align-left', evt);
	          }.bind(this)
	        }, {
	          name: 'embed-align-center',
	          action: 'align-center',
	          className: 'btn-align-center',
	          label: 'Center',
	          onClick: function (evt) {
	            this.changeAlign(this.alignCenterClassName, 'embed-align-center', evt);
	          }.bind(this)
	        }, {
	          name: 'embed-align-center-wide',
	          action: 'align-center-wide',
	          className: 'btn-align-center-wide',
	          label: 'Wide',
	          onClick: function (evt) {
	            this.changeAlign(this.alignCenterWideClassName, 'embed-align-center-wide', evt);
	          }.bind(this)
	        }, {
	          name: 'embed-align-center-full',
	          action: 'align-center-full',
	          className: 'btn-align-center-full',
	          label: 'Full',
	          onClick: function (evt) {
	            this.changeAlign(this.alignCenterFullClassName, 'embed-align-center-full', evt);
	          }.bind(this)
	        }, {
	          name: 'embed-align-right',
	          action: 'align-right',
	          className: 'btn-align-right',
	          label: 'Right',
	          onClick: function (evt) {
	            this.changeAlign(this.alignRightClassName, 'embed-align-right', evt);
	          }.bind(this)
	        }]
	      });

	      this._editor.extensions.push(this.toolbar);
	    }
	  }, {
	    key: 'changeAlign',
	    value: function changeAlign(className, action, evt) {
	      if (evt) {
	        evt.preventDefault();
	        evt.stopPropagation();
	      }
	      var el = this.activeEmbedElement;
	      el.classList.remove(this.alignLeftClassName, this.alignRightClassName, this.alignCenterClassName, this.alignCenterWideClassName, this.alignCenterFullClassName);
	      el.classList.add(className);

	      this.toolbar.setToolbarPosition();

	      if (this.options.onChange) {
	        this.options.onChange(action);
	      }
	    }

	    /**
	     * Get HTML via oEmbed proxy
	     *
	     * @param {string} url
	     * @param {pasted} boolean
	     * @return {void}
	     */

	  }, {
	    key: 'oembed',
	    value: function oembed(url, pasted) {
	      var _this3 = this;

	      var urlOut = this.options.oembedProxy + '&url=' + url;
	      var xhr = new XMLHttpRequest();

	      // console.log(urlOut);
	      xhr.open("GET", urlOut, true);
	      xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4 && xhr.status === 200) {
	          var data = JSON.parse(xhr.responseText);
	          _this3.embed(data.html, url, data);
	        }
	      };

	      xhr.send();

	      return true;
	    }

	    /**
	     * Get HTML using regexp
	     *
	     * @param {string} url
	     * @param {bool} pasted
	     * @return {void}
	     */

	  }, {
	    key: 'parseUrl',
	    value: function parseUrl(url, pasted) {
	      var html = void 0;

	      if (!new RegExp(['youtube', 'youtu.be', 'vimeo', 'instagram', 'twitter', 'facebook'].join('|')).test(url)) {
	        // $.proxy(this, 'convertBadEmbed', url)();
	        return false;
	      }

	      html = url.replace(/\n?/g, '').replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9\-_]+)(.*)?$/, '<div class="video video-youtube"><iframe width="420" height="315" src="//www.youtube.com/embed/$7" frameborder="0" allowfullscreen></iframe></div>').replace(/^https?:\/\/vimeo\.com(\/.+)?\/([0-9]+)$/, '<div class="video video-vimeo"><iframe src="//player.vimeo.com/video/$2" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>').replace(/^https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?$/, '<blockquote class="twitter-tweet" align="center" lang="en"><a href="https://twitter.com/$1/statuses/$2"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>').replace(/^(https:\/\/www\.facebook\.com\/(.*))$/, '<script src="//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.2" async></script><div class="fb-post" data-href="$1"><div class="fb-xfbml-parse-ignore"><a href="$1">Loading Facebook post...</a></div></div>').replace(/^https?:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>');

	      if (/<("[^"]*"|'[^']*'|[^'">])*>/.test(html) === false) {
	        // $.proxy(this, 'convertBadEmbed', url)();
	        return false;
	      }

	      if (pasted) {
	        return this.embed(html, url);
	      } else {
	        return this.embed(html);
	      }
	    }
	  }, {
	    key: 'embed',


	    /**
	     * Add html to page
	     *
	     * @param {string} html
	     * @param {string} pastedUrl
	     * @return {void}
	     */

	    value: function embed(html, pastedUrl, info) {
	      var el = void 0,
	          figure = void 0,
	          descriptionContainer = void 0,
	          description = void 0,
	          metacontainer = void 0,
	          container = void 0,
	          overlay = void 0,
	          lastEl = void 0,
	          paragraph = void 0;

	      if (!html) {
	        console.error('Incorrect URL format specified: ', pastedUrl);
	        return false;
	      }

	      if (info && info.type === 'link') {
	        console.error('Just common link — no any embeds to insert: ', pastedUrl);
	        return false;
	      }

	      el = this._plugin.getCore().selectedElement;
	      figure = document.createElement('figure');
	      figure.classList.add('medium-editor-insert-embeds-item');

	      descriptionContainer = document.createElement('div');
	      descriptionContainer.classList.add(this.descriptionContainerClassName);

	      description = document.createElement('figcaption');
	      description.classList.add(this.descriptionClassName);
	      description.setAttribute('contenteditable', true);
	      description.setAttribute('data-placeholder', 'Type caption for embed (optional)');

	      metacontainer = document.createElement('div');
	      metacontainer.classList.add(this.elementClassName);
	      metacontainer.classList.add(this.alignCenterClassName);
	      paragraph = document.createElement('p');
	      paragraph.innerHTML = '<br>';

	      // metacontainer.classList.add(this.activeClassName);

	      metacontainer.setAttribute('contenteditable', false);

	      container = document.createElement('div');
	      container.classList.add('medium-editor-insert-embeds-item-container');

	      overlay = document.createElement('div');
	      overlay.classList.add(this.overlayClassName);

	      metacontainer.appendChild(figure);
	      figure.appendChild(container);
	      figure.appendChild(overlay);

	      descriptionContainer.classList.add(this.descriptionContainerClassName);
	      description.contentEditable = true;
	      description.classList.add(this.descriptionClassName);
	      description.dataset.placeholder = this.descriptionPlaceholder;

	      el.replaceWith(metacontainer);
	      // Insert a empty paragraph
	      if (!el.nextSibling) {
	        el.insertAdjacentElement('afterend', paragraph);
	      }

	      // check if embed is last element, then add one more p after it
	      lastEl = metacontainer.parentNode.lastChild;

	      while (lastEl && lastEl.nodeType !== 1) {
	        lastEl = lastEl.previousSibling;
	      }

	      if (lastEl === metacontainer) {
	        var lastP = document.createElement('p');
	        lastP.appendChild(document.createElement('br'));
	        metacontainer.parentNode.appendChild(lastP);
	      }

	      container.innerHTML = html;

	      this._editor.selectElement(metacontainer);

	      // console.log(html);
	      // this.core.triggerInput();

	      if (html.indexOf('facebook') !== -1) {
	        if (typeof FB !== 'undefined') {
	          setTimeout(function () {
	            FB.XFBML.parse();
	          }, 2000);
	        }
	      }

	      this.options.onInsert && this.options.onInsert(html);

	      setTimeout(function () {
	        overlay.click();
	      }, 100);

	      return true;
	    }
	  }, {
	    key: 'handleBlur',
	    value: function handleBlur() {
	      console.log('blur');
	      // this.cancelEmbed();
	    }
	  }, {
	    key: 'hidePlaceholder',
	    value: function hidePlaceholder() {
	      this.el.removeAttribute('data-placeholder');
	      this.el.classList.remove('medium-editor-insert-embeds-placeholder');
	    }
	  }, {
	    key: 'cancelEmbed',
	    value: function cancelEmbed() {
	      this.hidePlaceholder();
	      this.el.classList.remove(this.activeClassName);
	      this.el.classList.remove(this.loadingClassName);

	      this._plugin.off(document, 'paste', this.instanceHandlePaste);
	      this._plugin.off(document, 'keyup', this.instanceHandleKeyUp);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.cancelEmbed();
	    }
	  }]);

	  return Embeds;
	}();

	exports.default = Embeds;
	module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _Toolbar = __webpack_require__(2);

	var _Toolbar2 = _interopRequireDefault(_Toolbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Images = function () {
	  function Images(plugin, options) {
	    _classCallCheck(this, Images);

	    this.options = {
	      label: '<span class="fa fa-camera"></span>',
	      preview: true,
	      uploadUrl: 'upload.php',
	      deleteUrl: 'delete.php',
	      deleteMethod: 'DELETE',
	      deleteData: {},
	      onChange: function onChange(action) {
	        console.log('Image change: ', action);
	      }
	    };

	    Object.assign(this.options, options);

	    this._plugin = plugin;
	    this._editor = this._plugin.base;
	    this.elementClassName = 'medium-editor-insert-images';
	    this.loadingClassName = 'medium-editor-insert-images-loading';
	    this.activeClassName = 'medium-editor-insert-image-active';
	    this.descriptionContainerClassName = 'medium-editor-embed-image-description-container';
	    this.descriptionClassName = 'medium-editor-embed-image-description';

	    this.alignLeftClassName = 'align-left';
	    this.alignRightClassName = 'align-right';
	    this.alignCenterClassName = 'align-center';
	    this.alignCenterWideClassName = 'align-center-wide';
	    this.alignCenterFullClassName = 'align-center-full';

	    this.label = this.options.label;
	    this.descriptionPlaceholder = this.options.descriptionPlaceholder;
	    this.activeImageElement = null;
	    this.isLoaderShowing = false;
	    this.initToolbar();
	    this.events();
	  }

	  _createClass(Images, [{
	    key: 'events',
	    value: function events() {
	      var _this = this;

	      this._plugin.on(document, 'click', this.unselectImage.bind(this));
	      this._plugin.on(document, 'keydown', this.handleKey.bind(this));

	      this._plugin.getEditorElements().forEach(function (editor) {
	        _this._plugin.on(editor, 'click', _this.selectImage.bind(_this));
	      });
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      var _this2 = this;

	      if (this.options.onInsertButtonClick) {
	        var uid = _utils2.default.generateRandomString();
	        this.options.onInsertButtonClick(function (imageUrl) {
	          return _this2.insertImage(imageUrl, uid, false);
	        }, function (imageUrl) {
	          return _this2.insertImage(imageUrl, uid, true);
	        });
	      } else {
	        this._input = document.createElement('input');
	        this._input.type = 'file';
	        this._input.multiple = true;
	        this._plugin.on(this._input, 'change', this.uploadFiles.bind(this));
	        this._input.click();
	      }
	    }
	  }, {
	    key: 'initToolbar',
	    value: function initToolbar() {
	      this.toolbar = new _Toolbar2.default({
	        plugin: this._plugin,
	        type: 'images',
	        activeClassName: this.activeClassName,
	        buttons: [{
	          name: 'image-align-left',
	          action: 'align-left',
	          className: 'btn-align-left',
	          label: 'Left',
	          title: 'Left',
	          onClick: function (evt) {
	            this.changeAlign('align-left', 'image-align-left', evt);
	          }.bind(this)
	        }, {
	          name: 'image-align-center',
	          action: 'align-center',
	          className: 'btn-align-center',
	          label: 'Center',
	          title: 'Center',
	          onClick: function (evt) {
	            this.changeAlign('align-center', 'image-align-center', evt);
	          }.bind(this)
	        }, {
	          name: 'image-align-center-wide',
	          action: 'align-center-wide',
	          className: 'btn-align-center-wide',
	          label: 'Wide',
	          title: 'Wide',
	          onClick: function (evt) {
	            this.changeAlign('align-center-wide', 'image-align-center-wide', evt);
	          }.bind(this)
	        }, {
	          name: 'image-align-center-full',
	          action: 'align-center-full',
	          className: 'btn-align-center-full',
	          label: 'Full',
	          title: 'Full wide',
	          onClick: function (evt) {
	            this.changeAlign('align-center-full', 'image-align-center-full', evt);
	          }.bind(this)
	        }, {
	          name: 'image-align-right',
	          action: 'align-right',
	          className: 'btn-align-right',
	          label: 'Right',
	          title: 'Right',
	          onClick: function (evt) {
	            this.changeAlign('align-right', 'image-align-right', evt);
	          }.bind(this)
	        }]
	      });

	      this._editor.extensions.push(this.toolbar);
	    }
	  }, {
	    key: 'changeAlign',
	    value: function changeAlign(className, action, evt) {
	      if (evt) {
	        evt.preventDefault();
	        evt.stopPropagation();
	      }
	      var el = this.activeImageElement;
	      el.classList.remove(this.alignLeftClassName, this.alignRightClassName, this.alignCenterClassName, this.alignCenterWideClassName, this.alignCenterFullClassName);

	      el.classList.add(className);
	      this.toolbar.setToolbarPosition();

	      if (this.options.onChange) {
	        this.options.onChange(action);
	      }
	    }
	  }, {
	    key: 'uploadFiles',
	    value: function uploadFiles() {
	      var _this3 = this;

	      Array.prototype.forEach.call(this._input.files, function (file) {
	        // Generate uid for this image, so we can identify it later
	        // and we can replace preview image with uploaded one
	        var uid = _utils2.default.generateRandomString();

	        if (_this3.options.preview) {
	          _this3.preview(file, uid);
	        }

	        _this3.upload(file, uid);
	      });
	    }
	  }, {
	    key: 'preview',
	    value: function preview(file, uid) {
	      var _this4 = this;

	      var reader = new FileReader();

	      reader.onload = function (e) {
	        _this4.insertImage(e.target.result, uid);
	      };

	      reader.readAsDataURL(file);
	    }
	  }, {
	    key: 'upload',
	    value: function upload(file, uid) {
	      var xhr = new XMLHttpRequest(),
	          data = new FormData();
	      var insertImage = this.insertImage.bind(this);

	      xhr.open("POST", this.options.uploadUrl, true);
	      xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4 && xhr.status === 200) {
	          insertImage(xhr.responseText, _utils2.default.generateRandomString());
	        }
	      };

	      data.append("file", file);
	      xhr.send(data);
	    }
	  }, {
	    key: 'insertImage',
	    value: function insertImage(imageUrl, uid, isLoader) {
	      var paragraph = this._plugin.getCore().selectedElement;

	      // Replace paragraph with div, because figure is a block element
	      // and can't be nested inside paragraphs
	      if (paragraph.nodeName.toLowerCase() === 'p') {
	        var div = document.createElement('div');

	        paragraph.parentNode.insertBefore(div, paragraph);
	        this._plugin.getCore().selectElement(div);
	        paragraph.remove();
	      }
	      // const el = this._plugin.getCore().selectedElement
	      // const image = el.querySelector(`[data-uid="${uid}"]`);

	      this._plugin.getCore().hideButtons();

	      return this.addImage(imageUrl, uid, isLoader);
	    }
	  }, {
	    key: 'addParagraph',
	    value: function addParagraph(el) {
	      var paragraph = document.createElement('p');
	      paragraph.innerHTML = '<br>';
	      el.insertAdjacentElement('afterend', paragraph);
	    }
	  }, {
	    key: 'addImage',
	    value: function addImage(url, uid, isLoader) {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        var el = _this5._plugin.getCore().selectedElement,
	            figure = document.createElement('figure'),
	            img = document.createElement('img'),
	            descriptionContainer = document.createElement('div'),
	            description = document.createElement('figcaption');
	        var domImage = void 0;

	        img.alt = '';

	        if (uid) {
	          img.setAttribute('data-uid', uid);
	        }

	        descriptionContainer.classList.add(_this5.descriptionContainerClassName);
	        description.contentEditable = true;
	        description.classList.add(_this5.descriptionClassName);
	        description.dataset.placeholder = _this5.descriptionPlaceholder;

	        // If we're dealing with a preview image,
	        // we don't have to preload it before displaying
	        if (url.match(/^data:/)) {
	          if (!isLoader) {
	            el.innerHTML = '';
	            el.classList.remove(_this5.loadingClassName);
	            _this5.isLoaderShowing = false;
	          }

	          img.src = url;
	          figure.appendChild(img);
	          el.appendChild(figure);
	        } else {
	          domImage = new Image();
	          domImage.onload = function () {
	            img.src = domImage.src;
	            if (!isLoader) {
	              img.classList.add(_this5.activeClassName);
	            }
	            figure.appendChild(img);
	            descriptionContainer.appendChild(description);
	            figure.appendChild(descriptionContainer);

	            if (!isLoader) {
	              el.innerHTML = '';
	              el.classList.remove(_this5.loadingClassName);
	              _this5.isLoaderShowing = false;
	            }

	            if (isLoader) {
	              _this5.isLoaderShowing = true;
	              el.classList.add(_this5.loadingClassName);
	            }

	            el.appendChild(figure);

	            if ((!el.nextSibling || !el.nextSibling.nextSibling) && !isLoader) {
	              _this5.addParagraph(el);
	            }

	            // Resolve with domImage so we can test this function easily
	            resolve(domImage);
	          };

	          domImage.src = url;
	        }

	        el.classList.add(_this5.elementClassName);
	        el.classList.add(_this5.alignCenterClassName);

	        el.contentEditable = false;
	      });
	    }
	  }, {
	    key: 'replaceImage',
	    value: function replaceImage(image, url) {
	      var domImage = new Image();
	      var el = this._plugin.getCore().selectedElement;

	      if (!el.nextSibling || !el.nextSibling.nextSibling) {
	        this.addParagraph(el);
	      }

	      domImage.onload = function () {
	        image.src = domImage.src;
	        image.removeAttribute('data-uid');
	      };

	      domImage.src = url;

	      // Return domImage so we can test this function easily
	      return domImage;
	    }
	  }, {
	    key: 'selectImage',
	    value: function selectImage(e) {
	      var el = e.target;
	      this.selectImageCore(el);
	    }
	  }, {
	    key: 'selectImageCore',
	    value: function selectImageCore(el) {
	      if (el.nodeName.toLowerCase() === 'img' && _utils2.default.getClosestWithClassName(el, this.elementClassName)) {
	        var parentNode = el.parentNode.parentNode;

	        if (!parentNode.classList.contains(this.loadingClassName)) {
	          el.classList.add(this.activeClassName);
	          // parentNode.classList.add(this.activeClassName);
	          // TODO: The value is correct, but the medium sometimes change
	          this._editor.selectElement(parentNode);
	          this.activeImageElement = parentNode;
	        }
	      }
	    }
	  }, {
	    key: 'unselectImage',
	    value: function unselectImage(e) {
	      var _this6 = this;

	      var el = e.target;
	      var clickedImage = void 0,
	          images = void 0;

	      if (el.classList.contains(this.descriptionClassName)) return false;

	      // Unselect all selected images. If an image is clicked, unselect all except this one.
	      if (el.nodeName.toLowerCase() === 'img' && el.classList.contains(this.activeClassName)) {
	        clickedImage = el;
	      }

	      images = _utils2.default.getElementsByClassName(this._plugin.getEditorElements(), this.activeClassName);
	      Array.prototype.forEach.call(images, function (image) {
	        if (image !== clickedImage) {
	          image.classList.remove(_this6.activeClassName);
	        }
	      });
	      this.activeImage = null;
	    }
	  }, {
	    key: 'getSiblingParagraph',
	    value: function getSiblingParagraph(el) {
	      if (!el) return false;

	      var nextSiblingDOM = el.nextSibling;
	      var nextSiblingParagraphDOM = void 0;

	      while (nextSiblingDOM && !nextSiblingParagraphDOM) {
	        if (nextSiblingDOM && nextSiblingDOM.tagName === 'P') {
	          nextSiblingParagraphDOM = nextSiblingDOM;
	        } else {
	          nextSiblingDOM = nextSiblingDOM.nextSibling;
	        }
	      }

	      return nextSiblingParagraphDOM;
	    }
	  }, {
	    key: 'handleKey',
	    value: function handleKey(e) {
	      var target = e.target;
	      var isDescriptionElement = target && target.classList && target.classList.contains(this.descriptionClassName);

	      // Enter key in description
	      if ([MediumEditor.util.keyCode.ENTER].indexOf(e.which) > -1) {
	        if (isDescriptionElement) {
	          return e.preventDefault();
	        }
	      }

	      // Backspace, delete
	      if ([MediumEditor.util.keyCode.BACKSPACE, MediumEditor.util.keyCode.DELETE].indexOf(e.which) > -1 && !isDescriptionElement) {
	        this.removeImage(e);
	      }

	      // Down, enter
	      if (e.which === 40 || e.which === 13) {
	        // Detect selected image
	        var selectedImageDOM = document.querySelector('.' + this.activeClassName);
	        var selectedImageParentDOM = selectedImageDOM && selectedImageDOM.parentNode.parentNode;
	        if (selectedImageParentDOM) {
	          var nextSiblingParagraphDOM = this.getSiblingParagraph(selectedImageParentDOM);

	          if (!nextSiblingParagraphDOM) {
	            // Insert paragraph and focus
	            this.addParagraph(selectedImageParentDOM);
	          }

	          // Focus next paragraph
	          nextSiblingParagraphDOM = this.getSiblingParagraph(selectedImageParentDOM);

	          if (nextSiblingParagraphDOM) {
	            if (!nextSiblingParagraphDOM.innerHTML) {
	              nextSiblingParagraphDOM.innerHTML = '<br>';
	            }
	            window.getSelection().removeAllRanges();
	            this._plugin.getCore()._editor.selectElement(nextSiblingParagraphDOM);
	            MediumEditor.selection.clearSelection(document, true);
	            selectedImageDOM.classList.remove(this.activeClassName);
	            e.preventDefault();
	          }
	        }
	      }
	    }
	  }, {
	    key: 'removeImage',
	    value: function removeImage(e) {
	      var _this7 = this;

	      var images = _utils2.default.getElementsByClassName(this._plugin.getEditorElements(), this.activeClassName),
	          selection = window.getSelection();
	      var selectedHtml = void 0;

	      // Remove image even if it's not selected, but backspace/del is pressed in text
	      if (selection && selection.rangeCount) {
	        var range = MediumEditor.selection.getSelectionRange(document),
	            focusedElement = MediumEditor.selection.getSelectedParentElement(range),
	            caretPosition = MediumEditor.selection.getCaretOffsets(focusedElement).left;
	        var sibling = void 0;

	        // Is backspace pressed and caret is at the beginning of a paragraph, get previous element
	        if (e.which === MediumEditor.util.keyCode.BACKSPACE && caretPosition === 0) {
	          sibling = focusedElement.previousElementSibling;
	          // Is del pressed and caret is at the end of a paragraph, get next element
	        } else if (e.which === MediumEditor.util.keyCode.DELETE && caretPosition === focusedElement.innerText.length) {
	          sibling = focusedElement.nextElementSibling;
	        }

	        if (sibling && sibling.classList.contains('medium-editor-insert-images')) {
	          var newImages = sibling.getElementsByTagName('img');
	          Array.prototype.forEach.call(newImages, function (image) {
	            images.push(image);
	          });
	        }

	        // If text is selected, find images in the selection
	        selectedHtml = MediumEditor.selection.getSelectionHtml(document);
	        if (selectedHtml) {
	          var temp = document.createElement('div');
	          var wrappers = void 0,
	              _newImages = void 0;
	          temp.innerHTML = selectedHtml;

	          wrappers = temp.getElementsByClassName('medium-editor-insert-images');
	          _newImages = _utils2.default.getElementsByTagName(wrappers, 'img');

	          Array.prototype.forEach.call(_newImages, function (image) {
	            images.push(image);
	          });
	        }
	      }

	      if (images.length) {
	        if (!selectedHtml) {
	          e.preventDefault();
	        }

	        images.forEach(function (image) {
	          var wrapper = _utils2.default.getClosestWithClassName(image, 'medium-editor-insert-images');
	          _this7.deleteFile(image.src);

	          image.parentNode.remove();

	          // If wrapper has no images anymore, remove it
	          if (wrapper.childElementCount === 0) {
	            var next = wrapper.nextElementSibling,
	                prev = wrapper.previousElementSibling;

	            wrapper.remove();

	            // If there is no selection, move cursor at the beginning of next paragraph (if delete is pressed),
	            // or nove it at the end of previous paragraph (if backspace is pressed)
	            if (!selectedHtml) {
	              if (next || prev) {
	                if (next && e.which === MediumEditor.util.keyCode.DELETE || !prev) {
	                  MediumEditor.selection.moveCursor(document, next, 0);
	                } else {
	                  MediumEditor.selection.moveCursor(document, prev.lastChild, prev.lastChild.textContent.length);
	                }
	              }
	            }
	          }
	        });
	      }
	    }
	  }, {
	    key: 'deleteFile',
	    value: function deleteFile(image) {
	      if (this.options.deleteUrl) {
	        var xhr = new XMLHttpRequest(),
	            data = Object.assign({}, {
	          file: image
	        }, this.options.deleteData);

	        xhr.open(this.options.deleteMethod, this.options.deleteUrl, true);
	        xhr.send(data);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {}
	  }]);

	  return Images;
	}();

	exports.default = Images;
	module.exports = exports['default'];

/***/ })
/******/ ])
});
;