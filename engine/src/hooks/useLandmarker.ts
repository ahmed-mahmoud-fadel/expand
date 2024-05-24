import {
  FilesetResolver,
  FaceLandmarker,
  HandLandmarker,
  PoseLandmarker,
  PoseLandmarkerResult,
  FaceLandmarkerResult,
  HandLandmarkerResult,
  Landmark,
  HolisticLandmarker,
  HolisticLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useState } from "react";

export type Landmarker = PoseLandmarker | FaceLandmarker | HandLandmarker | HolisticLandmarker
export type LandmarkerResult = PoseLandmarkerResult | FaceLandmarkerResult | HandLandmarkerResult | HolisticLandmarkerResult

export default function useLandmarker<T extends Landmarker>({
  initializer,
  wasmPath,
}: {
  initializer: (fileset: any) => Promise<T>,
  wasmPath: string,
}) {
  const [landmarker, setLandmarker] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const loadModel = useCallback(async () => {
    setIsLoading(true)
    setLandmarker(null)
    setError(null)

    try {
      const fs = await FilesetResolver.forVisionTasks(wasmPath)
      const lm = await initializer(fs)
      setLandmarker(lm)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [wasmPath, initializer])

  useEffect(() => {
    loadModel()
  }, [])

  return {
    landmarker,
    isLoading,
    error,
    loadModel,
  }
}

export type LandmarkDict = {
  image: Landmark,
  world: Landmark,
}