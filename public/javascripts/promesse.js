var https = require('https');

function getData() {
    return new Promise(function(resolve, reject) {
        // requete HTTP
        https.get('https://www.prevision-meteo.ch/services/json/Angers', (resp) => {

            let data = null;
            // Un morceau de réponse est reçu
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // La réponse complète à été reçue. On affiche le résultat.
            resp.on('end', () => {
                console.log('data reçues');
                // Premier et seul callback
                resolve(data);

                console.log('supprimer les fichiers temporaires');

            });

        }).on('error', (err) => {
            reject('Error: ' + err.message);
        });
    })
}

// impossible de faire 2 fois un callback !! 
const prom = getData();
prom.then((data) => {
    console.log('Affichage des datas en cours ... ');
    var data2 = JSON.parse(data).city_info;
    setTimeout(() => {
        console.log('Affichage des datas terminé ');
        return data2
    }, 3000);

});
// prom.then(() => {
//     console.log('Envoie du mail en cours ...');
//     setTimeout(() => {
//         console.log('Envoie du mail terminé');
//     }, 1000);

//     //console.log(data);
// })

console.log('Fin du premier thread')