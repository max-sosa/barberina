let carrito = [];

let montoTotalCompra = document.getElementById("montoTotal");
montoTotalCompra.innerText = "$ 0";


let cantProductos = document.getElementById("cantidadTotal");
cantProductos.innerText = "0";


$("#btnFinalizar").on('click', function(){
    const precioFinal = montoTotalCompra.innerText;
    Swal.fire("EL MONTO TOTAL DE LA COMPRA ES " + precioFinal);
});

$("#btnVaciar").on('click', function(){
    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'},
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: '¿ESTÁS SEGURO?',
        text: "¡No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Vaciar el carrito!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'ELIMINADO!',
                    'El carrito se ha vaciado correctamente.',
                    'success');
                    carrito.splice(0);
                    localStorage.removeItem("Carrito");
                    $("#tableBody").empty();    
                    montoTotalCompra.innerText = "$ 0";
                    cantProductos.innerText = "0";
                    badgeCarrito.innerText = "0";
                } 
                else if (
                    result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                    'CANCELADO',
                    'Tu carrito está a salvo.',
                    'error')
                }
            })
});


for(const prod of productos){
   document.getElementById(`${prod.id}`).onclick = () => agregarAlCarro(`${prod.id}`);
}

class ProductoCarrito{
    constructor (objProd){
        this.id = objProd.id;
        this.name = objProd.name;
        this.price = objProd.price;
        this.qty = 1;
    }
}


function agregarAlCarro(productoNuevo) {
    let encontrado = carrito.find(p=> p.id == productoNuevo.id);
    console.log(encontrado);

    if (encontrado == undefined) {
        let prodACarrito = new ProductoCarrito(productoNuevo);
        carrito.push(prodACarrito);
        localStorage.setItem("Carrito", JSON.stringify(carrito));
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Agregaste el producto al carrito',
            showConfirmButton: false,
            timer: 2000
        })
        
        $("#tableBody").append(
        `<tr><td> ${prodACarrito.name}</td>
            <td> ${prodACarrito.qty}</td>
            <td> $ ${prodACarrito.price}</td></tr>`);

    }else{
        //Pido al carro la posicion del producto
        let posicion = carrito.findIndex(p => p.id == productoNuevo.id);
        console.log(posicion);
        carrito[posicion].cantidad +=1;
        $(`#${productoNuevo.id}`).html(carrito[posicion].qty);
    }



   /* $("#tableBody").append(
        `<tr><td> ${productos[miId - 1].name}</td>
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
      })*/
}


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