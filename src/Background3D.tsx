import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Background3DProps {
  theme: 'dark' | 'light';
}

export default function Background3D({ theme }: Background3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme === 'dark' ? 0x000000 : 0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    // Important: apply a fixed positioning class or inline style
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.opacity = '0.9';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // 4D Tesseract vertices (16 points in 4D)
    const vertices4D: number[][] = [];
    for (let i = 0; i < 16; i++) {
      vertices4D.push([
        (i & 1) ? 1 : -1,
        (i & 2) ? 1 : -1,
        (i & 4) ? 1 : -1,
        (i & 8) ? 1 : -1
      ]);
    }

    // 32 edges: connect vertices that differ in exactly one coordinate
    const edges: number[][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices4D[i][k] !== vertices4D[j][k]) diff++;
        }
        if (diff === 1) edges.push([i, j]);
      }
    }

    function rotate4D(v: number[], angleXW: number, angleYZ: number, angleXY: number) {
      let [x, y, z, w] = v;

      let cosA = Math.cos(angleXW), sinA = Math.sin(angleXW);
      let nx = x * cosA - w * sinA;
      let nw = x * sinA + w * cosA;
      x = nx; w = nw;

      let cosB = Math.cos(angleYZ), sinB = Math.sin(angleYZ);
      let ny = y * cosB - z * sinB;
      let nz = y * sinB + z * cosB;
      y = ny; z = nz;

      let cosC = Math.cos(angleXY), sinC = Math.sin(angleXY);
      nx = x * cosC - y * sinC;
      ny = x * sinC + y * cosC;
      x = nx; y = ny;

      return [x, y, z, w];
    }

    function project4Dto3D(v4: number[]) {
      const distance = 3;
      const w = v4[3];
      const scale = distance / (distance - w);
      return new THREE.Vector3(
        v4[0] * scale * 2.5,
        v4[1] * scale * 2.5,
        v4[2] * scale * 2.5
      );
    }

    const linePositions = new Float32Array(edges.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineColor = theme === 'dark' ? 0xffffff : 0x000000;
    const lineMat = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.15
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);

    const dotGeo = new THREE.SphereGeometry(0.06, 6, 6);
    const dotMat = new THREE.MeshBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.25
    });
    const dots: THREE.Mesh[] = [];
    for (let i = 0; i < 16; i++) {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      scene.add(dot);
      dots.push(dot);
    }

    let scrollAngle = window.scrollY * 0.0012;
    let mouseX = 0, mouseY = 0;
    let time = 0;
    let animationFrameId: number;

    const onScroll = () => {
      scrollAngle = window.scrollY * 0.0012;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.008;

      const angleXW = scrollAngle + time * 0.3;
      const angleYZ = scrollAngle * 0.7 + time * 0.2;
      const angleXY = time * 0.15;

      const projected = vertices4D.map(v => {
        const rotated = rotate4D(v, angleXW, angleYZ, angleXY);
        return project4Dto3D(rotated);
      });

      const pos = lineGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const pa = projected[a];
        const pb = projected[b];
        pos[i * 6 + 0] = pa.x;
        pos[i * 6 + 1] = pa.y;
        pos[i * 6 + 2] = pa.z;
        pos[i * 6 + 3] = pb.x;
        pos[i * 6 + 4] = pb.y;
        pos[i * 6 + 5] = pb.z;
      }
      lineGeo.attributes.position.needsUpdate = true;

      for (let i = 0; i < 16; i++) {
        dots[i].position.copy(projected[i]);
      }

      linesMesh.position.x += (mouseX * 0.8 - linesMesh.position.x) * 0.02;
      linesMesh.position.y += (-mouseY * 0.5 - linesMesh.position.y) * 0.02;
      dots.forEach(d => {
        d.position.x += mouseX * 0.8 * 0.02;
        d.position.y += -mouseY * 0.5 * 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      lineGeo.dispose();
      lineMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return <div ref={mountRef} />;
}
