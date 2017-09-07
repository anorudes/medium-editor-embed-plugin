import utils from '../utils';
import Toolbar from '../Toolbar';

export default class PayWall {

  constructor(plugin, options) {
    this.options = {
      label: '<span class="fa fa-scissors"></span>',
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

    this.activeClassName = 'medium-editor-insert-embed-paywall-active';
    this.elementClassName = 'medium-editor-insert-embed-paywall';

    this.alignLeftClassName = 'align-left';
    this.alignCenterClassName = 'align-center-wide';

    this.label = this.options.label;
    this.descriptionPlaceholder = this.options.descriptionPlaceholder;

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
    if (this.getClosestElementByClassName(el, this.elementClassName)) {
      this.selectEmbedCore(el, event);
      e && e.stopPropagation();
      e && e.preventDefault();
    }
  }

  getClosestElementByClassName(el, className) {
    while (el) {
      if (el.classList && el.classList.contains(className)) return el;
      el = el.parentNode;
    }
  }


  selectEmbedCore(el) {
    const element = this.getClosestElementByClassName(el, this.elementClassName);
    element.classList.add(this.activeClassName);
    const currentSelection = window.getSelection();
  }

  unselectEmbed(e) {
    const el = e.target;
    this.unselectEmbedCore(el);
  }

  unselectEmbedCore(el) {
    let clickedEmbed, clickedEmbedPlaceholder, paywall, embedsPlaceholders;

    paywall = utils.getElementsByClassName(this._plugin.getEditorElements(), this.elementClassName);
    if (!paywall || !paywall.length) {
      return false;
    }

    if (paywall) {
      Array.prototype.forEach.call(paywall, (paywall) => {
        if (paywall !== clickedEmbed) {
          paywall.classList.remove(this.activeClassName);
        }
      });
    }
  }

  getSiblingParagraph(el) {
    if (!el) return false;

    let nextSiblingDOM = el.nextSibling;
    let nextSiblingParagraphDOM;

    while (nextSiblingDOM && !nextSiblingParagraphDOM) {
      if (nextSiblingDOM && nextSiblingDOM.tagName === 'P') {
        nextSiblingParagraphDOM = nextSiblingDOM;
      } else {
        nextSiblingDOM = nextSiblingDOM.nextSibling;
      }
    }

    return nextSiblingParagraphDOM;
  }

  handleKey(e) {
    const target = e.target;

    // Backspace, delete
    if ([MediumEditor.util.keyCode.BACKSPACE, MediumEditor.util.keyCode.DELETE].indexOf(e.which) > -1) {
      this.removeEmbed(e);
    } else if (document.querySelector(`.${this.activeClassName}`)) {
      // Block all keys
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
    this.embedPaywall(this.el);
  }

  removeEmbed(e) {
    const selectedEmbedDOM = document.querySelector(`.${this.activeClassName}`);
    if (selectedEmbedDOM) {
      selectedEmbedDOM.remove();
      e.preventDefault();
      e.stopPropagation();
    }
  }

  /**
   * Init Toolbar for tuning paywall position
   *
   * @param {string} url
   * @param {pasted} boolean
   * @return {void}
   */
  initToolbar() {
  }

  changeAlign(className, action, evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const el = document.querySelector(`.${this.activeClassName}`);
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

  embedPaywall(el) {
    // Remove old paywall
    const prevPaywallDOM = document.querySelector(`.${this.elementClassName}`);
    if (prevPaywallDOM) {
      prevPaywallDOM.remove();
    }

    // Insert new paywall
    const paywall = document.createElement('div');
    paywall.setAttribute("contenteditable", false);
    paywall.innerHTML = '<div></div>';
    paywall.classList.add(this.elementClassName);

    el.replaceWith(paywall);

    const selectedEmbedDOM = document.querySelector(`.${this.elementClassName}`);

    if (selectedEmbedDOM) {
      let nextSiblingParagraphDOM = this.getSiblingParagraph(selectedEmbedDOM);

      if (!nextSiblingParagraphDOM) {
        // Insert paragraph and focus
        const paragraph = document.createElement('p');
        paragraph.innerHTML = '<br>';
        selectedEmbedDOM.insertAdjacentElement('afterend', paragraph);
      }
    }

    this.options.onInsert && this.options.onInsert();

    return true;
  }


  destroy() {
    this.cancelEmbed();
  }
}