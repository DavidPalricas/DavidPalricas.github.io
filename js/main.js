import * as THREE from "https://threejs.org/build/three.module.js";
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

import {MAP} from "./config.js";

let player = null;

let player_stop = false;


const planets = [];
       

const Loading_manager = new THREE.LoadingManager();
const loader = new GLTFLoader(Loading_manager);

let left = false;
let right = false;
let enter_pressed = false;

let backwards = false;

let turbo_effect = 0;


let nearst_planet = null;

let exited_planet = null;


// To store the scene graph, and elements useful to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,

};

// HELPER FUNCTIONS
const helper = {
    initEmptyScene: function(sceneElements) {
        sceneElements.sceneGraph = new THREE.Scene();

        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        sceneElements.camera = camera;
        camera.position.set(-80, 20, 0);

        camera.near = 0.1;
        camera.far = 5000;
        camera.updateProjectionMatrix();
      

        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 8);
        sceneElements.sceneGraph.add(ambientLight);


        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 255)', 1.0);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);


    },

    render: function(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};

// FUNCTIONS FOR BUILDING THE SCENE
const scene = {
    load3DObjects: function(sceneGraph) {


        Load_Models()

       
        // Criar a galáxia
        const galaxy_geometry = new THREE.SphereGeometry(1000, 100, 100);
        const galaxy_material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('assets/textures/galaxy.png'),
            side: THREE.DoubleSide,
        });
        const galaxy = new THREE.Mesh(galaxy_geometry, galaxy_material);
        galaxy.name = "galaxy";
        sceneGraph.add(galaxy);
        galaxy.position.set(0, 0, 0);


        const fontloader = new FontLoader();

        fontloader.load("assets/fonts/Star_Wars.json", function (font) {
            const textGeometry = new TextGeometry('         Hello There ! \n Welcome to my Portofolio \n Press Enter to continue', {
                font: font,
                size: 25,
                height: 4,
               
            })

            // Crie um material para o texto
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Altere a cor conforme necessário

            // Crie um mesh com a geometria do texto e o material
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Posicione o texto na cena
            textMesh.position.set(100, 0, -300); // Ajuste a posição conforme necessário
            textMesh.rotation.y = -Math.PI / 2; 

            textMesh.name= "welcome_text"

            // Adicione o mesh do texto à cena
            sceneGraph.add(textMesh);
        });


         
        
        
    },
};
// Definições de distância da câmera em relação à nave


function computeFrame(time) {
    // Atualiza a posição da câmera para seguir a nave

    if (player_stop && nearst_planet != null) {
        sceneElements.camera.position.set(nearst_planet.model.position.x - 700, nearst_planet.model.position.y + 200 , nearst_planet.model.position.z );
        sceneElements.camera.lookAt(nearst_planet.model.position);
     
    }

    if (enter_pressed && !player_stop) {

        player.position.x += backwards ? -0.1 : 0.1;   
    }
    if (player !== null && !player_stop) {
        const lerpRate = 0.02; // Taxa de interpolação
        let desiredX;
        if (backwards) {
            desiredX= player.position.x + 100 + (left || right ? turbo_effect : -turbo_effect);
            
        }else{
            desiredX = player.position.x - 100 + (left || right ? turbo_effect : -turbo_effect);
        }
        const desiredY = player.position.y + 20;
        const desiredZ = player.position.z + (left ? 40 : (right ? -40 : 0));

        // Aplica interpolação linear (lerp) para suavizar a movimentação da câmera
        sceneElements.camera.position.x += (desiredX - sceneElements.camera.position.x) * lerpRate;
        sceneElements.camera.position.y += (desiredY - sceneElements.camera.position.y) * lerpRate;
        sceneElements.camera.position.z += (desiredZ - sceneElements.camera.position.z) * lerpRate;

        sceneElements.camera.lookAt(player.position);
    }
   

    helper.render(sceneElements);
    requestAnimationFrame(computeFrame);

}







