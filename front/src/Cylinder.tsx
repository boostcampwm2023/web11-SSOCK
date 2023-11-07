import * as THREE from 'three';

const Cylinder: React.FC = () => {

  const geometry = new THREE.CylinderGeometry(10, 10, 6, 64);
  const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  //const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // basic material은 그림자를 생성하지 않음
  const cylinder = new THREE.Mesh(geometry, material);

  cylinder.position.set(-0.1, -4, 0.4);

  const clickCylinder = () => {
    console.log("cylinder clicked");
  };

  return <primitive onClick={clickCylinder} object={cylinder} />; // primitive는 ?
};

export default Cylinder;
