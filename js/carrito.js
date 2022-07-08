//Aca tenemos el carrito profe en realidad la tabla que va inyectandose al DOM. Pero en fin esta todo creo que se entiende bien

const carrito = JSON.parse(localStorage.getItem("carrito"));

let tbody = document.querySelector("#tbody");

function rellenarCarrito (arrayCarrito){

    for (let producto of (arrayCarrito)){

        row = document.createElement("tr");
        row.innerHTML = `<td>${producto.nombre}</td><td>$${producto.precio}</td><td>${producto.cantidad}</td><td>$${producto.subtotal}</td><td><button id="${producto.id}" class="btn btn-danger eliminarProducto">Eliminar</button></td>`;

        tbody.appendChild(row);
 
    }

}

rellenarCarrito(carrito);

let botonesEliminar = document.querySelectorAll(".eliminarProducto",);

botonesEliminar.forEach(elemento => {

    elemento.addEventListener("click", eliminarProducto);
    
});


function eliminarProducto(e){


    Swal.fire({
        title:"Está seguro que quiere eliminar el producto?" ,
        text: "El producto se eliminará del carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            let index = carrito.findIndex(producto => producto.id == e.target.id);

            carrito.splice(index, 1);

            e.target.parentNode.parentNode.remove();

            localStorage.setItem("carrito", JSON.stringify(carrito));
            
            setTimeout(function(){

                location.reload(); //Esta funcion que encontre en internet me salvo! basicamente es un F5. La tuve que usar porque no podia resolver de que por ejemplo al agragar o quitar un producto del carrito este se me actualice en el momento. Seguro hay otra forma quizas mas prolija y que vaya mejor pero esto em salvo y va bien, funciona diria usted profe jaja!

            }, 2500); //por supuesto meterlo en un seTimeout me ayudo mas!, mas que nada con el SweetAlert! Si no le metia esta funcion no me mostraba el cartel siguiente Swal.Fire por eso se me ocurrio hacer esperar un poco la funcion "location.reload()" para que se ejecutara primero el Swal.fire y funciono!!! =)

            Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado con exito',
                'success'
            );
          
        };
    });
    
};

carritoIcon(carrito);

function carritoIcon (arrayCarrito){

    let iconCarrito = document.getElementById("cajaCarrito");

    let totalProductos = 0;

    for(let producto of arrayCarrito){

        totalProductos += producto.cantidad;
    }

    iconCarrito.innerHTML = "";
    iconCarrito.innerHTML = `<p><i class="bi bi-cart"></i>(${totalProductos})</p>`;
};