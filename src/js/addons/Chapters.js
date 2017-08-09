import utils from '../utils';
import Toolbar from '../Toolbar';

export default class Chapters {

  constructor(plugin, options) {
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
        },
      },
      actions: {
        remove: {
          label: '<span class="fa fa-times"></span>',
          clicked: function() {
            // var $event = $.Event('keydown');

            // $event.which = 8;
            // $(document).trigger($event);
          }
        }
      },
      parseOnPaste: false,
    };

    Object.assign(this.options, options);

    this._plugin = plugin;
    this._editor = this._plugin.base;

    this.activeClassName = 'medium-editor-insert-embed-chapters-active';
    this.elementClassName = 'medium-editor-insert-embed-chapters';

    this.alignLeftClassName = 'vertical';
    this.alignCenterClassName = 'center';

    this.label = this.options.label;
    this.descriptionPlaceholder = this.options.descriptionPlaceholder;

    this.initToolbar();
    this.events();

  }

  events() {
    this._plugin.on(document, 'click', this.unselectEmbed.bind(this));
    this._plugin.on(document, 'keydown', this.handleKey.bind(this));

    this._plugin.getEditorElements().forEach((editor) => {
      this._plugin.on(editor, 'click', this.selectEmbed.bind(this));
    });
  }

  selectEmbed(e) {
    const el = e.target;
    this.selectEmbedCore(el, event);
  }

  getClosestElementByClassName(el, className) {
    while (el) {
      if (el.classList && el.classList.contains(className)) return el;
      el = el.parentNode;
    }
  }


  selectEmbedCore(el, event) {
    if (this.getClosestElementByClassName(el, this.elementClassName)) {
      const element = this.getClosestElementByClassName(el, this.elementClassName);
      element.classList.add(this.activeClassName);
      this._editor.selectElement(element);
      this.activeChapterElement = element;
      event && event.stopPropagation();
    }
  }

  unselectEmbed(e) {
    const el = e.target;
    this.unselectEmbedCore(el);
  }

  unselectEmbedCore(el) {
    let clickedEmbed, clickedEmbedPlaceholder, chapters, embedsPlaceholders;

    chapters = utils.getElementsByClassName(this._plugin.getEditorElements(), this.elementClassName);

    if (!chapters || !chapters.length) {
      return false;
    }

    if (chapters) {
      Array.prototype.forEach.call(chapters, (chapters) => {
        if (chapters !== clickedEmbed) {
          chapters.classList.remove(this.activeClassName);
        }
      });
    }

    this.activeChapterElement = null;
  }


  handleKey(e) {
    const target = e.target;

    // Backspace, delete
    if ([MediumEditor.util.keyCode.BACKSPACE, MediumEditor.util.keyCode.DELETE].indexOf(e.which) > -1) {
      this.removeEmbed(e);
    } else if (this.activeChapterElement) {
      e.preventDefault();
    }
  }

  setFocusOnElement(el) {
    // this._editor.elements[0].focus();
    setTimeout(() => {
      const currentSelection = window.getSelection();
      const range = document.createRange();
      range.setStart(el, 0);
      currentSelection.removeAllRanges();
      currentSelection.addRange(range);
    }, 300);
  }

  handleClick() {
    this.el = this._plugin.getCore().selectedElement;
    this.setFocusOnElement(this.el);
    this.embedChapter(this.el);
  }

  removeEmbed(e) {
    const selectedEmbedDOM = document.querySelector(`.${this.activeClassName}`);
    if (selectedEmbedDOM) {
      selectedEmbedDOM.remove();
      this.activeChapterElement = null;
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
  initToolbar() {
    this.toolbar = new Toolbar({
      plugin: this._plugin,
      type: 'chapters',
      activeClassName: this.activeClassName,
      buttons: [{
          name: 'chapters-align-left',
          action: 'align-left',
          className: 'btn-align-left',
          label: 'Left',
          onClick: (function(evt) {
            this.changeAlign(this.alignLeftClassName, 'chapters-align-left', evt);
          }).bind(this),
        },
        {
          name: 'chapters-align-center',
          action: 'align-center',
          className: 'btn-align-center',
          label: 'Center',
          onClick: (function(evt) {
            this.changeAlign(this.alignCenterClassName, 'chapters-align-center', evt);
          }).bind(this),
        },
      ]
    });

    this._editor.extensions.push(this.toolbar);
  }

  changeAlign(className, action, evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    const el = this.activeChapterElement;
    el.classList.remove(
      this.alignLeftClassName,
      this.alignCenterClassName,
    );
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

  embedChapter(el) {
    const chapter = document.createElement('div');
    chapter.classList.add(this.elementClassName);
    if (this.options.contentHTML) {
      chapter.innerHTML = this.options.contentHTML;
    }
    el.replaceWith(chapter);

    this.options.onInsert && this.options.onInsert();

    return true;
  }


  destroy() {
    this.cancelEmbed();
  }
}