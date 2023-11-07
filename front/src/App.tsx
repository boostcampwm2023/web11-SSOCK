import { Canvas } from '@react-three/fiber';
import Tree from './Tree';
import Cylinder from './Cylinder';
import Glass from './Glass';
import { OrbitControls } from '@react-three/drei';
import CustomCamera from './CustomCamera';
import './App.css';

const App = () => {
  return (
    <Canvas>
      {/* <CustomCamera /> */}
      { /* 
      이 부분은
      conflict 해결을 위해
      테스트 할
      부분입니다.
      */}
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight position={[2, 1, 3]} intensity={1} />
      <Glass />
      <Tree />
      <Cylinder />
    </Canvas>
  );
};

export default App;