const playerSpeed = 0.8;
const rotationSpeed = 0.05;
const maxRotation = Math.PI / 4; // Limita a rotação máxima para 45 graus
const maxY = 300; // Exemplo de limite superior para a posição Y
const minY = -300; // Exemplo de limite inferior para a posição Y
const minX= -380;
const maxX= 380;
document.addEventListener('keydown', function(event) {

    if (player_stop && nearst_planet != null) {
        if (event.keyCode === 71) {
           window.location.href = nearst_planet.link;
        }

        if (event.keyCode === 69) {
            player_stop = false;
            const planet_text = sceneElements.sceneGraph.getObjectByName("planet_text");
            if (planet_text != undefined) {
                sceneElements.sceneGraph.remove(planet_text);
            }
            exited_planet = nearst_planet;
           
        }
        
    }


    if (enter_pressed && !player_stop) {
        switch (event.keyCode) {
            case 87: // W

                const up_key = document.getElementById("up");
                up_key.style.opacity = 1;
                player.position.y = Math.min(player.position.y + playerSpeed, maxY); // Subir
                break;
            
            case 68: // D
                const right_key = document.getElementById("right");
                right_key.style.opacity = 1;
                // Limita a movimentação para a direita dentro dos limites minX e maxX
                const newXD = player.position.x + playerSpeed;
                if (newXD <= maxX) {
                    player.position.x = newXD;
                    player.position.z += playerSpeed;
                    player.rotation.z = Math.min(player.rotation.z + rotationSpeed, maxRotation);
                }
    
                right = true;
                break;
            case 65: // A
                const left_key = document.getElementById("left");
                left_key.style.opacity = 1;
                // Limita a movimentação para a esquerda dentro dos limites minX e maxX
                const newXA = player.position.x - playerSpeed;
                if (newXA >= minX) {
                    player.position.x = newXA;
                    player.position.z -= playerSpeed;
                    player.rotation.z = Math.max(player.rotation.z - rotationSpeed, -maxRotation);
                }
    
                left = true;
                break;
            case 83: // S
                const down_key = document.getElementById("down");
                down_key.style.opacity = 1;
                player.position.y = Math.max(player.position.y - playerSpeed, minY);
                break;

            case 82: // R
                 const rotate_key = document.getElementById("rotate");
                 rotate_key.style.opacity = 1;
                  backwards = !backwards;
             
                 player.rotation.set(-player.rotation.x, -player.rotation.y, -player.rotation.z);
                 sceneElements.camera.position.set(-sceneElements.camera.position.x, -sceneElements.camera.position.y, -sceneElements.camera.position.z);
                break;
            case 16: // Shift
                const turbo_key = document.getElementById("turbo");
                turbo_key.style.opacity = 1;
                player.position.x += playerSpeed * 2;
                turbo_effect = 10;
                break;


          
            
        }

        checkDistance();
        
    }else{
        if (event.keyCode === 13) {
            enter_pressed = true;

            const welcome_text = sceneElements.sceneGraph.getObjectByName("welcome_text");
            sceneElements.sceneGraph.remove(welcome_text);
        }
    
    }
   
});


document.addEventListener('keyup', function(event) {
   switch (event.keyCode) {
    case 87: // W
        const up_key = document.getElementById("up");
        up_key.style.opacity = 0.5;
        break;
    case 68: // D
        const right_key = document.getElementById("right");
        right_key.style.opacity = 0.5;
       
        break;

    case 65: // A
        const left_key = document.getElementById("left");
        left_key.style.opacity = 0.5;
      
        break;

    case 83: // S
        const down_key = document.getElementById("down");
        down_key.style.opacity = 0.5;
        break;

    case 16: // Shift
        const turbo_key = document.getElementById("turbo");
        turbo_key.style.opacity = 0.5;
        turbo_effect = 0;
        break;


    case 82: // R
        const rotate_key = document.getElementById("rotate");
        rotate_key.style.opacity = 0.5;
        break;

    


   }
});

// Adicione um listener para 'keyup' para suavizar a rotação da nave quando as teclas A ou D são soltas
document.addEventListener('keyup', function(event) {
    if (event.keyCode === 65 || event.keyCode === 68) {
        // Suaviza a rotação da nave para voltar à posição inicial
        let rotateBack = function() {
            if (player.rotation.z > 0) {
                player.rotation.z = Math.max(player.rotation.z - rotationSpeed, 0);
            } else if (player.rotation.z < 0) {
                player.rotation.z = Math.min(player.rotation.z + rotationSpeed, 0);
            }

            // Se a rotação ainda não voltou a 0, continua o ajuste no próximo frame
            if (player.rotation.z !== 0) {
                requestAnimationFrame(rotateBack);
            }
        };
        rotateBack();
    }

    if (event.keyCode === 65) {
        left = false;
    }

    if (event.keyCode === 68) {
        right = false;
    }
});
function init() {
    helper.initEmptyScene(sceneElements);
    scene.load3DObjects(sceneElements.sceneGraph);
    requestAnimationFrame(computeFrame);
}

window.addEventListener('resize', resizeWindow);

function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();
    sceneElements.renderer.setSize(width, height);
    computeFrame(sceneElements);
}


