import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const Raycaster: React.FC = () => {
  const { camera, pointer, raycaster, scene, gl } = useThree();

  useEffect(() => {
    const onClickHandler = () => {
      // 포인터 위치를 기준으로 레이캐스터 설정
      raycaster.setFromCamera(pointer, camera);

      // 씬의 모든 객체들과 교차점 계산
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        intersects.forEach((intersect) => {
          console.log('Intersect object:', intersect.object.name);
        });
        console.log('Hit object:', intersects[0].object.name);
      }
    };

    const canvasElement = gl.domElement;
    canvasElement.addEventListener('click', onClickHandler);

    return () => {
      canvasElement.removeEventListener('click', onClickHandler);
    };
  }, [camera, pointer, raycaster, scene, gl]);

  return null;
};

export default Raycaster;
