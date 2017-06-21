import utils from '../utils';
import Toolbar from '../Toolbar';

export default class Images {

    constructor(plugin, options) {
        this.options = {
            label: '<span class="fa fa-camera"></span>',
            preview: true,
            uploadUrl: 'upload.php',
            deleteUrl: 'delete.php',
            deleteMethod: 'DELETE',
            deleteData: {}
        };

        Object.assign(this.options, options);

        this._plugin = plugin;
        this._editor = this._plugin.base;
        this.elementClassName = 'medium-editor-insert-images';
        this.loadingClassName = 'medium-editor-insert-images-loading';
        this.activeClassName = 'medium-editor-insert-image-active';
        this.descriptionContainerClassName = 'medium-editor-embed-image-description-container';
        this.descriptionClassName = 'medium-editor-embed-image-description';
        this.label = this.options.label;
        this.descriptionPlaceholder = this.options.descriptionPlaceholder;
        this.activeImageElement = null;
        this.initToolbar();
        this.events();
    }

    events() {
        this._plugin.on(document, 'click', this.unselectImage.bind(this));
        this._plugin.on(document, 'keydown', this.handleKey.bind(this));

        this._plugin.getEditorElements().forEach((editor) => {
            this._plugin.on(editor, 'click', this.selectImage.bind(this));
        });
    }

    handleClick() {
        if (this.options.onInsertButtonClick) {
            const uid = utils.generateRandomString();
            this.options.onInsertButtonClick(
                (imageUrl) => this.insertImage(imageUrl, uid),
                (imageUrl) => this.insertImage(imageUrl, uid, true)
            );
        } else {
            this._input = document.createElement('input');
            this._input.type = 'file';
            this._input.multiple = true;
            this._plugin.on(this._input, 'change', this.uploadFiles.bind(this));

            this._input.click();
        }
    }

    initToolbar() {
        console.log('toolb,images:', this.activeClassName);
        this.toolbar = new Toolbar({
            plugin: this._plugin,
            type: 'images',
            activeClassName: this.activeClassName,
            buttons: [
                {
                    name: 'image-align-left',
                    action: 'left',
                    label: 'Left',
                    onClick: (function() {
                        this.changeAlign('align-left');
                    }).bind(this),
                },
                {
                    name: 'image-align-center',
                    action: 'center',
                    label: 'Center',
                    onClick: (function() {
                        this.changeAlign('align-center');
                    }).bind(this),
                },
                {
                    name: 'image-align-right',
                    action: 'right',
                    label: 'Right',
                    onClick: (function() {
                        this.changeAlign('align-right');
                    }).bind(this),
                },
                {
                    name: 'image-align-center-full',
                    action: 'center-full',
                    label: 'Center Full',
                    onClick: (function() {
                        this.changeAlign('align-center-full');
                    }).bind(this),
                },
            ]
        });

        this._editor.extensions.push(this.toolbar);
    }

    changeAlign(className) {
        const el = this.activeImageElement;
        el.classList.remove('align-left', 'align-center', 'align-right', 'align-center-full');
        el.classList.add(className);
    }

    uploadFiles() {
        Array.prototype.forEach.call(this._input.files, (file) => {
            // Generate uid for this image, so we can identify it later
            // and we can replace preview image with uploaded one
            const uid = utils.generateRandomString();

            if (this.options.preview) {
                this.preview(file, uid);
            }

            this.upload(file, uid);
        });
    }

    preview(file, uid) {
        const reader = new FileReader();

        reader.onload = (e) => {
            this.insertImage(e.target.result, uid);
        };

        reader.readAsDataURL(file);
    }

    upload(file, uid) {
        const xhr = new XMLHttpRequest(),
            data = new FormData();
        const insertImage = this.insertImage.bind(this);

        xhr.open("POST", this.options.uploadUrl, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                insertImage(xhr.responseText, utils.generateRandomString());
            }
        };

