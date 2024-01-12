import { useEffect, useRef, FC, MutableRefObject } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { MessageRecoil, PrevRecoil } from '@states';

interface RaycasterProps {
  isClickedRef: MutableRefObject<boolean>;
}

const Raycaster: FC<RaycasterProps> = ({ isClickedRef }) => {
  const { camera, pointer, raycaster, scene, gl } = useThree();
  const resetMessage = useResetRecoilState(MessageRecoil);
  const setMessage = useSetRecoilState(MessageRecoil);
  const [{ view, isZoom }, setPrevBox] = useRecoilState(PrevRecoil);

  const isAnimating = useRef(false); // 유리 클릭한 시점 , 뒤로가기 버튼 누른 시점 === true // 카메라 업 다운 차이 기록
  const lastPosition = useRef<number>(0);

  useFrame((_, delta) => {
    const isClicked = isClickedRef.current;
    const zoomOutSpeed = 1 + delta * 2;

    if (isAnimating.current) {
      if (isClicked && !isZoom) {
        setPrevBox(prev => ({ ...prev, view: true }));
        const targetPosition = new Vector3(0, 2.5, 0);
        camera.position.distanceTo(targetPosition) > 6
          ? camera.position.lerp(targetPosition, delta * 2)
          : (isAnimating.current = false);
      } else {
        isAnimating.current = false;
      }
    } else {
      if (view) {
        setPrevBox(prev => ({ ...prev, isZoom: true }));
      } else if (isZoom && !view) {
        if (camera.position.distanceTo(new Vector3(0, 3.5, 0)) < 15) {
          camera.position.x *= zoomOutSpeed;
          camera.position.y *= zoomOutSpeed;
          camera.position.z *= zoomOutSpeed;
        } else {
          setPrevBox(prev => ({ ...prev, isZoom: false }));
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
      resetMessage();
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

        setMessage({
          message: message,
          sender: sender,
          color: letterColor,
          messageID: messageID
        });
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
