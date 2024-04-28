import * as THREE from "three";

export function createMesh(geom, imageFile) {
    const texture = new THREE.TextureLoader().load("../textures/" + imageFile);
    texture.minFilter = THREE.LinearFilter; // Ou use outras opções de filtragem
    const material = new THREE.MeshStandardMaterial({ map: texture });
   
    const mesh = new THREE.Mesh(geom, material);
    return mesh;
}