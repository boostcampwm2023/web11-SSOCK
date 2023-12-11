import React, { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CanvasContainer } from '@utils';
import * as Models from './models';
import { Prev } from '../Prev';
import Decos from './Decos';
import { SnowBallData } from '@pages/Visit/SnowBallProvider';
import { PrevProvider } from './PrevProvider';

interface SnowGlobeCanvasProps {
  snowBallData: SnowBallData;
}

const SnowGlobeCanvas = React.memo<SnowGlobeCanvasProps>(
  ({ snowBallData }) => {
    const isClicked = useRef<boolean>(false);
    const glassRadius = 7;
    const glassPosition = new THREE.Vector3(0, glassRadius / 2, 0);

    const snows = Array.from({ length: 100 }, (_, i) => (
      <Models.Snow
        key={i}
        centerPosition={glassPosition}
        rangeRadius={glassRadius}
        radius={0.2 + Math.random() * 0.5}
        model={Math.floor(Math.random() * 3)}
      />
    ));

    return (
      <PrevProvider>
        <CanvasContainer>
          <Canvas
            camera={{
              position: [15, 2, 0],
              fov: 100
            }}
            shadows={true}
          >
            <OrbitControls
              target={new THREE.Vector3(0, 2, 0)}
              enablePan={false}
              enableZoom={false}
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
              position={glassPosition}
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

            <Decos
              centerPosition={new THREE.Vector3(0, glassRadius / 2, 0)}
              radius={glassRadius}
            />
          </Canvas>
        </CanvasContainer>
        <Prev set={'Canvas'} />
      </PrevProvider>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.snowBallData === nextProps.snowBallData;
  }
);

export default SnowGlobeCanvas;
