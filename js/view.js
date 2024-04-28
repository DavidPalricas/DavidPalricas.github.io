import * as THREE from "three";
import {MAP} from "./map.js";

    //Funções para a criação de modelos
import { create_Animal_Model } from "./create_animals.js";
import { create_Env_models } from "./create_env_elements.js";
import { createObjects } from "./create_objects.js";
import { createMesh } from "./get_texture.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";


const rain = [];

let israin = false;

let night = false;
let n_bullets;
let level = 1;
let time = 30;
const mode = "view"

const ANIMALS_LEVEL = [];

let animals_count;


const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
};




const helper = {
    initEmptyScene: function(sceneElements) {
        sceneElements.sceneGraph = new THREE.Scene(); // Cria a cena

        const width = window.innerWidth;
        const height = window.innerHeight;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000); // Cria a câmara
        sceneElements.camera = camera;


    

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
        spot_light2.position.set(300, 60, 0);
        spot_light2.name = "spot_light2";
        
        sceneElements.sceneGraph.add(spot_light2);



        const spot_light3 = spot_light1.clone();
        spot_light3.position.set(550, 60, 0);
        spot_light3.name = "spot_light3";

        sceneElements.sceneGraph.add(spot_light3);

    
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
        
        

        const controls = new OrbitControls(camera, renderer.domElement);
        helper.controls = controls;

        controls.enableDamping = true;

        // Limites de zoom
        controls.maxDistance = 600;
        controls.minDistance = 10;

        controls.enablePan = false; //Desativar o pan (movimento lateral) 
                                    // usando o botão direito do rato
        

        controls.autoRotate = true;

        controls.autoRotateSpeed = 1.2;

        controls.maxPolarAngle = Math.PI / 2.5; // Limitar a rotação vertical da câmara


        camera.position.set(300, 300, 0);
        camera.lookAt(sceneElements.sceneGraph.position);

    },



    render: function(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },

    

};



const scene = {
    load3DObjects: function(sceneGraph) {
      
     
       const LEVEL = MAP[level-1];
       const BULLETS = LEVEL[0]
       const ENV_ELEMENTS = LEVEL[1];
       const ANIMALS = LEVEL[2];
       
       n_bullets = BULLETS[0]["bullets"];

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

        

        let duck_id = 1;
        let fox_id = 1;
        let boar_id = 1;
        let vulture_id = 1;
        let coyote_id = 1;
        
        animals_count = ANIMALS.length;
           //Adicionar animais á cena
       for(let i = 0; i < animals_count; i++){
              const animal = ANIMALS[i];
              const animal_name = Object.keys(animal)[0];
              const animal_pos = animal[animal_name];
    
              let animal_model = null;


              switch (animal_name) {
                case "duck":
                    animal_model = create_Animal_Model(animal_name);
                    animal_model.scale.set(0.6, 0.6, 0.6);
                    animal_model.rotation.y = -0.5 * Math.PI;
                    animal_model.name = animal_name + duck_id;
                    duck_id++;
                    break;
                case "fox":
                    animal_model = create_Animal_Model(animal_name,level);
                    animal_model.rotation.y = 0.5 *Math.PI;
                    animal_model.name = animal_name + fox_id;
                    fox_id++;
                    break;

                case "boar":
                    animal_model = create_Animal_Model(animal_name);
                    animal_model.rotation.y = 0.5 * Math.PI;
                    animal_model.name = animal_name + boar_id;
                    boar_id++;
    
                    break;

                case "vulture":
                    animal_model = create_Animal_Model(animal_name);
                    animal_model.rotation.y = 0.5 * Math.PI;
                    animal_model.name = animal_name + vulture_id;
                    vulture_id++;
                    break;

                case "coyote":
                    animal_model = create_Animal_Model(animal_name);
                    animal_model.rotation.y = 0.5 * Math.PI;
                    animal_model.name = animal_name + coyote_id;
                    coyote_id++;
                
                    break;


              }
    
          
    
            animal_model.position.set(animal_pos[0], animal_pos[1], animal_pos[2]);
            animal_model.initial_pos = animal_pos[2];
            sceneGraph.add(animal_model);
        

            ANIMALS_LEVEL.push(animal_model.name);
            
           
       }
   
        const table = createObjects("table",level, n_bullets,mode);
        sceneGraph.add(table);


        if (level == 4) {
            const house = createObjects("house",level, n_bullets,mode);
            house.position.set(200, 0, 0);
            sceneGraph.add(house);
            
        }

    }
};

var delta = 0;

