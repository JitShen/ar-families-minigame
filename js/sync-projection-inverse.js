/* global AFRAME */
/**
 * sync-projection-inverse: keeps camera.projectionMatrixInverse in step with
 * camera.projectionMatrix.
 *
 * AR.js overwrites the camera's projectionMatrix with the calibrated webcam
 * projection but does not update its inverse. three.js builds the cursor's
 * mouse/touch ray from that inverse, so without this fix taps land offset from
 * the text the player actually sees.
 */
(function () {
  'use strict';

  AFRAME.registerComponent('sync-projection-inverse', {
    tick() {
      const camera = this.el.camera;
      if (camera) {
        camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
      }
    }
  });
})();
