import { Mesh, Material, MeshBasicMaterial, MeshStandardMaterial, CanvasTexture } from 'three';

interface canvasMaterialProps {
  string: string;
  width: number;
  height: number;
  positionY: number;
  font: string;
  fontColor: string;
  backgGroundColor: string;
}

const makeColorChangedMaterial = (mesh: Mesh, color: string) => {
  const newMaterial = (
    mesh.material as Material
  ).clone() as Material;

  if (
    newMaterial instanceof MeshBasicMaterial ||
    newMaterial instanceof MeshStandardMaterial
  ) {
    newMaterial.color.set(color);
  }

  return newMaterial;
};

const makeCanvasTexture = (props: canvasMaterialProps) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw 'context is not exist!!!';
  }

  [canvas.width, canvas.height] = [props.width, props.height];

  context.fillStyle = props.backgGroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = props.fontColor;
  context.font = props.font;
  context.textBaseline = 'middle';

  const textWidth = context.measureText(props.string).width;
  context.fillText(
    props.string,
    canvas.width / 2 - textWidth / 2,
    props.positionY,
    canvas.width
  );

  return new CanvasTexture(canvas);
};

export { makeColorChangedMaterial, makeCanvasTexture };
