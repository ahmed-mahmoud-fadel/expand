import { useRef } from "react"

export default function useDimensionParameters() {
  const width = useRef(parseInt(new URL(document.location.toString()).searchParams.get('width') ?? '500')).current
  const height = useRef(parseInt(new URL(document.location.toString()).searchParams.get('height') ?? '500')).current


  return { width, height }
}