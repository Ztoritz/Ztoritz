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
renderer.domElement.style.zIndex = '10';

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x6366f1, 0.8); // Violet tint
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

// Physics Setup
const world = new CANNON.World();
world.gravity.set(0, 0, 0); // Zero gravity for floating effect
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;

// Materials
const diceMaterial = new CANNON.Material();
const contactMaterial = new CANNON.ContactMaterial(diceMaterial, diceMaterial, {
    friction: 0.1,
    restitution: 0.5 // Bounciness
});
world.addContactMaterial(contactMaterial);

// Dice creation
const diceGroup = new THREE.Group();
scene.add(diceGroup);

const diceGeometry = new THREE.BoxGeometry(1, 1, 1);
const diceShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)); // Half extents

// Function to create dice face texture
function createDiceTexture(number) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Background
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

    // Add border for definition
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

const materials = [
    new THREE.MeshStandardMaterial({ map: createDiceTexture(1), metalness: 0.5, roughness: 0.2 }), // Right
    new THREE.MeshStandardMaterial({ map: createDiceTexture(6), metalness: 0.5, roughness: 0.2 }), // Left
    new THREE.MeshStandardMaterial({ map: createDiceTexture(2), metalness: 0.5, roughness: 0.2 }), // Top
    new THREE.MeshStandardMaterial({ map: createDiceTexture(5), metalness: 0.5, roughness: 0.2 }), // Bottom
    new THREE.MeshStandardMaterial({ map: createDiceTexture(3), metalness: 0.5, roughness: 0.2 }), // Front
    new THREE.MeshStandardMaterial({ map: createDiceTexture(4), metalness: 0.5, roughness: 0.2 })  // Back
];

const diceMeshes = [];
const diceBodies = [];

for (let i = 0; i < 6; i++) {
    // Mesh
    const dice = new THREE.Mesh(diceGeometry, materials);
    diceGroup.add(dice);

    // Body
    const body = new CANNON.Body({
        mass: 1,
        shape: diceShape,
        material: diceMaterial,
        linearDamping: 0.5,
        angularDamping: 0.5
    });

    // Initial random position (Intro state)
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 8;
    const z = (Math.random() - 0.5) * 6 - 2;

    body.position.set(x, y, z);
    body.quaternion.setFromEuler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    // Initial random velocity
    body.velocity.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
    body.angularVelocity.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);

    world.addBody(body);
    diceBodies.push(body);

    diceMeshes.push({
        mesh: dice,
        body: body,
        localState: 'DEFAULT', // DEFAULT, SCRAMBLING, SOLVING, SOLVED
        targetPos: new THREE.Vector3((i - 2.5) * 1.5, 3, -2), // Line up above text
        targetRot: new THREE.Euler(),
        scrambleStartTime: 0,
        resultNumber: 1
    });
}

camera.position.z = 8;

// Animation State
let globalState = 'INTRO'; // INTRO, ASSEMBLING, IDLE
let startTime = Date.now();

// Interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    // Only allow interaction if we are in IDLE state
    if (globalState !== 'IDLE') return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(diceGroup.children);

    if (intersects.length > 0) {
        const clickedDiceMesh = intersects[0].object;
        const diceData = diceMeshes.find(d => d.mesh === clickedDiceMesh);

        // Only scramble if it's not already doing something
        if (diceData && diceData.localState === 'DEFAULT') {
            startScramble(diceData);
        }
    } else if (d.localState === 'SOLVING') {
        // Deterministic animation to target

        d.mesh.position.lerp(d.targetPos, 0.05);

        const targetQ = new THREE.Quaternion().setFromEuler(d.targetRot);
        d.mesh.quaternion.slerp(targetQ, 0.05);

        // Sync body to mesh (since we made it kinematic/slept, we manually move it)
        d.body.position.copy(d.mesh.position);
        d.body.quaternion.copy(d.mesh.quaternion);

        if (d.mesh.quaternion.angleTo(targetQ) < 0.01) {
            d.localState = 'SOLVED';
            setTimeout(() => {
                window.location.href = `page${d.resultNumber}.html`;
            }, 500);
        }
    }
});
function startScramble(diceData) {
    diceData.localState = 'SCRAMBLING';
    diceData.scrambleStartTime = Date.now();

    // Reset linear velocity to zero so we can control the path
    diceData.body.velocity.set(0, 0, 0);

    // Apply large random torque for spinning
    diceData.body.angularVelocity.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
    );

    diceData.body.wakeUp();
}

function getTargetRotation(number) {
    // 0:Right(1), 1:Left(6), 2:Top(2), 3:Bottom(5), 4:Front(3), 5:Back(4)
    const rot = new THREE.Euler();
    switch (number) {
        case 1: rot.set(0, -Math.PI / 2, 0); break;
        case 6: rot.set(0, Math.PI / 2, 0); break;
        case 2: rot.set(Math.PI / 2, 0, 0); break;
        case 5: rot.set(-Math.PI / 2, 0, 0); break;
        case 3: rot.set(0, 0, 0); break;
        case 4: rot.set(0, Math.PI, 0); break;
    }
    return rot;
}
friction: 0.0,
    restitution: 0.8 // Bouncier walls
});
world.addContactMaterial(wallContactMaterial);

function createWall(position, quaternion) {
    const wallBody = new CANNON.Body({
        mass: 0, // Static
        shape: new CANNON.Plane(),
        material: wallMaterial
    });
    wallBody.position.copy(position);
    wallBody.quaternion.copy(quaternion);
    world.addBody(wallBody);
    walls.push(wallBody);
    return wallBody;
}

