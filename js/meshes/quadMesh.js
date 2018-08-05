import Mesh from './Mesh.js';
const vertices = [   // Vertex coordinates
    -1.0, 1.0, 0.0,  -1.0, -1.0, 0.0,  1.0, -1.0, 0.0,   1.0, 1.0, 0.0,  // v0-v1-v2-v3 front
 ];


 const indices = [       // Indices of the vertices
    0, 1, 2,   0, 2, 3,    // front
 ];

 const uvs = [0.0, 0.0,  0.0, 1.0,  1.0, 1.0,  1.0, 0.0];


 const createQuadMesh = gl => new Mesh({
  gl,
  aryVert: vertices,
  aryInd: indices,
  aryUV: uvs,
  drawMode: gl.TRIANGLES,
  enableBlending: true,
 });

 export default createQuadMesh;