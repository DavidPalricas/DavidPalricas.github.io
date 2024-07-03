import * as THREE from "https://threejs.org/build/three.module.js";
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();


export function Load_Models(){


    

    Load_Player();



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