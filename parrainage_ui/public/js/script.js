let parrainNonSelect=localStorage.getItem('parrainNonSelect')!=null ? JSON.parse(localStorage.getItem('parrainNonSelect')): tabL3.slice()
let filleulNonSelect=localStorage.getItem('filleulNonSelect')!=null ? JSON.parse(localStorage.getItem('filleulNonSelect')): tabL1.slice()
let player=localStorage.getItem('player')!=null? JSON.parse(localStorage.getItem('player')): null;
let tabFilleulParrainPot=[]



function fusionner() {

    for (let i = 0; i < filleulNonSelect.length; i++) {
        var selectedL1= filleulNonSelect[i];
        var parrainsPot = [];
        if (parrainNonSelect.length != 0) {
            for (let j = 0; j < parrainNonSelect.length; j++) {
                const commonInt = filleulNonSelect[i].interests.filter((element) => parrainNonSelect[j].interests.includes(element));
                
                if (commonInt.length>6) {
    
                    parrainsPot.push(parrainNonSelect[j])
                     console.log(selectedL1.firstName+" X "+parrainNonSelect[j].firstName +" "+commonInt.length )
                }
                
                selectedL1.parrains= parrainsPot
                tabFilleulParrainPot.push(selectedL1)
            }
        }
        // else{
        //     for (let i = 0; i < filleulNonSelect.length; i++) {
        //         var selectedL1= filleulNonSelect[i];
        //         var parrainsPot = [];
        //         for (let j = 0; j < tabL3.length; j++) {
        //             const commonInt = filleulNonSelect[i].interests.filter((element) => tabL3[j].interests.includes(element));
                    
        //             if (commonInt.length>6) {
        
        //                 parrainsPot.push(tabL3[j])
        //                  console.log(selectedL1.firstName+" X "+tabL3[j].firstName +" "+commonInt.length )
        //             }
                    
        //             selectedL1.parrains= parrainsPot
        //             tabFilleulParrainPot.push(selectedL1)
        //         }
                
        //     }
        // }
        
    } 

     
}

function fusionner2(){
    for (let i = 0; i < filleulNonSelect.length; i++) {
        var selectedL1= filleulNonSelect[i];
        var parrainsPot = [];
        for (let j = 0; j < tabL3.length; j++) {
            const commonInt = filleulNonSelect[i].interests.filter((element) => tabL3[j].interests.includes(element));
            
            if (commonInt.length>6) {

                parrainsPot.push(tabL3[j])
                 console.log(selectedL1.firstName+" X "+tabL3[j].firstName +" "+commonInt.length )
            }
            
            selectedL1.parrains= parrainsPot
            tabFilleulParrainPot.push(selectedL1)
        }
        
    } 
}



function selectPlayer() {
    const randomNum = Math.floor(Math.random() * (tabFilleulParrainPot.length));

    player = tabFilleulParrainPot[randomNum];
    localStorage.setItem("player",JSON.stringify(player))

     console.log(player)

    document.getElementById("playername").innerHTML = player.lastName + ' ' + player.firstName

    console.log("PARRAIN "+parrainNonSelect.length);
    console.log("FILLEUL "+filleulNonSelect.length);
    

}



function chooseParrain() {
    let parrain;

    if (player.parrains.length>0) {
        const randomNum = Math.floor(Math.random() * (player.parrains.length));
        parrain= player.parrains[randomNum];
        console.log(player.firstName +" X "+parrain.firstName)

    } else {
        const randomNum = Math.floor(Math.random() * (parrainNonSelect.length));
        parrain= parrainNonSelect[randomNum];
        console.log(player.firstName +" X "+parrain.firstName)
    }

    for (let i = 0; i < tabFilleulParrainPot.length; i++) {
        
        if (tabFilleulParrainPot[i].parrains.includes(parrain)) {
            tabFilleulParrainPot[i].parrains.splice(tabFilleulParrainPot[i].parrains.findIndex(obj => obj._id === parrain._id),1)
        }
        
    }


    filleulNonSelect.splice(filleulNonSelect.findIndex(obj => obj._id === player._id),1)
    // filleulNonSelect.splice(tabFilleulParrainPot.findIndex(obj => obj._id === player._id),1)
    parrainNonSelect.splice(parrainNonSelect.findIndex(obj => obj._id === parrain._id),1)


    localStorage.setItem("filleulNonSelect",JSON.stringify(filleulNonSelect))
    localStorage.setItem("parrainNonSelect",JSON.stringify(parrainNonSelect))

    localStorage.removeItem("player");

    console.log(tabFilleulParrainPot)
    console.log("PARRAIN "+parrainNonSelect.length);
    console.log(parrainNonSelect)
    console.log("FILLEUL "+filleulNonSelect.length);

    if (player.photo!=null) {
        document.getElementById("photofilleul").src = 'https://miage-ufhb.ci'+player.photo
    }
    if (parrain.photo!=null) {
        document.getElementById("photoparrain").src = 'https://miage-ufhb.ci'+parrain.photo
    }
    

    document.getElementById("playername").innerHTML = player.lastName.toUpperCase() + ' ' + player.firstName.toUpperCase()
    document.getElementById("parrainname").innerHTML = parrain.lastName.toUpperCase() + ' ' + parrain.firstName.toUpperCase()

    
    if (parrainNonSelect.length===0) {
        reinitData();
    }
    localStorage.setItem("filleulNonSelect",JSON.stringify(filleulNonSelect))
    localStorage.setItem("parrainNonSelect",JSON.stringify(parrainNonSelect))
    
}

function jouer() {
    while (filleulNonSelect.length>0) {
        selectPlayer()
        chooseParrain()
    }
}


function reinitData() {
    console.log("RERERERERER")
    parrainNonSelect=tabL3.slice();
    console.log("pp")
    tabFilleulParrainPot=[];
    console.log(filleulNonSelect)
    console.log(tabL3)

    fusionner()
}