        data.append("file", file);
        xhr.send(data);
    }

    insertImage(imageUrl, uid, isLoader) {
        const paragraph = this._plugin.getCore().selectedElement;

          // Replace paragraph with div, because figure is a block element
          // and can't be nested inside paragraphs
        if (paragraph.nodeName.toLowerCase() === 'p') {
            const div = document.createElement('div');

            paragraph.parentNode.insertBefore(div, paragraph);
            this._plugin.getCore().selectElement(div);
            paragraph.remove();
        }
        const image = this._plugin.getCore().selectedElement.querySelector(`[data-uid="${uid}"]`);

        if (image) {
            this.replaceImage(image, imageUrl, isLoader);
        } else {
            this.addImage(imageUrl, uid, isLoader);
        }

        this._plugin.getCore().hideButtons();
    }

    addImage(url, uid, isLoader) {
        const el = this._plugin.getCore().selectedElement,
            figure = document.createElement('figure'),
            img = document.createElement('img'),
            descriptionContainer = document.createElement('div'),
            description = document.createElement('figcaption'),
            paragraph = document.createElement('p');

        let domImage;

        img.alt = '';

        if (uid) {
            img.setAttribute('data-uid', uid);
        }

        descriptionContainer.classList.add(this.descriptionContainerClassName);
        description.contentEditable = true;
        description.classList.add(this.descriptionClassName);
        description.dataset.placeholder = this.descriptionPlaceholder;

        // If we're dealing with a preview image,
        // we don't have to preload it before displaying
        if (url.match(/^data:/)) {
            img.src = url;
            figure.appendChild(img);
            el.appendChild(figure);
        } else {
            domImage = new Image();
            domImage.onload = () => {
                img.src = domImage.src;
                if (!isLoader) {
                    img.classList.add(this.activeClassName);
                }
                figure.appendChild(img);
                descriptionContainer.appendChild(description);
                figure.appendChild(descriptionContainer);
                el.appendChild(figure);
                paragraph.innerHTML = '<br>';

                if (!el.nextSibling || !el.nextSibling.nextSibling) {
                    el.parentNode.insertBefore(paragraph, el.nextSibling);
                }
            };

            domImage.src = url;
            if (isLoader) {
                el.classList.add(this.loadingClassName);
            }
        }

        el.classList.add(this.elementClassName);
        el.contentEditable = false;
        el.classList.add('align-center');


        // Return domImage so we can test this function easily
        return domImage;
    }

    replaceImage(image, url, isLoader) {
        const domImage = new Image();
        const el = this._plugin.getCore().selectedElement;

        if (!isLoader) {
            el.classList.remove(this.loadingClassName);
            el.querySelector('img').classList.add(this.activeClassName);
        }


        domImage.onload = () => {
            image.src = domImage.src;
            image.removeAttribute('data-uid');
        };

        domImage.src = url;

        // Return domImage so we can test this function easily
        return domImage;
    }

    selectImage(e) {
        const el = e.target;

        if (el.nodeName.toLowerCase() === 'img' && utils.getClosestWithClassName(el, this.elementClassName)) {
            const parentNode = el.parentNode.parentNode;

            if (!parentNode.classList.contains(this.loadingClassName)) {
                el.classList.add(this.activeClassName);
                parentNode.classList.add(this.activeClassName);
                // TODO: The value is correct, but the medium sometimes change
                this._editor.selectElement(parentNode);
                this.activeImageElement = parentNode;
            }
        }
    }

    unselectImage(e) {
        const el = e.target;
        let clickedImage, images;

        if (el.classList.contains(this.descriptionClassName)) return false;

        // Unselect all selected images. If an image is clicked, unselect all except this one.
        if (el.nodeName.toLowerCase() === 'img' && el.classList.contains(this.activeClassName)) {
            clickedImage = el;
        }

        images = utils.getElementsByClassName(this._plugin.getEditorElements(), this.activeClassName);
        Array.prototype.forEach.call(images, (image) => {
            if (image !== clickedImage) {
                image.classList.remove(this.activeClassName);
            }
        });
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
            this.removeImage(e);
        }
    }

    removeImage(e) {
        const images = utils.getElementsByClassName(this._plugin.getEditorElements(), this.activeClassName),
            selection = window.getSelection();
        let selectedHtml;

        // Remove image even if it's not selected, but backspace/del is pressed in text
        if (selection && selection.rangeCount) {
            const range = MediumEditor.selection.getSelectionRange(document),
                focusedElement = MediumEditor.selection.getSelectedParentElement(range),
                caretPosition = MediumEditor.selection.getCaretOffsets(focusedElement).left;
            let sibling;

            // Is backspace pressed and caret is at the beginning of a paragraph, get previous element
            if (e.which === MediumEditor.util.keyCode.BACKSPACE && caretPosition === 0) {
                sibling = focusedElement.previousElementSibling;
            // Is del pressed and caret is at the end of a paragraph, get next element
            } else if (e.which === MediumEditor.util.keyCode.DELETE && caretPosition === focusedElement.innerText.length) {
                sibling = focusedElement.nextElementSibling;
            }

            if (sibling && sibling.classList.contains('medium-editor-insert-images')) {
                const newImages = sibling.getElementsByTagName('img');
                Array.prototype.forEach.call(newImages, (image) => {
                    images.push(image);
                });
            }

            // If text is selected, find images in the selection
            selectedHtml = MediumEditor.selection.getSelectionHtml(document);
            if (selectedHtml) {
                const temp = document.createElement('div');
                let wrappers, newImages;
                temp.innerHTML = selectedHtml;

                wrappers = temp.getElementsByClassName('medium-editor-insert-images');
                newImages = utils.getElementsByTagName(wrappers, 'img');

                Array.prototype.forEach.call(newImages, (image) => {
                    images.push(image);
                });
            }
        }

        if (images.length) {
            if (!selectedHtml) {
                e.preventDefault();
            }

            images.forEach((image) => {
                const wrapper = utils.getClosestWithClassName(image, 'medium-editor-insert-images');
                this.deleteFile(image.src);

                image.parentNode.remove();

                // If wrapper has no images anymore, remove it
                if (wrapper.childElementCount === 0) {
                    const next = wrapper.nextElementSibling,
                        prev = wrapper.previousElementSibling;

                    wrapper.remove();

                    // If there is no selection, move cursor at the beginning of next paragraph (if delete is pressed),
                    // or nove it at the end of previous paragraph (if backspace is pressed)
                    if (!selectedHtml) {
                        if (next || prev) {
                            if ((next && e.which === MediumEditor.util.keyCode.DELETE) || !prev) {
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

    deleteFile(image) {
        if (this.options.deleteUrl) {
            const xhr = new XMLHttpRequest(),
                data = Object.assign({}, {
                    file: image
                }, this.options.deleteData);

            xhr.open(this.options.deleteMethod, this.options.deleteUrl, true);
            xhr.send(data);
        }
    }

    destroy() {

    }

}
