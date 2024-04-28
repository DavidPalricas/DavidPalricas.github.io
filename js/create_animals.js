import * as THREE from "three";
export function create_Animal_Model(model,level){
   switch (model) {
    case "duck":
        model = createDuck();
        break;
    case "fox":
        model = createFox(level);
        break;
   
    case "boar":
        model = createBoar();
        break;

    case "vulture":
        model = createVulture();
        break;

    case "coyote":
        model = createCoyote();
        break;

    default:
        break;
   }

   return model;
     
}




function createDuck() {
     const feathers_color = 0x8B6C5C; // Castanho

    
    //Cabeça do pato
    const head_geometry = new THREE.SphereGeometry(1.8);
    const head_material = new THREE.MeshPhongMaterial({ color: 0x8000}); // Verde Escuro
    const head = new THREE.Mesh(head_geometry, head_material);
    head.name = "duck_head";
    head.castShadow = true;

    //Olhos do pato
    const left_eye_geometry = new THREE.SphereGeometry(0.4);
    const left_eye_material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF }); // Branco
    const left_eye = new THREE.Mesh(left_eye_geometry, left_eye_material);
    left_eye.castShadow = true;
    left_eye.name = "duck_left_eye";
    const right_eye = left_eye.clone();
    right_eye.name = "duck_right_eye";


    // Iris do pato
    const left_iris_geometry = new THREE.SphereGeometry(0.2);
    const left_iris_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const left_iris = new THREE.Mesh(left_iris_geometry, left_iris_material);
    left_iris.name = "duck_left_iris";
    left_iris.castShadow = true;
    const right_iris = left_iris.clone();
    right_iris.name = "duck_right_iris";

    //Bico do pato
    const beek_geometry = new THREE.BoxGeometry(1.5, 1.5, 0.6);
    const beek_material = new THREE.MeshPhongMaterial({ color: 0xFFFF00 }); // Amarelo
    const beek = new THREE.Mesh(beek_geometry, beek_material);
    beek.name = "duck_beek";
    beek.castShadow = true;

    //Corpo do pato
    const body_geometry = new THREE.CapsuleGeometry(2, 1.7);
    const body_material = new THREE.MeshPhongMaterial({ color: feathers_color }); 
    const body = new THREE.Mesh(body_geometry, body_material);
    body.name = "duck_body";
    body.castShadow = true;

    //Asas do pato
    const left_wing_geometry = new THREE.BoxGeometry(0.5, 4, 1);
    const left_wing_material = new THREE.MeshPhongMaterial({ color: feathers_color }); // Castanho
    const left_wing = new THREE.Mesh(left_wing_geometry, left_wing_material);
    left_wing.name = "duck_left_wing";
    left_wing.castShadow = true;
    const right_wing = left_wing.clone();
    right_wing.name = "duck_right_wing";


    // Pernas  do pato
    const left_leg_geometry = new THREE.CylinderGeometry(0.4, 0.4, 3.2);
    const left_leg_material = new THREE.MeshPhongMaterial({ color: 0xFF5B00 }); // Laranja
    const left_leg = new THREE.Mesh(left_leg_geometry, left_leg_material);
    left_leg.name = "duck_left_leg";
    left_leg.castShadow = true;
    const right_leg = left_leg.clone();
    right_leg.name = "duck_right_leg";



    // Definir a posição e orientação dos diferentes elementos do pato
    body.position.set(0, 10, 0);

    head.position.set(body.position.x + 2.3, body.position.y + 2, body.position.z);

    left_eye.position.set(head.position.x, head.position.y + 0.5, head.position.z + 1.5);
    right_eye.position.set(head.position.x, head.position.y + 0.5, head.position.z - 1.5);

    left_iris.position.set(left_eye.position.x, left_eye.position.y + 0.2, left_eye.position.z + 0.3);
    right_iris.position.set(right_eye.position.x, right_eye.position.y + 0.2, right_eye.position.z - 0.3);

    beek.rotation.y = 0.5 * Math.PI;
    beek.position.set(head.position.x - 0.5, head.position.y + 2, head.position.z);

    left_wing.position.set(body.position.x  , body.position.y , body.position.z +2);
    left_wing.rotation.x = 0.6 * Math.PI;

    right_wing.position.set(body.position.x, body.position.y,body.position.z -2) ;
    right_wing.rotation.x = 0.4 * Math.PI;

    left_leg.position.set(body.position.x - 1.2, body.position.y - 3.5, body.position.z + 0.8);
    left_leg.rotation.y = 0.5 * Math.PI;

    right_leg.position.set(body.position.x - 1.2, body.position.y - 3.5, body.position.z - 0.8);
    right_leg.rotation.y = 0.5 * Math.PI;


    // Criar o pato
    const duck = new THREE.Group();
    duck.add(body);
    duck.add(head);
    duck.add(left_eye);
    duck.add(right_eye);
    duck.add(left_iris);
    duck.add(right_iris);
    duck.add(beek);
    duck.add(left_leg);
    duck.add(right_leg);
    duck.add(left_wing);
    duck.add(right_wing);
 
    duck.castShadow = true;

    duck.rotation.z = 0.4 * Math.PI;

    
    // Prpriedades usadas no movimento do pato
        duck.alive = true;

        duck.speed = 6;

        duck.step = -0.08;


        duck.dist = 0; // Distância percorrida pelo pato

        duck.rotate = 0.5 * Math.PI; // Rotação do pato para inversão do sentido de movimento

        duck.wing_amplitude = Math.PI/8; // Amplitude do movimento das asas do pato
        duck.wing_speed = 1.3; // Velocidade do movimento das asas do pato


    

    return duck;
}




