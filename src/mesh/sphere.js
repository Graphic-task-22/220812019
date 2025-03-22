import * as THREE from 'three';

var sphereGeometry=new THREE.SphereGeometry(20,20,20);
var texture = new THREE.TextureLoader().load('./src/assets/earth_lights_2048.png');
var sphereMaterial=new THREE.MeshBasicMaterial({
    // color:'red',
    // side:THREE.DoubleSide,
    // transparent: true,
    // opacity: 0.5,
    map: texture,
});
var sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.set(50,10,0);

export default sphere;
