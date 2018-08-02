import Transform from './Transform.js';
export default class Modal {
    constructor(meshData) {
        this.mesh = meshData;
        this.transform = new Transform();
    }
}