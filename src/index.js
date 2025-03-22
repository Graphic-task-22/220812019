import * as THREE from 'three';
import cube from './mesh/cube';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import sphere from './mesh/sphere';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import plane from './mesh/plane';

console.log(THREE);

let renderer, scene, camera, ambientLight, pointLight;

const gui = new GUI(); // 创建 GUI 实例

// 定义可选材质
const materials = {
  '基础材质': new THREE.MeshBasicMaterial({ color: 'red', transparent: true, opacity: 0.5 }),
  '冯氏材质': new THREE.MeshPhongMaterial({ color: 'green', transparent: true, opacity: 0.5 }),
  '标准材质': new THREE.MeshStandardMaterial({ color: 'blue', roughness: 0.5, metalness: 0.5 }),
  '兰伯特材质': new THREE.MeshLambertMaterial({ color: 'yellow', transparent: true, opacity: 0.5 }),
  '卡通材质': new THREE.MeshToonMaterial({ color: 'purple', transparent: true, opacity: 0.5 }),
  '深度材质': new THREE.MeshDepthMaterial(),
  '法线材质': new THREE.MeshNormalMaterial(),
  '线条基础材质': new THREE.LineBasicMaterial({ color: 'black' }),
  '点材质': new THREE.PointsMaterial({ color: 'orange', size: 5 }),
};

let currentMaterial = materials['基础材质']; // 默认材质

function init(){
  //创建场景
  scene = new THREE.Scene();

  // 添加环境光
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // 创建点光源
  pointLight = new THREE.PointLight(0xffffff, 1, 100); // 白色光，强度为 1，距离为 100
  pointLight.position.set(50, 50, 50); // 设置点光源位置
  scene.add(pointLight);

  // 添加一个辅助网格地面 网格地面辅助观察GridHelper
  const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
  scene.add(gridHelper);

  //创建一个立方体
  cube.material = currentMaterial; // 设置立方体的材质
  scene.add(cube);
  scene.add(sphere);
  scene.add(plane);
  
  //创建相机
  //fov?: number, aspect?: number, near?: number, far?: number
  camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.set(100,100,100);
  camera.lookAt(0,0,0);
  
  //创建渲染器
  renderer=new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.render(scene,camera);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x444444, 1);
  //将渲染器添加到body中
  //document(canvas)
  document.body.appendChild(renderer.domElement);
  initHelper();

  // 添加调节环境光的 GUI 控件
  const lightFolder = gui.addFolder('环境光设置');
  lightFolder.addColor({ color: ambientLight.color.getHex() }, 'color').onChange((value) => {
    ambientLight.color.set(value);
  }).name('颜色');
  lightFolder.add(ambientLight, 'intensity', 0, 2).name('强度');
  lightFolder.open();
  
  // 添加调节点光源的 GUI 控件
  const pointLightFolder = gui.addFolder('点光源设置');
  pointLightFolder.addColor({ color: pointLight.color.getHex() }, 'color').onChange((value) => {
    pointLight.color.set(value);
  }).name('颜色');
  pointLightFolder.add(pointLight, 'intensity', 0, 5).name('强度'); // 调整点光源强度
  pointLightFolder.add(pointLight.position, 'x', -100, 100).name('位置 X'); // 调整点光源 X 位置
  pointLightFolder.add(pointLight.position, 'y', 0, 100).name('位置 Y'); // 调整点光源 Y 位置
  pointLightFolder.add(pointLight.position, 'z', -100, 100).name('位置 Z'); // 调整点光源 Z 位置
  pointLightFolder.open();
  
  // 添加材质选择的 GUI 控件
  const materialFolder = gui.addFolder('材质选择');
  materialFolder.add({材质: '基础材质'}, '材质', Object.keys(materials)).onChange((value) => {
    currentMaterial = materials[value]; // 更新当前材质
    cube.material = currentMaterial; // 应用到立方体
  }).name('选择材质');
  materialFolder.open();
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  console.log('renderer',renderer);
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera); 
  //没有动画的时候需要重新render
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};

function initHelper(){
  // 创建一个坐标轴辅助器
  const axesHelper=new THREE.AxesHelper(100);
  scene.add(axesHelper);

  // 创建一个轨道控制器
  const controls=new OrbitControls(camera,renderer.domElement);
  controls.addEventListener('change',()=>{
    renderer.render(scene,camera);
  });
}

function animate(){
}

function initStats(params){
 
}

init();
initHelper();
initStats();


const obj={
  x:30,
};
gui.add(cube.position,'x',[10, 20, 30, 40, 50]).name('立方体x轴');
gui.add(cube.position,'y',{
  min:-10,
  middle:0,
  max:10,
}).name('立方体y轴');

gui.add(cube.material,'transparent',0.1,2).name('透明度');
gui.add(ambientLight,'intensity').name('环境光强度');
gui.addColor(cube.material,'color').name('立方体颜色');
const positionFolder=gui.addFolder('立方体位置');
positionFolder.add(cube.position,'x',-100, 100).name('立方体x轴');
positionFolder.add(cube.position,'y',-100, 100).name('立方体y轴');
positionFolder.add(cube.position,'z',-100, 100).name('立方体z轴');
console.log('gui',gui);

// 分组、嵌套
const lightFolder=gui.addFolder('灯光');
lightFolder.add(pointLight,'intensity',0,3).name('灯光强度');
lightFolder.add(pointLight,'decay',0,1).name('灯光衰减');
lightFolder.addColor(pointLight,'color').name('灯光颜色');

//执行方法
const settings ={
  clear(){
    gui.children[0].reset();
    console.log('clear');
  },
  setDefault(){
    cube.position.set(0,0,0);
  },
  resetLight(){
    ambientLight.intensity=0;
  },
};
gui.add(settings,'clear').name('清除');
gui.add(settings,'setDefault').name('设置默认');
gui.add(settings,'resetLight').name('重置灯光');
//。gui.add(settings,'x',-100,100).name('立方体x轴');
// 关闭打开菜单
gui.close()
gui.open()