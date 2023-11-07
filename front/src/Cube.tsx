import * as THREE from 'three';

const Cube: React.FC = () => {
  const geometry = new THREE.BoxGeometry(6, 1, 6);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(-0.1, -0.5, 0.4);
  cube.receiveShadow = true;

  return <primitive object={cube} />;
};

export default Cube;
