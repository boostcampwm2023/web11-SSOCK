import { useContext, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CanvasContainer, getDecoPoisition } from '@utils';
import * as Models from './models';
import { Prev } from '../Prev';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';
import { PrevProvider } from './PrevProvider';

const SnowGlobeCanvas = () => {
  const isClicked = useRef<boolean>(false);
  const glassRadius = 7;
  const glassPosition = new THREE.Vector3(0, glassRadius / 2, 0);
  const { snowBallData } = useContext(SnowBallContext);

  const snows = Array.from({ length: 100 }, (_, i) => (
    <Models.Snow
      key={i}
      centerPosition={glassPosition}
      rangeRadius={glassRadius}
      radius={0.2 + Math.random() * 0.5}
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
        isOpened={message.opened !== null || message.opened !== 'null'}
      />
    );
  });
  const sentiments = snowBallData.message_list.map((message, i) => (
    <Models.Emoji
      key={i}
      centerPosition={glassPosition}
      rangeRadius={glassRadius}
      sentiment={message.sentiment}
    />
  ));
  return (
    <PrevProvider>
      <CanvasContainer>
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
            opacity={0.1}
          />
          <Models.MainDeco
            id={snowBallData.main_decoration_id}
            scale={1}
            position={new THREE.Vector3(0, 10, 0)}
            color={snowBallData.main_decoration_color}
          />
          <Models.Bottom
            bottomID={snowBallData.bottom_decoration_id}
            scale={1}
            position={new THREE.Vector3(0, 0, 0)}
            title={snowBallData.title}
            color={new THREE.Color(snowBallData.bottom_decoration_color)}
          />
          {snows}
          {decos}
          {sentiments}
        </Canvas>
      </CanvasContainer>

      <Prev set={'Canvas'} />
    </PrevProvider>
  );
};

export default SnowGlobeCanvas;
