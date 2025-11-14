const gardien = document.getElementById("Gardien");
const defenseurs = document.getElementById("defenseurs");
const milieux = document.getElementById("milieux");
const attaquants = document.getElementById("attaquants");
const listeJoueurs = document.getElementById("listeJoueurs")
const btn_en = document.getElementById("btn-en")

const nom = document.getElementById("nom");
const poste = document.getElementById("poste");
const prix = document.getElementById("prix");
const photo = document.getElementById("photo");
const nationalite = document.getElementById("nationalite");

let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];




btn_en.addEventListener("click",function(e){
    e.preventDefault();
  let joueur ={
    nom:nom.value,
    poste:poste.value,
    image:photo.value,
    prix:prix.value,
    natio:nationalite.value
}


joueurs.push(joueur)
localStorage.setItem("joueurs",JSON.stringify(joueurs))
document.querySelector("form").reset()
 afficherJoueurs();

});

 function afficherJoueurs(){
     listeJoueurs.innerHTML = "";

      joueurs.forEach((j, index) => {
          const div = document.createElement("div");
         div.className = "card card-player mb-2 p-2";

         div.innerHTML = `
             <img src="${j.image}" class="w-100 rounded">
             <h6>${j.nom}</h6>
             <p class="text-muted">${j.poste} - ${j.prix}M$</p>
             <button class="btn btn-sm btn-primary w-100" data-index="${index}">➕ Ajouter</button>  `;
        listeJoueurs.appendChild(div);
         });
}
afficherJoueurs();











// // ========== LocalStorage ==========
// let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];
// let composition = JSON.parse(localStorage.getItem("composition")) || {
//     gardien: null,
//     defenseurs: [],
//     milieux: [],
//     attaquants: [],
// };

// let budget = JSON.parse(localStorage.getItem("budget")) || 100;


// // ========== Enregistrer dans LocalStorage ==========
// function saveAll() {
//     localStorage.setItem("joueurs", JSON.stringify(joueurs));
//     localStorage.setItem("composition", JSON.stringify(composition));
//     localStorage.setItem("budget", JSON.stringify(budget));
// }


// // ========== Affichage joueurs dans la sidebar ==========
// function afficherJoueurs() {
//     const container = document.getElementById("listeJoueurs");
//     container.innerHTML = "";

//     joueurs.forEach((j, index) => {
//         const div = document.createElement("div");
//         div.className = "card card-player mb-2 p-2";

//         div.innerHTML = `
//             <img src="${j.photo}" class="w-100 rounded">
//             <h6>${j.nom}</h6>
//             <p class="text-muted">${j.poste} - ${j.prix}M$</p>
//             <button class="btn btn-sm btn-primary w-100" onclick="ajouterAComposition(${index})">➕ Ajouter</button>
//         `;

//         container.appendChild(div);
//     });
// }


// // ========== Ajouter à la composition ==========
// function ajouterAComposition(i) {
//     const joueur = joueurs[i];

//     // Budget
//     if (budget - joueur.prix < 0) {
//         alert("Budget insuffisant !");
//         return;
//     }

//     // Postes
//     if (joueur.poste === "Gardien") {
//         if (composition.gardien != null) {
//             alert("Il y a déjà un gardien !");
//             return;
//         }
//         composition.gardien = joueur;
//     }
//     else if (joueur.poste === "Défenseur") {
//         if (composition.defenseurs.length >= 4) return alert("Max défenseurs !");
//         composition.defenseurs.push(joueur);
//     }
//     else if (joueur.poste === "Milieu") {
//         if (composition.milieux.length >= 3) return alert("Max milieux !");
//         composition.milieux.push(joueur);
//     }
//     else if (joueur.poste === "Attaquant") {
//         if (composition.attaquants.length >= 3) return alert("Max attaquants !");
//         composition.attaquants.push(joueur);
//     }

//     budget -= joueur.prix;
//     joueurs.splice(i, 1);

//     saveAll();
//     afficherJoueurs();
//     afficherComposition();
// }


// // ========== Affichage de la composition ==========
// function afficherComposition() {
//     document.getElementById("budget").innerText = budget;

