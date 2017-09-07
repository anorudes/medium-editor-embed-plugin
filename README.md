# Insert extension for MediumEditor +

Vanilla ES2015 (transpiled with Babel) extension for MediumEditor. Extend your favorite editor with images and embeded videos and social media.

No dependencies! Jiiihaaa :tada:

Based on [medium-editor-insert-plugin v3](https://github.com/orthes/medium-editor-insert-plugin/tree/3.0)

## New features
in comparison with [medium-editor-insert-plugin v3](https://github.com/orthes/medium-editor-insert-plugin/tree/3.0)

- Call other upload widget if you need
- Add video embed
- Add any html content
- Correct deletion on delete and backspace key
- Add description for image
- Show loading while image uploading
- Align image, embed, html content (left, center, right)
- Auto focus inserted image, embed, html content
- Auto paragraph insertion before image, embed, html content on enter key

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

Full example with [uploadcare](https://uploadcare.com/documentation/widget/) for image:
```js
	var editor = new MediumEditor('.editable', {
            buttonLabels: 'fontawesome',
            extensions: {
            	'insert': new MediumEditorInsert({
                    addons: {
                        images: {
                            descriptionPlaceholder: 'Описание', // placeholder for description field
                            onInsertButtonClick: function(insertImage, insertLoader) {
                              uploadcare.openDialog(null, {
                                publicKey: 'your_uploadcare_pub_key',
                                imagesOnly: true,
                              }).done(function (file) {
                                  if (file) {
                                    insertLoader('./loader.gif'); // insert loader
                                    file.done(function(fileInfo) {
                                      insertImage(fileInfo.cdnUrl); // replace loader with uploaded image in uploadcare (you can use other service)
                                    });
                                  }
                              });
                            },
                            embeds: {
                                oembedProxy: '//iframe.ly/api/oembed?&api_key=' + IFRAMELY_API_KEY
                            },
                            html: {
                              contentHTML: `
                                <div>Test content for widget</div>
                              `,
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
