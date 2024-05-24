import { Environment } from "@react-three/drei";
import { Canvas, ObjectMap } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Webcam from "react-webcam";
import { BufferGeometry, Euler, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/Addons.js";
import ModelRenderer from "./ModelRenderer";

const ARScene = ({
  setups,
  extras,
  loopFunc,
  facingMode = "user",
}: {
  setups: {
    baseModelGeometry: BufferGeometry,
    transformations?: {
      position: number[],
      rotation: number[],
      scale: number[],
    } | null,
    renderedModel: GLTF & ObjectMap,
  }[],
  extras?: React.ReactNode,
  loopFunc: (video: HTMLVideoElement) => void,
  facingMode?: "user" | "environment"
}) => {
  const [searchParams] = useSearchParams()
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const width = useRef(searchParams.get("width"))
  const loop = useCallback(() => {
    if (video) loopFunc(video)
  }, [video, loopFunc])
  const loopRef = useRef(loop)

  useEffect(() => {
    loopRef.current = loop
  }, [loop])

  const animate = useCallback(() => {
    loopRef.current()

    requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    requestAnimationFrame(animate)
  }, [])

  return (
    <div
      style={{
        width: width.current ?? "100%",
        height: "max-content",
        position: "relative",
      }}
    >
      <Webcam
        onPlay={(e) => {
          setVideo(e.currentTarget)
        }}
        videoConstraints={{facingMode}}
        style={{
          width: "100%"
        }}
      />
      {
        video &&
        <Canvas
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          orthographic
          camera={{
            left: 0,
            right: 1,
            top: 0,
            bottom: 1,
            position: [0, 0, 5],
            near: -300,
            far: 300,
          }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0, -1)
            camera.updateProjectionMatrix()
          }}
        >
          <Suspense>
            <Environment
            background={false}
            files="warehouse.hdr"
            path="/"
            environmentRotation={new Euler(0, Math.PI / 2, 0)}
            environmentIntensity={0.5}
            />
          </Suspense>
          <ambientLight intensity={2} />
          <group
            scale={new Vector3(1, 1, -1)}
          >
            {
              setups.map((setup, n) => (
                <ModelRenderer
                  key={n}
                  baseModelGeometry={setup.baseModelGeometry}
                  renderedModel={setup.renderedModel}
                  transformations={setup.transformations}
                  aspect={video.clientWidth / video.clientHeight}
                />
              ))
            }
          </group>
          {extras}
        </Canvas>
      }
    </div>
  );
}

export default ARScene;