import { useGLTF } from '@react-three/drei/core/useGLTF';
import { useRecoilValue } from 'recoil';
import { Mesh } from 'three';
import { makeColorChangedMaterial } from '@utils/meshUtils';
import { VisitDecoRecoil } from '@states';
import { DECO } from '@constants';

const DecoModel = () => {
  const { decoID, color } = useRecoilValue(VisitDecoRecoil);
  const deco = useGLTF(DECO[decoID].fileName).scene.clone();

  deco.scale.set(1.5, 1.5, 1.5);
  deco.position.set(0, 0, 0);
  deco.children.forEach(child => {
    if (child instanceof Mesh) {
      if (child.name === 'Sub') {
        return;
      }
      if (child.name === 'Main') {
        child.material = makeColorChangedMaterial(child, color);
      }
    }
  });
  return <primitive object={deco} />;
};

export default DecoModel;
