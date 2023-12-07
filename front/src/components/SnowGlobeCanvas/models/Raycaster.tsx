import React, { useEffect, useRef, useContext } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MessageContext } from '@pages/Visit/MessageProvider';
import { PrevContext } from '../PrevProvider';

interface RaycasterProps {
  isClickedRef: React.MutableRefObject<boolean>;
}

const Raycaster: React.FC<RaycasterProps> = ({ isClickedRef }) => {
  const { camera, pointer, raycaster, scene, gl } = useThree();
  const { setMessage, setSender, setColor, setMessageID } =
    useContext(MessageContext);
  const { view, setView, isZoom, setIsZoom } = useContext(PrevContext);
  const isAnimating = useRef(false); // 유리 클릭한 시점 , 뒤로가기 버튼 누른 시점 === true // 카메라 업 다운 차이 기록
  const lastPosition = useRef<number>(0);

  useFrame((_, delta) => {
    const isClicked = isClickedRef.current;
    const zoomOutSpeed = 1 + delta * 2;
    if (isAnimating.current) {
      if (isClicked && !isZoom) {
        const targetPosition = new THREE.Vector3(0, 3.5, 0);
        setView(true);
        if (camera.position.distanceTo(targetPosition) > 6.5) {
          camera.position.lerp(targetPosition, delta * 2);
        } else {
          isAnimating.current = false;
        }
      } else {
        isAnimating.current = false;
      }
    } else {
      if (view) {
        setIsZoom(true);
      } else if (isZoom && !view) {
        if (camera.position.distanceTo(new THREE.Vector3(0, 3.5, 0)) < 25) {
          camera.position.x = camera.position.x * zoomOutSpeed;
          camera.position.y = camera.position.y * zoomOutSpeed;
          camera.position.z = camera.position.z * zoomOutSpeed;
        } else {
          setIsZoom(false);
        }
      }
    }
  });

  useEffect(() => {
    const onClickHandler = () => {
      // 포인터 위치를 기준으로 레이캐스터 설정
      raycaster.setFromCamera(pointer, camera);

      //터치한 시간으로 이벤트 분기
      if (window.performance.now() - lastPosition.current > 120) return;

      // 씬의 모든 객체들과 교차점 계산
      setMessage('');
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length < 1) return;

      if (intersects[0].object.name === 'glass') {
        isAnimating.current = true;
        isClickedRef.current = true;
        return;
      }

      const selectedDeco = intersects.find(
        intersect => intersect.object.userData.message
      );
      if (selectedDeco) {
        const { message, sender, letterColor, messageID } =
          selectedDeco.object.userData;
        setMessage(message);
        setSender(sender);
        setColor(letterColor);
        setMessageID(messageID);
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
