import * as THREE from "three";
import { createObjects } from "./create_objects.js";

export function create_Enemy() {

   
    let body_color = 0x800000; //Vermelho Escuro;
    let leg_color = 0x000000; //Preto
    
    //Cabeça do inimigo
    const head_geometry = new THREE.SphereGeometry(3);
    const head_material = new THREE.MeshToonMaterial({ color: 0xCFFE0BD }); // Cor de pele Caucasiana
    const head = new THREE.Mesh(head_geometry, head_material);
    head.castShadow = true;
    head.name = "enemy_head";


    //Olhos do inimigo
    const left_eye_geometry = new THREE.SphereGeometry(0.5);
    const left_eye_material = new THREE.MeshToonMaterial({ color: 0xFFFFFF }); // Branco
    const left_eye = new THREE.Mesh(left_eye_geometry, left_eye_material);
    left_eye.castShadow = true;
    left_eye.name = "enemy_left_eye";
    const right_eye = left_eye.clone();
    right_eye.name = "enemy_right_eye";


    //Iris do inimigo
    const left_iris_geometry = new THREE.SphereGeometry(0.3);
    const left_iris_material = new THREE.MeshToonMaterial({ color: 0xA1CAF1 }); // Azul bebé
    const left_iris = new THREE.Mesh(left_iris_geometry, left_iris_material);
    left_iris.castShadow = true;
    left_iris.name = "enemy_left_iris";
    const right_iris = left_iris.clone();
    right_iris.name = "enemy_right_iris";

    // Pulupilas do inimigo
    const left_pupil_geometry = new THREE.SphereGeometry(0.15);
    const left_pupil_material = new THREE.MeshToonMaterial({ color: 0x000000 }); // Preto
    const left_pupil = new THREE.Mesh(left_pupil_geometry, left_pupil_material);
    left_pupil.castShadow = true;
    left_pupil.name = "enemy_left_pupil";
    const right_pupil = left_pupil.clone();
    right_pupil.name = "enemy_right_pupil";

  

    // Bandana do inimigo
    const bandana_geometry = new THREE.CylinderGeometry(3, 1, 4);
    const bandana_material = new THREE.MeshToonMaterial({ color: 0xE5B80B }); //Mesma cor que a fita
    const bandana = new THREE.Mesh(bandana_geometry, bandana_material);

    bandana.castShadow = true;
    bandana.name = "enemy_bandana";

    //Corpo do inimigo
    const body_geometry = new THREE.CylinderGeometry(2, 2, 5.8);
    const body_material = new THREE.MeshToonMaterial({ color: body_color });
    const body = new THREE.Mesh(body_geometry, body_material);
    body.castShadow = true;
    body.name = "enemy_body";
   
    //Pernas do inimigo
    const left_leg_geometry = new THREE.CylinderGeometry(1.5, 1.5, 5);
    const left_leg_material = new THREE.MeshToonMaterial({ color: leg_color });
    const left_leg = new THREE.Mesh(left_leg_geometry, left_leg_material);
    left_leg.castShadow = true;
    left_leg.name = "enemy_left_leg";
    const right_leg = left_leg.clone();
    right_leg.name = "enemy_right_leg";

    //Braços do inimigo
    const left_arm_geometry = new THREE.CylinderGeometry(1, 1, 7);
    const left_arm_material = new THREE.MeshToonMaterial({ color: body_color }); //A cor dos braços é a mesma do corpo
    const left_arm = new THREE.Mesh(left_arm_geometry, left_arm_material);
    left_arm.rotation.z = Math.PI / 2;
    left_arm.castShadow = true;
    left_arm.name = "enemy_left_arm";
    const right_arm = left_arm.clone();
    right_arm.name = "enemy_right_arm";


    // Luvas do inimigo
    const left_glove_geometry = new THREE.SphereGeometry(1);
    const left_glove_material = new THREE.MeshToonMaterial({ color: 0x000000 }); // Preto
    const left_glove = new THREE.Mesh(left_glove_geometry, left_glove_material);
    left_glove.castShadow = true;
    left_glove.name = "enemy_left_glove";
    const right_glove = left_glove.clone();
    right_glove.name = "enemy_right_glove";
    

    //Sapatos do inimigo
    const left_shoe_geometry = new THREE.BoxGeometry(2, 2.2, 2);
    const left_shoe_material = new THREE.MeshToonMaterial({ color: 0x964B00 }); // Castanho
    const left_shoe = new THREE.Mesh(left_shoe_geometry, left_shoe_material);
    left_shoe.castShadow = true;
    left_shoe.name = "enemy_left_shoe";
    const right_shoe = left_shoe.clone();
    right_shoe.name = "enemy_right_shoe";


    const hat = createObjects("hat",4,8,"game","enemy");
    hat.scale.set(1.6, 1.6, 1.6);
    hat.name = "enemy_hat";


    const revolver =  createObjects("revolver",4,8,"game","enemy");
    revolver.name = "enemy_revolver";
    revolver.rotation.z = -0.5 * Math.PI ;
    revolver.scale.set(2,2,2);



    
   


    // Definir a posição e orientação dos diferentes elementos do inimigo
    head.position.y = 14.3;

    hat.position.set(head.position.x , head.position.y - 12 , head.position.z);
    

    left_eye.position.set(head.position.x + 2, head.position.y - 13, head.position.z + 1.5);
    right_eye.position.set(left_eye.position.x, left_eye.position.y, -left_eye.position.z);

    left_iris.position.set(left_eye.position.x -1.6 , left_eye.position.y -1.2, left_eye.position.z - 1.5 );
    right_iris.position.set(right_eye.position.x  - 1.6, right_eye.position.y -1.2, right_eye.position.z +1.5);

    left_pupil.position.set(left_iris.position.x - 0.2, left_iris.position.y - 0.1, left_iris.position.z);
    right_pupil.position.set(right_iris.position.x -0.2, right_iris.position.y - 0.1, right_iris.position.z);
    
    bandana.position.set(head.position.x + 1.1, head.position.y - 15.5, head.position.z);
    
    
    body.position.y = 8.5;

    left_leg.position.set(body.position.x, body.position.y - 14, body.position.z - 0.5);
    right_leg.position.set(left_leg.position.x, left_leg.position.y, -left_leg.position.z );

    left_arm.position.set(body.position.x +2.5 , body.position.y - 6.2, body.position.z + 3);
    
    right_arm.position.set(left_arm.position.x, left_arm.position.y, -left_arm.position.z);
  
    left_glove.position.set(left_arm.position.x  - 2.5, left_arm.position.y - 6, left_arm.position.z - 3);
    right_glove.position.set(right_arm.position.x - 2.5, right_arm.position.y - 6, right_arm.position.z + 3);




    left_shoe.position.set(left_leg.position.x + 0.4, left_leg.position.y + 3 , left_leg.position.z);
    right_shoe.position.set(right_leg.position.x + 0.4, right_leg.position.y + 3 , right_leg.position.z);



    revolver.position.set(right_glove.position.x , right_glove.position.y + 2.5, right_glove.position.z);

    left_shoe.rotation.z = Math.PI / 2;
    right_shoe.rotation.z = Math.PI / 2;

    const enemy = new THREE.Group();

    right_glove.add(revolver);
    left_arm.add(left_glove);
    right_arm.add(right_glove);

    left_iris.add(left_pupil);
    right_iris.add(right_pupil);
    left_eye.add(left_iris);
    right_eye.add(right_iris);

    head.add(hat);
    head.add(left_eye);
    head.add(right_eye);
    head.add(bandana)
    enemy.add(head);

 
    left_leg.add(left_shoe);
    right_leg.add(right_shoe);
    body.add(left_leg);
    body.add(right_leg);
    enemy.add(body);

    body.add(left_arm);
    body.add(right_arm);


    enemy.castShadow = true;

    enemy.bullets = 8;

    enemy.rotation.y = Math.PI ;


    enemy.shoot_sound;

    enemy.can_shoot = true; 



 

    return enemy;

}
