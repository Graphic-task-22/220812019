import * as THREE from 'three';

// 创建一个立方体
const geometry=new THREE.BoxGeometry(20,20,20);

// 创建一个材质 
const material=new THREE.MeshBasicMaterial({
    color:'red',
    transparent: true, // 设置材质为透明
    opacity: 0.5 // 设置透明度为 50%
});

// 将几何体和材质组合成一个网格
const cube=new THREE.Mesh(geometry,material);

export default cube;
