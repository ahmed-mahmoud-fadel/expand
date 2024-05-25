"use client"

import { useEffect, useRef } from 'react';

const ModelViewer = ({
  className,
  model,
}: {
  className?: string,
  model: string,
}) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { ModelViewerElement } = require('@google/model-viewer/dist/model-viewer')
    const viewer = new ModelViewerElement()
    viewer.src = model
    viewer.cameraControls = true
    viewer.className = className
    container.current?.replaceChildren(viewer)
  }, [])

  return (
    <div
      ref={container}
    ></div>
  );
}
 
export default ModelViewer;