function createFox(level) {


    let fox_pur;
   

    if (level != 3) {
        fox_pur = 0xFFA500; // Laranja
            
    }
    else{
        fox_pur = 0xFFFFFF; 
    }
    //Cabeça da raposa
    const head_geometry = new THREE.SphereGeometry(2);
    const head_material = new THREE.MeshPhongMaterial({ color: fox_pur}); // Laranja
    const head = new THREE.Mesh(head_geometry, head_material);
    head.name = "fox_head";
    head.castShadow = true;



    //Face inferior
    const lower_face_geometry = new THREE.SphereGeometry(1.56);
    const lower_face_material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF});
    const lower_face = new THREE.Mesh(lower_face_geometry, lower_face_material);
    lower_face.name = "fox_lower_face";
    lower_face.castShadow = true;

    //Sobraçelhas da raposa
    const left_eyebrow_geometry = new THREE.BoxGeometry(0.2, 0.2, 0.6);
    const left_eyebrow_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const left_eyebrow = new THREE.Mesh(left_eyebrow_geometry, left_eyebrow_material);
    left_eyebrow.name = "fox_left_eyebrow";
    left_eyebrow.castShadow = true;
    const right_eyebrow = left_eyebrow.clone();
    right_eyebrow.name = "fox_right_eyebrow";

    //Olhos do raposa
    const left_eye_geometry = new THREE.SphereGeometry(0.6);
    const left_eye_material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF }); // Branco
    const left_eye = new THREE.Mesh(left_eye_geometry, left_eye_material);
    left_eye.castShadow = true;
    left_eye.name = "fox_left_eye";
    const right_eye = left_eye.clone();
    right_eye.name = "fox_right_eye";

    //Iris da raposa
    const left_iris_geometry = new THREE.SphereGeometry(0.3);
    const left_iris_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const left_iris = new THREE.Mesh(left_iris_geometry, left_iris_material);
    left_iris.name = "fox_left_iris";
    left_iris.castShadow = true;
    const right_iris = left_iris.clone();


    //Focinho da raposa
    const snout_geometry = new THREE.CylinderGeometry(0.5, 0.5, 3.5);
    const snout_material = new THREE.MeshPhongMaterial({ color: fox_pur}); // Preto
    const snout = new THREE.Mesh(snout_geometry, snout_material);
    snout.name = "fox_snout";
    snout.castShadow = true;


    //Nariz da raposa
    const nose_geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5);
    const nose_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const nose = new THREE.Mesh(nose_geometry, nose_material);
    nose.name = "fox_nose";
    nose.castShadow = true;

    // Orelhas da raposa
    const left_ear_geometry = new THREE.BoxGeometry(0.8, 1.5, 0.8);
    const left_ear_material = new THREE.MeshPhongMaterial({ color: fox_pur}); // Laranja
    const left_ear = new THREE.Mesh(left_ear_geometry, left_ear_material);
    left_ear.name = "fox_left_ear";
    left_ear.castShadow = true;
    const right_ear = left_ear.clone();
    right_ear.name = "fox_right_ear";

    //Boca da raposa
    const mouth_geometry = new THREE.BoxGeometry(1, 1, 1);
    const mouth_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const mouth = new THREE.Mesh(mouth_geometry, mouth_material);
    mouth.name = "fox_mouth";
    mouth.castShadow = true;

    //Corpo da raposa
    const body_geometry = new THREE.CapsuleGeometry(2.2, 3.2);
    const body_material = new THREE.MeshPhongMaterial({ color: fox_pur}); // Laranja
    const body = new THREE.Mesh(body_geometry, body_material);
    body.name = "fox_body";
    body.castShadow = true;

    //Cauda da raposa
    const tail_geometry = new THREE.CylinderGeometry(0.7, 0, 4);
    const tail_material = new THREE.MeshPhongMaterial({ color: fox_pur}); // Laranja
    const tail = new THREE.Mesh(tail_geometry, tail_material);
    tail.name = "fox_tail";
    tail.castShadow = true;

    //Ponta da cauda da raposa
    const tail_tip_geometry = new THREE.CylinderGeometry(0, 0.7, 1);
    const tail_tip_material = new THREE.MeshPhongMaterial({ color: 0x00000 }); // Preto
    const tail_tip = new THREE.Mesh(tail_tip_geometry, tail_tip_material);
    tail_tip.name = "fox_tail_tip";
    tail_tip.castShadow = true;


    //Pernas da raposa
    const front_left_leg_geometry = new THREE.CylinderGeometry(0.5, 0.5, 2);
    const front_left_leg_material = new THREE.MeshPhongMaterial({ color: fox_pur}); // Laranja
    const front_left_leg = new THREE.Mesh(front_left_leg_geometry, front_left_leg_material);
    front_left_leg.name = "fox_front_left_leg";
    front_left_leg.castShadow = true;
    front_left_leg.rotation.z = 0.5 * Math.PI;
    const front_right_leg = front_left_leg.clone();
    front_right_leg.name = "fox_front_right_leg";
    const back_left_leg = front_left_leg.clone();
    back_left_leg.name = "fox_back_left_leg";
    const back_right_leg = front_left_leg.clone();
    back_right_leg.name = "fox_back_right_leg";

    //Patas da raposa
    const front_left_paw_geometry = new THREE.BoxGeometry(0.5, 1, 0.8);
    const front_left_paw_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const front_left_paw = new THREE.Mesh(front_left_paw_geometry, front_left_paw_material);
    front_left_paw.name = "fox_front_left_paw";
    front_left_paw.castShadow = true;
    const front_right_paw = front_left_paw.clone();
    front_right_paw.name = "fox_front_right_paw";
    const back_left_paw = front_left_paw.clone();
    back_left_paw.name = "fox_back_left_paw";
    const back_right_paw = front_left_paw.clone();
    back_right_paw.name = "fox_back_right_paw";


    body.position.set(0, 3.5, 0);
    body.rotation.z = -0.5 * Math.PI;


    head.position.set(body.position.x + 3, body.position.y, body.position.z);

    lower_face.position.set(head.position.x -2.5 , head.position.y - 4, head.position.z);
    lower_face.rotation.x = -0.5 * Math.PI;


    left_eyebrow.position.set(head.position.x -1.9, head.position.y - 2, head.position.z + 0.8);
    left_eyebrow.rotation.z = 0.2 * Math.PI;
    right_eyebrow.position.set(head.position.x -1.9, head.position.y -2, head.position.z - 0.8);
    right_eyebrow.rotation.z = 0.2 * Math.PI;

    left_eye.position.set(head.position.x -1.8 , head.position.y -2.9, head.position.z + 0.8);
    right_eye.position.set(head.position.x -1.8, head.position.y -2.9, head.position.z - 0.8);

    left_iris.position.set(left_eye.position.x - 0.8, left_eye.position.y -0.5, left_eye.position.z - 0.7); ;
    right_iris.position.set(right_eye.position.x- 0.8 , right_eye.position.y -0.5, right_eye.position.z + 0.7 );

    snout.position.set(head.position.x -1.4, head.position.y  - 3.5, head.position.z);
    snout.rotation.z = 0.5 * Math.PI;

    nose.position.set(snout.position.x -1.58, snout.position.y -2 , snout.position.z);
    nose.rotation.y = 0.5 * Math.PI;

    left_ear.position.set(head.position.x -2.5, head.position.y -1.5 , head.position.z + 1.25);
    left_ear.rotation.y = -0.4 * Math.PI;
    right_ear.position.set(head.position.x-2.7, head.position.y -1.5, head.position.z - 1.2);
    right_ear.rotation.y = -0.4 * Math.PI;

    mouth.position.set(lower_face.position.x + 0.9 , lower_face.position.y - 0.7, lower_face.position.z);
    mouth.rotation.z = 0.7 * Math.PI;

    tail.position.set(body.position.x -2, body.position.y -7.9, body.position.z);
    tail.rotation.z = 0.8 * Math.PI;

    tail_tip.position.set(tail.position.x + 2, tail.position.y + 6.9, tail.position.z);
  


    front_left_leg.position.set(body.position.x + 2, body.position.y-2, body.position.z + 1);
    front_right_leg.position.set(body.position.x + 2, body.position.y - 2, body.position.z - 1);

    back_left_leg.position.set( front_left_leg.position.x , -front_left_leg.position.y,front_left_leg.position.z );
    back_right_leg.position.set(front_right_leg.position.x, -front_right_leg.position.y, front_right_leg.position.z);

    front_left_paw.position.set(front_left_leg.position.x -2, front_left_leg.position.y - 2.5, front_left_leg.position.z -1);
    front_right_paw.position.set(front_right_leg.position.x -2, front_right_leg.position.y - 2.5, front_right_leg.position.z +1);

    back_left_paw.position.set(back_left_leg.position.x -2, back_left_leg.position.y , back_left_leg.position.z -1);
    back_right_paw.position.set(back_right_leg.position.x - 2, back_right_leg.position.y, back_right_leg.position.z + 1);



    const fox = new THREE.Group();


    //Adicioanr a cabeça e seus elementos á raposa
    snout.add(nose);
    left_eye.add(left_iris);
    right_eye.add(right_iris);
    head.add(lower_face);
    head.add(left_eyebrow);
    head.add(right_eyebrow);
    head.add(left_eye);
    head.add(right_eye);
    head.add(snout);
    head.add(mouth);
    head.add(left_ear);
    head.add(right_ear);
    fox.add(head);


    //Adicionar o corpo e seus elementos do corpo á raposa
    back_left_leg.add(back_left_paw);
    back_right_leg.add(back_right_paw);
    front_left_leg.add(front_left_paw);
    front_right_leg.add(front_right_paw);
    tail.add(tail_tip);
    body.add(tail);
    body.add(front_left_leg);
    body.add(front_right_leg);
    body.add(back_left_leg);
    body.add(back_right_leg);
    fox.add(body);
 
    fox.castShadow= true;

      // Prpriedades usadas no movimento do pato
      fox.alive = true;

      fox.speed = 5.04;

      fox.step = -0.08;

      fox.rotate = -0.5 * Math.PI; // Rotação da raposa para inversão do sentido de movimento

      fox.dist = 0; // Distância percorrida pelo pato

      fox.leg_amplitude = Math.PI; // Amplitude do movimento das pernas da raposa

      fox.leg_speed =1.1; // Velocidade do movimento das pernas da raposa

      fox.tail_amplitude = Math.PI/8; // Amplitude do movimento da cauda da raposa

      fox.tail_speed = 0.5; // Velocidade do movimento da cauda da raposa


    return fox;




}



