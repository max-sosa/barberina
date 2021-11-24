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

function eleccion(){
    let productos = prompt("Ingrese un número para la elección: 1-TORTAS | 2-PANIFICADOS");

    while ((productos != 1)&&(productos !=2)){
        productos = prompt("Ingrese un valor correcto: 1-TORTAS | 2-PANIFICADOS");
    }

    if (productos == 1){
        let entrada = prompt("Ingresar el nombre de la torta que te guste para saber su valor (APPLE CRUMBLE - CHEESECAKE - TORTA MARISA - LEMON PIE - CARROT CAKE - DOBLE CHOCOLATE) - Para salir ingrese ESC");
        
        while(entrada.toUpperCase() != "ESC" ){
            switch (entrada.toUpperCase()) {
                case "APPLE CRUMBLE":
                    alert(appleCrumble.precio());
                break;
                
                case "CHEESECAKE":
                    alert(cheesecake.precio());
                break;
                
                case "TORTA MARISA":
                    alert(tortaMarisa.precio());
                break;

                case "LEMON PIE":
                    alert(lemonPie.precio());
                break;

                case "CARROT CAKE":
                    alert(carrotCake.precio());
                break;

                case "DOBLE CHOCOLATE":
                    alert(dobleChocolate.precio());
                break;
            
                default:
                    alert("NOMBRE INCORRECTO");
                break;
            }
            
            entrada = prompt("Ingresar el nombre de la torta que te guste para saber su valor (APPLE CRUMBLE - CHEESECAKE - TORTA MARISA - LEMON PIE - CARROT CAKE - DOBLE CHOCOLATE) - Para salir ingrese ESC");
         
        }

    }
    else if (productos ==2){
        let entrada = prompt("Ingresar el nombre del panificado que te guste para saber su valor (CIABATTA - FIGAZA - NEGRITOS INTEGRALES - PAN BURGER - BRIOCHE - PAN DE MOLDE INTEGRAL - SCONS - MEDIALUNAS - PAN DE CHOCOLATE) - Para salir ingrese ESC");
        
        while(entrada.toUpperCase() != "ESC" ){
            switch (entrada.toUpperCase()) {
                case "CIABATTA":
                    alert(ciabatta.precio());
                break;
                
                case "FIGAZA":
                    alert(figaza.precio());
                break;
                
                case "NEGRITOS INTEGRALES":
                    alert(negritos.precio());
                break;

                case "PAN BURGER":
                    alert(burger.precio());
                break;

                case "BRIOCHE":
                    alert(brioche.precio());
                break;

                case "PAN DE MOLDE INTEGRAL":
                    alert(integral.precio());
                break;

                case "SCONS":
                    alert(scons.precio());
                break;

                case "MEDIALUNAS":
                    alert(medialunas.precio());
                break;

                case "PAN DE CHOCOLATE":
                    alert(panChocolate.precio());
                break;

                default:
                    alert("NOMBRE INCORRECTO");
                break;
            }
        
            entrada = prompt("Ingresar el nombre del panificado que te guste para saber su valor (CIABATTA - FIGAZA - NEGRITOS INTEGRALES - PAN BURGER - BRIOCHE - PAN DE MOLDE INTEGRAL - SCONS - MEDIALUNAS - PAN DE CHOCOLATE) - Para salir ingrese ESC");
        }
    }
}

eleccion();

console.log(panificados[1].price + panificados[2].price);

//ordenando un array de numeros de menor a mayor.
var numeros = [24,18,1,5,8,10];
numeros.sort(function(a, b) {
    return a - b;
});

console.log(numeros);