import * as THREE from "three";
import {MAP} from "./map.js";

    //Funções para a criação de modelos
import { create_Animal_Model } from "./create_animals.js";
import { create_Env_models } from "./create_env_elements.js";
import { createObjects } from "./create_objects.js";
import { createMesh } from "./get_texture.js";
import { create_Enemy } from "./create_enemy.js";


const rain = [];
let israin = false;

let cheatcodes = {"django":false,"draw":false,"deadeye":false,"godmode":false};

let all_cheats_used = 0;

let gun_grabbed = false;
let night = false;
let n_bullets;
let bullet = document.getElementById("n_bullets");
let camera_rotate_left = false;
let camera_rotate_right = false;
let left =  document.getElementById("left");
let right = document.getElementById("right");

const TARGETS_LEVEL = [];

const mode = "game";


let TARGETS = [];


let player_alerted = false;


//Score
let score = 0;
let score_text = document.getElementById("score");


//Level
let level = 1;
let level_text = document.getElementById("level");


// Criação do Raycaster
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let cheatcode_input = "";

let targets_count;



let targets_count_text = document.getElementById("targets_count");

let camera_look = 0;


let game_time= 30;

let show_time = document.getElementById("timer");


let player_hp = 100;

let player_hp_text = document.getElementById("Health");


const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
};




const helper = {
    initEmptyScene: function(sceneElements) {
        sceneElements.sceneGraph = new THREE.Scene(); // Cria a cena
        sceneElements.sceneGraph.name = "sceneGraph";

        const width = window.innerWidth;
        const height = window.innerHeight;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000); // Cria a câmara
        sceneElements.camera = camera;


        camera.position.set(0, 12, 0);
        camera.lookAt(20, 12, camera_look);


        //Luz ambiente
        const ambient_light = new THREE.AmbientLight(0xFFFFFF, 0.7);
        ambient_light.decay = 1;
        sceneElements.sceneGraph.add(ambient_light);
        ambient_light.castShadow = true;

        ambient_light.name = "ambient_light";

      
        

    //Luz
            
    const spot_light1 = new THREE.SpotLight(0xFFFFFF, 170);
    spot_light1.position.set(40, 60, 0);
    spot_light1.decay = 1;
    spot_light1.castShadow = true;
    

    sceneElements.sceneGraph.add(spot_light1);

    spot_light1.name = "spot_light1";



    const spot_light2 = spot_light1.clone();
    spot_light2.position.set(240, 60, 0);
    spot_light2.name = "spot_light2";
    
    sceneElements.sceneGraph.add(spot_light2);



    const spot_light3 = spot_light1.clone();
    spot_light3.position.set(440, 60, 0);
    spot_light3.name = "spot_light3";

    sceneElements.sceneGraph.add(spot_light3);

       //Audio
        const listener = new THREE.AudioListener();
        camera.add(listener);
        camera.listener = listener;


        const sound = new THREE.Audio( listener );
        helper.sound = sound;


        const target_death_sound = new THREE.Audio( listener );
        helper.target_death_sound = target_death_sound;



        const music_listener = new THREE.AudioListener();
        sceneElements.camera.add( music_listener );
    
        const music = new THREE.Audio( music_listener );
    
        helper.music = music; // Adicionar a música ao helper


        const ambient_sound = new THREE.Audio( listener );
        helper.ambient_sound = ambient_sound;
       
  

        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x87CEEB, 1.0);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Tag3DScene");

        htmlElement.appendChild(renderer.domElement);
        

    },



    render: function(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },

    

};



