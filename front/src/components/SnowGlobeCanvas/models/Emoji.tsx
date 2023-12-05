import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SENTIMENT_MODEL } from '@constants';

interface SnowProps {
  centerPosition: THREE.Vector3;
  rangeRadius: number;
  sentiment: string;
}

const randomizePosition = (
  target: THREE.Mesh,
  centerPosition: THREE.Vector3,
  radius: number
) => {
  //변경필요
  target.position.set(
    centerPosition.x - 3 + Math.random() * 6,
    centerPosition.y + radius + Math.random() * radius * 2,
    centerPosition.z - 3 + Math.random() * 6
  );
};

const fallingAnimate = (
  target: THREE.Mesh,
  speed: number,
  centerPosition: THREE.Vector3,
  radius: number
) => {
  if (target.position.y <= -1) {
    randomizePosition(target, centerPosition, radius);
    //const newScale = 0.2 + Math.random() * 0.5;
    //target.scale.set(newScale, newScale, newScale);
  }
  target.position.y -= speed;
};

const rotateAnimate = (target: THREE.Mesh, speed: number) => {
  target.rotation.y += speed;
};

const visibleInRange = (
  target: THREE.Mesh,
  centerPosition: THREE.Vector3,
  radius: number
) => {
  target.visible =
    target.position.distanceTo(centerPosition) > radius ? false : true;
};

const Emoji: React.FC<SnowProps> = ({
  centerPosition,
  rangeRadius,
  sentiment
}) => {
  const snowRef = useRef<THREE.Mesh>(null);
  const position = new THREE.Vector3(
    centerPosition.x - rangeRadius + Math.random() * rangeRadius * 2,
    centerPosition.y + rangeRadius + Math.random() * rangeRadius * 2,
    centerPosition.z - rangeRadius + Math.random() * rangeRadius * 2
  );
  const index = sentiment === 'positive' ? 1 : sentiment === 'neutral' ? 2 : 3;
  const snow = useGLTF(SENTIMENT_MODEL[index].fileName).scene.clone();

  snow.scale.set(0.7, 0.7, 0.7);
  snow.position.set(position.x, position.y, position.z);
  snow.rotation.y = Math.random();

  useFrame((_, delta) => {
    const snow = snowRef.current;
    const speed = 1 * delta;
    if (snow) {
      fallingAnimate(snow, speed, centerPosition, rangeRadius);
      rotateAnimate(snow, speed);
      visibleInRange(snow, centerPosition, rangeRadius - 1);
    }
  });

  return <primitive object={snow} ref={snowRef} />;
};

export default Emoji;
