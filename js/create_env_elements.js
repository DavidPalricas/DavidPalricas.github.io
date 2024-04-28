import * as THREE from "three";
import { createMesh } from "./get_texture.js";


export function create_Env_models(model,level){
    switch(model){
        case "plane":
            model = createPlane(level);
            break;
        case "tree":
            model = createTree(level);
            break;
        case "rock":
            model = createRock(level);
            break;
        case "lake":
            model = createLake();
            break;

        case "bush":
            model = createBush(level);
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
        plane_texture = "sand.jpg";
    }
    else if(level == 2){
        plane_texture = "grass.png";

    }
    else if(level == 3){
        plane_texture = "snow.jpg";

    }
    else{
        plane_texture = "canyon.jpg";
    }
  

    const planeGeometry = new THREE.PlaneGeometry(1000, 700);
    const plane = createMesh(planeGeometry, plane_texture);

    // Rotate and position the plane

    
    plane.rotation.x = -0.5 * Math.PI; // TODO: What happens if you comment out this line of code?
   
    plane.receiveShadow = true;
    plane.name = "plane";
   

    return plane
}



function createTree(level) {
    let leaves_color;
    if(level != 3){
        leaves_color = 0x228B22; // Green
       
    }
    else{
        leaves_color = 0x013220; // Verde Escuro
    }
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

    const greenMaterial = new THREE.MeshPhongMaterial({ color: leaves_color});

    const cone = new THREE.Mesh(coneGeometry, greenMaterial);
    cone.castShadow = true;

    // Move base of the cone to the top of the cylinder

    cone.position.y = cylinderHeight + coneHeight / 2.0;



    // Tree

    const tree = new THREE.Group();


    tree.add(cylinder);

    tree.add(cone);


    if(level == 3){
        const snow = createMesh(new THREE.ConeGeometry(11,22), "snow.jpg");
        snow.position.set(cone.position.x,cone.position.y- 60,cone.position.z);
        cone.add(snow);
    }

    tree.castShadow = true;


  

    return tree;


}


function createRock(level) {
    let rock_color;

    if(level != 4){
        rock_color = 0x808080; // Cinzento

    }else{
        rock_color = 0xB26B5D; //Cor de rocha ddo grand canyon

    }
    const geometry = new THREE.SphereGeometry(5);
    const material = new THREE.MeshPhongMaterial({ color: rock_color });
    const rock_mesh = new THREE.Mesh(geometry, material);
     
    const rock = new THREE.Group();
    rock.add(rock_mesh);
    rock.rotation.x = -0.5 * Math.PI;


    rock.castShadow= true;
    rock.receiveShadow = true;


    if (level == 3) {
        const snow = createMesh(new THREE.SphereGeometry(4.5), "snow.jpg");
        snow.position.set(rock.position.x, rock.position.y, rock.position.z+2);
        rock.add(snow);
        
    }





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


function createBush(level) {

    let bush_color; 


    if(level != 3){
        bush_color = 0x228B22; // Green
    }else{
        bush_color = 0x013220; // Verde Escuro
    }

    const geometry = new THREE.SphereGeometry(5);
    const material = new THREE.MeshPhongMaterial({ color: bush_color});
    const bush_mesh = new THREE.Mesh(geometry, material);
     
    const bush = new THREE.Group();



    bush.add(bush_mesh);
    bush.castShadow= true;
    bush.receiveShadow = true;

    if (level == 3) {
        const snow = createMesh(new THREE.SphereGeometry(4.5), "snow.jpg");
        snow.position.set(bush.position.x, bush.position.y+2, bush.position.z);
        bush.add(snow);
        
    }

    return bush;
}

function createCactus() {
    const body_geometry = new THREE.CapsuleGeometry(1.5, 10);
    const body = createMesh(body_geometry, "cactus.jpg");

    body.castShadow = true;
    body.name = "cactus_body";
    body.position.y = 5;

    const cactus = new THREE.Group();
    cactus.add(body);

    return cactus;
}






