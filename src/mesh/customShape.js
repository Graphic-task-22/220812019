import * as THREE from 'three';

// 创建西瓜的外层
const outerGeometry = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI); // 半球体
const outerMaterial = new THREE.MeshBasicMaterial({ color: 0x1c6d1c }); // 深绿色
const outerWatermelon = new THREE.Mesh(outerGeometry, outerMaterial);

// 创建西瓜的内层
const innerGeometry = new THREE.SphereGeometry(4.5, 32, 32, 0, Math.PI); // 半球体
const innerMaterial = new THREE.MeshBasicMaterial({ color: 0xff4c4c }); // 红色
const innerWatermelon = new THREE.Mesh(innerGeometry, innerMaterial);

// 创建种子
const seedGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32);
const seedMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // 黑色
const seeds = [];

for (let i = 0; i < 10; i++) {
    const seed = new THREE.Mesh(seedGeometry, seedMaterial);
    seed.rotation.z = Math.random() * Math.PI; // 随机旋转
    seed.position.set(
        (Math.random() - 0.5) * 3, // 随机位置
        (Math.random() - 0.5) * 3,
        Math.random() * 1 - 2 // 在内层西瓜的范围内
    );
    seeds.push(seed);
    innerWatermelon.add(seed); // 将种子添加到内层西瓜
}

// 创建一个组合的网格
const watermelon = new THREE.Group();
watermelon.add(outerWatermelon);
watermelon.add(innerWatermelon);

// 将内层西瓜向下移动以显示切面
innerWatermelon.position.y = -0.5;

export default watermelon;
