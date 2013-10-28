/**
 * A marionette plugin for marking elements and click events.
 *
 *     // The options param with default value.
 *     var options = {
 *       cursorDiamter: 37,
 *       cursorOpacity: 0.5,
 *       cursorColor: 'gray'
 *     };
 *
 * @param {Marionette.Client} client Marionette client to use.
 * @param {Object} options map of attributes for the Apps.
 */
function MarionetteMarker(client, options) {
  this.client = client;
  this.options = options;
}

module.exports = MarionetteMarker;

/**
 * Make a new MarionetteMarker.
 *
 * @param {Marionette.Client} client Marionette client to use.
 * @param {Object} options map of attributes for the plugin.
 * @return {Apps} instance.
 */
MarionetteMarker.setup = function(client, options) {
  return new MarionetteMarker(client, options);
};

MarionetteMarker.prototype = {
  /**
   * Set a cursor in thr testing runner.
   * When marionette click somewhere in a page,
   * the cursor will be showed there.
   */
  setupCursor: function() {
    this.client.executeScript(function(options) {
      const DEFAULT_CURSOR_DIAMETER = 37,
            DEFAULT_CURSOR_OPACITY = 0.5,
            DEFAULT_CURSOR_COLOR = 'gray';
      var document = window.wrappedJSObject.document,
          dimeter = DEFAULT_CURSOR_DIAMETER,
          opacity = DEFAULT_CURSOR_OPACITY,
          color = DEFAULT_CURSOR_COLOR,
          cursorElement = document.createElement('div');

      if (options) {
        dimeter = options.cursorDiamter || DEFAULT_CURSOR_DIAMETER;
        opacity = options.cursorOpacity || DEFAULT_CURSOR_OPACITY;
        color = options.cursorColor || DEFAULT_CURSOR_COLOR;
      }

      cursorElement.style.cssText =
        [
          // Let marionette could click the area under the cursor.
          'pointer-events: none;',
          'width: ', dimeter, 'px;',
          'height: ', dimeter, 'px;',
          'background: ', color, ';',
          'opacity: ', opacity, ';',
          'border-radius: ', dimeter / 2, 'px;',
          'position: absolute;',
          'display: none'
        ].join('');
      document.
        querySelector('body').
        appendChild(cursorElement);

      // We would like to show the cursor first,
      // then the marionette do the click.
      // XXX: But we cannot control the event delivery model for
      //      setting the delay time of triggering a event listener.
      //      How to fix the "show the cursor first" issue?
      document.querySelector('body').addEventListener('click', function(event) {
        var x = event.clientX - dimeter / 2,
            y = event.clientY - dimeter / 2;
        cursorElement.style.display = 'block';
        cursorElement.style.left = x + 'px';
        cursorElement.style.top = y + 'px';
      }, true);
    }, [this.options]);
  },

  /**
   * TODO: Could mark a element with colorful border.
   *
   * @param {Marionette.Element} element \
   *        A element would like to be with a border.
   */
  mark: function(element) {}
};
