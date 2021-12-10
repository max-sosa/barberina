//Creación de la clase > Product
class product{
    constructor (id,name,type,photo,price){
        this.id = id;
        this.name = name;
        this.type = type;
        this.photo = photo;
        this.price = parseFloat(price);
    }

    precio(){
        alert("El precio del "+this.name+" es $"+this.price);
    } 
}

//Creación de objetos > Panificados
const ciabatta = new product(1,"Ciabatta","Panificado","images/productos/panificados/ciabatta.jpg",100);
const figaza = new product(2,"Figaza", "Panificado","images/productos/panificados/figazita.jpg",150);
const negritos = new product(3,"Negritos Integrales", "Panificado","images/productos/panificados/negritos integrales.jpg",200);
const burger = new product(4,"Pan Burger", "Panificado","images/productos/panificados/pan hamburguesas.jpg",250);
const brioche = new product(5,"Brioche", "Panificado","images/productos/panificados/brioche.jpg",300);
const integral = new product(6,"Pan Integral","Panificado","images/productos/panificados/pan integral.jpg",350);
const scons = new product(7,"Scons", "Panificado","images/productos/panificados/scons.jpg",400);
const medialunas = new product(8,"Medialunas", "Panificado","images/productos/panificados/medialunas.jpg",450);
const panChocolate = new product(9,"Pan de Chocolate", "Panificado","images/productos/panificados/pan de chocolate.jpg",500);

//Creando lista de panificados.
const panificados = [ciabatta, figaza, negritos, burger, brioche, integral, scons, medialunas, panChocolate];

//Creación de objetos > Tortas
const appleCrumble = new product(10,"Apple Crumble", "Tortas","images/productos/tortas/apple crumble.jpg",1000);
const cheesecake = new product(11,"Cheesecake", "Tortas","images/productos/tortas/cheesecake.jpg",1500);
const tortaMarisa = new product(12,"Torta Marisa", "Tortas","images/productos/tortas/torta marisa.jpg",2000);
const lemonPie = new product(13,"Lemon Pie", "Tortas","images/productos/tortas/lemon pie.jpg",2500);
const carrotCake = new product(14,"Carrot Cake", "Tortas","images/productos/tortas/carrot cake.jpg",3000);
const dobleChocolate = new product(15,"Doble Chocolate", "Tortas","images/productos/tortas/doble chocolate.jpg",3500);

//Creando lista de tortas.
const tortas = [appleCrumble, cheesecake, tortaMarisa, lemonPie, carrotCake, dobleChocolate];

//Concatenando array de tortas y panificiados en un solo array de productos.

const productos = panificados.concat(tortas);

//Renderizado de la tienda

for(const pan of panificados){
    $(".breadCard").append(
        `<div class="card mb-3" style="max-width: 56rem;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${pan.photo}" class="img-fluid rounded-start" alt="${pan.name}">
            </div>
            <div class="col-md-8 my-auto">
                <div class="card-body text-center">
                    <h5 class="card-title font-monospace">${pan.name}</h5>
                    <p class="card-text font-monospace">$${pan.price}</p>
                    <p class="card-text font-monospace">(Precio por unidad)</p>
                    <button id="${pan.id}" type="button" class="btn btn-outline-dark">Agregar al carrito</button>
                </div>
            </div>
        </div>`);
}

for(const torta of tortas){
    $(".cakeCard").append(
        `<div class="card mb-3" style="max-width: 56rem;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${torta.photo}" class="img-fluid rounded-start" alt="${torta.name}">
            </div>
            <div class="col-md-8 my-auto">
                <div class="card-body text-center">
                    <h5 class="card-title font-monospace">${torta.name}</h5>
                    <p class="card-text font-monospace">$${torta.price}</p>
                    <p class="card-text font-monospace">(Precio por unidad)</p>
                    <button id="${torta.id}" type="button" class="btn btn-outline-dark">Comprar</button>
                </div>
            </div>
        </div>`);
}