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
`;

const SnowGlobeCanvas = () => {
  const isClicked = useRef<boolean>(false);
  const glassRadius = 7;
  const glassPosition = new THREE.Vector3(0, glassRadius / 2, 0);
  const { snowBallData } = useContext(SnowBallContext); //컴포넌트인데 useContext사용해도 되나???
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
        message={message.content ?? '비공개메시지입니다'}
        color={message.decoration_color}
        sender={message.sender ?? '비공개'}
        letterID={message.letter_id ?? 0}
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
            color={new THREE.Color(snowBallData.main_decoration_color)}
          />
          <Models.Bottom
            bottomID={1}
            scale={1}
            position={new THREE.Vector3(0, 0, 0)}
            title={'default'}
            color={new THREE.Color('red')}
          />
          {snows}
          {decos}
        </Canvas>
      </CanvasBox>

      <Prev set={'Canvas'} />
    </PrevProvider>
  );
};

export default SnowGlobeCanvas;
