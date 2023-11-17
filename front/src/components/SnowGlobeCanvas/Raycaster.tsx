import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RaycasterProps {
  isClickedRef: React.MutableRefObject<boolean>; // mutable
}

const Raycaster: React.FC<RaycasterProps> = ({ isClickedRef }) => {
  const { camera, pointer, raycaster, scene, gl } = useThree();
  const isAnimating = useRef(false); // 유리 클릭한 시점 , 뒤로가기 버튼 누른 시점 === true // 카메라 업 다운 차이 기록
  const lastPosition = useRef<number>(0);

  useFrame(() => {
    const isClicked = isClickedRef.current;
    if (isAnimating.current) {
      if (isClicked) {
        if (camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) > 7) {
          camera.position.x = (camera.position.x - 0) * 0.9;
          camera.position.y = (camera.position.y - 0) * 0.9;
          camera.position.z = (camera.position.z - 0) * 0.9;
        } else {
          isAnimating.current = false;
        }
      } else {
        camera.position.set(10, 10, 10);
        isAnimating.current = false;
      }
    }
  });

  useEffect(() => {
    const onClickHandler = () => {
      // 포인터 위치를 기준으로 레이캐스터 설정
      raycaster.setFromCamera(pointer, camera);

      if (window.performance.now() - lastPosition.current > 120) {
        return;
      } else {
        // 씬의 모든 객체들과 교차점 계산
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          if (isClickedRef.current) {
            isAnimating.current = true;
            isClickedRef.current = false;
            const intersect = intersects[0].object;
            if (intersect.name === 'box' || intersect.name === 'ribbon') {
              console.log(intersect.userData.message); // setstate
            }
          } else {
            console.log(isClickedRef.current);
            const intersect = intersects[0].object;
            if (intersect.name === 'glass') {
              isAnimating.current = true;
              isClickedRef.current = true;
            }
          }

          const intersect = intersects[0].object;
          console.log(intersect.name);
        }
      }
    };
    const saveLastTime = () => {
      lastPosition.current = window.performance.now();
    };

    const canvasElement = gl.domElement;
    // canvasElement.addEventListener('click',onClickHandler);
    canvasElement.addEventListener('mouseup', onClickHandler);
    canvasElement.addEventListener('mousedown', saveLastTime);

    return () => {
      canvasElement.removeEventListener('click', onClickHandler);
    };
  }, []);

  return null;
};

export default Raycaster;
