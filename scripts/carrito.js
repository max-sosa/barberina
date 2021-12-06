let carrito = [];

let montoTotalCompra = document.getElementById("montoTotal");
montoTotalCompra.innerText = "$ 0";


let cantProductos = document.getElementById("cantidadTotal");
cantProductos.innerText = "0";

let botonFinalizar = document.getElementById("btnFinalizar");
botonFinalizar.onclick = () => {
    const precioFinal = montoTotalCompra.innerText;
    Swal.fire("EL MONTO TOTAL DE LA COMPRA ES " + precioFinal);
}


for(const prod of productos){
   document.getElementById(`${prod.id}`).onclick = () => agregarAlCarro(`${prod.id}`);
}

function agregarAlCarro(miId) {
    $("#tableBody").append(
        `<tr><th scope="row"> ${productos[miId - 1].id}</th>
        <td> ${productos[miId - 1].name}</td>
        <td> ${1}</td>
        <td> $ ${productos[miId - 1].price}</td></tr>`);
    carrito.push(productos[miId - 1]);
    localStorage.setItem("Carrito", JSON.stringify(carrito));
    calcularTotalCarrito();
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Agregaste el producto al carrito',
        showConfirmButton: false,
        timer: 2000
      })
};

function calcularTotalCarrito() {
    let total = 0;
    for (const prodEnCarro of carrito) {
        total += prodEnCarro.price;
    }
    montoTotalCompra.innerText = "$ "+ total;
    cantProductos.innerText = carrito.length;
    let badgeCarrito = document.getElementById("badgeCarrito");
    badgeCarrito.innerText = carrito.length;
}


