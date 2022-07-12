//Profe aca para empezar lo primero que hago es llamar al json por medio del fetch y guardarlo en una variable

fetch("http://localhost/js/equipos.json")
    .then((resp) => resp.json())
    .then((data) => {

    

    let result = data.equipos;
    equipos = result;

    const storage = JSON.parse(localStorage.getItem("filtro"));

    let celus = document.getElementById("celus");

    //Pofe aca le presento la función creadora de las cards. Es una mezcla entre css nativo y algo de boostrap. No se si es la más prolija pero creo que quedo bien y por supuesto funciona.

    function crearCajasCelus(arrayCelus){

    celus.innerHTML = "";

    for (let i = 0; i < arrayCelus.length; i++){
    
    let celu = arrayCelus[i]
    let container = document.createElement("div");
    let name = document.createElement("h3");
    name.textContent = arrayCelus[i].marca + " " + arrayCelus[i].modelo;

    let signoPeso = document.createElement("h3")
    signoPeso.textContent = " $";
    signoPeso.style.cssText = "font-weight: bold";

    let precio = document.createElement("h3");
    precio.textContent = arrayCelus[i].precio;
    precio.style.cssText = "font-weight: bold";


    let img = document.createElement("img");
    img.setAttribute("src", celu.imagen);
    img.setAttribute("alt", celu.id);

    let button = document.createElement("button");
    button.classList = "anadirCarrito";
    button.style.background = "rgb(71, 136, 233)";
    button.style.borderRadius = "0.5rem";
    button.style.marginBottom = "1rem";
    button.style.marginTop ="1rem";
    button.innerText = "Agregar al carrito";

    container.appendChild(name);
    container.appendChild(signoPeso);
    container.appendChild(precio);
    container.appendChild(img);
    container.appendChild(button);
    

    celus.appendChild(container);

    container.addEventListener("mouseover",() =>{

        container.style.transform = "scale(1.1, 1.1)";
        container.style.transitionDuration = "0.5s";
    });

    container.addEventListener("mouseout",() =>{

        container.style.transform = "scale(1.0, 1.0)";
    });

    button.addEventListener("click",() => {

        Toastify({
            text: "Producto agregado con éxito!",
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #00b09b, #96c92d)'
            }
        }).showToast(); 

    });
    

    };

}
   //Una vez obtenidas las cards se me ocurrio poner un flitro con la función "flitrarEquipos". Funciona va bien. le podria haber agregado algun filtro mas como el de precio. Pero creame que ya no llego con el tiempo je. Pero se podría hacer

    let arrayEquipos = equipos;

    storage ? arrayEquipos = storage : false;

    const inputRadio = document.getElementsByClassName("radio");

    for(const input of inputRadio){

    input.addEventListener("change", filtrarEquipos);

};
    


    function filtrarEquipos(evento){

        let inputValue = evento.target.value.toUpperCase();

        location.reload(); //Aca profe tuve que usar esta funcón porque no podia resolver un problema. La cuestion es que al filtrar los equipos y agregar un producto al carrito este no me lo hacia; para que funcionara necesitaba refrescar ("F5") la página o bien moverme entre las secciones de la misma para que agregara al carrito. Asi que despues de unos días jaja encontre esta función. No se si la forma mas correcta, pero me funcionó y anda bien
    
        /*if(inputValue != "TODOS"){
    
            arrayEquipos = equipos.filter((elemento) => {
    
                return elemento.marca.toUpperCase() === inputValue;
            })
            
        }else{
    
            arrayEquipos = equipos;
        }
    
        */
    
        //Acá solo esta la estructura IF que basicamente la pase a operadores avanzados. Es lo mismo la dos funcionan

        inputValue != "TODOS" ? arrayEquipos = equipos.filter((elemento) =>{return elemento.marca.toUpperCase() === inputValue}) : arrayEquipos = equipos;
    
        localStorage.setItem("filtro", JSON.stringify(arrayEquipos));
    
        crearCajasCelus(arrayEquipos);
    
    };

    crearCajasCelus(arrayEquipos);



    let botones = document.querySelectorAll(".anadirCarrito");

    botones.forEach(element => {
    
    element.addEventListener("click", anadirCarrito);
});

    //Aca arancamos un poco con el carrito. Esto lo pude sacar de un video y me ayudo un monton. El hecho de crear una clase constructora me facilito un monton de cosas!

    let carrito = [];

    class ProductoCarrito {
    
        constructor(nombre, precio, imagen, id, cantidad, subtotal,){
            this.nombre = nombre;
            this.precio = precio;
            this.imagen = imagen;
            this.id = id;
            this.cantidad = cantidad = 1;
            this.subtotal = precio;
            
        }
    }

    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));

    if (carritoLocalStorage){

        carritoIcon(carritoLocalStorage);
    };

    function anadirCarrito(e) {

        let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
        
    
        if(carritoLocalStorage){
            
            carrito = carritoLocalStorage;
    
        }

    
        let index = carrito.findIndex(producto => producto.id == e.target.parentNode.children[3].alt);
        
        let nombre = e.target.parentNode.children[0].textContent;
        let precio = e.target.parentNode.children[2].textContent;
        let imagen = e.target.parentNode.children[3].src;
        let id = e.target.parentNode.children[3].alt;
    
        if(index == -1){
            
            const producto = new ProductoCarrito (nombre, precio, imagen, id);
    
            carrito.push(producto);
        
        }else{

            carrito[index].cantidad++
            carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad

        }
    
        localStorage.setItem("carrito", JSON.stringify(carrito));

        carritoIcon(carrito);
    };

    //Esta función "carritoIcon" la tuve que llamar en todos los scripts por si no no me actualizaba el numero en el icon del carrito de cada html

    function carritoIcon (arrayCarrito){

        let iconCarrito = document.getElementById("cajaCarrito");

        let totalProductos = 0;

        for(let producto of arrayCarrito){

            totalProductos += producto.cantidad;
        }

        iconCarrito.innerHTML = "";
        iconCarrito.innerHTML = `<p><i class="bi bi-cart"></i>(${totalProductos})</p>`;
    };

    
})    
