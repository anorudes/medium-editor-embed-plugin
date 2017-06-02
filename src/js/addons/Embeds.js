export default class Embeds {

	constructor(plugin, options) {
		this._plugin = plugin;
	  this._editor = this._plugin.base;

		this.options = {
			label: '<span class="fa fa-youtube-play"></span>',
			placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter',
      oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1',
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
          clicked: function () {
            // var $event = $.Event('keydown');

            // $event.which = 8;
            // $(document).trigger($event);
          }
        }
      },
      parseOnPaste: false
   	};

		Object.assign(this.options, options);

		this.label = this.options.label;
	}

	handleClick() {
    this.el = this._plugin.getCore().selectedElement;
    this.el.classList.add('medium-editor-insert-embeds-active');
    this.el.classList.add('medium-editor-insert-embeds-placeholder');
    this.el.setAttribute('data-placeholder', this.options.placeholder);

    this.instanceHandlePaste = this.handlePaste.bind(this);
    this.instanceHandleKeyDown = this.handleKeyDown.bind(this);

    this._plugin.on(document, 'paste', this.instanceHandlePaste);
    this._plugin.on(document, 'keydown', this.instanceHandleKeyDown);
    this._plugin.on(this.el, 'blur', this.handleBlur.bind(this));


		this._plugin.getCore().hideButtons();

    // return focus to element, allow user to cancel embed by start writing
    this._editor.elements[0].focus();
    this.el.focus();

    // this._editor.selectElement(this.el);
    // console.log( this._editor.selection );
	}

	handleKeyDown(evt) {
		if (evt.which !== 17 && evt.which !== 91 && evt.which !== 224   // Cmd or Ctrl pressed (user probably preparing to paste url via hot keys)
      && (evt.which === 27 || this._plugin.selectedElement !== this.el)
    ) {
      // Escape
      this.cancelEmbed();
      return false;
		}
    return true;
	}

	handlePaste(evt) {
		const pastedUrl = evt.clipboardData.getData('text');
    const linkRegEx = new RegExp('^(http(s?):)?\/\/','i');
    const linkRegEx2 = new RegExp('^(www\.)?','i');

    if (linkRegEx.test(pastedUrl) || linkRegEx2.test(pastedUrl)) {
      const html = (this.options.oembedProxy)
        ? this.oembed(pastedUrl, true)
        : this.parseUrl(pastedUrl, true);
    }

    this.cancelEmbed();
	}

  /**
   * Get HTML via oEmbed proxy
   *
   * @param {string} url
   * @return {void}
   */

  oembed(url, pasted) {

    const urlOut = this.options.oembedProxy + '&url=' + url;
    const xhr = new XMLHttpRequest();

    console.log(urlOut);
    xhr.open("GET", urlOut, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        this.embed(data.html, url);
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

  embed(html, pastedUrl) {
    let el, figure, figureCaption, metacontainer, container, overlay;

    if (!html) {
      console.error('Incorrect URL format specified: ', pastedUrl);
      return false;
    } 

    el = this._plugin.getCore().selectedElement;
    figure = document.createElement('figure');
    figure.classList.add('medium-editor-insert-embeds-item');
    figureCaption = document.createElement('figcaption');
    figureCaption.classList.add('medium-editor-insert-embeds-caption');
    figureCaption.setAttribute('contenteditable', true);
    figureCaption.setAttribute('data-placeholder', 'Type caption for embed (optional)');

    metacontainer = document.createElement('div');
    metacontainer.classList.add('medium-editor-insert-embeds');
    metacontainer.setAttribute('contenteditable', false);

    container = document.createElement('div');
    container.classList.add('medium-editor-insert-embeds-item-container');

    overlay = document.createElement('div');
    overlay.classList.add('medium-editor-insert-embeds-overlay');

    metacontainer.appendChild(figure);
    figure.appendChild(container);
    figure.appendChild(overlay);

    
    el.replaceWith(metacontainer);


    container.innerHTML = html;


    console.log(html);
    // this.core.triggerInput();

    if (html.indexOf('facebook') !== -1) {
        if (typeof (FB) !== 'undefined') {
            setTimeout(function () {
                FB.XFBML.parse();
            }, 2000);
        }
    }

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
