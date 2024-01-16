import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { Canvas } from '@react-three/fiber';
import { useRecoilValue } from 'recoil';
import { Color, Vector3 } from 'three';
import { CanvasContainer } from '@utils';
import { MakeDecoRecoil } from '@states';
import * as Models from '@components/SnowGlobeCanvas/models';

const MainSnowballCavnas = () => {
  const { snowballName, mainDecoID, mainColor, bottomID, bottomColor } =
    useRecoilValue(MakeDecoRecoil);
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
          position={new Vector3(0, glassRadius / 2, 0)}
          radius={glassRadius}
          color={new Color('white')}
          opacity={0.1}
        />
        <Models.Ground scale={1} position={new Vector3(0, 0, 0)} />
        <Models.MainDeco
          id={mainDecoID}
          scale={1}
          position={new Vector3(0, 0, 0)}
          color={mainColor}
        />
        <Models.Bottom
          scale={1}
          position={new Vector3(0, 0, 0)}
          bottomID={bottomID}
          title={snowballName}
          color={new Color(bottomColor)}
        />
      </Canvas>
    </CanvasContainer>
  );
};

export default MainSnowballCavnas;
