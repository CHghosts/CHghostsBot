module.exports = {
    name: "kick",
    model: "!ban <utilisateur> [raison]",
    description: "cette commande permet de kick un utilisateur et de presiser la raison (ne peut kick les utilisateur possédent un role qui se trouve au dessu du role du bot)",
    permision: "KICK_MEMBERS",
    execute(client, message, args) {

        const { Permissions } = require('discord.js');

        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("Vous n'avez pas les autorisation d'executer cette commande");
        let member = message.mentions.members.first();
        if(!member) return message.reply("Aucun utilisateur selectionné");
        if(member.id === message.author.id) return message.reply("Tu ne peut pas te kick toi meme !!!");
        let reason = args.slice(1).join(" ") || "Kick par la modération";
        member.kick({days: 0, reason: reason}).then(message.channel.send("L'utilisateur a été kick avec success !"));
    }
}