import * as THREE from "three";


export function createObjects(model,level,n_bullets,mode){
    switch (model) {
        case "table":
            model = createTable(level,n_bullets,mode);
            
            break;

        case "revolver":
              model = createRevolver();
                break;
    
        default:
            break;

            
    }

    return model;
}



function createTable(level,n_bullets,mode){
    const body_geometry = new THREE.BoxGeometry(20, 1, 20);
    const body_material = new THREE.MeshPhongMaterial({ color: 0x8B4513 }); // Castanho
    const body = new THREE.Mesh(body_geometry, body_material);
    body.name = "body";
    body.receiveShadow = true;
    body.castShadow = true;


    const front_left_leg_geometry = new THREE.CylinderGeometry(0.5, 0.5, 5);
    const front_left_leg_material = new THREE.MeshPhongMaterial({ color: 0x8B4513 }); // Castanho
    const front_left_leg = new THREE.Mesh(front_left_leg_geometry, front_left_leg_material);
    front_left_leg.name = "front_left_leg";
    front_left_leg.castShadow = true;
    front_left_leg.castShadow = true;
    const front_right_leg = front_left_leg.clone();
    front_right_leg.name = "front_right_leg";
    const back_left_leg = front_left_leg.clone();
    back_left_leg.name = "back_left_leg";
    const back_right_leg = front_left_leg.clone();
    back_right_leg.name = "back_right_leg";
    
    const cowboy_hat = create_Cowboy_Hat();

    const ashtray = create_Ahstray();
    ashtray.scale.set(1.5,1.5,1.5);

    front_left_leg.position.set(body.position.x - 9, body.position.y - 2.5, body.position.z - 9);
    front_right_leg.position.set(front_left_leg.position.x, front_left_leg.position.y, -front_left_leg.position.z)
    back_left_leg.position.set(-front_left_leg.position.x, front_left_leg.position.y, front_left_leg.position.z)
    back_right_leg.position.set(-front_left_leg.position.x, front_left_leg.position.y, -front_left_leg.position.z)
    
    cowboy_hat  .position.set(body.position.x +4, body.position.y + 1, body.position.z +6);
    ashtray.position.set(body.position.x, body.position.y + 0.5, body.position.z + 2);

    const table = new THREE.Group();

    body.add(ashtray);
    body.add(cowboy_hat);
    table.add(body);
    

    table.add(front_left_leg);
    table.add(front_right_leg);
    table.add(back_left_leg);
    table.add(back_right_leg);


    let bullet_id = 1;
    for (let i = 0; i < n_bullets;i++) {
        const bullet = createBullet();

        bullet.scale.set(0.4,0.4,0.4);
        
    
        bullet.position.set(body.position.x + 4,body.position.y + 0.9, body.position.z - 1.5 + 0.5 *i);

        bullet.name = "bullet" + bullet_id;

        bullet_id++;

        body.add(bullet);
        
     
      
        
    }


     //O Revolver é só adicionado na mesa no 1º nível
    // Pois o player já o tem na mão nos níveis seguintes    
    if (level == 1 || mode === "view") {
        
   
        const revolver = createRevolver();
        revolver.name = "revolver";


              //Posicionar os elementos da mesa
            revolver.position.set(body.position.x+ 2 , body.position.y +1.2, body.position.z - 6);
            revolver.rotation.x = -0.5 * Math.PI;
            revolver.rotation.z = -0.56 * Math.PI;
            revolver.scale.set(2, 2, 2);
            body.add(revolver);
        
    }



    table.name = "table";
    
    table.position.set(20, 5, 0);

    table.castShadow = true;
    return table;

}


function createRevolver() {
  
    let grip_color = 0x000000; //Preto
    let revolver_color = "rgb(89.6,89.6,89.6)"; //Prateado  ambiente brilhante
 


    //Punho do revolver
    const grip_geometry = new THREE.CapsuleGeometry(0.2, 0.5);
    const grip_material = new THREE.MeshPhongMaterial({ color: grip_color }); // Preto
    const grip = new THREE.Mesh(grip_geometry, grip_material);
    grip.name = "revolver_grip";
    grip.castShadow = true;

    //Corpo do revolver
    const body_geometry = new THREE.SphereGeometry(0.4);
    const body_material = new THREE.MeshPhongMaterial({ color: revolver_color , shininess: 100}); // Preto	
    const body = new THREE.Mesh(body_geometry, body_material);
    body.name = "revolver_body";
    body.castShadow = true;
    //Parte de trás do revolver
    const hammer_geometry = new THREE.BoxGeometry(0.3, 0.2, 0.2);
    const hammer_material = new THREE.MeshPhongMaterial({ color: revolver_color,shininess: 100 }); // Preto
    const hammer = new THREE.Mesh(hammer_geometry, hammer_material);
    hammer.name = "revolver_hammer";
    hammer.castShadow = true;

    //Cano do revolver
    const barrel_geometry = new THREE.CylinderGeometry(0.13, 0.13, 1.7);
    const barrel_material = new THREE.MeshPhongMaterial({ color: revolver_color,shininess: 100 }); // Preto
    const barrel = new THREE.Mesh(barrel_geometry, barrel_material);
    barrel.name = "revolver_barrel";
    barrel.castShadow = true;

    //Guarda do gatilho(Anel de metal que protege o gatilho)
    const trigger_guard_geometry = new THREE.TorusGeometry(0.17, 0.01);
    const trigger_guard_material = new THREE.MeshPhongMaterial({ color: revolver_color,shininess: 100  }); // Preto
    const trigger_guard = new THREE.Mesh(trigger_guard_geometry, trigger_guard_material);
    trigger_guard.name = "revolver_trigger_guard";
    trigger_guard.castShadow = true;


    const trigger_geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const trigger_material = new THREE.MeshPhongMaterial({ color: revolver_color }); // Vermelho
    const trigger = new THREE.Mesh(trigger_geometry, trigger_material);
    trigger.name = "revolver_trigger";
    trigger.castShadow = true;



    grip.position.set(0, 0, 0);
    body.position.set(grip.position.x + 0.2, grip.position.y + 0.8, grip.position.z);

    hammer.position.set(body.position.x - 0.4, body.position.y, body.position.z);
    hammer.rotation.z = 0.5 * Math.PI;

    barrel.position.set(body.position.x + 0.6, body.position.y, body.position.z);
    barrel.rotation.z = 0.5 * Math.PI;

    trigger_guard.position.set(body.position.x + 0.45, body.position.y - 0.45, body.position.z);
    trigger_guard.rotation.z = 0.5 * Math.PI;

    trigger.position.set(trigger_guard.position.x, trigger_guard.position.y + 0.09, trigger_guard.position.z);
    trigger.rotation.z = 0.5 * Math.PI;


    const revolver = new THREE.Group();
    revolver.add(grip);
    revolver.add(body);
    revolver.add(barrel);
    revolver.add(hammer);
    revolver.add(trigger_guard);
    revolver.add(trigger);


    revolver.castShadow = true;

    return revolver;



}


