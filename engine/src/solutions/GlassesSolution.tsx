import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { useCallback, useEffect, useMemo, useState } from "react"
import useLandmarker from "../hooks/useLandmarker"
import { FaceLandmarker, FaceLandmarkerResult, NormalizedLandmark } from "@mediapipe/tasks-vision"
import ARScene from "../components/ARScene"
import { Euler, Matrix4, Vector3 } from "three"
import LoadingIndicator from "../components/LoadingIndicator"
import InstructionMessage from "../components/InstructionMessage"

const GlassesSolution = ({
  path,
}: {
  path: string,
}) => {
  const model = useLoader(GLTFLoader, path)
  const baseModel = useLoader(GLTFLoader, import.meta.env.BASE_URL + 'head.glb')
  const [prediction, setPrediction] = useState<FaceLandmarkerResult | null>(null)
  const { landmarker, isLoading, error, loadModel } = useLandmarker<FaceLandmarker>({
    initializer: fs => (
      FaceLandmarker.createFromOptions(fs, {
        baseOptions: {
          modelAssetPath: import.meta.env.BASE_URL + "face_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        minTrackingConfidence: 0.9,
        minFaceDetectionConfidence: 0.9,
        numFaces: 1,
      })
    ),
    wasmPath: import.meta.env.BASE_URL + "wasm",
  })
  const isReady = useMemo(() => (
    !isLoading && landmarker && !error
  ), [isLoading, landmarker, error])

  useEffect(() => {
    if (!isLoading && !landmarker) loadModel()
  }, [isLoading, error])

  const transformations = useMemo(() => {
    if (!prediction || prediction.faceLandmarks.length <= 0) return null

    const leftEar: NormalizedLandmark = prediction.faceLandmarks[0][162]
    const rightEar: NormalizedLandmark = prediction.faceLandmarks[0][389]
    const nose: NormalizedLandmark = prediction.faceLandmarks[0][8]

    const leftEarVector = new Vector3(leftEar.x, leftEar.y, leftEar.z)
    const rightEarVector = new Vector3(rightEar.x, rightEar.y, rightEar.z)
    const noseVector = new Vector3(nose.x, nose.y, nose.z)

    const leftEarToRightEar = new Vector3().subVectors(rightEarVector, leftEarVector);
    const noseToLeftEar = new Vector3().subVectors(leftEarVector, noseVector).normalize();
    const noseToRightEar = new Vector3().subVectors(rightEarVector, noseVector).normalize();
    const yAxis = noseToRightEar.clone().cross(noseToLeftEar);
    const xAxis = leftEarToRightEar.clone().normalize();
    const zAxis = xAxis.clone().cross(yAxis);
    const rotationMatrix = new Matrix4().makeBasis(xAxis, yAxis, zAxis);
    const rotation = new Euler().setFromRotationMatrix(rotationMatrix);
    const scale = leftEarToRightEar.length() * 6.5;
    const position = noseVector.clone()

    return {
      position: position.toArray(),
      rotation: [rotation.x, rotation.y, rotation.z],
      scale: [scale, scale, scale],
    }

  }, [prediction])

  const message = useMemo(() => {
    return (landmarker && !transformations) ? "Look at the camera." : null
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
        facingMode="user"
        setups={[
          {
            baseModelGeometry: (baseModel.nodes.Head as any).geometry,
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
        display: "flex"
      }}>
        {
          error &&
          <InstructionMessage
            message={error.message}
          />
        }
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

export default GlassesSolution;