function createBoar() {

    //Orerlhas do javali
    const left_ear_geometry = new THREE.BoxGeometry(1.5, 3, 1.5);
    const left_ear_material = new THREE.MeshPhongMaterial({ color: 0x8B6C5C }); // Castanho
    const left_ear = new THREE.Mesh(left_ear_geometry, left_ear_material);
    left_ear.name = "boar_left_ear";
    left_ear.castShadow = true;
    const right_ear = left_ear.clone();
    right_ear.name = "boar_right_ear";


    //Sobrancelhas do javali
    const left_eyebrow_geometry = new THREE.BoxGeometry(0.5, 4.3, 2);
    const left_eyebrow_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const left_eyebrow = new THREE.Mesh(left_eyebrow_geometry, left_eyebrow_material);
    left_eyebrow.name = "boar_left_eyebrow";
    left_eyebrow.castShadow = true;

    left_eyebrow.rotation.y = -0.2 * Math.PI;
    left_eyebrow.rotation.z = -0.9 * Math.PI;
  
    const right_eyebrow = left_eyebrow.clone();
    right_eyebrow.name = "boar_right_eyebrow";
    right_eyebrow.castShadow = true;
    right_eyebrow.rotation.y =  - left_eyebrow.rotation.y;
   

    //Olhos do javali
    const left_eye_geometry = new THREE.SphereGeometry(0.8);
    const left_eye_material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF }); // Branco
    const left_eye = new THREE.Mesh(left_eye_geometry, left_eye_material);
    left_eye.name = "boar_left_eye";
    left_eye.castShadow = true;
    const right_eye = left_eye.clone();
    right_eye.name = "boar_right_eye";
    right_eye.castShadow = true;


    //Pupilas do javali
    const left_pupil_geometry = new THREE.SphereGeometry(0.4);
    const left_pupil_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const left_pupil = new THREE.Mesh(left_pupil_geometry, left_pupil_material);
    left_pupil.name = "boar_left_pupil";
    left_pupil.castShadow = true;
    const right_pupil = left_pupil.clone();
    right_pupil.name = "boar_right_pupil";
    right_pupil.castShadow = true;


    // Nariz do javali
    const nose_geometry = new THREE.SphereGeometry(1.9);
    const nose_material = new THREE.MeshPhongMaterial({ color: 0xFFCCCC }); // Rosa claro
    const nose = new THREE.Mesh(nose_geometry, nose_material);
    nose.name = "boar_nose";
    nose.castShadow = true;


    //Narinas do javali
    const left_nostril_geometry = new THREE.CapsuleGeometry(0.5, 0.2);
    const left_nostril_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const left_nostril = new THREE.Mesh(left_nostril_geometry, left_nostril_material);
    left_nostril.name = "boar_left_nostril";
    left_nostril.castShadow = true;
    const right_nostril = left_nostril.clone();
    right_nostril.name = "boar_right_nostril";
    right_nostril.castShadow = true;

    // Presas do javali
    const left_tusk_geometry = new THREE.CylinderGeometry(1.2, 0, 3.6);
    const left_tusk_material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF }); // Branco
    const left_tusk = new THREE.Mesh(left_tusk_geometry, left_tusk_material);
    left_tusk.name = "boar_left_tusk";
    left_tusk.castShadow = true;
    left_tusk.rotation.z = -Math.PI;
    const right_tusk = left_tusk.clone();
    right_tusk.name = "boar_right_tusk";
    right_tusk.castShadow = true;

    // Corpo do javali
    const body_geometry = new THREE.CapsuleGeometry(6, 6, 30, 30);
    const body_material = new THREE.MeshPhongMaterial({ color: 0x8B6C5C }); // Castanho
    const body = new THREE.Mesh(body_geometry, body_material);
    body.name = "boar_body";
    body.castShadow = true;

    //Cauda do javali
    const tail_geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 16, 100);
    const tail_material = new THREE.MeshPhongMaterial({ color: 0xFFCCCC }); // Rosa claro
    const tail = new THREE.Mesh(tail_geometry, tail_material);
    tail.name = "boar_tail";
    tail.castShadow = true;
    tail.rotation.z = 0.5 * Math.PI;


    //Pernas do javali
    const left_front_leg_geometry = new THREE.CylinderGeometry(1.5, 1.5, 5);
    const left_front_leg_material = new THREE.MeshPhongMaterial({ color: 0x8B6C5C }); // Preto acinzentado
    const left_front_leg = new THREE.Mesh(left_front_leg_geometry, left_front_leg_material);
    left_front_leg.name = "boar_front_left_leg";
    left_front_leg.castShadow = true;
    left_front_leg.rotation.z = 0.5 * Math.PI;
    const right_front_leg = left_front_leg.clone();
    right_front_leg.name = "boar_front_right_leg";
    const left_back_leg = left_front_leg.clone();
    left_back_leg.name = "boar_back_left_leg";
    const right_back_leg = left_front_leg.clone();
    right_back_leg.name = "boar_back_right_leg";

    // Cascos do javali
    const left_front_hoof_geometry = new THREE.CylinderGeometry(1.5, 1.5, 1);
    const left_front_hoof_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const left_front_hoof = new THREE.Mesh(left_front_hoof_geometry, left_front_hoof_material);
    left_front_hoof.name = "boar_left_front_hoof";
    const right_front_hoof = left_front_hoof.clone();
    right_front_hoof.name = "boar_right_front_hoof";
    const left_back_hoof = left_front_hoof.clone();
    left_back_hoof.name = "boar_left_back_hoof";
    const right_back_hoof = left_front_hoof.clone();
    right_back_hoof.name = "boar_right_back_hoof";




    body.position.set(0, 7.5, 0);
    body.rotation.z = -0.5 * Math.PI;

    left_ear.position.set(body.position.x - 5.2, body.position.y - 2, body.position.z + 2);
    right_ear.position.set(body.position.x - 5.2, body.position.y -2, body.position.z - 2);


    left_eyebrow.position.set(body.position.x -3, body.position.y -1.5, body.position.z + 1.5);
    right_eyebrow.position.set(body.position.x -3, body.position.y -1.5, body.position.z - 1.5);
    
    
    left_eye.position.set(body.position.x -2.3 , body.position.y +0.6 , body.position.z + 1.7);
    right_eye.position.set(body.position.x -2.3, body.position.y + 0.6 , body.position.z - 1.7);

    left_pupil.position.set(left_eye.position.x +2.2, left_eye.position.y -7.6 , left_eye.position.z -1.6);
    right_pupil.position.set(right_eye.position.x +2.2, right_eye.position.y -7.6, right_eye.position.z +1.6);

    nose.position.set(body.position.x , body.position.y+0.5, body.position.z);

    left_nostril.position.set(nose.position.x , nose.position.y -6.6, nose.position.z + 0.5);
    right_nostril.position.set(nose.position.x , nose.position.y-6.6, nose.position.z - 0.5);

    left_tusk.position.set(nose.position.x + 1 , nose.position.y +1.5, nose.position.z + 1.5);

    right_tusk.position.set(nose.position.x +1, nose.position.y +1.5, nose.position.z - 1.5);


    tail.position.set(body.position.x - 2, body.position.y -17.5, body.position.z );


    left_front_leg.position.set(body.position.x + 4, body.position.y - 4.5, body.position.z + 3);
    right_front_leg.position.set(left_front_leg.position.x, left_front_leg.position.y, -left_front_leg.position.z);

    left_back_leg.position.set(left_front_leg.position.y +1, -left_front_leg.position.x  , left_front_leg.position.z);
    right_back_leg.position.set(right_front_leg.position.y +1, -right_front_leg.position.x, right_front_leg.position.z);


    left_front_hoof.position.set(left_front_leg.position.x -4, left_front_leg.position.y - 6, left_front_leg.position.z-3);
    right_front_hoof.position.set(right_front_leg.position.x -4, right_front_leg.position.y - 6, right_front_leg.position.z +3);

    left_back_hoof.position.set(-left_front_hoof.position.x, left_front_hoof.position.y, left_front_hoof.position.z);
    right_back_hoof.position.set(-right_front_hoof.position.x, right_front_hoof.position.y, right_front_hoof.position.z);



    const boar = new THREE.Group();

    //Adicionar a cabeça e seus elementos ao Javali
    left_back_leg.add(left_back_hoof);
    right_back_leg.add(right_back_hoof);
    left_front_leg.add(left_front_hoof);
    right_front_leg.add(right_front_hoof);
    nose.add(left_nostril);
    nose.add(right_nostril);
    left_eye.add(left_pupil);
    right_eye.add(right_pupil);
    body.add(left_ear);
    body.add(right_ear);
    body.add(left_eyebrow);
    body.add(right_eyebrow);
    body.add(left_eye);
    body.add(right_eye);
    body.add(nose);
    body.add(left_tusk);
    body.add(right_tusk);
    body.add(tail);
    body.add(left_front_leg);
    body.add(right_front_leg);
    body.add(left_back_leg);
    body.add(right_back_leg);
    boar.add(body);

    boar.castShadowShadow = true;


      // Prpriedades usadas no movimento do pato
      boar.alive = true;

      boar.speed = 6;

      boar.step = -0.08;

      boar.rotate = -0.5 * Math.PI; // Rotação do javali para inversão do sentido de movimento

      boar.dist = 0; // Distância percorrida pelo javali

      boar.leg_amplitude = Math.PI/2; // Amplitude do movimento das pernas do javali

      boar.leg_speed = 1; // Velocidade do movimento das pernas do javali

    return boar;


}


