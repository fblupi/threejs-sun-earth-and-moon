function Astro (radio, urlTextura, distancia, velRotOrb, velRot, stoppable, luz) {   
    this.RESOLUCION = 64;
    this.radio = radio;
    this.urlTextura = urlTextura;
    this.distancia = distancia;
    this.velRot = velRot;
    this.velRotOrb = velRotOrb;
    this.stoppable = stoppable;
    this.luz = luz;
    this.sphere = null;
    this.bg = null;
    this.tgRot = null;
    this.tgRotOrb = null;
    this.tgDis = null;
    
    this.model = function () {
        var sphereGeometry = new THREE.SphereGeometry(this.radio, this.RESOLUCION, this.RESOLUCION),
            sphereMaterial;
        if (this.luz) {
            sphereMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(this.urlTextura)});
        } else {
            sphereMaterial = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture(this.urlTextura)});
        }
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position.x = 0;
        this.sphere.position.y = 0;
        this.sphere.position.z = 0;
        if (this.luz) {
            this.sphere.castShadow = false;
        } else {
            this.sphere.castShadow = true;
        }
        
        this.bg = new THREE.Object3D;
        this.tgRotOrb = new THREE.Object3D;
        this.tgDis = new THREE.Object3D;
        this.tgRot = new THREE.Object3D;
        
        this.tgRot.add(this.sphere);
        this.tgDis.add(this.tgRot);
        this.tgRotOrb.add(this.tgDis);
        this.bg.add(this.tgRotOrb);
        
        if (this.luz) {
            var luzAstro = new Luz(0xFFFFFF, this.sphere.position.x, this.sphere.position.y, this.sphere.position.z, true, "point");
            luzAstro.model(this.tgRot);    
        }
    };
    
    this.get = function () {
        return this.bg;    
    };
    
    this.animate = function () {        
        if(!this.stoppable || !MOUSE.click) {
            this.tgRotOrb.rotation.y += this.velRotOrb;
        } else {
            this.tgRotOrb.rotation.y += 0;    
        }
        this.tgDis.position.x = this.distancia;
        this.tgRot.rotation.y += this.velRot;
    };
    
    this.addSatelite = function (satelite) {
        this.tgDis.add(satelite);
    };
    
};