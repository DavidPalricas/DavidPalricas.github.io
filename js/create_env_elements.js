import * as THREE from "three";


export function create_Env_models(model,level){
    switch(model){
        case "plane":
            model = createPlane(level);
            break;
        case "tree":
            model = createTree();
            break;
        case "rock":
            model = createRock();
            break;
        case "lake":
            model = createLake();
            break;

        case "bush":
            model = createBush();
            break;

        case "cactus":
            model = createCactus();
            break;
        default:
            break;
    }

    return model;

}




function createPlane(level){
    // The GROUND plane

    let plane_texture;

    if(level == 1){
        plane_texture = "grass.png";
    }
    else if(level == 2){
        plane_texture = "sand.jpg";

    }
  

    const planeGeometry = new THREE.PlaneGeometry(1000, 700);
    const plane = createMesh(planeGeometry, plane_texture);

    // Rotate and position the plane

    
    plane.rotation.x = -0.5 * Math.PI; // TODO: What happens if you comment out this line of code?
   
    plane.receiveShadow = true;
    plane.name = "plane";
   

    return plane
}



function createTree() {
    const cylinderRadius = 5;

    const cylinderHeight = 50;

    const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);

    const redMaterial = new THREE.MeshPhongMaterial({ color: 0x402F1D }); // Castanho Madeira

    const cylinder = new THREE.Mesh(cylinderGeometry, redMaterial);
    cylinder.castShadow = true;

    // Move base of the cylinder to y = 0

    cylinder.position.y = cylinderHeight / 2.0;

    // Cone

    const baseConeRadius = 12;

    const coneHeight = 25;

    const coneGeometry = new THREE.ConeGeometry(baseConeRadius, coneHeight, 32);

    const greenMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22});

    const cone = new THREE.Mesh(coneGeometry, greenMaterial);
    cone.castShadow = true;

    // Move base of the cone to the top of the cylinder

    cone.position.y = cylinderHeight + coneHeight / 2.0;



    // Tree

    const tree = new THREE.Group();


    tree.add(cylinder);

    tree.add(cone);

    tree.castShadow = true;


  

    return tree;


}


function createRock() {
    const geometry = new THREE.SphereGeometry(5);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const rock = new THREE.Mesh(geometry, material);

    rock.rotation.x = -0.5 * Math.PI;


    rock.castShadow= true;
    rock.receiveShadow = true;





    return rock;




}


function createLake() {
    const geometry = new THREE.CircleGeometry(30);
    const material = new THREE.MeshPhongMaterial({ color: 0x0000FF });
    const lake = new THREE.Mesh(geometry, material);

    lake.rotation.x = -0.5 * Math.PI;

    lake.receiveShadow = true;

    lake.name = "lake";




    return lake;


}


function createBush() {
    const geometry = new THREE.SphereGeometry(5);
    const material = new THREE.MeshPhongMaterial({ color: 0x228B22});
    const bush = new THREE.Mesh(geometry, material);



    bush.castShadow= true;
    bush.receiveShadow = true;

    return bush;
}

function createCactus() {
    const body_geometry = new THREE.CapsuleGeometry(1.5, 10);
    const body_material = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const body = createMesh(body_geometry, "cactus.jpg");

    body.castShadow = true;
    body.name = "cactus_body";
    body.position.y = 5;

    const cactus = new THREE.Group();
    cactus.add(body);

    return cactus;
}



function createMesh(geom, imageFile) {
    const texture = new THREE.TextureLoader().load("../textures/" + imageFile);
    texture.minFilter = THREE.LinearFilter; // Ou use outras opções de filtragem
    const material = new THREE.MeshStandardMaterial({ map: texture });
   
    const mesh = new THREE.Mesh(geom, material);
    return mesh;
}

