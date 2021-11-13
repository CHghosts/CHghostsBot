let fs = require("fs")
function modifFile(file, nameParram, value) {
    fs.readFile(`./paramServer/${file}.json`, 'utf8', function(error, data){
        if (!error) {
            let parramServer = JSON.parse(data);
            parramServer.nameParram = value;
            parramServer = JSON.stringify(parramServer);
            console.log(parramServer);
        }else {
            msg.send(`Le fichier de parrametre n'a pas été trouver`);
        }
    });
}
export default modifFile;