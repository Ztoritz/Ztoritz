// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Adjust canvas style
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x6366f1, 0.8); // Violet tint
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

// Dice creation
const diceGroup = new THREE.Group();
scene.add(diceGroup);

const diceGeometry = new THREE.BoxGeometry(1, 1, 1);

// Function to create dice face texture
function createDiceTexture(number) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Background (Steel-ish color is handled by material, but texture needs base)
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, 128, 128);

    // Pips
    ctx.fillStyle = '#1e293b';
    const r = 12;

    const pips = {
        1: [[64, 64]],
        2: [[32, 32], [96, 96]],
        3: [[32, 32], [64, 64], [96, 96]],
        4: [[32, 32], [96, 32], [32, 96], [96, 96]],
        5: [[32, 32], [96, 32], [64, 64], [32, 96], [96, 96]],
        6: [[32, 32], [96, 32], [32, 64], [96, 64], [32, 96], [96, 96]]
    };

    if (pips[number]) {
        pips[number].forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

const materials = [
    new THREE.MeshStandardMaterial({ map: createDiceTexture(1), metalness: 0.7, roughness: 0.2 }), // Right
    new THREE.MeshStandardMaterial({ map: createDiceTexture(6), metalness: 0.7, roughness: 0.2 }), // Left
    new THREE.MeshStandardMaterial({ map: createDiceTexture(2), metalness: 0.7, roughness: 0.2 }), // Top
    new THREE.MeshStandardMaterial({ map: createDiceTexture(5), metalness: 0.7, roughness: 0.2 }), // Bottom
    new THREE.MeshStandardMaterial({ map: createDiceTexture(3), metalness: 0.7, roughness: 0.2 }), // Front
    new THREE.MeshStandardMaterial({ map: createDiceTexture(4), metalness: 0.7, roughness: 0.2 })  // Back
];

// Note: BoxGeometry UV mapping aligns specific faces. 
// Standard mapping: 0:Right, 1:Left, 2:Top, 3:Bottom, 4:Front, 5:Back
// We want face '6' to be on a specific side for easy solving. 
// Let's say we want '6' to be Front (index 4) for the final look.
// Re-ordering materials to match standard dice layout where opposites sum to 7.
// 0:Right(1), 1:Left(6), 2:Top(2), 3:Bottom(5), 4:Front(3), 5:Back(4) -> Standard
// Let's put 6 on Front (index 4) for easy alignment.
const solvedMaterials = [
    new THREE.MeshStandardMaterial({ map: createDiceTexture(1), metalness: 0.8, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ map: createDiceTexture(6), metalness: 0.8, roughness: 0.1 }), // Left
    new THREE.MeshStandardMaterial({ map: createDiceTexture(2), metalness: 0.8, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ map: createDiceTexture(5), metalness: 0.8, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ map: createDiceTexture(6), metalness: 0.8, roughness: 0.1 }), // Front - TARGET
    new THREE.MeshStandardMaterial({ map: createDiceTexture(1), metalness: 0.8, roughness: 0.1 })  // Back
];

const diceMeshes = [];
for (let i = 0; i < 6; i++) {
    const dice = new THREE.Mesh(diceGeometry, solvedMaterials);
    // Random initial position spread
    dice.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5 - 5);
    dice.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    diceGroup.add(dice);
    diceMeshes.push({
        mesh: dice,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, 0),
        rotVelocity: new THREE.Vector3((Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2),
        targetPos: new THREE.Vector3((i - 2.5) * 1.5, 3, -2), // Line up above text
        targetRot: new THREE.Euler(0, 0, 0) // Front face (6) forward
    });
}

camera.position.z = 5;

// Animation State
let state = 'TUMBLING'; // TUMBLING, SOLVING, SOLVED
let startTime = Date.now();
const tumbleDuration = 3000;
const solveDuration = 2000;

function animate() {
    requestAnimationFrame(animate);

    const now = Date.now();
    const elapsed = now - startTime;

    if (elapsed > tumbleDuration && state === 'TUMBLING') {
        state = 'SOLVING';
    }

    diceMeshes.forEach((d, i) => {
        if (state === 'TUMBLING') {
            d.mesh.rotation.x += d.rotVelocity.x;
            d.mesh.rotation.y += d.rotVelocity.y;
            d.mesh.rotation.z += d.rotVelocity.z;

            d.mesh.position.add(d.velocity);

            // Bounce off "walls" roughly
            if (Math.abs(d.mesh.position.x) > 6) d.velocity.x *= -1;
            if (Math.abs(d.mesh.position.y) > 4) d.velocity.y *= -1;

        } else if (state === 'SOLVING') {
            // Lerp to target
            const progress = Math.min((elapsed - tumbleDuration) / solveDuration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            d.mesh.position.lerp(d.targetPos, 0.05);

            // Smooth rotation is tricky with Euler, using Quaternions is better but let's try simple lerp for now
            // Actually, let's just set rotation to target * ease + current * (1-ease) logic
            // Or better: use Quaternion slerp

            const currentQ = d.mesh.quaternion.clone();
            const targetQ = new THREE.Quaternion().setFromEuler(d.targetRot);
            d.mesh.quaternion.slerp(targetQ, 0.05);

            if (progress >= 1) {
                state = 'SOLVED';
            }
        } else {
            // SOLVED - maybe gentle float
            d.mesh.position.y = d.targetPos.y + Math.sin(now * 0.001 + i) * 0.1;
        }
    });

    renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
