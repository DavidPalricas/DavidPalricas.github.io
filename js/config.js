
const PLANETS = [{name : "Wild Gunslinger",pos: [400, -500, -300], rotation: Math.PI / 2, scale: [60,60,60],desc :"Web hunting minigame made with Three.js", link : "https://davidpalricas.github.io/Wild_Gunslinger" },
                 {name : "LECI Projects", pos: [100, 20, 600], rotation: Math.PI / 2, scale: [60,60,60],desc :"Relevant Projects Completed \n During My Bachelor's Degree in \n Computer Engineering and Informatics", link : "https://github.com/DavidPalricas/LECI-Projects" },   

];

const OBJECTS = [{name : "Death Star",pos: [600, 100, 200],rotation: -2 * Math.PI / 3, scale: [10,10,10] },
                 {name : "Star Destroyer",pos: [300, 80, 200],rotation: Math.PI , scale: [0.08,0.08,0.08], speed :0.04,limit : 1000}, 
                 {name : "Rayquaza",pos: [-800, 0, 0],rotation: Math.PI, scale: [30,30,30],speed :1,limit : 2000}];


export const MAP = [PLANETS, OBJECTS]