import * as THREE from 'three';

// 定义自定义形状的轮廓
const shape = new THREE.Shape();
const outerRadius = 6;
const innerRadius = 2;
const points = 5;

for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const xOuter = Math.cos(angle) * outerRadius;
    const yOuter = Math.sin(angle) * outerRadius;
    shape.lineTo(xOuter, yOuter);

    const innerAngle = angle + Math.PI / points;
    const xInner = Math.cos(innerAngle) * innerRadius;
    const yInner = Math.sin(innerAngle) * innerRadius;
    shape.lineTo(xInner, yInner);
}

// 闭合形状
shape.closePath();

// 创建挤出几何体
const extrudeSettings = {
    depth: 2, // 外部厚度
    bevelEnabled: false
};
const outerGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const outerMaterial = new THREE.MeshBasicMaterial({ color: 0xffc0cb }); // 外部颜色
const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);

// 创建中间的隧道
const tunnelHeight = extrudeSettings.depth; // 隧道高度与外部厚度相同
const tunnelGeometry = new THREE.CylinderGeometry(innerRadius, innerRadius, tunnelHeight, 32);
const tunnelMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffc0cb, // 隧道颜色
    transparent: true, // 启用透明
    opacity: 0.5 // 设置透明度（0.0 到 1.0 之间）
});
const tunnelMesh = new THREE.Mesh(tunnelGeometry, tunnelMaterial);

// 将隧道放置在物体的中心
tunnelMesh.position.z = tunnelHeight / 2; // 根据厚度调整位置

// 创建一个组合的网格
const customTunnelMesh = new THREE.Group();
customTunnelMesh.add(outerMesh);
customTunnelMesh.add(tunnelMesh);

// 导出自定义物体
export default customTunnelMesh;