// Initial walls (will be updated on resize)
const leftWall = createWall(new CANNON.Vec3(-10, 0, 0), new CANNON.Quaternion().setFromEuler(0, Math.PI / 2, 0));
const rightWall = createWall(new CANNON.Vec3(10, 0, 0), new CANNON.Quaternion().setFromEuler(0, -Math.PI / 2, 0));
const topWall = createWall(new CANNON.Vec3(0, 10, 0), new CANNON.Quaternion().setFromEuler(Math.PI / 2, 0, 0));
const bottomWall = createWall(new CANNON.Vec3(0, -10, 0), new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0));

function updateBounds() {
    // Calculate visible width/height at z=0
    // vFOV = camera.fov * Math.PI / 180
    // visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z
    // visibleWidth = visibleHeight * camera.aspect

    const vFOV = camera.fov * Math.PI / 180;
    const distance = camera.position.z; // Assuming dice are around z=0
    const visibleHeight = 2 * Math.tan(vFOV / 2) * distance;
    const visibleWidth = visibleHeight * camera.aspect;

    const margin = 0.5; // Small margin to keep dice fully on screen

    // Update wall positions
    // Left: normal (1, 0, 0) -> Rot -90 Y -> Points Right. Pos should be -width/2
    leftWall.position.set(-visibleWidth / 2 + margin, 0, 0);

    // Right: normal (0, 0, 1) -> Rot 90 Y -> Points Left. Pos should be width/2
    rightWall.position.set(visibleWidth / 2 - margin, 0, 0);

    // Top: normal (0, 0, 1) -> Rot 90 X -> Points Down. Pos should be height/2
    topWall.position.set(0, visibleHeight / 2 - margin, 0);

    // Bottom: normal (0, 0, 1) -> Rot -90 X -> Points Up. Pos should be -height/2
    bottomWall.position.set(0, -visibleHeight / 2 + margin, 0);
}

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateBounds();
});

// Initial update
updateBounds();

function animate() {
    requestAnimationFrame(animate);

    const now = Date.now();
    const elapsed = now - startTime;

    // Global State Transitions
    if (globalState === 'INTRO' && elapsed > 2000) {
        globalState = 'ASSEMBLING';
    } else if (globalState === 'ASSEMBLING' && elapsed > 4000) {
        globalState = 'IDLE';
    }

    // Step physics world
    world.step(timeStep);

    diceMeshes.forEach((d) => {
        // Sync mesh with physics body
        d.mesh.position.copy(d.body.position);
        d.mesh.quaternion.copy(d.body.quaternion);

        if (d.localState === 'DEFAULT') {
            if (globalState === 'INTRO') {
                // Keep them somewhat on screen
                if (d.body.position.length() > 10) {
                    const force = d.body.position.clone().negate().scale(0.2);
                    d.body.applyForce(force, d.body.position);
                }
            } else if (globalState === 'ASSEMBLING' || globalState === 'IDLE') {
                // Spring force to target position
                const k = 3; // Spring stiffness
                const damping = 0.8; // Damping

                const currentPos = new THREE.Vector3().copy(d.body.position);
                const target = d.targetPos;

                // F = -k * (x - target) - c * v
                const dist = target.clone().sub(currentPos);
                const force = dist.multiplyScalar(k);

                const velocity = new THREE.Vector3().copy(d.body.velocity);
                force.sub(velocity.multiplyScalar(damping));

                d.body.applyForce(new CANNON.Vec3(force.x, force.y, force.z), d.body.position);

                // Add small random noise in IDLE to make them "move slightly"
                if (globalState === 'IDLE') {
                    d.body.applyForce(new CANNON.Vec3(
                        (Math.random() - 0.5) * 0.5,
                        (Math.random() - 0.5) * 0.5,
                        (Math.random() - 0.5) * 0.5
                    ), d.body.position);
                }
            }
        } else if (d.localState === 'SCRAMBLING') {
            // Apply spring force to pull it to center (0, 0, 4)
            const centerPos = new THREE.Vector3(0, 0, 4);
            const k = 5; // Stronger spring
            const damping = 0.5;

            const currentPos = new THREE.Vector3().copy(d.body.position);
            const dist = centerPos.clone().sub(currentPos);
            const force = dist.multiplyScalar(k);

            const velocity = new THREE.Vector3().copy(d.body.velocity);
            force.sub(velocity.multiplyScalar(damping));

            d.body.applyForce(new CANNON.Vec3(force.x, force.y, force.z), d.body.position);

            // Scramble for 1.5 seconds
            if (now - d.scrambleStartTime > 1500) {
                d.localState = 'SOLVING';
                d.resultNumber = Math.floor(Math.random() * 6) + 1;
                d.targetRot = getTargetRotation(d.resultNumber);

                // Lock in center screen location
                d.targetPos.set(0, 0, 4);

                // Disable physics for solving
                d.body.sleep();
                d.body.type = CANNON.Body.KINEMATIC; // Make it kinematic so it doesn't move by forces
            }
        } else if (d.localState === 'SOLVING') {
            // Deterministic animation to target

            d.mesh.position.lerp(d.targetPos, 0.05);

            const targetQ = new THREE.Quaternion().setFromEuler(d.targetRot);
            d.mesh.quaternion.slerp(targetQ, 0.05);

            // Sync body to mesh (since we made it kinematic/slept, we manually move it)
            d.body.position.copy(d.mesh.position);
            d.body.quaternion.copy(d.mesh.quaternion);

            if (d.mesh.quaternion.angleTo(targetQ) < 0.01) {
                d.localState = 'SOLVED';
                setTimeout(() => {
                    window.location.href = `page${d.resultNumber}.html`;
                }, 500);
            }
        }
    });

    renderer.render(scene, camera);
}
