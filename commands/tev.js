module.exports = {
    name: "tev",
    model: "!tev <utilisateur> [id du channel vocal] <temps en seconde(s)>",
    description: "Cette commande permet d'expulser un utilisateur d'un channel vocal spécifique pendant un certain temps",
    permision: "MANAGE_CHANNELS",
    execute(bot, msg, args) {
        /*const { Permissions } = require('discord.js');

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return message.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }*/
        msg.channel.send('Pong ! Calcul en cour...').then(message => {
            message.edit(`Pong ! Latence : ${message.createdTimestamp - msg.createdTimestamp}ms`);
        });
    }
}