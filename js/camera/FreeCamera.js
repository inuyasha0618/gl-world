// 固定位置相机
export default class FreeCamera {
    constructor({
        posX = 0,
        posY = 0,
        posZ = 0,
        fovy = 60,
        aspect = 1.0,
        near = 1.0,
        far = 100.0,
    } = {}) {
        this.perspectiveMat = new Matrix4().setPerspective(fovy, aspect, near, far);

        // 由于相机的位姿是会随着操作变化的，故这里需要Transform来管理底层的矩阵操作
        // this.pos = new Transform();
        this.posMat = new Matrix4();
        this.vpMat = new Matrix4();
    }

    updateMatrix() {
        Matrix4.multiply(this.vpMat.reset(), this.perspectiveMat, this.posMat);
        return this;
    }

    getVpMat() {
        this.updateMatrix();
        return this.vpMat;
    }
}