const scene = {
    load3DObjects: function(sceneGraph) {

      if(israin==true && (level == 2 || level == 3)){
        sceneElements.renderer.setClearColor(0x708090, 1.0);
        create_Rain_Snow();

      }else if(israin == true  && (level == 1 || level == 4)){
           if(night){
               sceneElements.renderer.setClearColor(0x000000, 1.0);
              }else{
                sceneElements.renderer.setClearColor(0x87CEEB, 1.0);
                }
        }      
  
      const LEVEL = MAP[level-1];
       
       const BULLETS = LEVEL[0]
       const ENV_ELEMENTS = LEVEL[1];



       TARGETS = LEVEL[2];
       
      
    


       n_bullets = BULLETS[0]["bullets"];
       bullet.innerHTML = "X" + n_bullets;

        
        let tree_id = 0;
        let rock_id = 0;
        let bush_id = 0;
        let cactus_id = 0;
        let scale = 0;
         //Adicionar elementos ao ambiente
         for(let i = 0; i < ENV_ELEMENTS.length; i++){
            const element = ENV_ELEMENTS[i];
            const element_name = Object.keys(element)[0];
            const element_pos = element[element_name];

            let element_model = null;

            switch (element_name) {
                case "plane":
                    element_model = create_Env_models(element_name,level);
                    break;
                case "tree":
                    element_model = create_Env_models(element_name,level);
                    element_model.name = "tree" + tree_id;
                    tree_id++;
                    break;
                case "rock":
                    element_model = create_Env_models(element_name,level);
                    element_model.name = "rock" + rock_id;
                    rock_id++;
                    break;
                case "lake":
                    element_model = create_Env_models(element_name);
                    element_model.scale.set(2, 2, 2);
                    break;
                case "bush":
                    element_model = create_Env_models(element_name,level);
                    element_model.name = "bush" + bush_id;
                    bush_id++;
                    break;

                case "cactus":
                    element_model = create_Env_models(element_name);
                    element_model.name = "cactus" + cactus_id;
                    cactus_id++;
                    break;

                       
    
                default:
                     break;
            }

               //Modar a escla dos elementos repetidos
            if (element.hasOwnProperty("scale")) {
                scale = element["scale"];
                element_model.scale.set(scale, scale, scale);
            }

            element_model.position.set(element_pos[0], element_pos[1], element_pos[2]);
            sceneGraph.add(element_model);




           


         }
        
      
        targets_count = TARGETS.length;

        if (level!= 4) {
            targets_count_text.innerHTML = "Animals: " + targets_count;
            
        }else{
             
            targets_count_text.innerHTML = "Deadlocks: " + targets_count;

            player_hp_text.style.opacity = 1;

            createTextbox();
            

            const house = createObjects("house",level, n_bullets,mode);
            house.position.set(200, 0, 0);
            sceneGraph.add(house);
        }
       
    
        let duck_id = 1;
        let fox_id = 1;
        let boar_id = 1;
        let vulture_id = 1;
        let coyote_id = 1;
        let enemy_id = 1;
        //Adicionar animais á cena
        for(let i = 0; i < targets_count; i++){
            const target = TARGETS[i];
            const target_name = Object.keys(target)[0];
            const target_pos = target[target_name];
  
            let target_model = null;


            switch (target_name) {
              case "duck":
                  target_model = create_Animal_Model(target_name);
                  target_model.scale.set(0.6, 0.6, 0.6);
                  target_model.rotation.y = -0.5 * Math.PI;
                  target_model.name = target_name + duck_id;
                  duck_id++;
                  break;
              case "fox":
                  target_model = create_Animal_Model(target_name,level);
                  target_model.rotation.y = 0.5 *Math.PI;
                  target_model.name = target_name + fox_id;
                  fox_id++;
                  break;

              case "boar":
                  target_model = create_Animal_Model(target_name);
                  target_model.rotation.y = 0.5 * Math.PI;
                  target_model.name = target_name + boar_id;
                  boar_id++;
  
                  break;

              case "vulture":
                  target_model = create_Animal_Model(target_name);
                  target_model.rotation.y = 0.5 * Math.PI;
                  target_model.name = target_name + vulture_id;
                  vulture_id++;
                  break;

              case "coyote":
                  target_model = create_Animal_Model(target_name);
                  target_model.rotation.y = 0.5 * Math.PI;
                  target_model.name = target_name + coyote_id;
                  coyote_id++;
          
                  break;

            case "enemy":
                target_model = create_Enemy();
                target_model.name = target_name + enemy_id;

                //Adicionar som de tiro ao inimigo
                const  enemy_shoot_sound = new THREE.Audio( sceneElements.camera.listener );
                target_model.shoot_sound = enemy_shoot_sound;
                enemy_id++;
                break;
                 
            }
  
        
          if (target.hasOwnProperty("rotation")) {
                target_model.rotation.y = target["rotation"];
          }

          target_model.position.set(target_pos[0], target_pos[1], target_pos[2]);
          target_model.initial_pos = target_pos[2];
          sceneGraph.add(target_model);
      

          TARGETS_LEVEL.push(target_model.name);
         



     }
              
          
    const table = createObjects("table",level, n_bullets,mode);
    sceneGraph.add(table);


    }
};

var delta = 0;

