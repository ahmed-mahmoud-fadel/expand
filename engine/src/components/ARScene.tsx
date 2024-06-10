import { Canvas, ObjectMap } from "@react-three/fiber";
import {  Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";
import { BufferGeometry, Euler, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/Addons.js";
import ModelRenderer from "./ModelRenderer";
import { Environment } from "@react-three/drei";

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
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const loop = useCallback(() => {
    if (video) loopFunc(video)
  }, [video, loopFunc])
  const loopRef = useRef(loop)
  const [width, height, direction] = useMemo(() => {
    if (!video) return [undefined, undefined, undefined]
    const aspectVideo = video.videoWidth / video.videoHeight
    const aspectClient = video.clientWidth / video.clientHeight
    if (aspectClient > aspectVideo) return ["100vw", `${1 / aspectVideo * 100}vw`, "row"]
    return [`${aspectVideo * 100}vh`, "100vh", "column"]
  }, [video, document.documentElement.clientHeight, document.documentElement.clientHeight])

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
        width: "100%",
        height: "100%",
        position: "relative",
        objectFit: "cover",
      }}
    >
      <Webcam
        onPlay={(e) => {
          setVideo(e.currentTarget)
        }}
        videoConstraints={{facingMode}}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />
      {
        video &&
        <div
        style={{
          position: "absolute",
          top: 0,
          width:  "100%",
          height: "100%",
          display: "flex",
          flexDirection: direction as any,
          alignItems: "center",
          justifyItems: "center",
        }}
        >
        <Canvas
        // style={{
        //   height: "100vh",
        //   width: `${video.videoWidth / video.videoHeight * 100}vh`,
        // }}
        style={{ width, height }}
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
            path={import.meta.env.BASE_URL}
            environmentRotation={new Euler(0, Math.PI / 2, 0)}
            environmentIntensity={0.2}
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
                  aspect={video.videoWidth / video.videoHeight}
                />
              ))
            }
          </group>
          {extras}
        </Canvas>
        </div>
      }
    </div>
  );
}

export default ARScene;