import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei/core/useGLTF';
import { Mesh, Group, Vector3 } from 'three';
import { SENTIMENT_MODEL } from '@constants';

interface SnowProps {
  centerPosition: Vector3;
  rangeRadius: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
}

const randomizePosition = (
  target: Mesh | Group,
  centerPosition: Vector3,
  radius: number
) => {
  const x =
    centerPosition.x +
    (radius / 2) * Math.cos(Math.random() * 2 * Math.PI) -
    0.5;
  const z =
    centerPosition.z +
    (radius / 2) * Math.sin(Math.random() * 2 * Math.PI) -
    0.5;
  const height = centerPosition.y + radius + Math.random() * radius * 2;
  target.position.set(x, height, z);
};

const fallingAnimate = (
  target: Mesh,
  speed: number,
  centerPosition: Vector3,
  radius: number
) => {
  if (target.position.y <= -1) {
    randomizePosition(target, centerPosition, radius);
  }
  target.position.y -= speed;
};

const rotateAnimate = (target: Mesh, speed: number) => {
  target.rotation.y += speed;
};

const visibleInRange = (
  target: Mesh,
  centerPosition: Vector3,
  radius: number
) => {
  target.visible =
    target.position.distanceTo(centerPosition) > radius ? false : true;
};

const Emoji: React.FC<SnowProps> = ({
  centerPosition,
  rangeRadius,
  sentiment,
  confidence
}) => {
  const snowRef = useRef<Mesh>(null);
  const index = sentiment === 'positive' ? 1 : sentiment === 'neutral' ? 2 : 3;
  const snow = useGLTF(SENTIMENT_MODEL[index].fileName).scene.clone();
  const scale = 0.3 + confidence / 200; // min 0.3 max 0.8

  randomizePosition(snow, centerPosition, rangeRadius);

  snow.scale.set(scale, scale, scale);
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
