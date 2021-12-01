let carrito = [];

let montoTotalCompra = document.getElementById("montoTotal");
montoTotalCompra.innerText = "0";

let cantProductos = document.getElementById("cantidadTotal");
cantProductos.innerText = "0";

let botonFinalizar = document.getElementById("btnFinalizar");
botonFinalizar.onclick = () => {
    const precioFinal = montoTotalCompra.innerText;
    alert("EL MONTO DE LA COMPRA TOTAL ES $" + precioFinal);
}

function agregarCarrito(){
    let padre = document.getElementById("tableBody");
    let contenedor = document.createElement("tr");
    contenedor.innerHTML = `<th scope="row"> ${productos[4].id}</th>
                            <td> ${productos[4].name}</td>
                            <td> ${0}</td>
                            <td> $ ${productos[4].price}</td>`;
    padre.appendChild(contenedor);
    carrito.push(productos[4]);
    console.log(carrito);
    localStorage.setItem("carritoRustico", JSON.stringify(carrito));
    calcularTotalCarrito();
};

let botonComprar = document.getElementById("5");
botonComprar.addEventListener("click",agregarCarrito);



function calcularTotalCarrito() {
    let total = 0;
    for (const prodEnCarro of carrito) {
        total += prodEnCarro.price;
        console.log(total);
    }
    montoTotalCompra.innerText = total;
    cantProductos.innerText = carrito.length;
}