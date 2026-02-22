import { useEffect, useState } from 'react'

export default function FloatingScene({ className, scale = 1, autoRotateSpeed = 0.6 }) {
  return (
    <div 
      className={className || 'absolute inset-0'} 
      style={{ 
        background: 'black',
        zIndex: 1
      }}
    >
      {/* Bottom left Y2K image */}
      <img
        src="/images/y2k.png"
        alt=""
        style={{
          position: 'absolute',
          left: '10%',
          bottom: '12%',
          width: '3000px',
          height: '2000px',
          opacity: 0.8,
          animation: 'float1 20s infinite ease-in-out',
          transform: 'translate(-50%, 50%)',
          filter: 'blur(4px)'
        }}
      />

      {/* Top right Y2K image */}
      <img
        src="/images/y2k.png"
        alt=""
        style={{
          position: 'absolute',
          right: '10%',
          top: '10%',
          width: '1000px',
          height: '1000px',
          opacity: 0.8,
          animation: 'float2 25s infinite ease-in-out',
          transform: 'translate(50%, -50%)',
          filter: 'blur(2px)'
        }}
      />

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { 
            transform: translate(-50%, 50%) translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translate(-50%, 50%) translateY(-30px) rotate(5deg); 
          }
          50% { 
            transform: translate(-50%, 50%) translateY(20px) rotate(-5deg); 
          }
          75% { 
            transform: translate(-50%, 50%) translateY(-25px) rotate(3deg); 
          }
        }
        
        @keyframes float2 {
          0%, 100% { 
            transform: translate(50%, -50%) translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translate(50%, -50%) translateY(25px) rotate(-5deg); 
          }
          50% { 
            transform: translate(50%, -50%) translateY(-20px) rotate(5deg); 
          }
          75% { 
            transform: translate(50%, -50%) translateY(30px) rotate(-3deg); 
          }
        }
      `}</style>
    </div>
  )
}

function Particles({ count = 60, area = [4, 2.5] }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const { viewport } = useThree()

  // particle state
  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * area[0], (Math.random() - 0.5) * area[1], (Math.random() - 0.5) * 1),
        vel: new THREE.Vector3((Math.random() - 0.5) * 0.002, (Math.random() - 0.5) * 0.002, 0),
        scale: 0.03 + Math.random() * 0.05,
      })
    }
    return arr
  }, [count, area])

  const mouse = useRef({ x: 0, y: 0 })

  // listen to pointermove on the document to get cursor coords
  useEffect(() => {
    const handler = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      // map to scene coordinates roughly
      mouse.current.x = nx * (area[0] / 2)
      mouse.current.y = ny * (area[1] / 2)
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [area])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      // slight random drift
      p.pos.add(p.vel)

      // wrap around horizontally/vertically
      if (p.pos.x > area[0] / 2) p.pos.x = -area[0] / 2
      if (p.pos.x < -area[0] / 2) p.pos.x = area[0] / 2
      if (p.pos.y > area[1] / 2) p.pos.y = -area[1] / 2
      if (p.pos.y < -area[1] / 2) p.pos.y = area[1] / 2

      // first few particles follow the mouse slightly
      if (i < Math.min(10, particles.length)) {
        p.pos.x += (mouse.current.x - p.pos.x) * 0.02
        p.pos.y += (mouse.current.y - p.pos.y) * 0.02
      }

      dummy.position.set(p.pos.x, p.pos.y, p.pos.z)
      dummy.scale.setScalar(p.scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.18} />
    </instancedMesh>
  )
}