function computeFrame(time) { 
    delta += 0.08;
  
    //Revolver segue o rato
    if (gun_grabbed == true) {
        move_Revoler();


        
    }

 
   
    TARGETS_LEVEL.forEach(target => {

        if (level != 4) {
            const animal_model = sceneElements.sceneGraph.getObjectByName(target);
           
            if (animal_model != undefined) {
                animate_animal(animal_model,delta);
            }
            
        }

        else if (level == 4 && player_alerted == true){
            const enemy = sceneElements.sceneGraph.getObjectByName(target);
            if (enemy != undefined) {
                if (enemy.can_shoot && enemy.bullets > 0) {
                    enemy.can_shoot = false;
                    animate_Enemy(enemy);

                    setTimeout(function() {
                        enemy.can_shoot = true;
                    }
                    , 2000);
                    
                }
             
            }
        }
    });
            
   

    if ( israin ){
        for (let i = 0; i < rain.length; i++) {
       

            level == 2 ? rain[i].position.y -= 1 : rain[i].position.y -= 0.5; // Altere a velocidade de queda ajustando este valor
            
            // Se o floco de neve/ pingo de chuva colidir com o chão, ele "cai" novamente do céu
            if (rain[i].position.y < -10) {
                rain[i].position.y = 20;
            }
        }

        
    }

 
    
    

    
   helper.render(sceneElements);
   requestAnimationFrame(computeFrame);

}

window.addEventListener('resize', resizeWindow);
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);
document.addEventListener('click', fire_gun, false);



// Atualização da posição do mouse
window.addEventListener('mousemove', function(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}, false);





function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 65: //a
            if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "a";

            }
            
            camera_rotate_left = true;
            if (camera_look > -20 && gun_grabbed == true){
                left.style.opacity = 1;
                camera_look = camera_look - 0.4;
                sceneElements.camera.lookAt(20, 12, camera_look);
            }
            break;
        
    
        case 68: //d
            if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "d";

            }
            camera_rotate_right = true;
            if (camera_look < 20 && gun_grabbed == true){
                right.style.opacity = 1;
                camera_look = camera_look + 0.4;
                sceneElements.camera.lookAt(20, 12, camera_look);
            }
           
            break;
        case 69: //e
            if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "e";
                Cheatcodes("deadeye");
                Cheatcodes("godmode");

            }
            if (!gun_grabbed){
                Grab_Gun();
            }
            
           
            break;
        case 71: //g
            if(all_cheats_used < Object.keys(cheatcodes).length){
                    cheatcode_input += "g";

            }
            break; 
        case 74: //j
             if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "j";

              }
              break;

        case 77: //m
            if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "m";

            }
            break;

        case 78: //n
            if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "n";

            }
            switch_day_night();
            break;

        case 79: //o
            if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "o";
                Cheatcodes("django");

            }
            
            break;

        case 82: //r
               
            if((level == 2 || level == 3 )){ // rain.length para evitar spam de chuva

                switch_rain_snow();

            }
            if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "r";

            }
            break;

        case 87: //w
            if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "w";
                Cheatcodes("draw");

            }
            break;

        case 89: //y
            if(all_cheats_used < Object.keys(cheatcodes).length){
                cheatcode_input += "y";
                

            }
            break;

        default:
            break;
    }

}


function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 65: //a
            camera_rotate_left = false;
            left.style.opacity = 0.1;
            break;
        case 68: //d
            camera_rotate_right = false;
            right.style.opacity = 0.1;
            break;

        default:
            break;

    }
}





function init() {
    Loading_Screen();
    helper.initEmptyScene(sceneElements);
    scene.load3DObjects(sceneElements.sceneGraph);
    requestAnimationFrame(computeFrame);
}




function Grab_Gun() {
    gun_grabbed = true;

    createTimer();

    
    

    var element = document.getElementById("instruction");
    element.parentNode.removeChild(element)

    var table_body = sceneElements.sceneGraph.getObjectByName("table").getObjectByName("body");
    table_body.remove(table_body.getObjectByName("revolver"));


    const revolver = createObjects("revolver",level, n_bullets,mode);
    revolver.name = "revolver";
    revolver.position.set(20, 11, 0);

    sceneElements.sceneGraph.add(revolver);
    
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '../sounds/pick_revolver.mp3', function( buffer ) {
        const sound = helper.sound;
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume( 1.2 );
        sound.play();
    });

    play_theme();


}

