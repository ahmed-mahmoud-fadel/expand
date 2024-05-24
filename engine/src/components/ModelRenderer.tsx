import { ObjectMap } from "@react-three/fiber";
import { Suspense } from "react";
import { BufferGeometry, Euler, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/Addons.js";

const ModelRenderer = ({
  baseModelGeometry,
  transformations,
  renderedModel,
  aspect = 1,
}: {
  baseModelGeometry: BufferGeometry,
  transformations?: {
    position: number[],
    rotation: number[],
    scale: number[],
  } | null,
  renderedModel: GLTF & ObjectMap,
  aspect?: number,
}) => {
  return (
    <Suspense>
      {
        transformations &&
        <group
          position={new Vector3(...transformations.position)}
          rotation={new Euler(
            ...transformations.rotation as [number, number, number],
            "XYZ"
          )}
          scale={new Vector3(...transformations.scale).multiply(new Vector3(1, aspect, 1))}
        >
          <mesh geometry={baseModelGeometry} renderOrder={0}>
            <meshBasicMaterial colorWrite={false} transparent={false} />
          </mesh>
          <group renderOrder={1}>
            {
              Object.keys(renderedModel.nodes).map((key) => {
                return (
                  <mesh key={key}
                    geometry={(renderedModel.nodes[key] as any).geometry}
                    material={(renderedModel.nodes[key] as any).material}
                  />
                )
              })
            }
          </group>
        </group>
      }
    </Suspense>
  );
}

export default ModelRenderer;