// src/components/ThreeDModelViewer.jsx
import  { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDModelViewer = () => {
  const avatarRef = useRef();

  useEffect(() => {
    // Basic Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300); // Adjust size according to your layout
    avatarRef.current.appendChild(renderer.domElement);

    // Load the rigged 3D model
    const loader = new GLTFLoader();
    loader.load('/models/r1.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Animation Mixer for animations
      const mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

      const animate = function () {
        requestAnimationFrame(animate);

        // Update animations
        mixer.update(0.01);

        renderer.render(scene, camera);
      };

      animate();
    });

    // Set camera position
    camera.position.z = 5;

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={avatarRef} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeDModelViewer;
