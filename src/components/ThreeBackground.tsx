import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

// Carnival light decoration
function CarnivalLight({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) {
  const lightRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.elapsedTime + delay;
      lightRef.current.material.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.3;
    }
  });

  return (
    <mesh ref={lightRef} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  );
}

// Ferris Wheel structure
function FerrisWheel({ position, rotationSpeed = 0.1, scale = 1 }: { position: [number, number, number]; rotationSpeed?: number; scale?: number }) {
  const wheelRef = useRef<THREE.Group>(null);
  const cabinsRef = useRef<THREE.Group>(null);
  
  const radius = 3;
  const cabinCount = 8;
  
  const cabins = useMemo(() => {
    return Array.from({ length: cabinCount }, (_, i) => {
      const angle = (i / cabinCount) * Math.PI * 2;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0,
        ] as [number, number, number],
        angle,
      };
    });
  }, [cabinCount, radius]);
  
  useFrame((state) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed;
    }
    if (cabinsRef.current) {
      cabinsRef.current.rotation.z = -state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Main wheel structure */}
      <group ref={wheelRef}>
        {Array.from({ length: cabinCount }, (_, i) => {
          const angle = (i / cabinCount) * Math.PI * 2;
          return (
            <mesh key={i} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.05, radius * 2, 0.05]} />
              <meshStandardMaterial color="#ffd25a" emissive="#ffd25a" emissiveIntensity={0.3} />
            </mesh>
          );
        })}
      </group>
      
      {/* Cabins */}
      <group ref={cabinsRef}>
        {cabins.map((cabin, i) => (
          <group key={i} position={cabin.position}>
            <mesh>
              <boxGeometry args={[0.4, 0.4, 0.3]} />
              <meshStandardMaterial 
                color={['#c62b2b', '#65caff', '#ffd25a', '#f78724'][i % 4]} 
                emissive={['#c62b2b', '#65caff', '#ffd25a', '#f78724'][i % 4]}
                emissiveIntensity={0.2}
              />
            </mesh>
            {/* Cabin glow */}
            <mesh position={[0, 0, 0.15]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial 
                color={['#c62b2b', '#65caff', '#ffd25a', '#f78724'][i % 4]} 
                emissive={['#c62b2b', '#65caff', '#ffd25a', '#f78724'][i % 4]}
                emissiveIntensity={0.8}
              />
            </mesh>
          </group>
        ))}
      </group>
      
      {/* Central hub */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffd25a" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesCount = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(particlesCount * 3);
    const colorPalette = [
      new THREE.Color('#c62b2b'),
      new THREE.Color('#ffd25a'),
      new THREE.Color('#f78724'),
      new THREE.Color('#65caff'),
    ];
    
    for (let i = 0; i < particlesCount; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

function RotatingRing({ radius, color }: { radius: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

export function ThreeBackground() {
  // Generate carnival light positions
  const lightPositions = useMemo(() => {
    const lights: Array<[number, number, number]> = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 8 + Math.random() * 4;
      lights.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -5 + Math.random() * 3,
      ]);
    }
    return lights;
  }, []);

  const colors = ['#c62b2b', '#ffd25a', '#f78724', '#65caff'];

  return (
    <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffd25a" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#c62b2b" />
        <pointLight position={[0, 10, 0]} intensity={0.8} color="#65caff" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <ParticleField />
        
        {/* Carnival Ferris Wheel */}
        <FerrisWheel position={[6, 2, -8]} rotationSpeed={0.08} />
        <FerrisWheel position={[-6, -2, -10]} rotationSpeed={-0.1} scale={0.7} />
        
        {/* Carnival Lights */}
        {lightPositions.map((pos, i) => (
          <CarnivalLight
            key={i}
            position={pos as [number, number, number]}
            color={colors[i % colors.length]}
            delay={i * 0.2}
          />
        ))}
        
        {/* Floating decorative shapes */}
        <FloatingShape position={[-5, 3, -5]} color="#c62b2b" scale={0.8} />
        <FloatingShape position={[5, -2, -3]} color="#ffd25a" scale={0.6} />
        <FloatingShape position={[-3, -3, -4]} color="#f78724" scale={0.5} />
        <FloatingShape position={[4, 4, -6]} color="#65caff" scale={0.7} />
        
        {/* Rotating rings */}
        <RotatingRing radius={6} color="#c62b2b" />
        <RotatingRing radius={8} color="#ffd25a" />
        
        <fog attach="fog" args={['#0d0d0d', 5, 35]} />
      </Canvas>
    </div>
  );
}