function fire_gun(event) {
    const revolver = sceneElements.sceneGraph.getObjectByName("revolver");
    if (n_bullets > 0 && gun_grabbed == true && revolver != undefined ) {

        if((level == 4 && player_alerted == true) || level != 4){
            shoot();


            const audioLoader = new THREE.AudioLoader();
            audioLoader.load( '../sounds/revolver_shot.mp3', function( buffer ) {
                const sound = helper.sound;
                sound.setBuffer( buffer );
                sound.setLoop( false );
                sound.setVolume( 0.5 );
                sound.play();
            });

            

            
            if (!cheatcodes["draw"]) {
                const table_body = sceneElements.sceneGraph.getObjectByName("table").getObjectByName("body");
        

                table_body.remove(table_body.getObjectByName("bullet" + n_bullets));
                
        
            
            
                n_bullets--;


        
        

            
                //Atualizar o número de balas no ecrã
                bullet.innerHTML = "X" + n_bullets;
        
                
            }

            revolver_shoot_effect(revolver,"player");
        

        

            if ((n_bullets == 0 && targets_count > 0)) {

                Game_Over();
                
                
            }


            if (targets_count == 0) {
                level++;

                //Adicionar tempo extra ao passar de nível
                game_time += 10;
        
                if (level > MAP.length) {
                    End_game();
                
                } else {
                    Change_Level();
                    
                }      
            }
        }
      
        
    }
}

// HANDLING EVENTS

// Event Listeners


// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);

    // Comment when doing animation
    // computeFrame(sceneElements);
}



function play_theme(){

    const music_loader = new THREE.AudioLoader();
    music_loader.load( "../sounds/background_music.mp3", function( buffer_music ) {
        const music = helper.music;
        music.setBuffer( buffer_music );
        music.setLoop(true );
        music.setVolume( 0.05 );
        music.play();
    });

}





function shoot(){
    let intersects = raycaster.intersectObjects(sceneElements.sceneGraph.children, true);
    let target = intersects[0] ? intersects[0] : null;

    let target_shooted;
    if (target == null) {
        return;
    }


    if (level!=4) {
        const All_Animals = ["boar", "fox", "duck", "vulture","coyote"];
        
        for (let i = 0; i < All_Animals.length; i++) {
            if (target.object.name.includes(All_Animals[i])) {
                target_shooted = All_Animals[i];
                break;
            }
            else if (i == All_Animals.length - 1) {
                return; //Se o target não for um animal, sai da função
            }
            
        }
    }else{
        if (target.object.name.includes("enemy")) {
            target_shooted = "enemy";

        }
        else{
            return;
        }

    }



    shoot_target(target_shooted);
    let target_component = target.object.parent;

    /* Vai procurar a componente pai da componente do alvo  que o raycaster atingiu
        até o pai desta ser a cena do jogo, ou seja,
        até  a compente ser o próprio alvo (inimigo ou animal),
        para removê-lo da cena simulando assim a sua morte 
    */
    while(true){
        if (target_component.parent.name == "sceneGraph") {
            break;
        }
        target_component = target_component.parent;
    };
    
    sceneElements.sceneGraph.remove(target_component);


    
} 

