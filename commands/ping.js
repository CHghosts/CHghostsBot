module.exports = {
    name: "ping",
    model: "!ping",
    description: "Cette commande permet d'afficher la vitesse de reponce du serveur",
    permision: "",
    execute(bot, msg, args) {
        msg.channel.send('Pong ! Calcul en cour...').then(message => {
            message.edit(`Pong ! Latence : ${message.createdTimestamp - msg.createdTimestamp}ms`);
        });
    }
}