import LowpassFilter from 'lowpassf'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useLowpass({
  sampleRange,
  averageLogic = "LinearWeightAverage",
  dimension = 1,
}) {
  if (dimension < 1) throw new Error("Dimension cannot be less than 1.")
  
  const filters = useRef([])
  const [isLoading, setIsLoading] = useState(true)

  const putData = useCallback((data) => {
    if (isLoading) throw new Error("Low-pass filter is not ready for use yet.")

    if (typeof data === "number") {
      if (filters.current.length !== 1)
        throw new Error(`Dimension mismatch. Filter dimension: ${filters.current.length}. Data dimension: 1`)
      filters.current[0].putValue(data)
    }

    if (typeof data !== "number") {
      if (data.length !== filters.current.length)
        throw new Error(`Dimension mismatch. Filter dimension: ${filters.current.length}. Data dimension: ${data.length}`)
      for (let i = 0; i < filters.current.length; i++)
        filters.current[i].putValue(data[i])
    }
  }, [isLoading])

  const getFilteredData = useCallback(() => {
    if (isLoading) throw new Error("Low-pass filter is not ready for use yet.")
    let data

    if (filters.current.length === 1) {
      data = filters.current[0].getFilteredValue()
    } else {
      data = []
      for (let filter of filters.current)
        data.push(filter.getFilteredValue())
    }

    return data
  }, [isLoading])

  useEffect(() => {
    if (isLoading && filters.current.length < dimension) {
      for (let i = 0; i < dimension; i++) {
        const filter = new LowpassFilter()

        filter.setLogic(filter[averageLogic])
        if (sampleRange)
          filter.setSamplingRange(sampleRange)

        filters.current.push(filter)
      }
      setIsLoading(false)
    }
  }, [isLoading])


  return {
    isLoading,
    putData,
    getFilteredData,
  }
}