const gardi = document.getElementById("Gardien");
const defens = document.getElementById("defenseurs");
const milie = document.getElementById("milieux");
const attaq= document.getElementById("attaquants");
const listeJoueurs = document.getElementById("listeJoueurs")
const btn_en = document.getElementById("btn-en")
 
const nom = document.getElementById("nom");
const poste = document.getElementById("poste");
const prix = document.getElementById("prix");
const photo = document.getElementById("photo");
const nationalite = document.getElementById("nationalite");
const  select = document.getElementById("filterPoste")

let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];

btn_en.addEventListener("click",function(e){
    e.preventDefault();
    if(nom.value.trim()===''){
        nom.style.border = "2px solid red"
        alert("entre le nom");
        return
    }
     if(poste.value.trim()===''){
        poste.style.border = "2px solid red"
        alert("entre le poste");
        return
    } 
    if(photo.value.trim()===''){
        photo.style.border = "2px solid red"
        alert("entre le photo");
        return
    }
     if(prix.value.trim()===''){
        prix.style.border = "2px solid red"
        alert("entre le prix");
        return
    }
     if(nationalite.value.trim()===''){
        nationalite.style.border = "2px solid red"
        alert("entre la nationalite");
        return
    }
    else{
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
    }
});

 function afficherJoueurs(){
     listeJoueurs.innerHTML = "";

      joueurs.forEach((j,i) => {
          const div = document.createElement("div");
        
         div.innerHTML = `
         <div class= "card card-player mb-2 p-2"  style = "background: #080d74ff; color: white">
             <img src="${j.image}" class="w-100 rounded">
             <h6>${j.nom}</h6>
             <p>${j.poste} - ${j.prix}M$</p>
             <button class="btn btn-sm btn-primary w-100" onclick="ajouterAComposition(${i})">Ajouter</button>
             </div>  `;
        listeJoueurs.appendChild(div);
         });
}
afficherJoueurs();

function filter(){
    if(select.value ==="Tous les postes" ){
        afficherJoueurs();
    }
    else{
        const selecfil = joueurs.filter(ya => ya.poste === select.value)
        const container = document.getElementById("listeJoueurs");
    container.innerHTML = "";

    selecfil.forEach((j, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
        <div class= "card card-player mb-2 p-2"  style = "background: #080d74ff; color: white">
            <img src="${j.image}" class="w-100 rounded">
            <h6>${j.nom}</h6>
            <p >${j.poste} - ${j.prix}M$</p>
            <button class="btn btn-sm btn-primary w-100" onclick="ajouterAComposition(${index})">Ajouter</button>
         </div>
            `;

        container.appendChild(div);
    });
  }
    
}
select.addEventListener("change",filter)

// composition
let composition = JSON.parse(localStorage.getItem("composition")) || {
    gardien: null,
    defenseurs: [],
    milieux: [],
    attaquants: [],
};
function ajouterAComposition(i){
     const joueur = joueurs[i]
     if(joueur.poste ==="Gardien"){
     if(composition.gardien !=null){
        alert("errur top de gardian est 1")
        return
     }
        composition.gardien = joueur
    }
    if(joueur.poste ==="Défenseur"){
      if(composition.defenseurs.length >= 4){
        return alert("errur top de defenseur est 4")
    }
       composition.defenseurs.push(joueur)
    } 
     if(joueur.poste ==="Milieu"){
     if(composition.milieux.length >= 3){
        return alert("errur top de milieu est 3");
     }
       composition.milieux.push(joueur)
    }
     if(joueur.poste ==="Attaquant"){
       if(composition.attaquants.length >= 3){
        return alert("errur top de attaquant est 3")
     }
      composition.attaquants.push(joueur);
     
    }
    localStorage.setItem("composition",JSON.stringify(composition))
    afficherComposition();
}
function afficherComposition() {
    document.getElementById("budget").innerText = budget;

    // Gardien
    const gZone = document.querySelector(`[data-poste="Gardien"]`);
    gZone.innerHTML = composition.gardien
        ? `<div class="card p-2">
                <p>${composition.gardien.nom}</p>
               <img src="${composition.gardien.image}" class=" rounded" style = "height:150px ; width:50%;margin-left:25%">
               <button class="btn btn-sm btn-danger w-100">Retirer</button>
           </div>`
        : `<div class="slot-empty">Vide</div>`;

    // Défenseurs
    const dZone = document.getElementById("defenseurs");
    dZone.innerHTML = "";
    composition.defenseurs.forEach((j) => {
        dZone.innerHTML += `
            <div class="col-3 card p-2">
                <p>${j.nom}</p>
               <img src="${j.image}" class="w-100 rounded" style = "height:100px">

                <button class="btn btn-sm btn-danger">Retirer</button>
            </div>`;
    });

    // Milieux
    const mZone = document.getElementById("milieux");
    mZone.innerHTML = "";
    composition.milieux.forEach((j) => {
        mZone.innerHTML += `
            <div class="col-3 card p-2">
                <p>${j.nom}</p>
               <img src="${j.image}" class="w-100 rounded" style = "height:100px;">
                <button class="btn btn-sm btn-danger">Retirer</button>
            </div>`;
    });

    // Attaquants
    const aZone = document.getElementById("attaquants");
    aZone.innerHTML = "";
    composition.attaquants.forEach((j) => {
        aZone.innerHTML += `
            <div class="col-3 card p-2" >
                <p>${j.nom}</p>
               <img src="${j.image}" class="w-100 rounded" style = "height:100px">
                <button class="btn btn-sm btn-danger">Retirer</button>
            </div>`;
    });
}
    
afficherComposition();


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

// let budget = JSON.parse(localStorage.getItem("budget")) || 100;

// function saveAll() {
//     localStorage.setItem("joueurs", JSON.stringify(joueurs));
//     localStorage.setItem("composition", JSON.stringify(composition));
//     localStorage.setItem("budget", JSON.stringify(budget));
// }

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

//     budget -= joueur.prix

//     saveAll();
//     afficherJoueurs();
//     afficherComposition();
// }
// afficherComposition();

// // ========== Affichage de la composition ==========*




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