function End_game(){
    //Parar a música de fundo

    if(helper.music.isPlaying){
        helper.music.stop();
        helper.sound.stop();
        helper.target_death_sound.stop();
       
    }

    


    const body = document.body;

    //Remover todos os elementos da cena
    while (body.firstChild) {
        body.removeChild(body.firstChild);                
             
                
    }
            
    //Criar o ecrã de Game Over
    body.style.backgroundImage = "url('../img/end_game.jpg')";
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.color = "white";
            
              //Texto de Fim do jgo
    let end_game_text = document.createElement("h1");
    end_game_text.innerHTML = "Your Hunt is Over";
    end_game_text.style.fontSize = "50px";
    end_game_text.style.textAlign = "center";
    end_game_text.style.top = "40%";
    end_game_text.style.position = "absolute";
    end_game_text.style.left = "40%";
    body.appendChild(end_game_text);

    // Novo texto de score
    let score_text = document.createElement("h1");
    score_text.innerHTML = " Your score: " + score;
    score_text.style.position = "absolute";
    score_text.style.top = "55%";
    score_text.style.left = "45%";

   

    
    let buttons = document.createElement("div");
    buttons.style.position = "absolute";
    buttons.style.display = "flex";
    buttons.style.justifyContent = "center";
    buttons.style.margin = "20px";
    buttons.style.flexDirection = "column";
    buttons.style.alignItems = "center";
    buttons.style.top = "70%";
    buttons.style.left = "45%";

    body.appendChild(buttons);


    let buttons_class = document.createElement("style");
    document.head.appendChild(buttons_class);
    
    //Confuguração da classe dos botões
    buttons_class.sheet.insertRule(".buttons {width: 200px; height: 50px; background-color: wheat; color: black; font-size: 20px; border: none; cursor: pointer; border-radius: 5px; margin: 10px;}", 0);
    
    //Configuração do hover da classe dos botões
    buttons_class.sheet.insertRule(".buttons:hover {background-color: #191C1F; color: #EE0000; transform: scale(1.1); transition: 0.5s;}", 1);


    //Botão para voltar ao menu
    let play_again = document.createElement("button");
    play_again.className = "buttons";
    play_again.innerHTML = "Play Again";
    
   
     //Quando o utilizador carrega no botão
    play_again.onclick = function() {
       location.reload();
    }

 
             
    buttons.appendChild(play_again);


    let back_menu = document.createElement("button");
    back_menu.className = "buttons";
    back_menu.innerHTML = "Back to Menu";

    back_menu.onclick = function() {
        window.location.href = "../index.html";
    }

    buttons.appendChild(back_menu);

    body.appendChild(score_text);


}



function Game_Over(){
    game_over_theme();
    const body = document.body;

    //Remover todos os elementos da cena
    while (body.firstChild) {
        body.removeChild(body.firstChild);                
             
                
    }
            
            //Criar o ecrã de Game Over
    body.style.backgroundImage = "url('../img/game_over.jpg')";
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.color = "white";
            
              //Texto Game Over
    let game_over_text = document.createElement("h1");
    game_over_text.innerHTML = "Game Over";
    game_over_text.style.fontSize = "50px";
    game_over_text.style.textAlign = "center";
    game_over_text.style.top = "40%";
    game_over_text.style.position = "absolute";
    game_over_text.style.left = "44%";
    body.appendChild(game_over_text);

    // Novo texto de score
    var score_text = document.createElement("h1");
    score_text.innerHTML = " Your score: " + score;
    score_text.style.position = "absolute";
    score_text.style.top = "55%";
    score_text.style.left = "45%";

    body.appendChild(score_text);


    //Botão para voltar ao menu
    var back_menu = document.createElement("button");

    back_menu.innerHTML = "Back to Menu";
    back_menu.style.width = "200px";
    back_menu.style.height = "50px";
    back_menu.style.backgroundColor = "wheat";
    back_menu.style.color = "black";
    back_menu.style.fontSize = "20px";
    back_menu.style.border = "none";
    back_menu.style.cursor = "pointer";
    back_menu.style.borderRadius = "5px";
    back_menu.style.position = "absolute";
    back_menu.style.top = "70%";
    back_menu.style.left = "45%";


     //Quando o utilizador carrega no botão
    back_menu.onclick = function() {
        window.location.href = "../index.html";
    }

    //Hover
    back_menu.onmouseover = function() {
        this.style.backgroundColor = "#191C1F";
        this.style.color = "#EE0000";
        this.style.transition = "0.5s";
        this.style.transform = "scale(1.1)";

    }

    back_menu.onmouseout = function() {
        this.style.backgroundColor = "wheat";
        this.style.color = "black";
        this.style.transition = "0.5s";
        this.style.transform = "scale(1)";
        
       
    }
             
    body.appendChild(back_menu);
}


function game_over_theme(){
    //Para a música de fundo
    if(helper.music.isPlaying){
        helper.music.stop();
    }

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( "../sounds/game_over.mp3", function( buffer ) {
        const sound = helper.music;
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume( 0.5 );
        sound.play();
    });


}


function shoot_target(target){

    let score_points;


    level != 4 ? score_points = 100 : score_points = 200; //Pontos por matar um animal ou inimigo

    let target_death_sound = "../sounds/" + target + "_death.mp3";

    if (target_death_sound != "../sounds/") {

        //Caso outro som de morte esteja a ser reproduzido, parar a reprodução
        if(helper.target_death_sound.isPlaying){
            helper.target_death_sound.stop();
        }
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( target_death_sound, function( buffer ) {
            const sound = helper.target_death_sound;
            sound.setBuffer( buffer );
            sound.setLoop( false );
            sound.setVolume( 0.5 );
            sound.play();

        });
        
        //Atualizar o score e o número de animais
        
        score += score_points + game_time; //Fórmula de cálculo do score
        targets_count--;

        
        score_text.innerHTML = "Score: " + score;


        if (level != 4) {
            targets_count_text.innerHTML = "Animals: " + targets_count;
            
        }
        else{
            targets_count_text.innerHTML = "Deadlocks: " + targets_count;
        }
           
        
    }

}


