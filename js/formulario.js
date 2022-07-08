//Basicamente aca solo llamo al carrito. Pero el formulario funciona llamando a una APi que encontre en internet que es super sencilla. En el html del formulario se lo explico un poco. De seguro usted la conoce profe tambien! 

const carrito = JSON.parse(localStorage.getItem("carrito"));

carritoIcon(carrito);

function carritoIcon (arrayCarrito){

    let iconCarrito = document.getElementById("cajaCarrito");

    let totalProductos = 0;

    for(let producto of arrayCarrito){

        totalProductos += producto.cantidad;

    }

    iconCarrito.innerHTML = "";
    iconCarrito.innerHTML = `<p><i class="bi bi-cart"></i>(${totalProductos})</p>`;
}