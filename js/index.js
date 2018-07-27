import getGlInstance from './getGlInstance.js';
import { getProgramObj } from './shaderUtils.js';

let gl = getGlInstance('cvs-id').setSize(600, 600).clearColor(0.0, 0.0, 0.0, 1.0).clear();
let program = getProgramObj(gl, 'vertex-shader', 'fragment-shader');

console.log(`program: ${program}`);

gl.useProgram(program);
let positionIndex = gl.getAttribLocation(program, 'a_position');
let vertexBuffer = gl.createBuffer();

let positions = new Float32Array([0.0, 0.0, 0.0]);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionIndex);
gl.vertexAttribPointer(positionIndex, 3, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.POINTS, 0, 1);