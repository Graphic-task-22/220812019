import * as THREE from 'three';

// 创建路径
const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60)
]);

// 创建纹理加载器
const loader = new THREE.TextureLoader();
const texture = loader.load('./src/assets/disturb.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(20, 1);
texture.colorSpace = THREE.SRGBColorSpace;

// 创建管道几何体
const geometry = new THREE.TubeGeometry(path, 100, 5, 30);

// 创建材质
const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: texture,
    aoMap: texture,
    transparent: true,
    opacity: 0.8
});

// 创建网格
const mesh = new THREE.Mesh(geometry, material);

// 创建点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(50, 50, 50);
mesh.add(pointLight);

// 启用阴影
mesh.castShadow = true;
pointLight.castShadow = true;

// 导出隧道网格
export default mesh;
