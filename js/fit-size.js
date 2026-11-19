/* global AFRAME */
/**
 * fit-size: scales an entity's content so its largest side equals the given
 * size, centres it, and stands it on y = 0. Downloaded models all come in
 * different units, so this keeps every family's object the same size.
 *
 * Works for a gltf-model (after it loads) or for child primitives.
 */
(function () {
  'use strict';

  const THREE = AFRAME.THREE;

  AFRAME.registerComponent('fit-size', {
    schema: { type: 'number', default: 1 },

    init() {
      if (this.el.hasAttribute('gltf-model')) {
        this.el.addEventListener('model-loaded', () => this.fit());
      } else {
        this.fit(); // child primitives are already built when the parent initialises
      }
    },

    fit() {
      const object = this.el.object3D;
      object.scale.set(1, 1, 1);
      object.position.set(0, 0, 0);
      object.updateMatrixWorld(true);

      // Bounding box in this entity's own space.
      const box = new THREE.Box3().setFromObject(object)
        .applyMatrix4(object.matrixWorld.clone().invert());
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      const scale = this.data / Math.max(size.x, size.y, size.z);

      object.scale.setScalar(scale);
      object.position.set(-centre.x * scale, -box.min.y * scale, -centre.z * scale);
    }
  });
})();
