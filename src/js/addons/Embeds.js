import utils from '../utils';
import Toolbar from '../Toolbar';

export default class Embeds {

  constructor(plugin, options) {
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
          clicked: function() {
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

  events() {
    this._plugin.on(document, 'click', this.unselectEmbed.bind(this));
    this._plugin.on(document, 'keydown', this.handleKey.bind(this));

    this._plugin.getEditorElements().forEach((editor) => {
      this._plugin.on(editor, 'click', this.selectEmbed.bind(this));
    });
  }


  selectEmbed(e) {
    const el = e.target;

    if (el.classList.contains(this.overlayClassName)) {
      const selectedEl = utils.getClosestWithClassName(el, this.elementClassName);
      if (!selectedEl.classList.contains(this.loadingClassName)) {
        selectedEl.classList.add(this.activeClassName);
        this._editor.selectElement(selectedEl);
        this.activeEmbedElement = selectedEl;
      }
    }
  }

  unselectEmbed(e) {
    const el = e.target;
    let clickedEmbed, clickedEmbedPlaceholder, embeds, embedsPlaceholders;

    if (el.classList.contains(this.descriptionClassName)) return false;

    embeds = utils.getElementsByClassName(this._plugin.getEditorElements(), this.elementClassName);

    if (!embeds || !embeds.length) {
      return false;
    }

    // Unselect all selected images. If an image is clicked, unselect all except this one.
    if (el.classList.contains(this.overlayClassName)) {
      clickedEmbed = utils.getClosestWithClassName(el, this.elementClassName);
    }

    if (embeds) {
      Array.prototype.forEach.call(embeds, (embed) => {
        if (embed !== clickedEmbed) {
          embed.classList.remove(this.activeClassName);
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
    const isDescriptionElement = target && target.classList && target.classList.contains(this.descriptionClassName);

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
      const selectedEmbedDOM = document.querySelector(`.${this.activeClassName}`);

      if (selectedEmbedDOM) {
        let nextSiblingParagraphDOM = this.getSiblingParagraph(selectedEmbedDOM);

        if (!nextSiblingParagraphDOM) {
          // Insert paragraph and focus
          const paragraph = document.createElement('p');
          paragraph.innerHTML = '<br>';
            selectedEmbedDOM.insertAdjacentElement('afterend', paragraph);
        }

        // Focus next paragraph
        nextSiblingParagraphDOM = this.getSiblingParagraph(selectedEmbedDOM);

        if (nextSiblingParagraphDOM) {
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

  handleClick() {
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

    // this._plugin.getCore().hideButtons();

    // return focus to element, allow user to cancel embed by start writing
    this._editor.elements[0].focus();
    this.el.focus();

    // this._editor.selectElement(this.el);
    // console.log( this._editor.selection );
  }

  handleKeyDown(evt) {
    if (evt.which !== 17 && evt.which !== 91 && evt.which !== 224 // Cmd or Ctrl pressed (user probably preparing to paste url via hot keys)
      &&
      (evt.which === 27 || this._plugin.selectedElement !== this.el)
    ) {
      // Escape
      this.cancelEmbed();
      return false;
    }
    return true;
  }

  handlePaste(evt) {
    const pastedUrl = evt.clipboardData.getData('text');
    const linkRegEx = new RegExp('^(http(s?):)?\/\/', 'i');
    const linkRegEx2 = new RegExp('^(www\.)?', 'i');

    if (linkRegEx.test(pastedUrl) || linkRegEx2.test(pastedUrl)) {
      const html = (this.options.oembedProxy) ? this.oembed(pastedUrl, true) : this.parseUrl(pastedUrl, true);
    }

    this.cancelEmbed();
  }


  removeEmbed(e) {
    // TODO remove Embed (overlay with cross-icon... maybe)
  }

  /**
   * Init Toolbar for tuning embed position
   *
   * @param {string} url
   * @param {pasted} boolean
   * @return {void}
   */
  initToolbar() {
    this.toolbar = new Toolbar({
      plugin: this._plugin,
      type: 'embeds',
      activeClassName: this.activeClassName,
      buttons: [{
        name: 'embed-align-left',
        action: 'align-left',
        className: 'btn-align-left',
        label: 'Left',
        onClick: (function() {
          this.changeAlign(this.alignLeftClassName);
        }).bind(this),
      }, {
        name: 'embed-align-center',
        action: 'align-center',
        className: 'btn-align-center',
        label: 'Center',
        onClick: (function() {
          this.changeAlign(this.alignCenterClassName);
        }).bind(this),
      }, {
        name: 'embed-align-center-wide',
        action: 'align-center-wide',
        className: 'btn-align-center-wide',
        label: 'Wide',
        onClick: (function() {
          this.changeAlign(this.alignCenterWideClassName);
        }).bind(this),
      }, {
        name: 'embed-align-center-full',
        action: 'align-center-full',
        className: 'btn-align-center-full',
        label: 'Full',
        onClick: (function() {
          this.changeAlign(this.alignCenterFullClassName);
        }).bind(this),
      }, {
        name: 'embed-align-right',
        action: 'align-right',
        className: 'btn-align-right',
        label: 'Right',
        onClick: (function() {
          this.changeAlign(this.alignRightClassName);
        }).bind(this),
      }, ]
    });

    this._editor.extensions.push(this.toolbar);
  }

  changeAlign(className) {
    const el = this.activeEmbedElement;
    el.classList.remove(
      this.alignLeftClassName,
      this.alignRightClassName,
      this.alignCenterClassName,
      this.alignCenterWideClassName,
      this.alignCenterFullClassName
    );
    el.classList.add(className);
  }

  /**
   * Get HTML via oEmbed proxy
   *
   * @param {string} url
   * @param {pasted} boolean
   * @return {void}
   */

  oembed(url, pasted) {

    const urlOut = this.options.oembedProxy + '&url=' + url;
    const xhr = new XMLHttpRequest();

    // console.log(urlOut);
    xhr.open("GET", urlOut, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        this.embed(data.html, url, data);
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

  parseUrl(url, pasted) {
    let html;

    if (!(new RegExp(['youtube', 'youtu.be', 'vimeo', 'instagram', 'twitter', 'facebook'].join('|')).test(url))) {
      // $.proxy(this, 'convertBadEmbed', url)();
      return false;
    }

    html = url.replace(/\n?/g, '')
      .replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9\-_]+)(.*)?$/, '<div class="video video-youtube"><iframe width="420" height="315" src="//www.youtube.com/embed/$7" frameborder="0" allowfullscreen></iframe></div>')
      .replace(/^https?:\/\/vimeo\.com(\/.+)?\/([0-9]+)$/, '<div class="video video-vimeo"><iframe src="//player.vimeo.com/video/$2" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>')
      .replace(/^https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?$/, '<blockquote class="twitter-tweet" align="center" lang="en"><a href="https://twitter.com/$1/statuses/$2"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>')
      .replace(/^(https:\/\/www\.facebook\.com\/(.*))$/, '<script src="//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.2" async></script><div class="fb-post" data-href="$1"><div class="fb-xfbml-parse-ignore"><a href="$1">Loading Facebook post...</a></div></div>')
      .replace(/^https?:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>');

    if ((/<("[^"]*"|'[^']*'|[^'">])*>/).test(html) === false) {
      // $.proxy(this, 'convertBadEmbed', url)();
      return false;
    }


    if (pasted) {
      return this.embed(html, url);
    } else {
      return this.embed(html);
    }
  };


  /**
   * Add html to page
   *
   * @param {string} html
   * @param {string} pastedUrl
   * @return {void}
   */

  embed(html, pastedUrl, info) {
    let el, figure, descriptionContainer, description, metacontainer, container, overlay, lastEl, paragraph;

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
      const lastP = document.createElement('p');
      lastP.appendChild(document.createElement('br'));
      metacontainer.parentNode.appendChild(lastP);
    }

    container.innerHTML = html;

    this._editor.selectElement(metacontainer);

    // console.log(html);
    // this.core.triggerInput();

    if (html.indexOf('facebook') !== -1) {
      if (typeof(FB) !== 'undefined') {
        setTimeout(function() {
          FB.XFBML.parse();
        }, 2000);
      }
    }

    this.options.onInsert && this.options.onInsert(html);

    return true;
  }

  handleBlur() {
    console.log('blur');
    // this.cancelEmbed();
  }

  hidePlaceholder() {
    this.el.removeAttribute('data-placeholder');
    this.el.classList.remove('medium-editor-insert-embeds-placeholder');
  }

  cancelEmbed() {
    this.hidePlaceholder();
    this.el.classList.remove('medium-editor-insert-embeds-active');

    this._plugin.off(document, 'paste', this.instanceHandlePaste);
    this._plugin.off(document, 'keyup', this.instanceHandleKeyUp);
  }

  destroy() {
    this.cancelEmbed();
  }
}