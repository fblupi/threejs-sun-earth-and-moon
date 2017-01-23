function Luz (color, posX, posY, posZ, shadow, tipo) {  
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.posZ = posZ;
    this.shadow = shadow;
    this.light = null;
    
    this.model = function (group) {
        switch (tipo) {
            case "point":
                this.light = new THREE.PointLight(this.color);
                this.light.position.set(this.posX, this.posY, this.posZ);
                this.light.castShadow = this.shadow;                
                break;
            case "ambient":
                this.light = new THREE.AmbientLight(this.color);
                this.light.position.set(this.posX, this.posY, this.posZ);
                this.light.castShadow = this.shadow;
                break;
            case "spot":
                this.light = new THREE.SpotLight(this.color);
                this.light.position.set(this.posX, this.posY, this.posZ);
                this.light.castShadow = this.shadow;
                break;
            default:
                this.light = new THREE.AmbientLight(this.color);
                this.light.position.set(this.posX, this.posY, this.posZ);
                this.light.castShadow = this.shadow;
        }
        group.add(this.light);
    };
    
};