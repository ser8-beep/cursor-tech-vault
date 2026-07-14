'use client';

import { Suspense, useLayoutEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { HERO_SCULPTURE_URL } from '@/lib/sculpture-assets';

/** Normalized bounding height — tuned for hero container aspect. */
const MODEL_TARGET_HEIGHT = 1.45;

const CAMERA = {
  position: [0, 0.12, 4.05] as const,
  fov: 35,
  near: 0.1,
  far: 50,
};

const CAMERA_LOOK_AT: [number, number, number] = [0, 0.04, 0];

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.45} color="#f5f2ec" />
      <directionalLight
        castShadow
        position={[3.2, 5.5, 2.8]}
        intensity={1.35}
        color="#fff8f0"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0002}
      />
      <directionalLight
        position={[-2.5, 1.5, -1.5]}
        intensity={0.35}
        color="#d4e0f0"
      />
      <Environment preset="studio" environmentIntensity={0.55} />
    </>
  );
}

function SculptureModel({ url }: { url: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  useLayoutEffect(() => {
    const wrapper = groupRef.current;
    if (!wrapper) return;

    const clone = scene.clone(true);

    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const height = size.y || 1;
    const s = MODEL_TARGET_HEIGHT / height;
    clone.scale.setScalar(s);
    clone.position.set(-center.x * s, -center.y * s, -center.z * s);

    while (wrapper.children.length) {
      wrapper.remove(wrapper.children[0]!);
    }
    wrapper.add(clone);
  }, [scene]);

  return <group ref={groupRef} />;
}

useGLTF.preload(HERO_SCULPTURE_URL);

export function HeroSculpture() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{
          position: [...CAMERA.position],
          fov: CAMERA.fov,
          near: CAMERA.near,
          far: CAMERA.far,
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          camera.lookAt(...CAMERA_LOOK_AT);
          camera.updateProjectionMatrix();
        }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <SculptureModel url={HERO_SCULPTURE_URL} />
        </Suspense>
      </Canvas>
    </div>
  );
}