function animate_animal(animal,delta){
    let animal_name;

    animal.position.z += animal.speed * animal.step;
    animal.dist = animal.position.z - animal.initial_pos;

     
    if (animal.name.includes("duck") || animal.name.includes("vulture")) {
        animal_name = animal.name.includes("duck") ? "duck" : "vulture";

        const left_wing = animal.getObjectByName(animal_name + "_left_wing");
        const right_wing = animal.getObjectByName(animal_name + "_right_wing");

        //Animação das asas
        left_wing.rotation.z = Math.sin(delta * animal.wing_speed) * animal.wing_amplitude;
        right_wing.rotation.z = - Math.sin(delta * animal.wing_speed) * animal.wing_amplitude;

        
    } else  {
        
       

        if (animal.name.includes("fox")) {
            animal_name = "fox";
            
        }
        else if (animal.name.includes("boar")) {
            animal_name = "boar";
        }
        else{
            animal_name = "coyote";
        }
        

        //Javalis não rodam a cauda deles
        if(!animal.name.includes("boar")){
            // Animação da cauda
            const tail = animal.getObjectByName(animal_name + "_tail");
            tail.rotation.x = Math.sin(delta * animal.tail_speed) * animal.tail_amplitude;
        }

    

        const front_left_leg = animal.getObjectByName(animal_name + "_front_left_leg");
        const front_right_leg = animal.getObjectByName(animal_name + "_front_right_leg");
        const back_left_leg = animal.getObjectByName(animal_name + "_back_left_leg");
        const back_right_leg = animal.getObjectByName(animal_name + "_back_right_leg");
        
        
        front_left_leg.rotation.z= Math.sin(delta * animal.leg_speed) *  animal.leg_amplitude;
        front_right_leg.rotation.z = -Math.sin(delta * animal.leg_speed) * animal.leg_amplitude;
        back_left_leg.rotation.z = -Math.sin(delta * animal.leg_speed) * animal.leg_amplitude;
        back_right_leg.rotation.z = Math.sin(delta * animal.leg_speed) * animal.leg_amplitude;




    }

        
    if (animal.dist < 0 && Math.abs(animal.dist) > 100) {
            animal.step = 0.08;
            animal.rotation.y = animal.rotate;

        
    }
    else if (animal.dist > 0 && Math.abs(animal.dist) > 100) {
            animal.step = -0.08;

            animal.rotation.y = -animal.rotate; 
        }
   
}


function Change_Level(){
    if(israin && level== 3 ){
        helper.ambient_sound.stop();
    
    }
    level_text.innerHTML = "Level: " + level;




    let elements_remove = []; 

    //Limpar o array de animais do nível anterior
    TARGETS_LEVEL.length = 0;


    rain.length = 0;
                
    //Remover todos os elementos da cena exceto o revolver e as luzes
    // Para o jogador não ter que apanhar o revolver novamente
    // E para não ter que adicionar as luzes novamente ao passar de nível

    sceneElements.sceneGraph.children.forEach(function(child) {
        if (child.name != "revolver" && !child.name.includes("_light")){
            elements_remove.push(child);
        }
        });

       
    
    elements_remove.forEach(function(element) {
        sceneElements.sceneGraph.remove(element);
    });

    //Cria a cena do próximo nível
    scene.load3DObjects(sceneElements.sceneGraph);

}



function move_Revoler(){
    const revolver = sceneElements.sceneGraph.getObjectByName("revolver");
    
    raycaster.setFromCamera(mouse, sceneElements.camera);
    let intersects = raycaster.intersectObjects(sceneElements.sceneGraph.children, true);
    
    //Se estiver vários objetos a frente do revolver, este segue o primeiro
    if (intersects.length > 0) {
        revolver.position.set(15, intersects[0].point.y, intersects[0].point.z);
        
            //Limites das posições do revolver

            if (intersects[0].point.y > 14) {
                revolver.position.y = 14;
                
            }
            else if (intersects[0].point.y < 8) {
                revolver.position.y = 8;
            }


            if (intersects[0].point.z < -50) {
                revolver.position.z = -40;
            }
            else if (intersects[0].point.z > 50) {
                revolver.position.z = 40;
            }
    }
}



