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

      joueurs.forEach((j, index) => {
          const div = document.createElement("div");
        
         div.innerHTML = `
         <div class= "card card-player mb-2 p-2"  style = "background: #080d74ff; color: white">
             <img src="${j.image}" class="w-100 rounded">
             <h6>${j.nom}</h6>
             <p>${j.poste} - ${j.prix}M$</p>
             <button class="btn btn-sm btn-primary w-100" onclick="ajouterAComposition(${index})"> Ajouter</button>
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
            <button class="btn btn-sm btn-primary w-100" onclick="ajouterAComposition(${index})">➕ Ajouter</button>
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


