import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import theme from '../../utils/theme';
import * as THREE from 'three';
import { useRef } from 'react';
import { getDecoPoisition } from '../../utils/position';
import mock from '../../mockdata.json';
import * as Models from './models/index';

const CanvasBox = styled.div`
  margin: auto;
  width: 100vw;
  height: 100vh;
  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }
`;
const SnowGlobeCanvas = () => {
  const isClicked = useRef<boolean>(false);
  const glassRadius = 7;
  const glassPosition = new THREE.Vector3(0, glassRadius / 2, 0);
  const snows = Array.from({ length: 100 }, (_, i) => (
    <Models.Snow
      key={i}
      centerPosition={glassPosition}
      rangeRadius={glassRadius}
      radius={0.05 + Math.random() * 0.15}
    />
  ));
  const decos = mock.snowball[0].message.map((deco, index) => {
    // console.log(deco);
    return (
      <Models.Deco
        key={index}
        id={deco.deco_id}
        scale={1}
        position={getDecoPoisition(index)}
        message={deco.content}
        color={deco.deco_color}
      />
    );
  });

  return (
    <CanvasBox>
      <Canvas camera={{ position: [15, 10, 0] }} shadows={true}>
        <OrbitControls enablePan={false} enableZoom={false} />
        <ambientLight intensity={0.8} color={'#cfcabb'} />
        <directionalLight
          position={[5, 7, 3]}
          intensity={5}
          color={'#e2bb83'}
          castShadow
        />

        <Models.Raycaster isClickedRef={isClicked} />
        <Models.Ground scale={1} position={new THREE.Vector3(0, 0, 0)} />
        <Models.Glass
          position={new THREE.Vector3(0, glassRadius / 2, 0)}
          color={new THREE.Color('skyblue')}
          radius={glassRadius}
          opacity={0.1}
        />
        <Models.MainDeco
          id={mock.snowball[0].main_deco_id}
          scale={1}
          position={new THREE.Vector3(0, 10, 0)}
        />
        <Models.Bottom scale={1} position={new THREE.Vector3(0, 0, 0)} />
        {snows}
        {decos}
      </Canvas>
    </CanvasBox>
  );
};

export default SnowGlobeCanvas;
