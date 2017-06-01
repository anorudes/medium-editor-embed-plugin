# Insert extension for MediumEditor

Vanilla ES2015 (transpiled with Babel) extension for MediumEditor. Extend your favorite editor with images and embeded videos and social media.

No dependencies! Jiiihaaa :tada:

Based on [medium-editor-insert-plugin v3](https://github.com/orthes/medium-editor-insert-plugin/tree/3.0)

## Default usage

```html
<link href="dist/css/medium-editor-insert.css" rel="stylesheet">

<script src="dist/js/medium-editor-insert.js"></script>

<script>
    var editor = new MediumEditor('.editable', {
        extensions: {
            'insert': new MediumEditorInsert()
        }
    });
</script>
```

## New features
 
Call other upload widget, add description for image, description placeholder, loader, float: left, right, center

```js
	var editor = new MediumEditor('.editable', {
            buttonLabels: 'fontawesome',
            extensions: {
            	'insert': new MediumEditorInsert({
                    addons: {
                        images: {
                            descriptionPlaceholder: 'Описание',
                            onInsertButtonClick: function(insertImage, insertLoader) {
                              uploadcare.openDialog(null, {
                                publicKey: pub_key,
                                imagesOnly: true,
                              }).done(function (file) {
                                  if (file) {
                                    insertLoader('./loader.gif');
                                    file.done(function(fileInfo) {
                                      insertImage(fileInfo.cdnUrl);
                                    });
                                  }
                              });
                            },
                        }
                    },
                })
            }
        });
```

## Development

- `npm run build`: Builds everything
- `npm run css`: Builds CSS
- `npm run watch`: Watches for changes in JS and SASS
- `npm test`: Runs ESLint and Karma
