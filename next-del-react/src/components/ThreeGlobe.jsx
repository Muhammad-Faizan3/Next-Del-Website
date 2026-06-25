import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeGlobe({
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
    camera.position.set(0, 0, 5.5);

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

    // Globe Group (so we can rotate it together)
    const globeGroup = new THREE.Group();
    group.add(globeGroup);

    // Base Sphere representation
    const radius = 1.8;

    // 1. Globe wireframe shell
    const globeGeo = new THREE.SphereGeometry(radius, 24, 24);
    const globeMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      emissive: primaryColor,
      emissiveIntensity: 0.05
    });
    const wireGlobe = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(wireGlobe);

    // 2. Dots/Particles on the surface of the globe
    const particlesCount = 350;
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pPositions[i * 3] = x;
      pPositions[i * 3 + 1] = y;
      pPositions[i * 3 + 2] = z;
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: secondaryColor,
      transparent: true,
      opacity: 0.65
    });
    const globePoints = new THREE.Points(pGeometry, pMaterial);
    globeGroup.add(globePoints);

    // 3. Network Arcs/Connections
    const arcCount = 12;
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    // Helper to get random points on a sphere
    const getRandomPointOnSphere = (r) => {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    };

    const arcMaterial = new THREE.LineBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.28
    });

    for (let i = 0; i < arcCount; i++) {
      const start = getRandomPointOnSphere(radius);
      const end = getRandomPointOnSphere(radius);
      
      // Calculate control point for quadratic bezier curve (pull it outwards for the arc effect)
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const length = mid.length();
      mid.normalize().multiplyScalar(radius * (1.1 + Math.random() * 0.35));

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(24);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(curveGeo, arcMaterial);
      arcGroup.add(line);
    }

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Interaction tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let spinSpeed = 0.0035;

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = x * 0.6;
      mouseY = y * 0.5;
      
      // Speed up rotation when mouse moves (indicates activity)
      spinSpeed = 0.0035 + Math.abs(x) * 0.008;
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

    // Animation Loop
    let animationFrameId;
    let elapsed = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      elapsed += 0.01;

      globeGroup.rotation.y += spinSpeed;
      globeGroup.rotation.x += 0.0004;

      // Mouse interactive tilt
      targetRotX += (mouseX - targetRotX) * 0.05;
      targetRotY += (mouseY - targetRotY) * 0.05;

      group.rotation.y = targetRotX;
      group.rotation.x = -targetRotY;

      // Pulsing effect
      const scale = 1.0 + Math.sin(elapsed * 1.5) * 0.012;
      globeGroup.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

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
