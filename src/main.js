import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

//创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 20);
camera.lookAt(scene.position);

//创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 加载贴图
const textureLoader = new THREE.TextureLoader();
const roofTexture = textureLoader.load('./textures/roof.jpg');
const groundTexture = textureLoader.load('./textures/terrain.webp');

// 天空盒
const exrLoader = new EXRLoader();
exrLoader.load('./skybox/citrus.exr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment =texture; //用于反射/光照
  scene.background = texture; // 设置场景背景为天空盒
});

const house = new THREE.Group();
scene.add(house);

function initHouse() {
    createGround();
    createFloor();
    createSideWall();
    createSideWall().position.z = 295;
    createRoof();
    createFrontWall();
    createBackWall();
    createWindow();
    createDoor();
    const roof2 = createRoof();
    roof2.rotation.x = Math.PI / 2;
    roof2.rotation.y = (Math.PI / 4) * 0.6;
    roof2.position.y = 125;
    roof2.position.x = -50;
    roof2.position.z = 150;
    scene.add(roof2);
  }
  
  initHouse();
  

// 地面
function createGround() {
    // 创建一个平面几何体
    const geometry = new THREE.PlaneGeometry(10000, 10000);
    // 加载地面纹理
    const texture = textureLoader.load('./textures/terrain.webp');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // 设置纹理重复次数
    texture.repeat.set(100, 100);
    // 创建草地材质
    const grassMaterial = new THREE.MeshStandardMaterial({ map: texture });
    // 创建草地网格
    const grass = new THREE.Mesh(geometry, grassMaterial);
    // 设置草地旋转
    grass.rotation.x = -Math.PI / 2;
    // 添加草地到场景
    scene.add(grass);
    return grass;
}

// 创建地板
function createFloor() {
    // 创建一个平面几何体
    const geometry = new THREE.PlaneGeometry(200, 300);
    // 加载地面纹理
    const texture = new THREE.TextureLoader().load('./textures/wall.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    const floorMaterial = new THREE.MeshStandardMaterial({ map: texture });
    const floor = new THREE.Mesh(geometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 1;
    floor.position.z = 150;
    // 添加地板到房间
    house.add(floor);
}

function createSideWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-100, 0);
    shape.lineTo(100, 0);
    shape.lineTo(100, 100);
    shape.lineTo(0, 150);
    shape.lineTo(-100, 100);
    shape.lineTo(-100, 0);
    const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: 5
    });
    const wallTexture = textureLoader.load('./textures/wall.png');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(0.01, 0.005);
    const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

    const wall = new THREE.Mesh(extrudeGeometry, wallMaterial);
    house.add(wall);
    return wall;
}

// 前面墙的方法
function createFrontWall() {
    // 创建形状
    const shape = new THREE.Shape();
    shape.moveTo(-150, 0);
    shape.lineTo(150, 0);
    shape.lineTo(150, 100);
    shape.lineTo(-150, 100);
    shape.lineTo(-150, 0);
    // 创建窗户
    const window = new THREE.Path();
    window.moveTo(30, 30)
    window.lineTo(80, 30)
    window.lineTo(80, 80)
    window.lineTo(30, 80);
    window.lineTo(30, 30);
    // 形状上的孔洞
    shape.holes.push(window);
 
    // 创建门
    const door = new THREE.Path();
    door.moveTo(-30, 0)
    door.lineTo(-30, 80)
    door.lineTo(-80, 80)
    door.lineTo(-80, 0);
    door.lineTo(-30, 0);
    // 形状上的孔洞
    shape.holes.push(door);
    // 挤压缓冲几何体
    const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: 5
    })
    // 贴图
    const texture = new THREE.TextureLoader().load('./textures/wall.png');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(0.01, 0.005);
    // 基础网格材质
    const material = new THREE.MeshBasicMaterial({ map: texture });
    // 网格
    const frontWall = new THREE.Mesh(extrudeGeometry, material);
 
    frontWall.position.z = 150;
    frontWall.position.x = 95;
    frontWall.rotation.y = Math.PI * 0.5;
    // 前墙添加到房间
    house.add(frontWall);
}

