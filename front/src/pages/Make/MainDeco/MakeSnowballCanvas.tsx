import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import styled from 'styled-components';
import { DecoContext } from './DecoProvider';
import { useContext } from 'react';
import * as Models from '../../../components/SnowGlobeCanvas/models';
import * as THREE from 'three';

const CanvasContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const MainSnowballCavnas = () => {
  const { snowballName, mainDecoID, mainColor, bottomID, bottomColor } =
    useContext(DecoContext);
  const glassRadius = 7;
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [25, 0, 0] }}>
        <OrbitControls />
        <ambientLight intensity={1} position={[5, 5, 0]} />
        <directionalLight
          position={[5, 7, 3]}
          intensity={5}
          color={'#e2bb83'}
        />
        <Models.Glass
          position={new THREE.Vector3(0, glassRadius / 2, 0)}
          radius={glassRadius}
          color={new THREE.Color('white')}
          opacity={0.1}
        />
        <Models.Ground scale={1} position={new THREE.Vector3(0, 0, 0)} />
        <Models.MainDeco
          id={mainDecoID}
          scale={1}
          position={new THREE.Vector3(0, 0, 0)}
        />
        <Models.Bottom
          scale={1}
          position={new THREE.Vector3(0, 0, 0)}
          bottomID={bottomID}
          title={snowballName}
          color={new THREE.Color(bottomColor)}
        />
        {/* <MainModel /> */}
      </Canvas>
    </CanvasContainer>
  );
};

export default MainSnowballCavnas;
