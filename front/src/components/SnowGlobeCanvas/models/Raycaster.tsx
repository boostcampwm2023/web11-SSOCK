import React, { useEffect, useRef, useContext } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MessageContext } from '../../../pages/Visit/MessageProvider';
import { PrevContext } from '../PrevProvider';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

interface RaycasterProps {
  isClickedRef: React.MutableRefObject<boolean>; // mutable
}

const Raycaster: React.FC<RaycasterProps> = ({ isClickedRef }) => {
  const { camera, pointer, raycaster, scene, gl } = useThree();
  const { setMessage, setSender, setColor } = useContext(MessageContext);
  const { view, setView, isZoom, setIsZoom } = useContext(PrevContext);
  const isAnimating = useRef(false); // 유리 클릭한 시점 , 뒤로가기 버튼 누른 시점 === true // 카메라 업 다운 차이 기록
  const lastPosition = useRef<number>(0);

  useFrame(() => {
    const isClicked = isClickedRef.current;

    if (isAnimating.current) {
      if (isClicked) {
        setView(true);

        if (camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) > 7) {
          camera.position.x = (camera.position.x - 0) * 0.99;
          camera.position.y = (camera.position.y - 0) * 0.99;
          camera.position.z = (camera.position.z - 0) * 0.99;
        } else {
          isAnimating.current = false;
        }
      } else {
        camera.position.set(10, 10, 10);
        isAnimating.current = false;
      }
    } else {
      if (view) {
        setIsZoom(true);
      } else if (isZoom && !view) {
        if (camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) < 15) {
          camera.position.x = (camera.position.x + 0) * 1.01;
          camera.position.y = (camera.position.y + 0) * 1.01;
          camera.position.z = (camera.position.z + 0) * 1.01;
        } else {
        setIsZoom(false);
        isAnimating.current = false;
        }
      }
    }
  });

  useEffect(() => {
    const onClickHandler = () => {
      // 포인터 위치를 기준으로 레이캐스터 설정
      raycaster.setFromCamera(pointer, camera);

      //터치한 시간으로 이벤트 분기
      if (window.performance.now() - lastPosition.current > 120) {
        return;
      } else {
        // 씬의 모든 객체들과 교차점 계산
        setMessage('');
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length < 1) {
          return;
        }
        if (intersects[0].object.name === 'glass') {
          isAnimating.current = true;
          isClickedRef.current = true;
          return;
        }
        const selectedDeco = intersects.find(
          intersect => intersect.object.userData.message
        );
        if (selectedDeco) {
          const { message, color, sender } = selectedDeco.object.userData;
          setMessage(message);
          setSender(sender);
          setColor(color);
        }
      }
    };
    const saveLastTime = () => {
      lastPosition.current = window.performance.now();
    };

    const canvasElement = gl.domElement;
    canvasElement.addEventListener('mouseup', onClickHandler);
    canvasElement.addEventListener('mousedown', saveLastTime);
  }, []);

  return null;
};

export default Raycaster;
