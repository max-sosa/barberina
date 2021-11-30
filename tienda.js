//Creación de la clase > Product
class product{
    constructor (name,type,price){
        this.name = name;
        this.type = type;
        this.price = parseFloat(price);
    }

    precio(){
        alert("El precio del "+this.name+" es $"+this.price);
    } 
}

//Creación de objetos > Panificados
const ciabatta = new product("Ciabatta","Panificado",100);
const figaza = new product("Figaza", "Panificado",150);
const negritos = new product("Negritos Integrales", "Panificado",200);
const burger = new product("Pan Burger", "Panificado",250);
const brioche = new product("Brioche", "Panificado",300);
const integral = new product("Pan Integral","Panificado",350);
const scons = new product("Scons", "Panificado",400);
const medialunas = new product("Medialunas", "Panificado",450);
const panChocolate = new product("Pan de Chocolate", "Panificado",500);

//Creando lista de panificados.
const panificados = [ciabatta, figaza, negritos, burger, brioche, integral, scons, medialunas, panChocolate];

//Creación de objetos > Tortas
const appleCrumble = new product("Apple Crumble", "Tortas",1000);
const cheesecake = new product("Cheesecake", "Tortas",1500);
const tortaMarisa = new product("Torta Marisa", "Tortas",2000);
const lemonPie = new product("Lemon Pie", "Tortas",2500);
const carrotCake = new product("Carrot Cake", "Tortas",3000);
const dobleChocolate = new product("Doble Chocolate", "Tortas",3500);

//Creando lista de tortas.
const tortas = [appleCrumble, cheesecake, tortaMarisa, lemonPie, carrotCake, dobleChocolate];

let parrafo = document.getElementById("parrafo");
let botonComprar = document.getElementById("btnComprar");
botonComprar.addEventListener("click",respuestaClick);

function respuestaClick(){
    localStorage.clear();
    let cantidad = parseInt(prompt("Ingrese la cantidad que quiera comprar."));
    let precioFinal = cantidad*50;
    localStorage.setItem("Precio",precioFinal);
    let valor = document.getElementById("span");
    valor.innerHTML = localStorage.getItem("Precio");
    parrafo.appendChild(valor);
}