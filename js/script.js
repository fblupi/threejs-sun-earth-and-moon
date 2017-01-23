var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer({alpha: true}),
    sol, tierra, luna;

function renderScene() {
    tierra.animate();
    sol.animate();
    luna.animate();
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
}

function main() {
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    
    // Eventos del raton
    MOUSE.initialize("#canvas");

    // Añadir cámara
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;
    camera.lookAt(scene.position);

    // Añadir luz
    var luzCamara = new Luz(0x555555, camera.position.x, camera.position.y, camera.position.z, true, "ambient");
    luzCamara.model(scene);
    
    // Modelo
    sol = new Astro(6 / 2, "res/sol.jpg", 0, 0, 0.002, false, true);
    sol.model();
    
    tierra = new Astro(1.27 / 2, "res/tierra.jpg", 6, 0.001, 0.005, false, false);
    tierra.model();
    
    luna = new Astro(0.34 / 2, "res/luna.jpg", 1, 0.01, 0, true, false);
    luna.model();
    
    scene.add(sol.get());
    sol.addSatelite(tierra.get());
    tierra.addSatelite(luna.get());
    
    $("#canvas").append(renderer.domElement);

    renderScene();
}

main();