function computeFrame(time) {
    delta += 0.08;

    helper.controls.update();
  
    ANIMALS_LEVEL.forEach(animal => {
        const animal_model = sceneElements.sceneGraph.getObjectByName(animal);
       
        if (animal_model != undefined  ) {
            animate_animal(animal_model,delta);
        }
        
    });
   



    if ( israin && (level == 2 || level == 3)){
        for (let i = 0; i < rain.length; i++) {
            // Mova o floco de neve para baixo
            rain[i].position.y -= 0.5; // Altere a velocidade de queda ajustando este valor
            // Se o floco de neve atingir o chão, coloque-o de volta no topo
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
document.addEventListener('click', onDocumentClick, false);



function init() {
    Loading_Screen();
    helper.initEmptyScene(sceneElements);
    scene.load3DObjects(sceneElements.sceneGraph);
    requestAnimationFrame(computeFrame);
}




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



function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 82: // r
            helper.controls.autoRotate = !helper.controls.autoRotate;
            
            let autoRotate = document.getElementById("auto-rotate");

            //Moastrar o estado de rotação da câmara
            if (helper.controls.autoRotate) {
                autoRotate.innerHTML = "AutoRotate: ON";
            }else{
                autoRotate.innerHTML = "AutoRotate: OFF";

            }
            
            break;
        default:
            break;
    }



}


function onDocumentClick(event) {

    //Níveis
    const level1 = document.getElementById("level1");
    const level2 = document.getElementById("level2");
    const level3 = document.getElementById("level3");
    const level4 = document.getElementById("level4");


    //Modos de ambiente
    const rain_snow = document.getElementById("rain-snow");



    switch (event.target.id) {
        case "level1":
            level = 1;
            rain_snow.style.opacity = 0;
            Change_Level();
           
            /*Caso a chuva esteja ativa, será necessário mudar a cor do céu 
                para  que os níveis em que não chove não fiquem com céu da cor do
                tempo de chuva 
            */
            if (israin){
                if (night) {
                    sceneElements.renderer.setClearColor(0x000000 , 1.0);

                }else{
                    sceneElements.renderer.setClearColor(0x87CEEB, 1.0); 
                }
            }
            level1.style.opacity = 1;
            level2.style.opacity = 0.5;
            level3.style.opacity = 0.5;
            level4.style.opacity = 0.5;
            break;
        case "level2":
            level = 2;
            rain_snow.style.opacity = 1;
            Change_Level();

            if (israin){
                create_Rain_Snow();

            }
           
            level1.style.opacity = 0.5;
            level2.style.opacity = 1;
            level3.style.opacity = 0.5;
            level4.style.opacity = 0.5;
            break;

        case "level3":
            level = 3;
            rain_snow.style.opacity = 1;
            Change_Level();


            if (israin){
                create_Rain_Snow();

            }
          
            level1.style.opacity = 0.5;
            level2.style.opacity = 0.5;
            level3.style.opacity = 1;
            level4.style.opacity = 0.5;
            break;

        case "level4":
            level = 4;
            rain_snow.style.opacity = 0;
            Change_Level();
            /*Caso a chuva esteja ativa, será necessário mudar a cor do céu 
                para  que os níveis em que não chove não fiquem com céu da cor do
                tempo de chuva 
            */
            if (israin){
                if (night) {
                    sceneElements.renderer.setClearColor(0x000000 , 1.0);

                }else{
                    sceneElements.renderer.setClearColor(0x87CEEB, 1.0); 
                }
            }
            level1.style.opacity = 0.5;
            level2.style.opacity = 0.5;
            level3.style.opacity = 0.5;
            level4.style.opacity = 1;
            break;

        case "switch-day-night":
                switch_day_night();
                break;
              
        case  "switch-rain-snow":
                switch_rain_snow();
               break;
        default:
            break;
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
    let elements_remove = [];

    //Limpar o array de animais do nível anterior
    ANIMALS_LEVEL.length = 0;


    rain.length = 0;

    // Remover todos os elementos da cena exceto as luzes
    // Para não ter que adicionar as luzes novamente ao passar de nível
    
    sceneElements.sceneGraph.children.forEach(function(child) {

        if ( !child.name.includes("_light") ) {
            elements_remove.push(child);
        }
    });

    elements_remove.forEach(function(element) {
        sceneElements.sceneGraph.remove(element);
    });

    //Cria a cena do próximo nível
    scene.load3DObjects(sceneElements.sceneGraph);

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
    }, 100);

}


function switch_day_night(){
    const moon = document.getElementById("moon");

    if (!night) {
        moon.style.opacity = 1;

        if (!israin || (level == 1 || level == 4)) {
            sceneElements.renderer.setClearColor(0x000000 , 1.0);
            
        }
        night = true;

        sceneElements.sceneGraph.getObjectByName("ambient_light").intensity = 0;
        sceneElements.sceneGraph.getObjectByName("spot_light1").intensity = 40;
        sceneElements.sceneGraph.getObjectByName("spot_light2").intensity = 40;
        sceneElements.sceneGraph.getObjectByName("spot_light3").intensity = 40;

    }else{
        moon.style.opacity = 0.5;

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


function switch_rain_snow(){
    const rain_symbol = document.getElementById("rain");

    if (!israin ) {

            create_Rain_Snow();
            rain_symbol.style.opacity = 1;
            israin = true;


    }else{
        if (night) {
            sceneElements.renderer.setClearColor(0x000000 , 1.0);
            
        }else{
            sceneElements.renderer.setClearColor(0x87CEEB, 1.0);
        }
        rain.forEach(element => {
            sceneElements.sceneGraph.remove(element);
        });

        rain.length = 0;
        rain_symbol.style.opacity = 0.5;
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









init();