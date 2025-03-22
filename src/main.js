// 建立场景
const scene = new THREE.Scene();
// 创建BoxGeometry（立方体）对象
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log(geometry);
// 给一个材质，让它有颜色
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
const cube = new THREE.Mesh(geometry, material);

// 将立方体添加到场景中 默认被添加到 (0,0,0) 坐标
scene.add(cube);

// 创建相机 使用的是 PerspectiveCamera（透视摄像机）
const camera = new THREE.PerspectiveCamera(
    75, // 视野角度（FOV）
    window.innerWidth / window.innerHeight, // 长宽比（aspect ratio）
    0.1, // 近截面（near）
    1000 // 远截面（far）
  );
  // 设置相机摆放的位置
  camera.position.set(200, 200, 200);
  // 设置相机看向的位置
  camera.lookAt(cube.position);


  // WebGLRenderer 渲染器
const renderer = new THREE.WebGLRenderer();
// 渲染器的尺寸

renderer.setSize(window.innerWidth, window.innerHeight);

//  renderer（渲染器）的dom元素（renderer.domElement）添加到 HTML 文档中
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // 立方体旋转
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // 或 cube.rotateY(0.01)
  }
  animate();

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.render(scene, camera); 
    //没有动画的时候需要重新render
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};