function checkDistance(){
    const distance_to_show_text = 500;

    planets.forEach(planet => {

        let distance_planet = Math.sqrt(Math.pow(planet.model.position.x - player.position.x, 2) + Math.pow(planet.model.position.y - player.position.y, 2) + Math.pow(planet.model.position.z - player.position.z, 2)); // Fómrula da distância entre 2 pontos em 3D 

        
        if ( distance_planet <= distance_to_show_text &&  planet.model.getObjectByName("planet_text") == undefined && exited_planet == null) {
            console.log("Near to planet -> ", planet);

            nearst_planet = planet;
            player_stop = true;

            const common_text = "Press G to go to the planet or E to continue your journey";
            const fontloader = new FontLoader();

            fontloader.load("assets/fonts/Star_Wars.json", function (font) {
                const textGeometry = new TextGeometry( planet.title + "\n"  + planet.desc + "\n\n" + common_text, {
                    font: font,
                    size: 8,
                    height: 2,
                   
                })
    
                // Crie um material para o texto
                const textMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 }); // Altere a cor conforme necessário
    
                // Crie um mesh com a geometria do texto e o material
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
               
               
                textMesh.rotation.y = -Math.PI / 2; 
    
                textMesh.name= "planet_text"
    
                // Adicione o mesh do texto à cena

                
                textMesh.position.set(planet.model.position.x - 100  , planet.model.position.y + 200, planet.model.position.z - 100);
                console.log(textMesh.position);
                console.log(planet.model.position);
                sceneElements.sceneGraph.add(textMesh);

        });

            
        }else if (distance_planet > distance_to_show_text && nearst_planet == planet){
           

            if(exited_planet != null ){
                nearst_planet = null;
                exited_planet = null;
            }
        }
        
    });

}




function Load_Models(){
    const PLANETS_CONFIG = MAP[0];

    const OBJECTS_CONFIG = MAP[1];
       
                // Gerenciamento da barra de progresso
    const progress_bar = document.getElementById("progress-bar");
    const progress_bar_container = document.getElementsByClassName("progress-bar-container");
   
    const keys = document.getElementsByClassName("keys");

    Loading_manager.onStart = function (url, itemsLoaded, itemsTotal) {
        console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    Loading_manager.onProgress = function (item, loaded, total) {
        progress_bar.value = loaded / total * 100;
    };

    Loading_manager.onLoad = function () {
        console.log('Loading complete!');
        progress_bar_container[0].style.display = "none";
        for (let i = 0; i < keys.length; i++) {
            keys[i].style.display = "block";
        }
    }


    Load_Player();
     
     // Load de Planetas
    PLANETS_CONFIG.forEach(planet_config => {
        Load_Planets(planet_config);
        
    });

      // Load de Objetos
    OBJECTS_CONFIG.forEach(object_config => {
        Load_Objects(object_config);
   });

}

function Load_Player(){
    const loader = new GLTFLoader();
    loader.load("assets/models/ship/scene.gltf", function (gltf) {
        player = gltf.scene;
        player.rotation.y = Math.PI / 2;
        console.log('Ship loaded successfully');
     
        player.scale.set(0.04, 0.04, 0.04);
        player.position.set(-350, 0, 0);
        sceneElements.sceneGraph.add(player);
        player.name = "ship";

    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (error) {
        console.error('An error happened', error);
    });
}



function Load_Planets(planet_config){

    

    const folder_name = planet_config.name.toLowerCase().replace(" ", "_");
  
    const path = "assets/models/planet_" + folder_name+ "/scene.gltf";
         
    loader.load(path, function (gltf) {
        gltf.scene.rotation.y = planet_config.rotation;
        console.log('Planet loaded successfully');
        gltf.scene.position.set(planet_config.pos[0], planet_config.pos[1], planet_config.pos[2]);
        gltf.scene.scale.set(planet_config.scale[0], planet_config.scale[1], planet_config.scale[2]);
        sceneElements.sceneGraph.add(gltf.scene);
        gltf.scene.name = "Planet" + planet_config.name;
        const planet = {model: gltf.scene, title: planet_config.name ,desc: planet_config.desc, link: planet_config.link};
        planets.push(planet);
    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (error) {
        console.error('An error happened', error);
    });


}
   

function Load_Objects(object_config){
    const folder_name = object_config.name.toLowerCase().replace(" ", "_");
    const path = "assets/models/" + folder_name + "/scene.gltf";

    loader.load(path, function (gltf) {
        gltf.scene.rotation.y = object_config.rotation;
        gltf.scene.position.set(object_config.pos[0], object_config.pos[1], object_config.pos[2]);
        gltf.scene.scale.set(object_config.scale[0], object_config.scale[1], object_config.scale[2]);
        sceneElements.sceneGraph.add(gltf.scene);
        gltf.scene.name = object_config.name;
    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (error) {
        console.error('An error happened', error);
    });
}

init();
