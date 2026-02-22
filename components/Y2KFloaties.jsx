import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Y2KFloaties({ count = 15, area = [8, 6] }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // Load texture
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    return loader.load('/images/y2k.png')
  }, [])

  // Create floaties with random properties
  const floaties = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * area[0], 
          (Math.random() - 0.5) * area[1], 
          (Math.random() - 0.5) * 2
        ),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003, 
          (Math.random() - 0.5) * 0.003, 
          (Math.random() - 0.5) * 0.001
        ),
        scale: 0.4 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.5 + Math.random() * 1.5
      })
    }
    return arr
  }, [count, area])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    for (let i = 0; i < floaties.length; i++) {
      const f = floaties[i]
      
      // Update position with floating movement
      f.pos.add(f.vel)
      
      // Add sine wave floating effect
      const floatY = Math.sin(time * f.floatSpeed + f.floatOffset) * 0.1
      const floatX = Math.cos(time * f.floatSpeed * 0.7 + f.floatOffset) * 0.05
      
      // Wrap around boundaries
      if (f.pos.x > area[0] / 2) f.pos.x = -area[0] / 2
      if (f.pos.x < -area[0] / 2) f.pos.x = area[0] / 2
      if (f.pos.y > area[1] / 2) f.pos.y = -area[1] / 2
      if (f.pos.y < -area[1] / 2) f.pos.y = area[1] / 2
      
      // Update rotation
      f.rotation += f.rotationSpeed
      
      // Set position with floating offset
      dummy.position.set(f.pos.x + floatX, f.pos.y + floatY, f.pos.z)
      dummy.scale.setScalar(f.scale)
      dummy.rotation.z = f.rotation
      dummy.updateMatrix()
      
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        color="#ff00ff"
        transparent 
        opacity={1}
        alphaTest={0.01}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  )
}
