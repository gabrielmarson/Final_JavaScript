//Esto basicamente es super simple solo por medio de DOM voy injectando texto e imaganes al html "nosotros". también utilice bootstrap que me facilita mucho la parte resposive

document.getElementById("title1").innerHTML = "Compromiso";
document.getElementById("text1").innerHTML = "Somos un emprendimiento Cordobés de comercio electrónico que busca brindar un servicio de excelencia en venta y post venta, ofreciendo seguridad, responsabilidad y precios altamente competitivos en los mejores smartphones del mercado.";

let imgNosotros1 = document.createElement("img");
imgNosotros1.setAttribute("src", "../img/sobre_nosotros.jpg");
imgNosotros1.setAttribute("class", "class=card-img-top");
let container1 = document.getElementById("container1");
container1.appendChild(imgNosotros1);



document.getElementById("title2").innerHTML = "Responsabilidad";
document.getElementById("text2").innerHTML = "La forma en que trabajamos es 100% virtual con un catálogo en línea. La entrega de los equipos, cobro y servicios post-venta son personalizados y de manera presencial. El plazo de entrega es de 24 horas a 72 horas hábiles (excepto sábados, domingos y feriados).";

let imgNosotros2 = document.createElement("img");
imgNosotros2.setAttribute("src", "../img/sobre_nosotros_2.jpg");
imgNosotros2.setAttribute("class", "class=card-img-top");
let container2 = document.getElementById("container2");
container2.appendChild(imgNosotros2);

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