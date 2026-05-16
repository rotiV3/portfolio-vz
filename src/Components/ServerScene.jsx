import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServerScene({ containerRef }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef?.current || document.body;

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ── Scene & Camera ───────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.5, 6);

    // ── Lights ───────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const redFill = new THREE.PointLight(0xff2222, 2, 8);
    redFill.position.set(-3, 1, 3);
    scene.add(redFill);

    const blueFill = new THREE.PointLight(0x4444ff, 1, 8);
    blueFill.position.set(3, -1, 3);
    scene.add(blueFill);

    // ── Materials ────────────────────────────────────────────────────────────
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x111118, metalness: 0.9, roughness: 0.25 });
    const midMetal  = new THREE.MeshStandardMaterial({ color: 0x1c1c28, metalness: 0.85, roughness: 0.3 });
    const lightMetal = new THREE.MeshStandardMaterial({ color: 0x2a2a3a, metalness: 0.8, roughness: 0.35 });
    const redMat    = new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.6, roughness: 0.4 });
    const screenMat = new THREE.MeshStandardMaterial({ color: 0x001100, emissive: 0x00ff44, emissiveIntensity: 0.3 });
    const ledGreen  = new THREE.MeshStandardMaterial({ color: 0x00ff44, emissive: 0x00ff44, emissiveIntensity: 1.5 });
    const ledOrange = new THREE.MeshStandardMaterial({ color: 0xff8800, emissive: 0xff8800, emissiveIntensity: 1.2 });

    // ── Helper ───────────────────────────────────────────────────────────────
    const box = (w, h, d, mat, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      return m;
    };

    // ── Server Rack ──────────────────────────────────────────────────────────
    const rack = new THREE.Group();
    scene.add(rack);

    // Cabinet body (hollow effect: top/bottom/left/right panels)
    const W = 2.2, H = 4.0, D = 1.4;
    const T = 0.06; // panel thickness

    const topPanel    = box(W, T, D, darkMetal, 0,  H/2, 0);
    const bottomPanel = box(W, T, D, darkMetal, 0, -H/2, 0);
    const leftPanel   = box(T, H, D, midMetal, -W/2, 0, 0);
    const rightPanel  = box(T, H, D, midMetal,  W/2, 0, 0);
    const backPanel   = box(W, H, T, darkMetal, 0, 0, -D/2);
    rack.add(topPanel, bottomPanel, leftPanel, rightPanel, backPanel);

    // Top accent stripe
    rack.add(box(W, 0.04, D, redMat, 0, H/2 - 0.12, 0));

    // Corner rails (vertical)
    [-W/2 + 0.05, W/2 - 0.05].forEach(x => {
      const rail = box(0.06, H - 0.1, 0.06, lightMetal, x, 0, D/2 - 0.04);
      rack.add(rail);
    });

    // ── 1U Server Blades (inside rack) ──────────────────────────────────────
    const blades = new THREE.Group();
    const bladeCount = 16;
    const bladeH = (H - 0.3) / bladeCount;
    const blades_arr = [];

    for (let i = 0; i < bladeCount; i++) {
      const blade = new THREE.Group();
      const y = -H / 2 + 0.15 + i * bladeH + bladeH / 2;

      const body = box(W - 0.16, bladeH - 0.015, D - 0.1, i % 4 === 0 ? lightMetal : midMetal, 0, 0, 0);
      blade.add(body);

      // LED row on each blade
      const ledCount = 4;
      for (let j = 0; j < ledCount; j++) {
        const led = box(0.025, 0.025, 0.025, j === 0 ? ledGreen : ledOrange,
          -0.6 + j * 0.15, 0, D / 2 - 0.08);
        blade.add(led);
      }

      // Small fan grilles
      for (let f = 0; f < 3; f++) {
        const fan = new THREE.Mesh(
          new THREE.CylinderGeometry(bladeH * 0.35, bladeH * 0.35, 0.02, 8),
          lightMetal
        );
        fan.rotation.x = Math.PI / 2;
        fan.position.set(0.4 + f * 0.25, 0, D / 2 - 0.06);
        blade.add(fan);
      }

      blade.position.set(0, y, 0);
      blades.add(blade);
      blades_arr.push(blade);
    }
    rack.add(blades);

    // ── Front Door ───────────────────────────────────────────────────────────
    const door = new THREE.Group();
    door.position.set(-W / 2, 0, D / 2); // hinge on left edge

    const doorPanel = box(W, H - 0.08, T, darkMetal, W / 2, 0, 0);

    // Door mesh/grille cutout visual (perforated look)
    const grille = box(W * 0.7, H * 0.6, T * 0.5, lightMetal, W / 2, 0, 0.02);
    grille.material = new THREE.MeshStandardMaterial({
      color: 0x0a0a14, metalness: 0.95, roughness: 0.1,
      wireframe: false, transparent: true, opacity: 0.85
    });

    // Door accent stripe
    const doorStripe = box(W, 0.06, T * 1.5, redMat, W / 2, H / 2 - 0.22, 0);

    // Door handle
    const handle = box(0.06, 0.35, 0.08, lightMetal, W / 2, 0, 0.04);

    door.add(doorPanel, grille, doorStripe, handle);
    rack.add(door);

    // ── Top Screen Panel ─────────────────────────────────────────────────────
    const screenPivot = new THREE.Group();
    screenPivot.position.set(0, H / 2 - 0.02, D / 2 - 0.05);

    const screenBody = new THREE.Group();
    const screenFrame = box(W * 0.8, 0.9, 0.06, darkMetal, 0, -0.45, 0);
    const screen     = box(W * 0.72, 0.75, 0.01, screenMat, 0, -0.45, 0.04);

    // Screen text lines (emissive bars)
    for (let i = 0; i < 5; i++) {
      const line = box(W * 0.55, 0.025, 0.001,
        new THREE.MeshStandardMaterial({ color: 0x00ff44, emissive: 0x00ff44, emissiveIntensity: 0.8 }),
        (Math.random() - 0.5) * 0.2, -0.25 - i * 0.1, 0.045);
      screenBody.add(line);
    }

    screenBody.add(screenFrame, screen);
    screenPivot.add(screenBody);
    rack.add(screenPivot);

    // ── Side Panel (right, for contact section) ──────────────────────────────
    const sidePanelPivot = new THREE.Group();
    sidePanelPivot.position.set(W / 2, 0, 0);

    const sidePanel = box(T * 2, H - 0.08, D - 0.06, midMetal, T, 0, 0);

    // Cable connectors on side panel
    for (let i = 0; i < 6; i++) {
      const port = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 0.06, 8),
        lightMetal
      );
      port.rotation.z = Math.PI / 2;
      port.position.set(T * 3, -0.5 + i * 0.22, (Math.random() - 0.5) * 0.5);
      sidePanelPivot.add(port);
    }

    sidePanelPivot.add(sidePanel);
    rack.add(sidePanelPivot);

    // ── Rack Tilt (cinematic angle) ──────────────────────────────────────────
    rack.rotation.y = -0.25;
    rack.rotation.x = 0.04;
    rack.position.set(0.4, -0.2, 0);

    // ── Floor reflection plane ───────────────────────────────────────────────
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({ color: 0x080810, metalness: 0.3, roughness: 0.8 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -H / 2 - 0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── Floating particles (data stream) ────────────────────────────────────
    const particleGeo = new THREE.BufferGeometry();
    const pCount = 200;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0xff2222, size: 0.03, transparent: true, opacity: 0.6 })
    );
    scene.add(particles);

    // ── State object for animations ──────────────────────────────────────────
    const state = {
      doorAngle: 0,
      screenAngle: 0,
      sidePanelAngle: 0,
      cameraZ: 6,
      cameraX: 0,
      cameraY: 0.5,
      rackRotY: -0.25,
    };

    // ── GSAP ScrollTrigger animations ────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    // Section 0 → 1 (Home → About): screen panel tilts open
    tl.to(state, {
      screenAngle: -1.1,
      cameraZ: 4.5,
      cameraY: 0.8,
      rackRotY: -0.4,
      ease: 'power2.inOut',
      duration: 1,
      onUpdate: () => {
        screenBody.rotation.x = state.screenAngle;
        camera.position.z = state.cameraZ;
        camera.position.y = state.cameraY;
        rack.rotation.y   = state.rackRotY;
        // Brighten screen
        screenMat.emissiveIntensity = 0.3 + Math.abs(state.screenAngle / 1.1) * 1.2;
      }
    })

    // Section 1 → 2 (About → Projects): screen closes, front door swings open
    .to(state, {
      screenAngle: -0.05,
      doorAngle: -1.45,
      cameraZ: 5,
      cameraX: -0.5,
      cameraY: 0,
      rackRotY: -0.15,
      ease: 'power2.inOut',
      duration: 1,
      onUpdate: () => {
        screenBody.rotation.x = state.screenAngle;
        door.rotation.y      = state.doorAngle;
        camera.position.z    = state.cameraZ;
        camera.position.x    = state.cameraX;
        camera.position.y    = state.cameraY;
        rack.rotation.y      = state.rackRotY;
        screenMat.emissiveIntensity = 0.3;
      }
    })

    // Section 2 → 3 (Projects → Contact): door closes, side panel opens
    .to(state, {
      doorAngle: -0.05,
      sidePanelAngle: 1.35,
      cameraZ: 4.8,
      cameraX: 0.8,
      cameraY: 0.1,
      rackRotY: -0.5,
      ease: 'power2.inOut',
      duration: 1,
      onUpdate: () => {
        door.rotation.y            = state.doorAngle;
        sidePanelPivot.rotation.y  = state.sidePanelAngle;
        camera.position.z          = state.cameraZ;
        camera.position.x          = state.cameraX;
        camera.position.y          = state.cameraY;
        rack.rotation.y            = state.rackRotY;
      }
    });

    // ── LED blink ────────────────────────────────────────────────────────────
    gsap.to(ledGreen, {
      emissiveIntensity: 0.2,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
    gsap.to(ledOrange, {
      emissiveIntensity: 0.3,
      duration: 0.35,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });

    // ── Animate Loop ─────────────────────────────────────────────────────────
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // gentle sway
      rack.rotation.y += (state.rackRotY - rack.rotation.y) * 0.05;
      rack.position.y = -0.2 + Math.sin(t * 0.4) * 0.012;

      // rotate particles slowly
      particles.rotation.y = t * 0.04;

      // camera look-at
      camera.lookAt(0, 0.2, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ───────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
