import { PoseLandmarker, PoseLandmarkerResult } from "@mediapipe/tasks-vision";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import useLandmarker, { LandmarkDict } from "../hooks/useLandmarker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoader } from "@react-three/fiber";
import ARScene from "../components/ARScene";
import { CylinderGeometry, Euler, Matrix4, Vector3 } from "three";
import LoadingIndicator from "../components/LoadingIndicator";
import InstructionMessage from "../components/InstructionMessage";

function calculateFor(foot: "left" | "right", prediction: PoseLandmarkerResult) {
  const indicies = {
    ankle: foot === "left" ? 29 : 30,
    knee: foot === "left" ? 25 : 26,
    toes: foot === "left" ? 31 : 32
  }

  const ankle: LandmarkDict = {
    image: prediction.landmarks[0][indicies.ankle],
    world: prediction.worldLandmarks[0][indicies.ankle],
  }
  const knee: LandmarkDict = {
    image: prediction.landmarks[0][indicies.knee],
    world: prediction.worldLandmarks[0][indicies.knee],
  }
  const toes: LandmarkDict = {
    image: prediction.landmarks[0][indicies.toes],
    world: prediction.worldLandmarks[0][indicies.toes],
  }

  const ankleVector = new Vector3(ankle.image.x, ankle.image.y, ankle.image.z)
  const kneeVector = new Vector3(knee.image.x, knee.image.y, knee.image.z)
  const toesVector = new Vector3(toes.image.x, toes.image.y, toes.image.z)

  const yAxis = new Vector3().subVectors(kneeVector, ankleVector)
  const zAxis = new Vector3().subVectors(toesVector, ankleVector)
  const xAxis = yAxis.clone().cross(zAxis)

  const scale = zAxis.length() * 3.2
  const position = new Vector3(ankle.image.x, ankle.image.y, 0)
  const rotationMatrix = new Matrix4().makeBasis(xAxis.normalize(), yAxis.normalize(), zAxis.normalize())
  const rotation = new Euler().setFromRotationMatrix(rotationMatrix)

  return {
    position: position.toArray(),
    rotation: [rotation.x, rotation.y, rotation.z],
    scale: [scale * (foot === "left" ? 1 : -1), scale, scale],
  }
}

const ShoesSolution = ({
  path,
}: {
  path: string,
}) => {
  const model = useLoader(GLTFLoader, path)
  const [prediction, setPrediction] = useState<PoseLandmarkerResult | null>(null)
  const { landmarker, isLoading, error, loadModel } = useLandmarker<PoseLandmarker>({
    initializer: fs => (
      PoseLandmarker.createFromOptions(fs, {
        baseOptions: {
          modelAssetPath: import.meta.env.BASE_URL + 'pose_landmarker_full.task',
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        minTrackingConfidence: 0.9,
        minPoseDetectionConfidence: 0.7,
        numPoses: 1,
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

    return {
      left: calculateFor("left", prediction),
      right: calculateFor("right", prediction),
    }
  }, [prediction])

  const message = useMemo(() => {
    return (landmarker && !transformations) ? "Stand in front of the camera." : null
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
            baseModelGeometry: new CylinderGeometry(0.063, 0.063, 0.157).translate(0, 0.3, 0),
            renderedModel: model,
            transformations: transformations?.left,
          },
          {
            baseModelGeometry: new CylinderGeometry(0.063, 0.063, 0.157).translate(0, 0.3, 0),
            renderedModel: model,
            transformations: transformations?.right,
          },
        ]}
        loopFunc={loop}
      />
      <div style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
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

export default ShoesSolution;