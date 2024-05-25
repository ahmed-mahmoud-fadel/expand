import { CylinderGeometry, Euler, Matrix4, Vector3 } from "three";
import ARScene from "../components/ARScene";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HandLandmarker, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import useLandmarker, { LandmarkDict } from "../hooks/useLandmarker";
import LoadingIndicator from "../components/LoadingIndicator";
import InstructionMessage from "../components/InstructionMessage";

const WatchesSolution = ({
  path,
}: {
  path: string,
}) => {
  const model = useLoader(GLTFLoader, path)
  const [prediction, setPrediction] = useState<HandLandmarkerResult | null>(null)
  const { landmarker, isLoading, error, loadModel } = useLandmarker<HandLandmarker>({
    initializer: fs => (
      HandLandmarker.createFromOptions(fs, {
        baseOptions: {
          modelAssetPath: import.meta.env.BASE_URL + 'hand_landmarker.task',
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        minTrackingConfidence: 0.9,
        minHandDetectionConfidence: 0.9,
        numHands: 2,
      })
    ),
    wasmPath: import.meta.env.BASE_URL + 'wasm',
  })
  const isReady = useMemo(() => (
    !isLoading && landmarker && !error
  ), [isLoading, landmarker, error])

  useEffect(() => {
    if (!isLoading && !landmarker) loadModel()
  }, [isLoading, error])

  const transformations = useMemo(() => {
    if (!prediction || prediction.landmarks.length <= 0) return null

    let handIndex = 0
    if (prediction.handedness[handIndex][0].categoryName === "Right") handIndex++
    if (!prediction.landmarks[handIndex]) return null

    const wrist: LandmarkDict = {
      image: prediction.landmarks[handIndex][0],
      world: prediction.worldLandmarks[handIndex][0],
    }
    const middleFingerBase: LandmarkDict = {
      image: prediction.landmarks[handIndex][9],
      world: prediction.worldLandmarks[handIndex][9],
    }
    const indexFingerBase: LandmarkDict = {
      image: prediction.landmarks[handIndex][5],
      world: prediction.worldLandmarks[handIndex][5],
    }

    if (
      !wrist.image ||
      !middleFingerBase.image ||
      !indexFingerBase.image
    ) return null

    const wirstVector = new Vector3(wrist.image.x, wrist.image.y, wrist.image.z)
    const middleFingerBaseVector = new Vector3(middleFingerBase.image.x, middleFingerBase.image.y, middleFingerBase.image.z)
    const indexFingerBaseVector = new Vector3(indexFingerBase.image.x, indexFingerBase.image.y, indexFingerBase.image.z)

    const yAxis = new Vector3().subVectors(wirstVector, middleFingerBaseVector)
    const xAxis = new Vector3().subVectors(indexFingerBaseVector, middleFingerBaseVector)
    const zAxis = xAxis.clone().cross(yAxis)

    const position = new Vector3(wrist.image.x, wrist.image.y, 0)
    const scale = yAxis.length() * 1.5

    const rotationMatrix = new Matrix4().makeBasis(xAxis.normalize(), yAxis.normalize(), zAxis.normalize())
    const rotation = new Euler().setFromRotationMatrix(rotationMatrix)

    return {
      position: position.toArray(),
      rotation: [rotation.x, rotation.y, rotation.z],
      scale: [scale, scale, scale],
    }

  }, [prediction])

  const message = useMemo(() => {
    return (landmarker && !transformations) ? "Show your left wrist." : null
  }, [prediction, landmarker])

  const loop = useCallback((video: HTMLVideoElement) => {
    if (!isLoading && landmarker && !error) {
      setPrediction(landmarker.detectForVideo(video, performance.now()))
    }
  }, [isLoading, landmarker, error])

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <ARScene
        facingMode="environment"
        setups={[
          {
            baseModelGeometry: new CylinderGeometry(0.5, 0.5, 1).scale(0.44, 1, 0.273),
            renderedModel: model,
            transformations: transformations,
          }
        ]}
        loopFunc={loop}
      />
      <div style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "flex"
      }}>
        {
          isReady && message &&
          <InstructionMessage
            message={message}
          />
        }
        {
          !isReady &&
          <LoadingIndicator />
        }
      </div>
    </div>
  );
}

export default WatchesSolution;