import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const Name3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls for camera interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.enablePan = false;
    controls.enableZoom = false;


    const colors = {
      metallicPink: new THREE.Color("#ff66cc"),
      turquoiseBlue: new THREE.Color("#33cccc"),
    };

    // Dynamic lighting
    const pointLight1 = new THREE.PointLight(colors.metallicPink, 2, 10);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(colors.turquoiseBlue, 2, 10);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Geometry and material
    const geometry = new THREE.TorusGeometry(1.7, 0.7, 16, 100);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      roughness: 0.5, 
      metalness: 0.7
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);

      // Rotation removed to control via OrbitControls & interaction
      // Update lighting to create dynamic effects
      pointLight1.position.set(
        5 * Math.sin(Date.now() * 0.002),
        5 * Math.cos(Date.now() * 0.002),
        5 * Math.sin(Date.now() * 0.002)
      );
      pointLight2.position.set(
        5 * Math.sin(Date.now() * 0.002),
        5 * Math.cos(Date.now() * 0.002),
        -5 * Math.cos(Date.now() * 0.002)
      );

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Name3D;