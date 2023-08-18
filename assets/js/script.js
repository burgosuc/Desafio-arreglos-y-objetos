const propiedadesJSON = [
  {
    nombre: "Casa de campo",
    descripcion: "Un lugar ideal para descansar de la ciudad",
    src: "https://casasdecampo.blog/wp-content/uploads/2021/08/casa-de-campo-de-madera-10.jpg",
    cuartos: 2,
    metros: 170,
  },
  {
    nombre: "Casa de playa",
    descripcion: "Despierta tus días oyendo el oceano",
    src: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/112728172.jpg?k=a3bfd87bce7c67438e6622b95764259458d3f555676cd3c7179b0c8bdd10b749&o=",
    cuartos: 2,
    metros: 130,
  },
  {
    nombre: "Casa en el centro",
    descripcion: "Ten cerca de ti todo lo que necesitas",
    src: "https://assets.easybroker.com/property_images/1832686/27948733/EB-GA2686.jpeg?version=1604007170",
    cuartos: 1,
    metros: 80,
  },
  {
    nombre: "Casa rodante",
    descripcion: "Conviertete en un nómada del mundo sin salir de tu casa",
    src: "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
    cuartos: 1,
    metros: 6,
  },
  {
    nombre: "Departamento",
    descripcion: "Desde las alturas todo se ve mejor",
    src: "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
    cuartos: 3,
    metros: 200,
  },
  {
    nombre: "Mansión",
    descripcion: "Vive una vida lujosa en la mansión de tus sueños ",
    src: "https://imagenes.t13.cl/images/original/2022/10/1666042662-33383ttbdy7c8lldccxp2fv6x20210622154308.jpg?width=670&dpr=2",
    cuartos: 5,
    metros: 500,
  },
];

// Paso 1: Creación de variables
let btnBuscar = document.getElementById("btnBuscar");
let propiedadesSection = document.querySelector(".propiedades");
let totalSpan = document.getElementById("propFiltradas");
let inputCuarto = document.getElementById("cantidadCuarto");
let inputMetrosMin = document.getElementById("metrosMin");
let inputMetrosMax = document.getElementById("metrosMax");

// Paso final: Mostrar todas las propiedades al cargarse la pagina:
mostrarPropiedades(propiedadesJSON, propiedadesSection);
mostrarTotalPropiedades(propiedadesJSON);

// Paso 2: Crear el evento click para en caso no rellenar los datos aparezca alarma y
//en caso de rellenar de respuesta con variable propiedadesFiltradas
btnBuscar.addEventListener("click", () => {
  let cantidadCuartos = inputCuarto.value;
  let metrosMinimos = inputMetrosMin.value;
  let metrosMaximos = inputMetrosMax.value;

  const inputs = {
    cantidadCuartos,
    metrosMinimos,
    metrosMaximos,
  };

  if (!validarInputs(inputs)) return false;

  propiedadesFiltradas = filtrarPropiedades(propiedadesJSON, inputs);

  mostrarPropiedades(propiedadesFiltradas, propiedadesSection);
  mostrarTotalPropiedades(propiedadesFiltradas);
});

function mostrarTotalPropiedades(propiedades) {
  let totalPropiedades = propiedades.length;

  totalSpan.innerHTML = totalPropiedades;
  //Permite agregar mensaje si la busqueda fue fallida.
  if (totalPropiedades > 0) {
    document.getElementById("notFound").hidden = true;
  } else {
    document.getElementById("notFound").hidden = false;
  }
}

const validarInputs = (inputs) => {
  for (const input in inputs) {
    if (inputs[input].length < 1) {
      alert("Faltan campos por llenar");
      return false;
    }
  }
  return true;
};

//Crear el template de una propiedad:
function templatePropiedad(propiedad) {
  const nombre = propiedad.nombre;
  const descripcion = propiedad.descripcion;
  const imagen = propiedad.src;
  const cuartos = propiedad.cuartos;
  const metros = propiedad.metros;

  return `
        <div class="propiedad">
                <div class="img"style="background-image: url('${imagen})">
                </div>
                <section>
                    <h5>${nombre}</h5>
                    <div class="d-flex justify-content-between">
                        <p>Cuartos: ${cuartos}</p>
                        <p>Metros: ${metros}</p>
                    </div>
                        <p class="my-3">${descripcion}</p>
                        <button class="btn btn-info ">Ver más</button>
                </section>
            </div>`;
}

//Mostrar en patalla las cards con las propiedades:

function mostrarPropiedades(propiedades, contenedor) {
  let html = "";

  for (const propiedad of propiedades) {
    html += templatePropiedad(propiedad);
  }
  contenedor.innerHTML = html;
}

//Filtrar las propiedades según los filtros entradados en los inputs
const filtrarPropiedades = (propiedades, inputs) => {
  let propiedadesFiltradas = [];
  let indexPropiedadesFiltradas = 0;

  for (let i = 0; i < propiedades.length; i++) {
    if (
      propiedades[i].cuartos == inputs.cantidadCuartos &&
      propiedades[i].metros >= inputs.metrosMinimos &&
      propiedades[i].metros <= inputs.metrosMaximos
    ) {
      propiedadesFiltradas[indexPropiedadesFiltradas] = propiedades[i];
      indexPropiedadesFiltradas++;
    }
  }

  return propiedadesFiltradas;
};
