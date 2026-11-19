/* global AFRAME */
/**
 * text-hit-area: gives an <a-text> an invisible rectangle matching its rendered
 * text, so taps anywhere on a label register. Without it the raycaster only hits
 * the individual glyph shapes, and taps between letters are missed.
 *
 * The rectangle is re-fitted whenever the text value or layout changes.
 */
(function () {
  'use strict';

  const THREE = AFRAME.THREE;
  const PADDING = 0.04; // scene units added around the text on every side

  AFRAME.registerComponent('text-hit-area', {
    init() {
      this.box = new THREE.Box3();
      this.size = new THREE.Vector3();
      this.center = new THREE.Vector3();
      this.fittedFor = null;

      this.hitArea = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      this.el.setObject3D('hitArea', this.hitArea);
    },

    remove() {
      this.el.removeObject3D('hitArea');
      this.hitArea.geometry.dispose();
      this.hitArea.material.dispose();
    },

    tick() {
      const textMesh = this.el.getObject3D('text');
      const position = textMesh && textMesh.geometry.getAttribute('position');
      if (!position || position.count === 0) return; // font still loading

      const text = this.el.getAttribute('text');
      const signature = `${text.value}|${text.width}|${text.align}|${position.version}|${position.count}`;
      if (signature === this.fittedFor) return;
      this.fittedFor = signature;

      textMesh.geometry.computeBoundingBox();
      textMesh.updateMatrix();
      this.box.copy(textMesh.geometry.boundingBox).applyMatrix4(textMesh.matrix);
      this.box.getSize(this.size);
      this.box.getCenter(this.center);

      this.hitArea.position.set(this.center.x, this.center.y, 0);
      this.hitArea.scale.set(this.size.x + 2 * PADDING, this.size.y + 2 * PADDING, 1);
    }
  });
})();
