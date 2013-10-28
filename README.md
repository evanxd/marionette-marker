# marionette-marker

A marionette plugin for marking elements and click events.

## Usage

Setup marionette-marker in the marionette.
```js
marionette.plugin('marker', require('marionette-marker'));
```

Show the cursor in the test runner(B2G desktop client).
```js
// Setup in the setup function of tests,
// after you launch an App.
setup(function() {
  client.apps.launch(APP_URL);
  client.apps.switchToApp(APP_URL);
  // wait for the document body to know we're really launched
  client.helper.waitForElement('body');
  client.marker.setupCursor();
});
```