//     // Gardien
//     const gZone = document.querySelector(`[data-poste="Gardien"]`);
//     gZone.innerHTML = composition.gardien
//         ? `<div class="card p-2">
//                <p>${composition.gardien.nom}</p>
//                <button class="btn btn-sm btn-danger w-100" onclick="retirer('gardien',0)">Retirer</button>
//            </div>`
//         : `<div class="slot-empty">Vide</div>`;

//     // Défenseurs
//     const dZone = document.getElementById("defenseurs");
//     dZone.innerHTML = "";
//     composition.defenseurs.forEach((j, i) => {
//         dZone.innerHTML += `
//             <div class="col-3 card p-2">
//                 <p>${j.nom}</p>
//                 <button class="btn btn-sm btn-danger" onclick="retirer('defenseurs',${i})">Retirer</button>
//             </div>`;
//     });

//     // Milieux
//     const mZone = document.getElementById("milieux");
//     mZone.innerHTML = "";
//     composition.milieux.forEach((j, i) => {
//         mZone.innerHTML += `
//             <div class="col-3 card p-2">
//                 <p>${j.nom}</p>
//                 <button class="btn btn-sm btn-danger" onclick="retirer('milieux',${i})">Retirer</button>
//             </div>`;
//     });

//     // Attaquants
//     const aZone = document.getElementById("attaquants");
//     aZone.innerHTML = "";
//     composition.attaquants.forEach((j, i) => {
//         aZone.innerHTML += `
//             <div class="col-3 card p-2">
//                 <p>${j.nom}</p>
//                 <button class="btn btn-sm btn-danger" onclick="retirer('attaquants',${i})">Retirer</button>
//             </div>`;
//     });
// }


// // ========== Retirer joueur ==========
// function retirer(categorie, index) {
//     let joueur;

//     if (categorie === "gardien") {
//         joueur = composition.gardien;
//         composition.gardien = null;
//     } else {
//         joueur = composition[categorie][index];
//         composition[categorie].splice(index, 1);
//     }

//     budget += joueur.prix;
//     joueurs.push(joueur);

//     saveAll();
//     afficherJoueurs();
//     afficherComposition();
// }


// // ========== Ajouter joueur (modal) ==========
// document.getElementById("formJoueur").addEventListener("submit", function(e) {
//     e.preventDefault();

//     const nouveau = {
//         nom: nom.value,
//         poste: poste.value,
//         nationalite: nationalite.value,
//         prix: Number(prix.value),
//         photo: photo.value  
//     };

//     joueurs.push(nouveau);
//     saveAll();

//     afficherJoueurs();

//     // fermer modal bootstrap
//     const modal = bootstrap.Modal.getInstance(document.getElementById("modalJoueur"));
//     modal.hide();
// });
// const select = document.getElementById("filterPoste")
// function filter(){
//     if(select.value ==="Tous les postes" ){
//         afficherJoueurs();
//     }
//     else{
//         const selecfil = joueurs.filter(ya => ya.poste === select.value)
//         const container = document.getElementById("listeJoueurs");
//     container.innerHTML = "";

//     selecfil.forEach((j, index) => {
//         const div = document.createElement("div");
//         div.className = "card card-player mb-2 p-2";

//         div.innerHTML = `
//             <img src="${j.photo}" class="w-100 rounded">
//             <h6>${j.nom}</h6>
//             <p class="text-muted">${j.poste} - ${j.prix}M$</p>
//             <button class="btn btn-sm btn-primary w-100" onclick="ajouterAComposition(${index})">➕ Ajouter</button>
//         `;

//         container.appendChild(div);
//     });
//   }
    
// }
// select.addEventListener("change",filter)


// // ========== Reset ==========
// document.getElementById("resetBtn").addEventListener("click", function() {
//     if (!confirm("Réinitialiser ?")) return;

//     budget = 100;
//     joueurs.push(
//         ...composition.defenseurs,
//         ...composition.milieux,
//         ...composition.attaquants
//     );
//     if (composition.gardien) joueurs.push(composition.gardien);

//     composition = {
//         gardien: null,
//         defenseurs: [],
//         milieux: [],
//         attaquants: []
//     };

//     saveAll();
//     afficherJoueurs();
//     afficherComposition();
// });


// // ========== Au chargement ==========
// afficherJoueurs();
// afficherComposition();
