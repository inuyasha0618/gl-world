import getGlInstance from './getGlInstance.js';
import { getProgramObj } from './shaderUtils.js';
import RenderLoop from './RenderLoop.js';

let gl = getGlInstance('cvs-id').setSize(600, 600).clearColor(0.0, 0.0, 0.0, 1.0).clear();
let program = getProgramObj(gl, 'vertex-shader', 'fragment-shader');

console.log(`program: ${program}`);

gl.useProgram(program);
const positionIndex = gl.getAttribLocation(program, 'a_position');
let vertexBuffer = gl.createBuffer();

let positions = new Float32Array([0.0, 0.0, 0.0]);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionIndex);
gl.vertexAttribPointer(positionIndex, 3, gl.FLOAT, false, 0, 0);

const uAngleIndex = gl.getUniformLocation(program, 'u_angle');
const uPointSizeIndex = gl.getUniformLocation(program, 'u_pointsize');

const drawPoint = ((rotSpeed, shrinkSpeed = 10, pointSize=10.0, angle=0) => dt => {
    let incAngle = rotSpeed * Math.PI / 180.0 * dt;
    angle += incAngle;
    pointSize += shrinkSpeed * dt;
    let size = 20 + 10 * Math.sin(pointSize);
    gl.uniform1f(uAngleIndex, angle);
    gl.uniform1f(uPointSizeIndex, size);
    gl.clear();
    gl.drawArrays(gl.POINTS, 0, 1);
})(90);

const RLoop = new RenderLoop(drawPoint).start();

const btn = document.getElementById('btn');
btn.addEventListener('click', function() {
    if (RLoop.isActive) {
        RLoop.stop();
        btn.innerHTML = 'start';
        return;
    }

    btn.innerHTML = 'stop';
    RLoop.start();
})