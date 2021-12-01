//Creación de la clase > Product
class product{
    constructor (id,name,type,price){
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = parseFloat(price);
    }

    precio(){
        alert("El precio del "+this.name+" es $"+this.price);
    } 
}

//Creación de objetos > Panificados
const ciabatta = new product(1,"Ciabatta","Panificado",100);
const figaza = new product(2,"Figaza", "Panificado",150);
const negritos = new product(3,"Negritos Integrales", "Panificado",200);
const burger = new product(4,"Pan Burger", "Panificado",250);
const brioche = new product(5,"Brioche", "Panificado",300);
const integral = new product(6,"Pan Integral","Panificado",350);
const scons = new product(7,"Scons", "Panificado",400);
const medialunas = new product(8,"Medialunas", "Panificado",450);
const panChocolate = new product(9,"Pan de Chocolate", "Panificado",500);

//Creando lista de panificados.
const panificados = [ciabatta, figaza, negritos, burger, brioche, integral, scons, medialunas, panChocolate];

//Creación de objetos > Tortas
const appleCrumble = new product(10,"Apple Crumble", "Tortas",1000);
const cheesecake = new product(11,"Cheesecake", "Tortas",1500);
const tortaMarisa = new product(12,"Torta Marisa", "Tortas",2000);
const lemonPie = new product(13,"Lemon Pie", "Tortas",2500);
const carrotCake = new product(14,"Carrot Cake", "Tortas",3000);
const dobleChocolate = new product(15,"Doble Chocolate", "Tortas",3500);

//Creando lista de tortas.
const tortas = [appleCrumble, cheesecake, tortaMarisa, lemonPie, carrotCake, dobleChocolate];

//Concatenando array de tortas y panificiados en un solo array de productos.

const productos = panificados.concat(tortas);