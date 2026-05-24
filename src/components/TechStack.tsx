import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Decal } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

// ─── Devicon CDN base ─────────────────────────────────────────────────────────
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const techStack = [
  // Programming Languages
  { name: "C",            url: `${DEVICON}/c/c-original.svg` },
  { name: "C++",          url: `${DEVICON}/cplusplus/cplusplus-original.svg` },
  { name: "Python",       url: `${DEVICON}/python/python-original.svg` },
  { name: "Java",         url: `${DEVICON}/java/java-original.svg` },
  { name: "MATLAB",       url: `${DEVICON}/matlab/matlab-original.svg` },

  // Web Technologies
  { name: "HTML",         url: `${DEVICON}/html5/html5-original.svg` },
  { name: "CSS",          url: `${DEVICON}/css3/css3-original.svg` },
  { name: "JavaScript",   url: `${DEVICON}/javascript/javascript-original.svg` },
  { name: "TypeScript",   url: `${DEVICON}/typescript/typescript-original.svg` },
  { name: "React",        url: `${DEVICON}/react/react-original.svg` },
  { name: "Node.js",      url: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: "Express",      url: `${DEVICON}/express/express-original.svg` },

  // Databases & Cloud
  { name: "MongoDB",      url: `${DEVICON}/mongodb/mongodb-original.svg` },
  { name: "MySQL",        url: `${DEVICON}/mysql/mysql-original.svg` },
  { name: "AWS",          url: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  { name: "Google Cloud", url: `${DEVICON}/googlecloud/googlecloud-original.svg` },
  { name: "Docker",       url: `${DEVICON}/docker/docker-original.svg` },
  { name: "Kubernetes",   url: `${DEVICON}/kubernetes/kubernetes-plain.svg` },
  { name: "Terraform",    url: `${DEVICON}/terraform/terraform-original.svg` },

  // Tools & Platforms
  { name: "Git",          url: `${DEVICON}/git/git-original.svg` },
  { name: "GitHub",       url: `${DEVICON}/github/github-original.svg` },
  { name: "GitLab",       url: `${DEVICON}/gitlab/gitlab-original.svg` },
  { name: "Linux",        url: `${DEVICON}/linux/linux-original.svg` },
  { name: "Postman",      url: `${DEVICON}/postman/postman-original.svg` },
];

// ─── Shared geometry & material (created once, reused by all spheres) ─────────
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#e6e6e6",
  metalness: 0.15,
  roughness: 0.75,
});
function createTransparentTexture() {
  const texture = new THREE.DataTexture(
    new Uint8Array([0, 0, 0, 0]),
    1,
    1,
    THREE.RGBAFormat
  );
  texture.needsUpdate = true;
  return texture;
}

function configureTexture(texture: THREE.Texture) {
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 16;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

async function svgToThreeTexture(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);

    const svgText = await response.text();
    const objectUrl = URL.createObjectURL(
      new Blob([svgText], { type: "image/svg+xml" })
    );

    try {
      const image = document.createElement("img");
      image.decoding = "async";
      image.src = objectUrl;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`Failed to render ${url}`));
      });

      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Failed to create texture canvas context");

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      return configureTexture(new THREE.CanvasTexture(canvas));
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
    return createTransparentTexture();
  }
}

// Pre-allocated vectors for render-loop reuse (avoids GC pressure)
const _scaleVec = new THREE.Vector3();
const _targetVec = new THREE.Vector3();

// Wider spread so no sphere hides another's decal
const spread = 2.1;

const spheres = [...Array(techStack.length)].map(() => ({
  scale: [0.8, 1, 1.2][Math.floor(Math.random() * 3)],
}));

// ─── SphereGeo ────────────────────────────────────────────────────────────────
type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  texture: THREE.Texture;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  texture,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    _scaleVec.set(
      -50 * delta * scale,
      -150 * delta * scale,
      -50 * delta * scale
    );
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(_scaleVec);
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(25) * spread, r(25) * spread - 25, r(25) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        scale={scale}
        geometry={sphereGeometry}
        material={sphereMaterial}
      >
        {/* Decal: logo sticker on front hemisphere */}
        <Decal
          position={[0, 0, 1.15]}
          rotation={[0, 0, 0]}
          scale={0.92}
          map={texture}
        >
          <meshStandardMaterial
            map={texture}
            transparent
            depthTest={true}
            depthWrite={true}
            polygonOffset
            polygonOffsetFactor={-4}
          />
        </Decal>
      </mesh>
    </RigidBody>
  );
}

// ─── Pointer ──────────────────────────────────────────────────────────────────
type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    _targetVec.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    vec.lerp(_targetVec, 0.2);
    ref.current?.setNextKinematicTranslation(vec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

// ─── TechStack (scene root) ───────────────────────────────────────────────────
const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [textures, setTextures] = useState<THREE.Texture[]>(() =>
    techStack.map(() => createTransparentTexture())
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    techStack.forEach((tech, index) => {
      svgToThreeTexture(tech.url).then((texture) => {
        if (!isMounted) return;
        setTextures((current) => {
          const next = [...current];
          next[index] = texture;
          return next;
        });
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="techstack">
      <h2 className="techstack-title">MY TECHSTACK</h2>

      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, stencil: true, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas techstack-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          intensity={1}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />

        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              texture={textures[i % textures.length]}
              isActive={isActive}
            />
          ))}
        </Physics>

        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
