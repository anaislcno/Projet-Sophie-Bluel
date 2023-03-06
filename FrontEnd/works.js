const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Fonction qui génère toute la page web

function generateWorks(works) {
  // Boucle pour tous les éléments
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const divGallery = document.querySelector(".gallery");
    // Création d’une balise dédiée à un projet
    const worksElement = document.createElement("figure");

    // Création des balises
    const imageUrlElement = document.createElement("img");
    imageUrlElement.src = article.imageUrl;
    imageUrlElement.alt = article.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = article.title;

    // On rattache la balise article a la div
    divGallery.appendChild(worksElement);
    // On rattache l’image à la figure
    worksElement.appendChild(imageUrlElement);
    worksElement.appendChild(titleElement);
  }
}

// Premier affichage de la page
generateWorks(works);

// Filtres

// Filtre : Tous
const buttonAll = document.querySelector("#btn-all");

buttonAll.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(works);
});

// Filtre : Objects
const buttonObjects = document.querySelector("#btn-object");

buttonObjects.addEventListener("click", function () {
  const worksObjectsFilter = works.filter(function (work) {
    return work.category.name === "Objets";
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(worksObjectsFilter);
});

// Filtre : Appartements
const buttonAppart = document.querySelector("#btn-apt");

buttonAppart.addEventListener("click", function () {
  const worksAppartFilter = works.filter(function (work) {
    return work.category.name === "Appartements";
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(worksAppartFilter);
});

// Filtre : Hôtels/Restaurants
const buttonHotel = document.querySelector("#btn-hotels");

buttonHotel.addEventListener("click", function () {
  const worksHotelFilter = works.filter(function (work) {
    return work.category.name === "Hotels & restaurants";
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(worksHotelFilter);
});

// Highlight sur le filtre sélectionné
let buttonFilters = document.getElementById("filter");
let buttonHighlight = buttonFilters.getElementsByClassName("btn");

for (let i = 0; i < buttonHighlight.length; i++) {
  buttonHighlight[i].addEventListener("click", function () {
    let buttonSelected = document.getElementsByClassName("active");
    buttonSelected[0].className = buttonSelected[0].className.replace(
      " active",
      ""
    );
    this.className += " active";
  });
}

// MODALE --> Mise en place

// Déclaration des const pour ouvrir/fermer la modale
const modal = document.getElementById("modal1");
const overlay = document.getElementById("overlay");
const buttonModal = document.getElementById("btn-modal");
const closeModal = document.getElementById("close");

//  Apparition de la modale qd on clique s/ le bouton
buttonModal.onclick = function () {
  modal.style.display = "flex";
  overlay.style.display = "flex";
};

//La modale se ferme si on clique sur la croix
closeModal.onclick = function () {
  modal.style.display = "none";
  overlay.style.display = "none";
};

// La modale se ferme si on clique en dehors
window.onclick = function (event) {
  if (event.target == overlay) {
    modal.style.display = "none";
    overlay.style.display = "none";
  }
};

//La modale se ferme avec esc
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
    overlay.style.display = "none";
  }
});

// Affichage du mode d'édition

function enableEditingMode() {
  const token = window.localStorage.getItem("accessToken");

  if (token == null) {
    // User pas co
    console.log("Vous devez vous connecter d'abord");
  } else {
    // User co
    console.log("Vous êtes connecté !");

    document.getElementById("edition-mode").style.display = "flex";

    Array.from(document.getElementsByClassName("btn-modif")).forEach(function (
      element
    ) {
      element.style.display = "block";
    });

    //Ajout du processus de logout

    document.getElementById("nav-login").style.display = "none";
    document.getElementById("nav-logout").style.display = "flex";

    const logout = document.getElementById("nav-logout");

    logout.onclick = function () {
      window.localStorage.clear("accessToken");
    };
  }
}

enableEditingMode();

// Grid modale
// Fonction qui génère toute la page web

function generateWorksGrid(works) {
  // Boucle pour tous les éléments
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const divEditGallery = document.querySelector("#edit-gallery");
    // Création d’une balise dédiée à un projet
    const worksElement = document.createElement("figure");
    worksElement.classList.add("figure-element");

    // Création des balises
    const imageUrlElement = document.createElement("img");
    imageUrlElement.src = article.imageUrl;
    imageUrlElement.alt = article.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = "éditer";

    const buttonDelete = document.createElement("i");
    buttonDelete.classList.add("fa-solid", "fa-trash-can", "btn-delete");
    // On rattache la balise article a la div
    divEditGallery.appendChild(worksElement);
    // On rattache l’image à la figure

    worksElement.appendChild(imageUrlElement);
    worksElement.appendChild(titleElement);
    worksElement.appendChild(buttonDelete);

    // Boutton de suppression
    buttonDelete.onclick = function (event) {
      const token = window.localStorage.getItem("accessToken");
      event.preventDefault();
      const deleteMethod = {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      };
      fetch("http://localhost:5678/api/works/" + article.id, deleteMethod);
    };
  }
}

// Affichage de la page
generateWorksGrid(works);