function createVulture(){
    const feathers_color= 0x654321; // Castanho escuro
    const  body_color = 0xD3D3D3; // Cinzento
    //Cabeça do abutre
    const head_geometry = new THREE.SphereGeometry(1.6);
    const head_material = new THREE.MeshPhongMaterial({ color: body_color  }); // Preto
    const head = new THREE.Mesh(head_geometry, head_material);
    head.name = "vulture_head";
    head.castShadow = true;

    //Olhos do abutre
    const left_eye_geometry = new THREE.SphereGeometry(0.4);
    const left_eye_material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF }); // Branco
    const left_eye = new THREE.Mesh(left_eye_geometry, left_eye_material);
    left_eye.castShadow = true;
    left_eye.name = "vulture_left_eye";
    const right_eye = left_eye.clone();
    right_eye.name = "vulture_right_eye";

    //Iris do abutre
    const left_iris_geometry = new THREE.SphereGeometry(0.3);
    const left_iris_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const left_iris = new THREE.Mesh(left_iris_geometry, left_iris_material);
    left_iris.name = "vulture_left_iris";
    left_iris.castShadow = true;
    const right_iris = left_iris.clone();
    right_iris.name = "vulture_right_iris";

    //Bico do abutre
    const beek_geometry = new THREE.BoxGeometry(1.5, 1.5, 0.5);
    const beek_material = new THREE.MeshPhongMaterial({ color: 0x080808  }); // Negro
    const beek = new THREE.Mesh(beek_geometry, beek_material);
    beek.name = "vulture_beek";
    beek.castShadow = true;

    //Corpo do abutre
    const body_geometry = new THREE.CapsuleGeometry(1.3, 2);
    const body_material = new THREE.MeshPhongMaterial({ color: feathers_color }); // Preto
    const body = new THREE.Mesh(body_geometry, body_material);
    body.name = "vulture_body";
    body.castShadow = true;

    //Asas do abutre
    const left_wing_geometry = new THREE.BoxGeometry(0.5, 5, 3.5);
    const left_wing_material = new THREE.MeshPhongMaterial({ color: feathers_color }); // Preto
    const left_wing = new THREE.Mesh(left_wing_geometry, left_wing_material);
    left_wing.name = "vulture_left_wing";
    left_wing.castShadow = true;
    const right_wing = left_wing.clone();
    right_wing.name = "vulture_right_wing";


    // Pernas  do abutre
    const left_leg_geometry = new THREE.CylinderGeometry(0.4, 0.4, 3);
    const left_leg_material = new THREE.MeshPhongMaterial({ color: body_color }); // Laranja
    const left_leg = new THREE.Mesh(left_leg_geometry, left_leg_material);
    left_leg.name = "vulture_left_leg";
    left_leg.castShadow = true;
    const right_leg = left_leg.clone();
    right_leg.name = "vulture_right_leg";


    // Definir a posição e orientação dos diferentes elementos do abutre
    body.position.set(0, 10, 0);
    body.rotation.z = -0.5 * Math.PI;

    head.position.set(body.position.x + 2.3, body.position.y , body.position.z);

    left_eye.position.set(head.position.x - 1.5, head.position.y - 9.5 , head.position.z + 1);
    right_eye.position.set(head.position.x -1.5 , head.position.y -9.5  , head.position.z- 1);

    left_iris.position.set(left_eye.position.x - 0.7 , left_eye.position.y - 0.4 , left_eye.position.z -1 );
    right_iris.position.set(right_eye.position.x -0.7, right_eye.position.y -0.4 , right_eye.position.z + 1 );

    beek.rotation.x = 0.5 * Math.PI;
    beek.position.set(head.position.x - 1, head.position.y - 10.5, head.position.z);

    left_wing.position.set(body.position.x, body.position.y - 10, body.position.z + 2);
    left_wing.rotation.x = 0.6 * Math.PI;
    right_wing.position.set(body.position.x, body.position.y -10, body.position.z - 2);
    right_wing.rotation.x = 0.4 * Math.PI;

    left_leg.position.set(body.position.x , body.position.y - 13, body.position.z + 0.8);
    left_leg.rotation.y = 0.5 * Math.PI;
    right_leg.position.set(body.position.x , body.position.y - 13, body.position.z - 0.8);
    right_leg.rotation.y = 0.5 * Math.PI;





    const vulture = new THREE.Group();
    vulture.add(body);
    vulture.add(head);
    head.add(left_eye);
    head.add(right_eye);
    head.add(beek);
    left_eye.add(left_iris);
    right_eye.add(right_iris);
    body.add(left_wing);
    body.add(right_wing);
    body.add(left_leg);
    body.add(right_leg);

    vulture.castShadow = true;


    // Prpriedades usadas no movimento do abutre

    vulture.alive = true;
    vulture.speed = 3.5;
    vulture.step = -0.08;
    vulture.dist = 0; // Distância percorrida pelo pato
    vulture.rotate = -0.5 * Math.PI; // Rotação do pato para inversão do sentido de movimento
    
    vulture.wing_amplitude = Math.PI/8; // Amplitude do movimento das asas do abutre
    vulture.wing_speed = 0.4; // Velocidade do movimento das asas do abutre

    return vulture;
  

}



