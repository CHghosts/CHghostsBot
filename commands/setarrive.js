module.exports = {
    name: "setarrive",
    model: "!setarrive",
    description: "Cette commande permet de designer le channel ou cette commande et tapper comme channel d'arrive du serveur",
    permision: "MANAGE_MESSAGES",
    execute(bot, msg, args) {
        /*const { Permissions } = require('discord.js');

        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return msg.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }*/
        let fs = require("fs")
        let idGuild = msg.guild.id;
        let parramServer;
        fs.readFile(`./paramServer/${idGuild}.json`, 'utf8', function(error, data){
            if (!error) {
                parramServer = JSON.parse(data);
                parramServer.channelArriverId = msg.channel.id;
                let resultModif = JSON.stringify(parramServer);
                fs.writeFile(`./paramServer/${idGuild}.json`, resultModif, (err) => {
                    if (err) throw err;
                    console.log(`Le fichier "${idGuild}.json" à été modifié avec success !!`);
                    msg.channel.send(`Le channel <#${msg.channel.id}> vien d'etre defini comme channel d'arrivés`);
                });
            }else {
                msg.channel.send(`Le fichier de parrametre n'a pas été trouver`);
            }
        });
    }
}