// 窗户修饰
function createWindow() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 50)
    shape.lineTo(50, 50)
    shape.lineTo(50, 0);
    shape.lineTo(0, 0);

    const hole = new THREE.Path();
    hole.moveTo(5, 5)
    hole.lineTo(5, 45)
    hole.lineTo(45, 45)
    hole.lineTo(45, 5);
    hole.lineTo(5, 5);
    shape.holes.push(hole);

    const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: 5
    });

    const extrudeMaterial = new THREE.MeshBasicMaterial({ color: 'silver' });

    const windowMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial); // ✅ 改名
    windowMesh.rotation.y = Math.PI / 2;
    windowMesh.position.y = 30;
    windowMesh.position.x = 95;
    windowMesh.position.z = 120;

    house.add(windowMesh);

    return windowMesh;
}
// 门修饰
function createDoor() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 80);
    shape.lineTo(50, 80);
    shape.lineTo(50, 0);
    shape.lineTo(0, 0);
 
    const hole = new THREE.Path();
    hole.moveTo(5, 5);
    hole.lineTo(5, 75);
    hole.lineTo(45, 75);
    hole.lineTo(45, 5);
    hole.lineTo(5, 5);
    shape.holes.push(hole);
    // 挤压缓冲几何体
    const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: 5
    });
    // 基础网格材质
    const material = new THREE.MeshBasicMaterial({ color: 'silver' });
 
    const door = new THREE.Mesh(extrudeGeometry, material);
 
    door.rotation.y = Math.PI / 2;
    door.position.y = 0;
    door.position.x = 95;
    door.position.z = 230;
 
    house.add(door);
}

// 创建后墙方法
function createBackWall() {
    // 创建形状
    const shape = new THREE.Shape();
    shape.moveTo(-150, 0)
    shape.lineTo(150, 0)
    shape.lineTo(150, 100)
    shape.lineTo(-150, 100);
    // 挤压缓冲几何体
    const extrudeGeometry = new THREE.ExtrudeGeometry(shape)
    // 贴图
    const texture = new THREE.TextureLoader().load('./textures/wall.png');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(0.01, 0.005);
    // 基础网格材质
    const material = new THREE.MeshBasicMaterial({ map: texture });
    // 网格
    const backWall = new THREE.Mesh(extrudeGeometry, material);
 
    backWall.position.z = 150;
    backWall.position.x = -100;
    backWall.rotation.y = Math.PI * 0.5;
    // 后墙添加到房间中
    house.add(backWall);
}

// 创建屋顶方法
function createRoof() {
    // 立方缓冲几何体
    const geometry = new THREE.BoxGeometry(120, 320, 5);
 
    const texture = new THREE.TextureLoader().load('./textures/roof.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 1);
    texture.rotation = Math.PI / 2;
    // 基础网格材质 - 瓦片
    const textureMaterial = new THREE.MeshBasicMaterial({ map: texture });
    // 基础网格材质 - 其他
    const colorMaterial = new THREE.MeshBasicMaterial({ color: 'grey' });
 
    const materials = [
        colorMaterial,
        colorMaterial,
        colorMaterial,
        colorMaterial,
        colorMaterial,
        textureMaterial
    ];
 
    const roof = new THREE.Mesh(geometry, materials);
 
    house.add(roof);
 
    roof.rotation.x = Math.PI / 2;
    roof.rotation.y = - Math.PI / 4 * 0.6;
    roof.position.y = 125;
    roof.position.x = 50;
    roof.position.z = 150;
 
    return roof;
}

// 灯光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

// 控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// 创建 GUI 控制器
const gui = new GUI();

// 环境光控制器
const ambientFolder = gui.addFolder('环境光');
const ambientSettings = {
  color: ambientLight.color.getHex(),
  intensity: ambientLight.intensity
};
ambientFolder.addColor(ambientSettings, 'color').onChange((value) => {
  ambientLight.color.set(value);
});
ambientFolder.add(ambientSettings, 'intensity', 0, 2).step(0.01).onChange((value) => {
  ambientLight.intensity = value;
});
ambientFolder.open();

// 方向光控制器
const dirFolder = gui.addFolder('方向光');
const dirSettings = {
  color: dirLight.color.getHex(),
  intensity: dirLight.intensity,
  x: dirLight.position.x,
  y: dirLight.position.y,
  z: dirLight.position.z
};
dirFolder.addColor(dirSettings, 'color').onChange((value) => {
  dirLight.color.set(value);
});
dirFolder.add(dirSettings, 'intensity', 0, 2).step(0.01).onChange((value) => {
  dirLight.intensity = value;
});
dirFolder.add(dirSettings, 'x', -50, 50).onChange((value) => {
  dirLight.position.x = value;
});
dirFolder.add(dirSettings, 'y', -50, 50).onChange((value) => {
  dirLight.position.y = value;
});
dirFolder.add(dirSettings, 'z', -50, 50).onChange((value) => {
  dirLight.position.z = value;
});
dirFolder.open();


// 窗口大小自适应
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
