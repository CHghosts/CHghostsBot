module.exports = {
    name: "uptime",
    model: "!uptime",
    description: "Cette commande permet d'afficher depuis combien de temps le bot et démarré",
    permision: "",
    execute(bot, msg, args) {
        days = Math.floor((bot.uptime / (1000 * 60 * 60 * 24)) % 60).toString();
        hours = Math.floor((bot.uptime / (1000 * 60 * 60)) % 60).toString();
        minutes = Math.floor((bot.uptime / (1000 * 60)) % 60).toString();
        seconds = Math.floor((bot.uptime / 1000) % 60).toString();

        msg.channel.send(`Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
}