function Loading_Screen(){
    let progress_bar = document.getElementById("progress-bar");
    let progress = 0;
    
    let interval = setInterval(function() {
        progress += 10;
        progress_bar.value = progress;
        progress_bar.style.color = "red";
        if (progress >= 100) {
            clearInterval(interval);
            let loading = document.getElementsByClassName("progress-bar-container")[0];
            loading.style.display = "none";
        }
    }, 80);

}


function createTimer(){
    let timer = setInterval(function() {


        if (game_time == null) {
            clearInterval(timer);
            return;
            
        }
        
        if((level == 4 && player_alerted == true)|| level != 4){
            game_time--;
            show_time.innerHTML = game_time +"s ";
        }

        
        
        if (game_time == 0) {
            clearInterval(timer);
            Game_Over();
         
        }
    }, 1000);
}


function switch_day_night(){

    if (night == false) {
        if (!israin || (level == 1 || level == 4)) {
            sceneElements.renderer.setClearColor(0x708090, 1.0);
        }
     
        night = true;

        sceneElements.sceneGraph.getObjectByName("ambient_light").intensity = 0;
        sceneElements.sceneGraph.getObjectByName("spot_light1").intensity = 40;
        sceneElements.sceneGraph.getObjectByName("spot_light2").intensity = 40;
        sceneElements.sceneGraph.getObjectByName("spot_light3").intensity = 40;

    }else{
        if (!israin || (level == 1 || level == 4)) {
            sceneElements.renderer.setClearColor(0x87CEEB, 1.0);

        }
        night = false;

        sceneElements.sceneGraph.getObjectByName("ambient_light").intensity = 0.7;
        sceneElements.sceneGraph.getObjectByName("spot_light1").intensity = 170;
        sceneElements.sceneGraph.getObjectByName("spot_light2").intensity = 170;
        sceneElements.sceneGraph.getObjectByName("spot_light3").intensity = 170;
    }
    
    


}


function Cheatcodes(cheatcode){

    if (!gun_grabbed) {
        cheatcode_input = "";
        return;
        
    }

    if (cheatcode_input.includes(cheatcode)) {
        cheatcodes[cheatcode] = true;
        if (cheatcode == "django") {
            level = MAP.length;
            Change_Level();
            
        }
        else if (cheatcode == "deadeye"){
            game_time = null;
            show_time.innerHTML = "Unlimited";

        }
        else if (cheatcode == "godmode"){
            player_hp = null;
            player_hp_text.innerHTML = "God Mode";
        
        }
        cheatcode_input = ""; //Limpa o input 
        all_cheats_used++;

        let cheatcode_activaded = document.createElement("h1");
        cheatcode_activaded.innerHTML = "Cheatcode Activated";
        cheatcode_activaded.style.position = "absolute";
        cheatcode_activaded.style.top = "50%";
        cheatcode_activaded.style.left = "40%";
        cheatcode_activaded.style.animation = "blink 1s infinite";
        document.body.appendChild(cheatcode_activaded);


        setTimeout(function() {
            document.body.removeChild(cheatcode_activaded);
        
        }, 3000);


    }

  
}



function switch_rain_snow(){
    if (!israin ) {
        if (level == 2) {
            const audioLoader = new THREE.AudioLoader();
            audioLoader.load( '../sounds/rain.mp3', function( buffer ) {
                const sound = helper.ambient_sound;
                sound.setBuffer( buffer );
                sound.setLoop( true );
                sound.setVolume( 1.2 );
                sound.play();
            });

        }
      

            create_Rain_Snow();
            israin = true;


    }else{
        if (level == 2) {
            helper.ambient_sound.stop();
        }
      
        if (night) {
            sceneElements.renderer.setClearColor(0x000000 , 1.0);
            
        }else{
            sceneElements.renderer.setClearColor(0x87CEEB, 1.0);
        }
        rain.forEach(element => {
            sceneElements.sceneGraph.remove(element);
        });

        rain.length = 0;
        israin = false;

    }



}