function createCoyote(){
    let coyote_fur_color = 0x81613C; 
    const head_geometry = new THREE.SphereGeometry(2);
    const head_material = new THREE.MeshPhongMaterial({ color: coyote_fur_color }); // Castanho
    const head = new THREE.Mesh(head_geometry, head_material);
    head.name = "coyote_head";
    head.castShadow = true;


    const body_geometry = new THREE.CapsuleGeometry(2.2, 5);
    const body_material = new THREE.MeshPhongMaterial({ color: coyote_fur_color }); // Castanho
    const body = new THREE.Mesh(body_geometry, body_material);
    body.name = "coyote_body";
    body.castShadow = true;


    const left_eye_geometry = new THREE.SphereGeometry(0.6);
    const left_eye_material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF }); // Branco
    const left_eye = new THREE.Mesh(left_eye_geometry, left_eye_material);
    left_eye.name = "coyote_left_eye";
    left_eye.castShadow = true;

    const right_eye = left_eye.clone();
    right_eye.name = "coyote_right_eye";
  


    const left_iris_geometry = new THREE.SphereGeometry(0.3);
    const left_iris_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const left_iris = new THREE.Mesh(left_iris_geometry, left_iris_material);
    left_iris.name = "coyote_left_iris";
    left_iris.castShadow = true;


    const right_iris = left_iris.clone();
    right_iris.name = "coyote_right_iris";



    const snout_geometry = new THREE.CylinderGeometry(0.5, 0.5, 3.5);
    const snout_material = new THREE.MeshPhongMaterial({ color: coyote_fur_color }); // Castanho
    const snout = new THREE.Mesh(snout_geometry, snout_material);
    snout.name = "coyote_snout";
    snout.castShadow = true;


    const nose_geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5);
    const nose_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const nose = new THREE.Mesh(nose_geometry, nose_material);
    nose.name = "coyote_nose";
    nose.castShadow = true;


    const left_ear_geometry = new THREE.BoxGeometry(0.8, 1.5, 0.8);
    const left_ear_material = new THREE.MeshPhongMaterial({ color: coyote_fur_color }); // Castanho
    const left_ear = new THREE.Mesh(left_ear_geometry, left_ear_material);

    left_ear.name = "coyote_left_ear";
    left_ear.castShadow = true;


    const right_ear = left_ear.clone();
    right_ear.name = "coyote_right_ear";
   
    const mouth_geometry = new THREE.BoxGeometry(1, 1, 1);
    const mouth_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const mouth = new THREE.Mesh(mouth_geometry, mouth_material);
    mouth.name = "coyote_mouth";
    mouth.castShadow = true;

    const front_left_leg_geometry = new THREE.CylinderGeometry(0.5, 0.5, 5);
    const front_left_leg_material = new THREE.MeshPhongMaterial({ color: coyote_fur_color }); // Castanho
    const front_left_leg = new THREE.Mesh(front_left_leg_geometry, front_left_leg_material);
    front_left_leg.name = "coyote_front_left_leg";
    front_left_leg.castShadow = true;
    front_left_leg.rotation.z = 0.5 * Math.PI;

    const front_right_leg = front_left_leg.clone();
    front_right_leg.name = "coyote_front_right_leg";


    const back_left_leg = front_left_leg.clone();
    back_left_leg.name = "coyote_back_left_leg";


    const back_right_leg = front_left_leg.clone();
    back_right_leg.name = "coyote_back_right_leg";
    

    const front_left_paw_geometry = new THREE.BoxGeometry(0.5, 1, 0.8);
    const front_left_paw_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const front_left_paw = new THREE.Mesh(front_left_paw_geometry, front_left_paw_material);

    front_left_paw.name = "coyote_front_left_paw";
    front_left_paw.castShadow = true;

    const front_right_paw = front_left_paw.clone();
    front_right_paw.name = "coyote_front_right_paw";

    const back_left_paw = front_left_paw.clone();
    back_left_paw.name = "coyote_back_left_paw";

    const back_right_paw = front_left_paw.clone();
    back_right_paw.name = "coyote_back_right_paw";


    const tail_geometry = new THREE.ConeGeometry(0.5,6);
    const tail_material = new THREE.MeshPhongMaterial({ color: coyote_fur_color }); // Castanho
    const tail = new THREE.Mesh(tail_geometry, tail_material);
    tail.name = "coyote_tail";
    tail.castShadow = true;
    tail.rotation.z = -0.3 * Math.PI;


    const tail_tip_geometry = new THREE.CylinderGeometry(0, 0.5, 1);
    const tail_tip_material = new THREE.MeshPhongMaterial({ color: 0x00000 }); // Preto
    const tail_tip = new THREE.Mesh(tail_tip_geometry, tail_tip_material);
    tail_tip.name = "coyote_tail_tip";
    tail_tip.castShadow = true;
    tail_tip.rotation.z = Math.PI;
    

    
    body.position.set(0, 5, 0);

    body.rotation.z = -0.5 * Math.PI;


    head.position.set(body.position.x +5, body.position.y, body.position.z);

    left_eye.position.set(head.position.x - 4 , head.position.y -4.5 , head.position.z + 1);
    right_eye.position.set(head.position.x - 4, head.position.y -4.5 , head.position.z - 1);
    
    left_iris.position.set(left_eye.position.x - 0.8, left_eye.position.y - 0.5, left_eye.position.z - 0.7);
    right_iris.position.set(right_eye.position.x - 0.8, right_eye.position.y - 0.5, right_eye.position.z + 0.7);

     
    snout.position.set(head.position.x - 3, head.position.y - 5.5, head.position.z);
    snout.rotation.z = 0.5 * Math.PI;


    nose.position.set(snout.position.x - 2, snout.position.y - 1.5, snout.position.z);
    
    left_ear.position.set(head.position.x -4.5 , head.position.y -3 , head.position.z + 1.25);
    right_ear.position.set(head.position.x - 4.5, head.position.y - 3, head.position.z - 1.2);

    mouth.position.set(head.position.x-4 , head.position.y - 6, head.position.z);

    front_left_leg.position.set(body.position.x + 2, body.position.y - 3, body.position.z + 1);
    front_right_leg.position.set(body.position.x + 2, body.position.y - 3, body.position.z - 1);

    back_left_leg.position.set(front_left_leg.position.x, -front_left_leg.position.y, front_left_leg.position.z);
    back_right_leg.position.set(front_right_leg.position.x, -front_right_leg.position.y, front_right_leg.position.z);

    
    front_left_paw.position.set(front_left_leg.position.x - 2, front_left_leg.position.y- 5 , front_left_leg.position.z - 1);
    front_right_paw.position.set(front_right_leg.position.x - 2, front_right_leg.position.y - 5, front_right_leg.position.z + 1);
    
    back_left_paw.position.set(back_left_leg.position.x - 2, back_left_leg.position.y - 1, back_left_leg.position.z - 1);
    back_right_paw.position.set(back_right_leg.position.x - 2, back_right_leg.position.y - 1, back_right_leg.position.z + 1);
     
    tail.position.set(body.position.x - 1, body.position.y - 7.9, body.position.z);
    
    tail_tip.position.set(tail.position.x +1, tail.position.y-0.6 , tail.position.z);
    
    const coyote = new THREE.Group();


    snout.add(nose);
    left_eye.add(left_iris);
    right_eye.add(right_iris);
    head.add(left_eye);
    head.add(right_eye);
    head.add(snout);
    head.add(left_ear);
    head.add(right_ear);
    head.add(mouth);
    coyote.add(head);
    
    tail.add(tail_tip);
    back_left_leg.add(back_left_paw);
    back_right_leg.add(back_right_paw);
    front_left_leg.add(front_left_paw);
    front_right_leg.add(front_right_paw);
    coyote.add(body);
    body.add(front_left_leg);
    body.add(front_right_leg);
    body.add(back_left_leg);
    body.add(back_right_leg);
    body.add(tail);



    coyote.castShadow = true;

    // Prpriedades usadas no movimento do coiote

    coyote.alive = true;
    coyote.speed = 6.9;
    coyote.step = -0.08;
    coyote.dist = 0; // Distância percorrida pelo pato
    coyote.rotate = -0.5 * Math.PI; // Rotação do pato para inversão do sentido de movimento
    
    coyote.leg_amplitude = Math.PI/2 ;

    coyote.leg_speed = 1;

    coyote.tail_amplitude = Math.PI / 6;

    coyote.tail_speed = 1;

    return coyote;
}















