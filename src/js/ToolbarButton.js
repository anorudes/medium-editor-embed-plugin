const ToolbarButton = MediumEditor.extensions.button.extend({
  init: function() {
    this.button = this.document.createElement('button');
    this.button.classList.add('medium-editor-action');
    this.button.classList.add(this.className);
    this.button.innerHTML = `<b>${this.label}</b>`;

    this.on(this.button, 'click', this.handleClick.bind(this));
  },

  getButton: function() {
    return this.button;
  },

  handleClick: function(evt) {
    this.onClick(evt);
  }
});

export default ToolbarButton;