import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHelix({
  primaryColor = 0x00c853,
  secondaryColor = 0x69f0ae,
  opacity = 0.35
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Main Group
    const group = new THREE.Group();
    scene.add(group);

    // Materials
    const material1 = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.8
    });

    const material2 = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.8
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.15
    });

    // Create DNA Double Helix
    const numPoints = 80;
    const helixRadius = 1.6;
    const helixHeight = 8;
    const turns = 3.5;
    
    const sphereGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const helix1Points = [];
    const helix2Points = [];

    // Mesh group for spheres
    const helixGroup = new THREE.Group();
    group.add(helixGroup);

    // Line segments geometry
    const linePositions = [];
    
    for (let i = 0; i < numPoints; i++) {
      const fraction = i / numPoints;
      const angle = fraction * Math.PI * 2 * turns;
      const y = (fraction - 0.5) * helixHeight;

      // Helix 1
      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      const p1 = new THREE.Vector3(x1, y, z1);
      helix1Points.push(p1);

      const sphere1 = new THREE.Mesh(sphereGeo, material1);
      sphere1.position.copy(p1);
      helixGroup.add(sphere1);

      // Helix 2 (180 degrees offset)
      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;
      const p2 = new THREE.Vector3(x2, y, z2);
      helix2Points.push(p2);

      const sphere2 = new THREE.Mesh(sphereGeo, material2);
      sphere2.position.copy(p2);
      helixGroup.add(sphere2);

      // Add cross-connection line positions
      if (i % 2 === 0) {
        linePositions.push(x1, y, z1);
        linePositions.push(x2, y, z2);
      }
    }

    // Lines connecting the helices
    const lineIndices = [];
    for (let i = 0; i < linePositions.length / 3; i++) {
      lineIndices.push(i);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMaterial);
    helixGroup.add(lines);

    // Faint cloud of background particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 40;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: primaryColor,
      transparent: true,
      opacity: 0.3
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Interactive tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = x * 0.5;
      mouseY = y * 0.4;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => onResize());
    resizeObserver.observe(container);

    // Animation loop
    let animationFrameId;
    let elapsed = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      elapsed += 0.008;

      targetRotX += (mouseX - targetRotX) * 0.05;
      targetRotY += (mouseY - targetRotY) * 0.05;

      helixGroup.rotation.y = elapsed;
      helixGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15;
      
      // Apply mouse movement response
      group.rotation.y = targetRotX;
      group.rotation.x = -targetRotY;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [primaryColor, secondaryColor]);

  return (
    <div
      ref={containerRef}
      className="three-bg-canvas"
      style={{ opacity }}
    />
  );
}
