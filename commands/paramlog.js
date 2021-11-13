module.exports = {
    name: "paramlog",
    model: "!paramlog <NomParramètre> [valeur]",
    description: "cette commande permet de modifier les diférents parramètres pour le systeme de log du bot",
    permision: "MANAGE_MESSAGES",
    execute(bot, msg, args) {
        
        /*const { Permissions } = require('discord.js');

        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return msg.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }*/
        amount = args;
        if(amount && amount[0] === "mention") {
            let fs = require("fs");
            let ServerConfig;
            fs.readFile(`./paramServer/${msg.guild.id}.json`, 'utf8', function(error, data){
                if (!error) {
                    ServerConfig = JSON.parse(data);
                    if (amount[1]) {
                        ServerConfig.valMention = amount[1];
                    }else {
                        ServerConfig.valMention ? ServerConfig.valMention = false : ServerConfig.valMention = true;
                    }
                    let resultModif = JSON.stringify(ServerConfig);
                    fs.writeFile(`./paramServer/${msg.guild.id}.json`, resultModif, (err) => {
                        if (err) throw err;
                        console.log(`Le fichier "${msg.guild.id}.json" à été modifié avec success !!`);
                        msg.channel.send(`Le parrametre "mention" vient d'etre defini sur "${ServerConfig.valMention}" pour se serveur`);
                    });
                }else {
                    console.log(`Le fichier "${msg.guild.id}.json" n'a pas put etre lu`);
                }
            });
        };
    }
}