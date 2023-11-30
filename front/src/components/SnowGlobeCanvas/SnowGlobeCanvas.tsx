import { useContext, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import styled from 'styled-components';
import { getDecoPoisition } from '../../utils/position';
import * as Models from './models/index';
import { Prev } from '../Prev';
import { PrevProvider } from './PrevProvider';
import { SnowBallContext } from '../../pages/Visit/SnowBallProvider';
import theme from '../../utils/theme';

const CanvasBox = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
  background-color: ${theme.colors['--primary-black']};
  //background-image: radial-gradient(#000000, transparent 80%, #adadad);
  //background-image: url('./img/back4.png');
  //background-size: 100%;
`;

const SnowGlobeCanvas = () => {
  const isClicked = useRef<boolean>(false);
  const glassRadius = 7;
  const glassPosition = new THREE.Vector3(0, glassRadius / 2, 0);
  const { snowBallData } = useContext(SnowBallContext);
  console.log(snowBallData, 'canvas render');
  const snows = Array.from({ length: 100 }, (_, i) => (
    <Models.Snow
      key={i}
      centerPosition={glassPosition}
      rangeRadius={glassRadius}
      radius={0.3 + Math.random() * 0.7}
      model={Math.floor(Math.random() * 3)}
    />
  ));

  const decos = snowBallData.message_list.map((message, index) => {
    return (
      <Models.Deco
        key={index}
        id={message.decoration_id}
        scale={1}
        position={getDecoPoisition(message.location)}
        message={message.content}
        color={message.decoration_color}
        sender={message.sender}
        letterID={message.letter_id}
      />
    );
  });

  return (
    <PrevProvider>
      <CanvasBox>
        <Canvas camera={{ position: [15, 10, 0] }} shadows={true}>
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />
          <ambientLight intensity={1} color={'#cfcabb'} />
          <directionalLight
            position={[5, 7, 3]}
            intensity={2}
            color={'#f1e0c8'}
            castShadow
          />
          <directionalLight
            position={[5, 7, -3]}
            intensity={2}
            color={'#f1e0c8'}
            castShadow
          />
          <directionalLight
            position={[-5, 7, 0]}
            intensity={2}
            color={'#f1e0c8'}
            castShadow
          />

          <Models.Raycaster isClickedRef={isClicked} />
          <Models.Ground scale={1} position={new THREE.Vector3(0, 0, 0)} />
          <Models.Glass
            position={new THREE.Vector3(0, glassRadius / 2, 0)}
            color={new THREE.Color('white')}
            radius={glassRadius}
            opacity={0.08}
          />
          <Models.MainDeco
            id={0}
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
