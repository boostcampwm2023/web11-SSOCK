//해줘 이제 동그란 glass만들어 주세요
import * as THREE from 'three';

const Glass: React.FC = () => {
  return (
    <mesh position={[0, 5, 0]}>
      <sphereGeometry
        args={[
          10,
          32,
          32,
          (0 * Math.PI) / 180, // 라디안 단위로 변경 필요
          (360 * Math.PI) / 180,
          (360 * Math.PI) / 180,
          (180 * Math.PI) / 180
        ]}
      />
      <meshPhysicalMaterial // meshStandardMaterial을 발전시킴
        visible
        transparent // 투명효과
        opacity={0.5} // 불투명도 ➡️ transparent가 true일때만 동작
        depthTest // z-buffer ➡️ 앞쪽에 있을수록 값이 작음
        depthWrite // z-buffer 기록 유무
        side={THREE.DoubleSide} // 렌더링할 면 지정 ex.앞면(frontside), 뒷면(backside), 모두(doubleside)...
        color="#ffffff"
        roughness={0} // 거칠기 ➡️ 큰 값일수록 거침
        metalness={0} // 금속성 ➡️ 큰 값일수록 금속
        flatShading={false}
        wireframe={false}
        // 아래 속성들은 meshPhysicalMaterial에만 존재 ➡️ 유리처럼 만들기
        transmission={1} // 투명도
        thickness={5} // 유리 두께
        ior={1} // 굴절률(1~2.333) ➡️ 값이 커질수록 더 굴절
      />
    </mesh>
  );
};

export default Glass;
