// Se hace una constante por cada imagen de las clases para poner la url como valor
document.addEventListener("DOMContentLoaded", function () {
  const imagenesPorClase = {
    barbarian: "img/Barbarian.png",
    bard: "img/Bard.png",
    cleric: "img/Cleric.png",
    druid: "img/Druid.png",
    fighter: "img/Fighter.png",
    monk: "img/Monk.png",
    paladin: "img/Palading.png",
    ranger: "img/Ranger.png",
    rogue: "img/Rogue.png",
    sorcerer: "img/Sorcerer.png",
    warlock: "img/Warlock.png",
    wizard: "img/Wizard.png",
  };

  //Funcion que genera los botones de las distintas clases (crea elementos de tipo boton, imagen y un span para en el css trabajarlo mejor)
  function generarBotones(data) {
    const btnDiv = document.getElementById("btnClases");
    data.results.forEach((clase) => {
      const classButton = document.createElement("button");
      const buttonImg = document.createElement("img");
      const textElement = document.createElement("span");

      // Se hace otra constante que tenga como valor el array de todas las imagenes y busque la clase por el nombre segun la clase del boton
      const imagenUrl = imagenesPorClase[clase.name.toLowerCase()];
      if (imagenUrl) {
        buttonImg.src = imagenUrl;
      }
      classButton.classList.add("clase-button");
      const textNode = document.createTextNode(clase.name);

      //Se appendea para que se muestre el contenido
      textElement.appendChild(textNode);
      classButton.appendChild(textElement);
      classButton.appendChild(buttonImg);
      classButton.addEventListener("click", function () {
        fetch(baseURL + clase.url)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => {
            // Handle the fetched data here
            showClass(data);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
      });
      btnDiv.appendChild(classButton);
    });

    //Se crea un boton para limpiar la pantalla cuando se preciona y tambien se le agrega imagen, boton y span
    const botonBorrar = document.createElement("button");
    const buttonImg = document.createElement("img");
    const textElement = document.createElement("span");
    const textoBtn = document.createTextNode("Borrar");
    buttonImg.src = "img/Borrar.png";
    botonBorrar.appendChild(textoBtn);
    botonBorrar.appendChild(textElement);
    botonBorrar.appendChild(buttonImg);
    btnDiv.appendChild(botonBorrar);

    botonBorrar.addEventListener("click", function () {
      clearData();
    });
    console.log(data);
  }

  //Se crea la funcion para que cuando se haga click en otro boton de otra clase no se acumule la informacion sino que esconda la anterior y abra la nueva
  function clearData() {
    const resultDiv = document.getElementById("result");
    resultDiv.classList.add("hide");
    const nombreClase = document.getElementById("nameClass");
    const vidaClase = document.getElementById("vidaClass");
    const choicesClase = document.getElementById("choicesClass");
    const profiClase = document.getElementById("profiClass");
    const subClase = document.getElementById("subClass");
    nombreClase.innerHTML = null;
    vidaClase.innerHTML = null;
    choicesClase.innerHTML = null;
    profiClase.innerHTML = null;
    subClase.innerHTML = null;
  }

  //funcion que muestra las clases y todos los objetos que lleva dentro: subclase, vida, choices,nombre)
  function showClass(clase) {
    const resultDiv = document.getElementById("result");
    clearData();
    resultDiv.classList.remove("hide");
    const nombreClase = document.getElementById("nameClass");
    const vidaClase = document.getElementById("vidaClass");
    const choicesClase = document.getElementById("choicesClass");
    const profiClase = document.getElementById("profiClass");
    const subClase = document.getElementById("subClass");

    const textoNombreClase = document.createTextNode(clase.name);
    const textoVidaClase = document.createTextNode(clase.hit_die);
    const textoChoicesClase = document.createTextNode(
      //De este json en especifico solo se quiere traer el valor que esta en la posicion 0
      clase.proficiency_choices[0].desc
    );
    nombreClase.appendChild(textoNombreClase);
    vidaClase.appendChild(textoVidaClase);
    choicesClase.appendChild(textoChoicesClase);

    // Por cada valor que tenga proficiencies y SubClass va a generar un li para que no quede todo junto sino que cree una columna
    clase.proficiencies.forEach((proficiency) => {
      const itemLista = document.createElement("li");
      const textoProfiClase = document.createTextNode(proficiency.name);
      itemLista.appendChild(textoProfiClase);
      profiClase.appendChild(itemLista);
    });

    clase.subclasses.forEach((subclass) => {
      const itemLista = document.createElement("li");
      const textoSubClase = document.createTextNode(subclass.name);
      itemLista.appendChild(textoSubClase);
      subClase.appendChild(itemLista);
    });
  }

  //Se hace la funcion fetchData a la api mediante el url y se genera el catch por si hay algun error
  function fetchData(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the fetched data here
        generarBotones(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  //Se hacen const con las url de las api utilizadas
  const baseURL = "https://www.dnd5eapi.co";

  const apiUrl = "https://www.dnd5eapi.co/api/classes";

  // Llama la funcion del fetch con la url
  fetchData(apiUrl);
});
