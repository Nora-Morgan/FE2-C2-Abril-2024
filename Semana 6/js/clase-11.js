/**
 * Sincronismo vs. Asincronismo 
 */

// Sincronismo
// let nombre = "Pepe Milanesa";
// let saludo = `Hola, mi nombre es ${nombre}!`;
// console.log(saludo);

// nombre = "Pepe Milanesa";
// saludo = saludar(nombre);
// console.log(saludo);


// function saludar(name) {
//     return `Hola, mi nombre es ${name}! Te saludo desde una función`;
// }

/* ---------------------------------------------------------------------*/
// ¿Qué pasa cuando lo que debe procesar la función implica una demora?
// => Asincronismo
/* ---------------------------------------------------------------------*/
// Los patrones asíncronos más comunes son:
// callback, promises, async await y fetch.


/*
    PROMISES
*/

// En los Promises hay 3 estados posibles:
// Fullfilled - se ha cumplido
// Rejected - se ha recahzado o no se pudo cumplir
// Pending - no se ha cumplido no se ha rechazado


/*
    Ejemplo:
*/

// Tenemos un listado de comentarios como punto de partida.
// Esto van a funcionar como registros en una base de datos.
// Vamos a simular conectarnos con una API para recuperar los comentarios
// y verlos en pantalla.

let listadoComentarios = [{
    postId: 1,
    id: 1, 
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate …utem quasi\nreiciendis et nam sapiente accusantium'
},
{
    postId: 1,
    id: 2,
    name: 'quo vero reiciendis velit similique earum',
    email: 'Jayne_Kuhic@sydney.com',
    body: 'est natus enim nihil est dolore omnis voluptatem n…iatur\nnihil sint nostrum voluptatem reiciendis et'
}, {
    postId: 1,
    id: 3,
    name: 'odio adipisci rerum aut animi',
    email: 'Nikita@garfield.biz',
    body: 'quia molestiae reprehenderit quasi aspernatur\naut …mus et vero voluptates excepturi deleniti ratione'
}, {
    postId: 1,
    id: 4,
    name: 'alias odio sit',
    email: 'Lew@alysha.tv',
    body: 'non et atque\noccaecati deserunt quas accusantium u…r itaque dolor\net qui rerum deleniti ut occaecati'
}, {
    postId: 1,
    id: 5,
    name: 'vero eaque aliquid doloribus et culpa',
    email: 'Hayden@althea.biz',
    body: 'harum non quasi et ratione\ntempore iure ex volupta…ugit inventore cupiditate\nvoluptates magni quo et'
}, {
    postId: 2,
    id: 6,
    name: 'et fugit eligendi deleniti quidem qui sint nihil autem',
    email: 'Presley.Mueller@myrl.com',
    body: 'doloribus at sed quis culpa deserunt consectetur q…utem\nvoluptatem repellendus aspernatur dolorem in'
}, {
    postId: 2,
    id: 7,
    name: 'repellat consequatur praesentium vel minus molestias voluptatum',
    email: 'Dallas@ole.me',
    body: 'maiores sed dolores similique labore et inventore … corporis molestiae mollitia quia et magnam dolor'
}, {
    postId: 2,
    id: 8,
    name: 'et omnis dolorem',
    email: 'Mallory_Kunze@marie.org',
    body: 'ut voluptatem corrupti velit\nad voluptatem maiores…samus maiores\nvoluptates quia aliquid ullam eaque'
}, {
    postId: 2,
    id: 9,
    name: 'provident id voluptas',
    email: 'Meghan_Littel@rene.us',
    body: 'sapiente assumenda molestiae atque\nadipisci laboru…natur odit sit rem expedita\nquas enim ipsam minus'
}, {
    postId: 2,
    id: 10,
    name: 'eaque et deleniti atque tenetur ut quo ut',
    email: 'Carmen_Keeling@caroline.name',
    body: 'voluptate iusto quis nobis reprehenderit ipsum ame…s\nnostrum quaerat nulla et accusamus nisi facilis'
}, {
    postId: 3,
    id: 11,
    name: 'fugit labore quia mollitia quas deserunt nostrum sunt',
    email: 'Veronica_Goodwin@timmothy.net',
    body: 'ut dolorum nostrum id quia aut est\nfuga est invent…s quo est\nut blanditiis quia ut vel ut maiores ea'
}
];

