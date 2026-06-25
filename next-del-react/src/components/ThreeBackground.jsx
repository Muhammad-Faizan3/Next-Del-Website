import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground({
  primaryColor = 0x00c853,
  secondaryColor = 0x69f0ae,
  emissiveColor = 0x00a844,
  opacity = 0.3
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
    camera.position.set(0, 0, 6);

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

    // Central Blob
    const geoBlob = new THREE.IcosahedronGeometry(1.4, 20);
    const matBlob = new THREE.MeshStandardMaterial({
      color: primaryColor,
      roughness: 0.2,
      metalness: 0.7,
      emissive: emissiveColor,
      emissiveIntensity: 0.2,
    });
    const blob = new THREE.Mesh(geoBlob, matBlob);
    group.add(blob);

    // Wireframe Shell
    const geoWire = new THREE.DodecahedronGeometry(1.9, 0);
    const matWire = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      emissive: secondaryColor,
      emissiveIntensity: 0.05,
    });
    const wire = new THREE.Mesh(geoWire, matWire);
    group.add(wire);

    // Orbiting Rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      emissive: secondaryColor,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.25,
      roughness: 0.3,
      metalness: 0.6,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.03, 12, 60), ringMat);
    ring1.rotation.x = Math.PI / 2;
    group.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.02, 12, 60), ringMat);
    ring2.rotation.z = Math.PI / 3;
    ring2.rotation.x = Math.PI / 4;
    group.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.015, 12, 60), ringMat);
    ring3.rotation.z = -Math.PI / 4;
    ring3.rotation.y = Math.PI / 3;
    group.add(ring3);

    // Floating Particles
    const particleGroup = new THREE.Group();
    group.add(particleGroup);

    const particleMat = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      emissive: secondaryColor,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.5,
    });

    const particles = [];
    const count = 50;
    for (let i = 0; i < count; i++) {
      const size = 0.03 + Math.random() * 0.08;
      const geo = new THREE.BoxGeometry(size, size, size);
      const mesh = new THREE.Mesh(geo, particleMat.clone());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.5 + Math.random() * 1.0;
      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      mesh.userData = {
        theta: theta,
        phi: phi,
        radius: radius,
        speed: 0.06 + Math.random() * 0.2,
        offset: Math.random() * 100,
      };
      particleGroup.add(mesh);
      particles.push(mesh);
    }

    // Glow Aura
    const glowGeo = new THREE.SphereGeometry(2.8, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.025,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    group.add(glow);

    // Lights
    const ambient = new THREE.AmbientLight(0x404070, 0.4);
    scene.add(ambient);

    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(2, 3, 4);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(secondaryColor, 0.5);
    light2.position.set(-3, -1, 2);
    scene.add(light2);

    // Interaction State
    let elapsed = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = x * 0.8;
      mouseY = y * 0.6;
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const x = (t.clientX / window.innerWidth) * 2 - 1;
        const y = -(t.clientY / window.innerHeight) * 2 + 1;
        mouseX = x * 0.8;
        mouseY = y * 0.6;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

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
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      elapsed += 0.01;

      targetRotX += (mouseX - targetRotX) * 0.04;
      targetRotY += (mouseY - targetRotY) * 0.04;

      group.rotation.y += 0.002;
      group.rotation.x += Math.sin(elapsed * 0.12) * 0.0005;
      group.rotation.z += Math.sin(elapsed * 0.08) * 0.0003;

      group.rotation.x += targetRotY * 0.0015;
      group.rotation.y += targetRotX * 0.002;

      const pulse = 1 + Math.sin(elapsed * 0.8) * 0.02;
      blob.scale.set(pulse, pulse, pulse);
      blob.material.emissiveIntensity = 0.15 + Math.sin(elapsed * 0.6) * 0.08;

      wire.rotation.x += 0.0008;
      wire.rotation.y += 0.0015;

      ring1.rotation.z += 0.003;
      ring2.rotation.x += 0.0025;
      ring2.rotation.y += 0.0015;
      ring3.rotation.y += 0.004;
      ring3.rotation.x += 0.0015;

      for (let p of particles) {
        const d = p.userData;
        d.theta += 0.003 * d.speed;
        d.phi += 0.0015 * d.speed;
        p.position.x = d.radius * Math.sin(d.phi) * Math.cos(d.theta);
        p.position.y = d.radius * Math.sin(d.phi) * Math.sin(d.theta);
        p.position.z = d.radius * Math.cos(d.phi);
        const s = 1 + Math.sin(elapsed * 1.5 + d.offset) * 0.25;
        p.scale.set(s, s, s);
      }

      glow.scale.setScalar(1 + Math.sin(elapsed * 0.35) * 0.015);
      glow.material.opacity = 0.025 + Math.sin(elapsed * 0.4) * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [primaryColor, secondaryColor, emissiveColor]);

  return (
    <div
      ref={containerRef}
      className="three-bg-canvas"
      style={{ opacity }}
    />
  );
}
