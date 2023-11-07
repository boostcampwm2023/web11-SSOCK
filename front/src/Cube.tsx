import * as THREE from 'three';

const Cube: React.FC = () => {
  //큐브가 아니라 원기둥 있거든?? cylinder로 바꿔서
  const geometry = new THREE.CylinderGeometry(10, 10, 20, 64);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(-0.1, -0.5, 0.4);
  cube.receiveShadow = true;

  return <primitive object={cube} />;
};

export default Cube;
