"use client"

import { useEffect, useRef } from 'react';

const ModelViewer = () => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { ModelViewerElement } = require('@google/model-viewer/dist/model-viewer')
    const viewer = new ModelViewerElement()
    viewer.src = "/model/glasses 1.glb"
    viewer.cameraControls = true
    viewer.className = "w-full h-full"
    container.current?.replaceChildren(viewer)
  }, [])

  return (
    <div
      ref={container}
    ></div>
  );
}
 
export default ModelViewer;