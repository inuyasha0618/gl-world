import Transform from './Transform.js';
export default class Modal {
    constructor(meshData, camera) {
        this.mesh = meshData;
        this.transform = new Transform();
        this.camera = camera
    }

    setScale(x, y, z) {
        this.transform.scale.set(x, y, z);
        return this;
    }
    
    setPosition(x, y, z) {
        this.transform.position.set(x, y, z);
        return this;
    }

    setRotation(x, y, z) {
        this.transform.rotation.set(x, y, z);
        return this;
    }

    addScale(dx, dy, dz) {
        this.transform.scale.x += dx;
        this.transform.scale.y += dy;
        this.transform.scale.z += dz;
        return this;
    }

    addPosition(dx, dy, dz) {
        this.transform.position.x += dx;
        this.transform.position.y += dy;
        this.transform.position.z += dz;
        return this;
    }

    addRotation(dx, dy, dz) {
        this.transform.rotation.x += dx;
        this.transform.rotation.y += dy;
        this.transform.rotation.z += dz;
        return this;
    }

    preRender() {
        this.transform.updateMatrix();
        // TODO: 看看在不同modal里camera是否会有不一致的情况，可能Camera实例作为全局的会更好
        this.camera.updateMatrix();
        return this;
    }
}