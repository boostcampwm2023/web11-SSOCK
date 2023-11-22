import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import styled from 'styled-components';
import { getDecoPoisition } from '../../utils/position';
import mock from '../../mockdata.json';
import * as Models from './models/index';
import { Prev } from '../Prev';
import { PrevProvider } from './PrevProvider';

const CanvasBox = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
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
    return (
      <Models.Deco
        key={index}
        id={deco.deco_id}
        scale={1}
        position={getDecoPoisition(index)}
        message={deco.content}
        color={deco.deco_color}
        sender={deco.sender}
      />
    );
  });

  return (
    <PrevProvider>
      <CanvasBox>
        <Canvas camera={{ position: [15, 10, 0] }} shadows={true}>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />
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

      <Prev set={'Canvas'} />
    </PrevProvider>
  );
};

export default SnowGlobeCanvas;
