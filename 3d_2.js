// 3D_2 Scene with Spline Placeholder
const container3D2 = document.getElementById('3D_2');

if (container3D2) {
    const scene3D2 = new THREE.Scene();
    // Camera setup
    const camera3D2 = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera3D2.position.z = 3;

    const renderer3D2 = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer3D2.setSize(200, 200); // Fixed size matching CSS
    container3D2.appendChild(renderer3D2.domElement);

    // Lights
    const ambientLight3D2 = new THREE.AmbientLight(0xffffff, 0.5);
    scene3D2.add(ambientLight3D2);

    const pointLight3D2 = new THREE.PointLight(0xffffff, 1);
    pointLight3D2.position.set(5, 5, 5);
    scene3D2.add(pointLight3D2);

    // Create a Spline (Curve)
    // Generate random points for a cool abstract shape
    const numPoints = 20;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 2;
        // Trefoil knot-ish parametric equation for interesting shape
        const x = (Math.sin(t) + 2 * Math.sin(2 * t)) * 0.3;
        const y = (Math.cos(t) - 2 * Math.cos(2 * t)) * 0.3;
        const z = (-Math.sin(3 * t)) * 0.3;
        points.push(new THREE.Vector3(x, y, z));
    }

    // Close the loop
    points.push(points[0]);

    const curve = new THREE.CatmullRomCurve3(points);
    curve.closed = true;
    curve.tension = 0.5;

    // Create Tube Geometry from the curve
    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.08, 8, true);
    const tubeMaterial = new THREE.MeshStandardMaterial({
        color: 0x10b981, // Emerald
        roughness: 0.3,
        metalness: 0.8,
        wireframe: false
    });

    const splineMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);

    // Center it
    const box = new THREE.Box3().setFromObject(splineMesh);
    const center = box.getCenter(new THREE.Vector3());
    splineMesh.position.sub(center);

    scene3D2.add(splineMesh);

    // Animation variables
    let time = 0;

    function animate3D2() {
        requestAnimationFrame(animate3D2);

        time += 0.01;

        // Rotate the whole spline
        splineMesh.rotation.x = time * 0.5;
        splineMesh.rotation.y = time * 0.3;

        // Optional: Pulse the color or scale
        const scale = 1 + Math.sin(time * 2) * 0.1;
        splineMesh.scale.setScalar(scale);

        renderer3D2.render(scene3D2, camera3D2);
    }

    animate3D2();
}
