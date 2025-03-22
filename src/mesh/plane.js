import * as THREE from 'three';

const uvs = new Float32Array([
    0,0,
    0,1,
    1,0,
    1,1,
]);

const geometry = new THREE.PlaneGeometry(200,100,100,100);
const texture = new THREE.TextureLoader().load('./src/assets/earth_lights_2048.png');
geometry.setAttribute('aUv', new THREE.BufferAttribute(uvs, 2));
const material = new THREE.MeshBasicMaterial({
    // color: 0x00ff00,
    // opacity: 0.8,
    // transparent: true,
    map: texture,
});
const plane = new THREE.Mesh(geometry, material);

export default plane;