function create_Rain_Snow(){
    let element;
    const geometry = new THREE.SphereGeometry(0.5);

    sceneElements.renderer.setClearColor(0x708090, 1.0);


    if (level == 2) {
        const material = new THREE.MeshBasicMaterial({color: 0x0000FF}); //Pingo de chuva
        element = new THREE.Mesh(geometry, material);
    }else if (level == 3) {
        element = new createMesh(geometry, "snow.jpg"); //Floco de neve
    }

    for (let i = 0; i < 2000; i++) {
        element = element.clone();
        element.position.set( 
            Math.random() * 1000 - 500, //Math.random() * comprimento_terreno - comprimento_terreno/2;
            Math.random() * 600,      
            Math.random() * 700 - 350  //Math.random() * largura_terreno - largura_terreno/2;               

        );
        sceneElements.sceneGraph.add(element);
        rain.push(element);
    }

}




function animate_Enemy(enemy){

    const enemy_revolver = enemy.getObjectByName("enemy_revolver");


    const cube_material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    const cube_geometry = new THREE.BoxGeometry(3, 3, 3);
    const cube = new THREE.Mesh(cube_geometry, cube_material);

    cube.position.set(enemy_revolver.position.x , enemy_revolver.position.y , enemy_revolver.position.z);


    console.log(enemy_revolver.position );

    console.log(cube);


    sceneElements.sceneGraph.add(cube);


    revolver_shoot_effect(enemy_revolver,"enemy");





    enemy.bullets--;
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '../sounds/revolver_shot.mp3', function( buffer ) {
    const sound = enemy.shoot_sound;
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.2 );
    sound.play();
    });


    if( Math.floor(Math.random() * 8) + 1 == 8){ //Se o número aleatório for 8, o inimigo acertou no jogador
       
        if (!cheatcodes["godmode"]) {
            player_hp -= 25;
            player_hp_text.innerHTML =  "Health: " + player_hp;
                        
            player_hp_text.style.animation = "none"; // Atualizar a animação

          
            player_hp_text.offsetHeight; // Força o browser a recarregar a animação

            player_hp_text.style.animation = "shot 1s linear ";
            if (player_hp == 0) {
                Game_Over();
                
            }
          

        }
       
       

    }

        
      

}



function revolver_shoot_effect(revolver,tag){

    console.log("Revolver shoot effect");
    
    const bullet_fired = createObjects("bullet",level, n_bullets,mode);

    bullet_fired.scale.set(0.2, 0.2, 0.2);
    bullet_fired.rotation.z = -0.5 * Math.PI;
  

    const gun_fire_effect = new THREE.PointLight(0xFFA500, 50, 10);
    gun_fire_effect.decay = 2;
    gun_fire_effect.castShadow = true;
   
    if (tag == "player") {
        bullet_fired.position.set(revolver.position.x + 3, revolver.position.y + 0.8, revolver.position.z);
        gun_fire_effect.position.set(bullet_fired.position.x-0.5, bullet_fired.position.y, bullet_fired.position.z);
   
 

        bullet_fired.add(gun_fire_effect);
        sceneElements.sceneGraph.add(bullet_fired);



        setTimeout(function() {
            sceneElements.sceneGraph.remove(bullet_fired);
            
        }, 200);

    }
    else{
        bullet_fired.position.set(revolver.position.x + 3, revolver.position.y + 2, revolver.position.z);
        gun_fire_effect.position.set(bullet_fired.position.x-0.5, bullet_fired.position.y, bullet_fired.position.z);

        bullet_fired.add(gun_fire_effect);
        revolver.add(bullet_fired);
    

        setTimeout(function() {
            revolver.remove(bullet_fired);
            
        }, 200);
    }

 
}



function createTextbox(){


    const box = document.createElement('div');
    box.style.position = 'absolute';
    box.style.width = 50 +  "%"; 
    box.style.height = 20 + "%";
    box.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    box.style.color = "white";
    box.style.fontSize = 50;
    box.style.top = 20 + "%";
    box.style.left = 25 + "%";
    box.style.borderRadius = 10 + "px";

    box.style.padding = 20 + "px";

    box.style.alignContent = "center";

    const text = document.createElement('h1');
    const paragraph = document.createElement('h1');
   
    text.innerHTML = "It seems like the Outlaws Deadlock are laying in wait for you, aiming to steal your gains from the hunt.";
    
    paragraph.innerHTML = "Eliminate all the members to complete your journey.";



    box.appendChild(text);
    box.appendChild(paragraph);
  
    document.body.appendChild(box);


   setTimeout(function() {
        document.body.removeChild(box);
        player_alerted = true;
        
    }, 6000);

    
   
    


}

init();