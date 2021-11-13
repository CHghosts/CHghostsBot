module.exports = {
    name: "opCH",
    execute(bot, msg, args) {
        msg.channel.send('Pong ! Calcul en cour...').then(message => {
            message.edit(`Pong ! Latence : ${message.createdTimestamp - msg.createdTimestamp}ms`);
        });
    }
}