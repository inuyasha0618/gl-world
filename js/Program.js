// 通用的业务无关的program逻辑，如需具体定制program需要继承它

import { createProgramFromShaderSource, getStandardUniformLocations } from './shaderUtils.js';
import { 
    ATTR_POSITION_NAME,
    ATTR_POSITION_LOC,
    ATTR_NORMAL_NAME,
    ATTR_NORMAL_LOC,
    ATTR_UV_NAME,
    ATTR_UV_LOC,
    ATTR_COLOR_LOC,
    ATTR_COLOR_NAME,
} from './attrConfig.js'

export default class Program {
    constructor(gl, vertexShaderSrc, fragShaderSrc) {
        this.gl = gl;
        this.program = createProgramFromShaderSource(gl, vertexShaderSrc, fragShaderSrc);
        gl.useProgram(this.program);
        this.uniformLocation = {};
        this.uniformLoc = this.getStandardUniformLocations();
    }

    // 一个program是与特定的两个shader相关联的，而uniform变量名都是每个shader相关联的，故把getStandardUniformLocations放在这里
    // Todo: program应作为一个基类， 具体的业务program应继承于它，并且重写getStandardUniformLocations
    getStandardUniformLocations() {
        return {
            perspective:	this.gl.getUniformLocation(this.program,"uPMatrix"),
            modalMatrix:	this.gl.getUniformLocation(this.program,"uModelMatrix"),
            cameraMatrix:	this.gl.getUniformLocation(this.program,"uCameraMatrix"),
            mainTexture:	this.gl.getUniformLocation(this.program,"uMainTex"),
            mvpMatrix:      this.gl.getUniformLocation(this.program,"uMVPMatrix"),
            vpMatrix:      this.gl.getUniformLocation(this.program,"uVPMatrix"),
        };
    }

    activate() {
        this.gl.useProgram(this.program);
        return this;
    }

    deactivate() {
        this.gl.useProgram(null);
        return this;
    }

    setModalMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.modalMatrix, false, mat.raw);
        return this;
    }

    setVPMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.vpMatrix, false, mat.raw);
        return this;
    }

    setMvpMatrix(mat) {
        this.gl.uniformMatrix4fv(this.uniformLoc.mvpMatrix, false, mat.raw);
        return this;
    }

    renderModal(modal) {
        modal.preRender();
        const { mesh, transform, camera } = modal;
        this.setVPMatrix(camera.getVpMat())
        this.setModalMatrix(transform.getTransMat());
        // TODO: set mvp
        this.gl.bindVertexArray(mesh.vao);
        if (mesh.indexCount) {
            this.gl.drawElements(mesh.drawMode, mesh.indexCount, this.gl.UNSIGNED_SHORT, 0);
        } else {
            this.gl.drawArrays(mesh.drawMode, 0, mesh.vertexCount);
        }
        this.gl.bindVertexArray(null);
        return this;
    }
}