import { KalmanFilter } from 'kalman-filter'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

export default function useKalman(observation = 1) {
  const [previousCorrected, setPreviousCorrected] = useState(null)
  const kalman = useRef(new KalmanFilter({ observation })).current
  const filter = useCallback((observation) => {
    const prediction = kalman.filter({
      previousCorrected,
      observation
    })
    setPreviousCorrected(prediction)
    return prediction
  }, [previousCorrected])

  return filter
}