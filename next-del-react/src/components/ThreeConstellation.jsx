import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeConstellation({
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
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Node Count
    const nodeCount = 65;
    const nodes = [];
    const maxDistance = 2.4;

    const nodeGeometry = new THREE.SphereGeometry(0.045, 6, 6);
    const primaryMat = new THREE.MeshBasicMaterial({ color: primaryColor });
    const secondaryMat = new THREE.MeshBasicMaterial({ color: secondaryColor });

    // Group to hold everything
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Create random nodes
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(
        nodeGeometry,
        Math.random() > 0.4 ? primaryMat : secondaryMat
      );
      
      mesh.position.set(
        (Math.random() - 0.5) * 8.5,
        (Math.random() - 0.5) * 8.5,
        (Math.random() - 0.5) * 6
      );

      // Random velocities
      mesh.userData = {
        vx: (Math.random() - 0.5) * 0.006,
        vy: (Math.random() - 0.5) * 0.006,
        vz: (Math.random() - 0.5) * 0.006
      };

      networkGroup.add(mesh);
      nodes.push(mesh);
    }

    // Line segments setup
    const maxConnections = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(lines);

    // Interactive mouse state
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = x * 0.6;
      mouseY = y * 0.5;
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

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Move nodes
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.position.x += node.userData.vx;
        node.position.y += node.userData.vy;
        node.position.z += node.userData.vz;

        // Boundaries checks
        if (node.position.x < -4.5 || node.position.x > 4.5) node.userData.vx *= -1;
        if (node.position.y < -4.5 || node.position.y > 4.5) node.userData.vy *= -1;
        if (node.position.z < -3.5 || node.position.z > 3.5) node.userData.vz *= -1;
      }

      // Update lines
      let connectionIdx = 0;
      const posAttr = lineGeometry.attributes.position.array;
      const colorAttr = lineGeometry.attributes.color.array;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = n1.position.distanceTo(n2.position);

          if (dist < maxDistance) {
            // Draw line
            const offset = connectionIdx * 6;

            posAttr[offset] = n1.position.x;
            posAttr[offset + 1] = n1.position.y;
            posAttr[offset + 2] = n1.position.z;

            posAttr[offset + 3] = n2.position.x;
            posAttr[offset + 4] = n2.position.y;
            posAttr[offset + 5] = n2.position.z;

            // Connect color based on distance (fades out at max distance)
            const alpha = 1.0 - dist / maxDistance;
            const c = new THREE.Color(secondaryColor).multiplyScalar(alpha);

            colorAttr[offset] = c.r;
            colorAttr[offset + 1] = c.g;
            colorAttr[offset + 2] = c.b;

            colorAttr[offset + 3] = c.r;
            colorAttr[offset + 4] = c.g;
            colorAttr[offset + 5] = c.b;

            connectionIdx++;
          }
        }
      }

      lineGeometry.setDrawRange(0, connectionIdx * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Mouse interactive tilt
      targetRotX += (mouseX - targetRotX) * 0.05;
      targetRotY += (mouseY - targetRotY) * 0.05;

      networkGroup.rotation.y = targetRotX;
      networkGroup.rotation.x = -targetRotY;
      networkGroup.rotation.z += 0.0006; // Faint continuous spin

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