function createBullet() {
    const body_geometry = new THREE.CapsuleGeometry(0.5, 2.6);
    const body_material = new THREE.MeshPhongMaterial({ color: 0xFFD700}); // Preto
    const body = new THREE.Mesh(body_geometry, body_material);
    body.name = "bullet_body";
    body.castShadow = true;

    
    //Ponta da bala
    const head_geometry = new THREE.CylinderGeometry(0.26, 0.4,0.8);
    const head_material = new THREE.MeshPhongMaterial({ color: "rgb:(4,4,4)" }); // Chromium difuso
    const head= new THREE.Mesh(head_geometry, head_material);
    head.name = "bullet_head";
    head.castShadow = true;
    

    head.position.set(body.position.x, body.position.y+ 2, body.position.z);



    const bullet = new THREE.Group();
    bullet.add(body);
    bullet.add(head);


    
    bullet.castShadow = true;
    return bullet;

}



function create_Cowboy_Hat(){

    const hat_color = 0x654321;

    //Parte de baixo do chapéu
    const bottom_geometry = new THREE.CylinderGeometry(2, 3, 0.5, 32);
    const bottom_material = new THREE.MeshPhongMaterial({ color: hat_color}); 
    const bottom = new THREE.Mesh(bottom_geometry, bottom_material);
    bottom.name = "hat_bottom";
    bottom.castShadow = true;
    
    //Fivela do chapéu
    const buckle_geometry = new THREE.CylinderGeometry(0.5, 2, 0.5);
    const buckle_material = new THREE.MeshPhongMaterial({ color: 0x000000}); // Azul claro
    const buckle = new THREE.Mesh(buckle_geometry, buckle_material);
    buckle.name = "hat_buckle";
    buckle.castShadow = true;

    //Parte de cima do chapéu
    const top_geometry = new THREE.CylinderGeometry(1, 2, 2, 20);
    const top_material = new THREE.MeshPhongMaterial({ color: hat_color }); // Preto
    const top = new THREE.Mesh(top_geometry, top_material);
  
    
    top.name = "hat_top";
    top.castShadow = true;

    bottom.position.set(0, 0, 0);
    top.position.set(bottom.position.x, bottom.position.y + 0.75, bottom.position.z);
    buckle.position.set(bottom.position.x, bottom.position.y + 0.5, bottom.position.z);

    const cowboy_hat = new THREE.Group();
    cowboy_hat.add(bottom);
    cowboy_hat.add(buckle);
    cowboy_hat.add(top);
    cowboy_hat.castShadow = true;
    cowboy_hat.name = "cowboy_hat";
    return cowboy_hat;
}




function create_Ahstray(){
    //Base do cinzeiro
    const base_geometry = new THREE.CylinderGeometry(1, 1, 0.2);
    const base_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const base = new THREE.Mesh(base_geometry, base_material);
    base.name = "ashtray";
    base.castShadow = true;

    //Cinzas do cinzeiro
    const ashes_geometry = new THREE.CylinderGeometry(0.5, 0.8, 0.2);
    const ashes_material = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Cinzento
    const ashes = new THREE.Mesh(ashes_geometry, ashes_material);
    
    const cigar = create_Cigar();
    cigar.scale.set(0.6,0.6,0.6);
    cigar.rotation.x = -0.8 * Math.PI;

    base.position.set(0, 0, 0);
    ashes.position.set(base.position.x, base.position.y + 0.1, base.position.z);
    cigar.position.set(ashes.position.x, ashes.position.y + 0.28, ashes.position.z + 0.2);

    const ashtray = new THREE.Group();
    ashes.add(cigar);
    base.add(ashes);
    ashtray.add(base);
    return ashtray;
}



function create_Cigar(){
    const body_geometry = new THREE.CylinderGeometry(0.1, 0.1, 1);
    const body_material = new THREE.MeshPhongMaterial({ color: 0x8B4513 }); // Castanho
    const body = new THREE.Mesh(body_geometry, body_material);
    body.name = "cigar_body";
    body.castShadow = true;

    //Ponta do cigarro
    const head_geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2);
    const head_material = new THREE.MeshPhongMaterial({ color: 0x000000 }); // Preto
    const head = new THREE.Mesh(head_geometry, head_material);
    head.name = "cigar_head";
    head.castShadow = true;

    head.position.set(body.position.x, body.position.y + 0.5, body.position.z);

    const cigar = new THREE.Group();
    cigar.add(body);
    cigar.add(head);
    cigar.castShadow = true;
    return cigar;
}




