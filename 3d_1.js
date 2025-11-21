// 3D_1 Placeholder Scene
const container3D1 = document.getElementById('3D_1');

if (container3D1) {
    const scene3D1 = new THREE.Scene();
    // Small camera for the corner
    const camera3D1 = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera3D1.position.z = 3;

    const renderer3D1 = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer3D1.setSize(200, 200); // Fixed size matching CSS
    container3D1.appendChild(renderer3D1.domElement);

    // Geometry - Icosahedron for a cool look
    const geometry3D1 = new THREE.IcosahedronGeometry(1, 0);
    const material3D1 = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        wireframe: true,
        metalness: 0.5,
        roughness: 0.5
    });
    const mesh3D1 = new THREE.Mesh(geometry3D1, material3D1);
    scene3D1.add(mesh3D1);

    // Lights
    const ambientLight3D1 = new THREE.AmbientLight(0xffffff, 0.8);
    scene3D1.add(ambientLight3D1);

    const pointLight3D1 = new THREE.PointLight(0xffffff, 1);
    pointLight3D1.position.set(2, 2, 2);
    scene3D1.add(pointLight3D1);

    // Animation
    function animate3D1() {
        requestAnimationFrame(animate3D1);

        mesh3D1.rotation.x += 0.01;
        mesh3D1.rotation.y += 0.01;

        renderer3D1.render(scene3D1, camera3D1);
    }

    animate3D1();
}
