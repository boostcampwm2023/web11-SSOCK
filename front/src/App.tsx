import { Canvas } from '@react-three/fiber';
import Tree from './Tree';
import Cube from './Cube';
import Glass from './Glass';
import { OrbitControls } from '@react-three/drei';
import CustomCamera from './CustomCamera';
import './App.css';

const App = () => {
  return (
    <Canvas>
      {/* <CustomCamera /> */}
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight position={[2, 1, 3]} intensity={1} />
      <Glass />
      <Tree />
      <Cube />
    </Canvas>
  );
};

export default App;