/* -------------------------------------------------------------------------- */
/*           [1] FUNCION: escuchar el clic en "Ver comentarios"               */
/* -------------------------------------------------------------------------- */
const boton = document.querySelector("button");

boton.addEventListener("click", () => { 
  console.log("Se hizo clic para ver los comentarios...");  

    // Capturar el resultado de la promesa con el metodo then()

    // Si la promesa se cumple, el callback de cumplimiento se ejecutará,
    // de lo contrario se ejecuta el callback de error.
    // 👇
    
   consultaAsincrona("endpoint") 
        .then((resultado => {
            console.log(resultado);
            renderizarElementos(resultado);
            // la ruta es la correcta, por ello entra en el then con el resultado esperado
            // (el listado para iterar)
        }))
        .catch( (error) => {
            console.log(error);
            console.log(error.message);
            // si el endpoint está mal se debería rechazar la promesa
            // y capturar con el catch para ver el error
        })

    console.log("Se puede ejecutar esta tarea de mostrar este mensaje por consola mientras se procesa el pedido");
 })


/* -------------------------------------------------------------------------- */
/*                      [2] FUNCION: crear una promesa                      */
/* -------------------------------------------------------------------------- */
// Una función que retorna una promesa despues de 3 segundos.
// (con setTimeout se simula la demora en responder de un servidor)


function consultaAsincrona(ruta) {
    // Definir una promesa: usar la clase Promise y construir un objeto
    // 👇
    return new Promise(function(resolve, reject) {

        setTimeout(() => {
            ruta === "endpoint" 
                ? resolve(listadoComentarios)
                : reject( {message: "Error 404, recurso no encontrado"} );
        }, 3000);
     })
}


// Una promesa es un objeto que representa el resultado de una operación asíncrona.

// La función pasada a new Promise se llama ejecutor.
// Cuando se crea new Promise, el ejecutor corre automáticamente.
// Este contiene el código productor que a la larga debería producir el resultado.
// El ejecutor corre e intenta realizar una tarea.
// Cuando termina con el intento, llama a resolve si fue exitoso o reject si hubo un error.
// Una promesa es un simple texto provisional para una tarea asincrónica que aún no se ha completado.
// Al definir una promesa en el script, en vez de devolver un valor inmediatamente,
// esta devuelve una promesa.

// resolve(value): Esta indica que la tarea asincrónica se realizó correctamente.
// Esto ejecutará el callback de cumplimiento en el controlador then().

// reject(error): Esta indica un error mientras se intenta realizar la tarea asincrónica.
// Esta ejecutará el callback de error.




/* ----------------------------- Mesa de trabajo ---------------------------- */
/* -------------------------------------------------------------------------- */
/*             [3] FUNCION: Mostrar los comentarios en pantalla               */
/* -------------------------------------------------------------------------- */
// En este caso la consigna será más abierta, se explicitarán los requerimientos
// pero hay varias maneras de llegar al resultado.
// 1- Hay que desarrollar esta función para que reciba los comentarios y los muestre en pantalla.
// 2- La funcion debe ser llamada donde corresponda.
// 3- En el HTML hay un comentario creado, el mismo debe ser eliminado de ahí, pero hay que respetar
//    esa estructura de etiquetas para el resto de los comentarios.
// 4- Para el renderizado podemos utilizar .forEach() o llegar al mismo resultado utilizando .map()


function renderizarElementos(listado) {

    // desarrollar la funcion 👇
    
}



