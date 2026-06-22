import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function GlassShape({
  position,
  scale = 1,
  speed = 1,
  rotation = 0.4,
  geometry,
  mouse,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  rotation?: number;
  geometry: "ico" | "torus" | "octa";
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.1 * speed + mouse.current.x * 0.3;
    ref.current.rotation.x = Math.sin(t * 0.2 * speed) * 0.15 + mouse.current.y * 0.2;
  });

  return (
    <Float speed={1.2 * speed} rotationIntensity={rotation} floatIntensity={0.7}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry === "ico" && <icosahedronGeometry args={[1, 8]} />}
        {geometry === "torus" && <torusGeometry args={[0.7, 0.28, 64, 128]} />}
        {geometry === "octa" && <octahedronGeometry args={[0.9, 4]} />}
        <MeshTransmissionMaterial
          backside
          samples={3}
          thickness={0.6}
          chromaticAberration={0.12}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.08}
          ior={1.3}
          roughness={0.05}
          color="#ffffff"
          transmission={1}
          attenuationDistance={1.2}
          attenuationColor="#e0e8ff"
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1.5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#a8b8ff" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function StudioRig() {
  // Bright procedural environment — no network HDR required.
  return (
    <Environment resolution={512} frames={1} background={false}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" side={THREE.BackSide} />
      </mesh>
      <Lightformer
        form="ring"
        intensity={6}
        color="#a8b8ff"
        position={[4, 3, 4]}
        scale={[8, 8, 1]}
      />
      <Lightformer
        form="ring"
        intensity={5}
        color="#ffc8e8"
        position={[-4, -3, 4]}
        scale={[7, 7, 1]}
      />
      <Lightformer
        form="rect"
        intensity={4}
        color="#b8f0ff"
        position={[0, 5, 0]}
        scale={[10, 2, 1]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Lightformer
        form="rect"
        intensity={3.5}
        color="#fff0c8"
        position={[0, -5, 0]}
        scale={[10, 2, 1]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <Lightformer
        form="circle"
        intensity={4}
        color="#e8d0ff"
        position={[-5, 0, -3]}
        scale={[6, 6, 1]}
      />
    </Environment>
  );
}

export function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: true,
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }}
      onPointerLeave={() => {
        mouse.current.x = 0;
        mouse.current.y = 0;
      }}
    >
      <ambientLight intensity={0.6} />
      <StudioRig />
      {/* Primary orb — far right */}
      <GlassShape position={[2.2, 0, 0]} scale={1.55} geometry="ico" mouse={mouse} />
      {/* Secondary torus — top */}
      <GlassShape
        position={[3.4, 1.6, -1]}
        scale={0.5}
        speed={1.4}
        rotation={0.7}
        geometry="torus"
        mouse={mouse}
      />
      {/* Smaller octa — bottom */}
      <GlassShape
        position={[1.4, -1.6, -0.5]}
        scale={0.42}
        speed={0.7}
        rotation={0.5}
        geometry="octa"
        mouse={mouse}
      />
      <Particles />
    </Canvas>
  );
}

export default HeroScene;
