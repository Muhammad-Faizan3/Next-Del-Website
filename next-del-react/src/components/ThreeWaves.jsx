import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeWaves({
  color = 0x00c853,
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
    camera.position.set(0, 4, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Grid Dimensions
    const amountX = 45;
    const amountY = 45;
    const spacing = 0.35;
    const numParticles = amountX * amountY;

    // Geometry
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    // Initial positioning in XZ plane
    let i = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        positions[i] = ix * spacing - (amountX * spacing) / 2; // X
        positions[i + 1] = 0; // Y
        positions[i + 2] = iy * spacing - (amountY * spacing) / 2; // Z
        
        scales[ix * amountY + iy] = 1;
        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Shader Material for varying particle sizes/glow
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) },
      },
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.47) {
            discard;
          }
          gl_FragColor = vec4(color, 0.7);
        }
      `,
      transparent: true,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
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

    // Animation variables
    let count = 0;
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const positionsAttr = geometry.attributes.position.array;
      const scalesAttr = geometry.attributes.scale.array;

      let idx = 0;
      count += 0.04;

      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          // Calculate base wave heights using multi-frequency sine functions
          const baseHeight = (Math.sin(ix * 0.15 + count) * 0.4) + (Math.sin(iy * 0.15 + count) * 0.4);
          
          // Hover distortion effect: calculate distance from current particle to mouse influence center
          const particleX = positionsAttr[idx];
          const particleZ = positionsAttr[idx + 2];
          
          // Target point on grid mapped from mouse position
          const targetX = mouseX * 5;
          const targetZ = mouseY * 5;
          const dist = Math.sqrt(Math.pow(particleX - targetX, 2) + Math.pow(particleZ - targetZ, 2));
          
          // Local ripple height
          const ripple = dist < 2.5 ? Math.sin(dist * 2.0 - count * 2) * 0.3 * (1.0 - dist / 2.5) : 0;

          // Apply coordinates
          positionsAttr[idx + 1] = baseHeight + ripple; // Update Y

          // Update scale based on wave height
          scalesAttr[ix * amountY + iy] = (Math.sin(ix * 0.15 + count) + 1) * 0.35 + (Math.sin(iy * 0.15 + count) + 1) * 0.35 + (ripple !== 0 ? 0.3 : 0) + 0.1;
          
          idx += 3;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.scale.needsUpdate = true;

      // Gentle camera sway
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (4 + mouseY * 1 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

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
  }, [color]);

  return (
    <div
      ref={containerRef}
      className="three-bg-canvas"
      style={{ opacity }}
    />
  );
}
