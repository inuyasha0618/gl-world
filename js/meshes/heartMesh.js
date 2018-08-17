import Mesh from './Mesh.js';
const vertices = [];
const colors = [];
const index = [];

const layers = 500;
const ptsPerLayer = 100;
const radius = 15;
const r2 = radius * radius;
const yInc = 2 * radius / layers;
const thetaInc = 2 * Math.PI / ptsPerLayer;

for (let i = 0; i <= layers; i++) {
    const currY = radius - i * yInc;
    const currRadius = Math.sqrt(r2 - currY * currY);
    for (let j = 0; j < ptsPerLayer; j++) {
        const currTheta = j * thetaInc;
        let x = currRadius * Math.sin(currTheta);
        let y = currY;
        let z = currRadius * Math.cos(currTheta);
        // y += Math.abs(x) * Math.sqrt((20 - Math.abs(x)) / 15);
        y = (y - 4 + Math.abs(x) * Math.sqrt((20 - Math.abs(x)) / 15)) / 1.2;
        // z = z / Math.sqrt(23 - y)
        z = z / (2 - y / 15);
        vertices.push(x, y, z);
        colors.push(1.0, 0.4, 0.4);
    }
}

// 构建索引数组
for (let row = 0; row < layers - 1; row++) {
    for (let col = 0; col < ptsPerLayer; col++) {
        index.push(col + row * ptsPerLayer, col + ( row + 1 ) * ptsPerLayer);
        if (col === ptsPerLayer - 1) {
            // index.push(col + ( row + 1 ) * ptsPerLayer, ( row + 1 ) * ptsPerLayer);
            index.push(row * ptsPerLayer, ( row + 1 ) * ptsPerLayer);
        }
    }
}

const createHeartMesh = gl => new Mesh({
  gl,
  aryVert: vertices,
  aryColor: colors,
  aryInd: index,
  drawMode: gl.TRIANGLE_STRIP,
});

export default createHeartMesh;