const Discord = require("discord.js");
let fs = require("fs");
let ServerConfig;
let chargementFichierOk;
const bot = new Discord.Client({intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
]});
const config = require("./config.json");
let json;

bot.on("ready", msg => {
    bot.user.setActivity(config.activity);
    console.log(bot.user);
    console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    console.log("                                                                               Bot operationnel !!!");
    console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    bot.guilds.cache.find(server => {

        let exemple = `
{
    "id": "${server.id}",
    "name": "${server.name}",
    "channelArriverId": "",
    "channelDepartId": "",
    "channelLogId": "",
    "mentionLog": false
}`;
        fs.readFile(`./paramServer/${server.id}.json`, 'utf8', function(error, data){
            if (!error) {
                json = JSON.parse(data)
            }else {
                let preConfig = exemple;
                fs.writeFile(`./paramServer/${server.id}.json`, preConfig, (err) => {
                    if (err) throw err;
                    console.log(`Le fichier "${server.id}.json" à été crée avec success !!`);
                });
            }
        });
    })


    /*const channel = bot.channels.cache.get('880225211037933622');
    if(!channel) return;
    channel.send(`bot redemarer !!!`);*/
})
bot.on("guildMemberAdd", member => {
    const channel = bot.channels.cache.get('880226308213338165');
    if(!channel) return;
    channel.send(`${member.displayName} nous a rejoint !`)
})
bot.on("messageCreate", msg => {
    if(msg.author.bot) return;
    let content = msg.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;

    if(msg.content.startsWith(config.prefix)) {
        try {
            let commandFile = require(`./commands/${command.slice(prefix.length)}.js`);
            commandFile.execute(bot, msg, args);
        } catch(e) {
            let commandeReturn = (msg.content.split(" ").length > 1) ? content[0] : msg.content;
            msg.reply(`La commande "${commandeReturn}" n'a pas été reconnue`);
        }
    }
    /* ---------- Systeme de log ----------- */
    fs.readFile(`./paramServer/${msg.guild.id}.json`, 'utf8', function(error, data){
        if (!error) {
            ServerConfig = JSON.parse(data);
            if(ServerConfig.channelLogId && (msg.guild.id === ServerConfig.id)) {
                let commandeReturn = (msg.content.split(" ").length > 1) ? content[0] : msg.content;
                let userMsgMention = "<@"+msg.author.id+">";
                if(msg.content.startsWith(config.prefix)) {
                    const channel = bot.channels.cache.get(ServerConfig.channelLogId);
                    let avatar = msg.author.displayAvatarURL({ size: 1024, dynamic: true });
                    const embed = new Discord.MessageEmbed()
                        .setColor("#FF7C00")
                        .setTitle("Log Serveur")
                        .setURL("https://discord.js.org/")
                        .setAuthor("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
                        .setDescription(`La commande "${commandeReturn}" à été executer par "${(ServerConfig.valMention) ? userMsgMention : msg.author.username}" dans le channel <#${msg.channel.id}>`)
                     .setThumbnail(`${avatar}`)
                    channel.send({embeds: [embed]}).catch(err => {
                        console.log('log nn envoyer :' + err);
                    })
                }else {
                    const channel = bot.channels.cache.get(ServerConfig.channelLogId);
                    let avatar = msg.author.displayAvatarURL({ size: 1024, dynamic: true });
                    if(msg.type === "REPLY") {
                        let userMsgReply = "<@"+msg.mentions.repliedUser.id+">";
                        const embed = new Discord.MessageEmbed()
                            .setColor("#FF7C00")
                            .setTitle("Log Serveur")
                            .setURL("https://discord.js.org/")
                            .setAuthor("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
                            .setDescription(`Reponce de "${(ServerConfig.valMention) ? userMsgMention : msg.author.username}" à "${(ServerConfig.valMention) ? userMsgReply : msg.mentions.repliedUser.username}" dans le channel <#${msg.channel.id}>`)
                            .setThumbnail(`${avatar}`)
                            .addField("Message :", `${msg.content}`)
                        channel.send({embeds: [embed]}).catch(err => {
                            console.log('log nn envoyer :' + err);
                        })
                    }else {
                        const embed = new Discord.MessageEmbed()
                            .setColor("#FF7C00")
                            .setTitle("Log Serveur")
                            .setURL("https://discord.js.org/")
                            .setAuthor("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
                            .setDescription(`Message de "${(ServerConfig.valMention) ? userMsgMention : msg.author.username}" dans le channel <#${msg.channel.id}>`)
                            .setThumbnail(`${avatar}`)
                            .addField("Message :", `${msg.content}`)
                        channel.send({embeds: [embed]}).catch(err => {
                            console.log('log nn envoyer :' + err);
                        })
                    }
                }
            }
        }else {
            console.log(`Le fichier "${msg.guild.id}.json" n'a pas put etre lu`);
        }
    });
})

/* detection de la modification d'un msg */
bot.on("messageUpdate", msg => {
    if(msg.author.bot) return;
    let content = msg.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;

    if(msg.content.startsWith(config.prefix)) {
        try {
            let commandFile = require(`./commands/${command.slice(prefix.length)}.js`);
            commandFile.execute(bot, msg, args);
        } catch(e) {
            let commandeReturn = (msg.content.split(" ").length > 1) ? content[0] : msg.content;
            msg.reply(`La commande "${commandeReturn}" n'a pas été reconnue`);
            return;  
        }
    }

    /* ---------- Systeme de log ----------- */
    fs.readFile(`./paramServer/${msg.guild.id}.json`, 'utf8', function(error, data){
        if (!error) {
            ServerConfig = JSON.parse(data);
            if(ServerConfig.channelLogId && (msg.guild.id === ServerConfig.id)) {
                let commandeReturn = (msg.content.split(" ").length > 1) ? content[0] : msg.content;
                let userMsgMention = "<@"+msg.author.id+">";
                if (msg.reactions.message.content !== msg.content) {
                    if(msg.content.startsWith(config.prefix)) {
                        const channel = bot.channels.cache.get(ServerConfig.channelLogId);
                        let avatar = msg.author.displayAvatarURL({ size: 1024, dynamic: true });
                        const embed = new Discord.MessageEmbed()
                            .setColor("#FF7C00")
                            .setTitle("Log Serveur")
                            .setURL("https://discord.js.org/")
                            .setAuthor("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
                            .setDescription(`La commande "${commandeReturn}" à été modifié et executé par "${(ServerConfig.valMention) ? userMsgMention : msg.author.username}" dans le channel <#${msg.channel.id}>`)
                         .setThumbnail(`${avatar}`)
                        channel.send({embeds: [embed]}).catch(err => {
                            console.log('log nn envoyer :' + err);
                        })
                    }else {
                        const channel = bot.channels.cache.get(ServerConfig.channelLogId);
                        let avatar = msg.author.displayAvatarURL({ size: 1024, dynamic: true });
                        const embed = new Discord.MessageEmbed()
                        .setColor("#FF7C00")
                        .setTitle("Log Serveur")
                        .setURL("https://discord.js.org/")
                        .setAuthor("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
                        .setDescription(`Modification du message de "${(ServerConfig.valMention) ? userMsgMention : msg.author.username}" dans le channel <#${msg.channel.id}>`)
                        .setThumbnail(`${avatar}`)
                        .addField("Ancien message :", `${msg.content}`)
                        .addField("Nouveau message :", `${msg.reactions.message.content}`)
                        channel.send({embeds: [embed]}).catch(err => {
                            console.log('log nn envoyer :' + err);
                        })
                    }
                }
            }
        }else {
            console.log(`Le fichier "${msg.guild.id}.json" n'a pas put etre lu`);
        }
    });
})

bot.on('voiceStateUpdate', (oldState, newState) => {
  let newUserChannel = newState.voiceChannel
  let oldUserChannel = oldState.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

     // User Joins a voice channel
     //console.log('add');

  } else if(newUserChannel === undefined){

    // User leaves a voice channel
    //console.log('old');
    fs.readFile(`./paramServer/${oldState.guild.id}.json`, 'utf8', function(error, data){
        if (!error) {
            ServerConfig = JSON.parse(data);
            if(ServerConfig.channelLogId && (oldState.guild.id === ServerConfig.id)) {
                const channel = bot.channels.cache.get(ServerConfig.channelLogId);
                //channel.send(`LOG : ${msg.author.username} => ${msg.content}`)


                let userInfo = bot.users.cache.get(oldState.id);
                let UserSpecVoc = `<@${userInfo.id}>`;
               


                let avatar = userInfo.displayAvatarURL({ size: 1024, dynamic: true });
                //let avatar = '';
                if(!oldState.channelId) {
                    //channel.send(`<@${oldState.id}> à rejoint le vocal <#${newState.channelId}>`)

                    const embed = new Discord.MessageEmbed()
                        .setColor("#FF7C00")
                        .setTitle("Log Serveur")
                        .setURL("https://discord.js.org/")
                        .setAuthor("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
                        .setDescription(`"${(ServerConfig.valMention) ? UserSpecVoc : userInfo.username}" à rejoint le vocal <#${newState.channelId}>`)
                        .setThumbnail(`${avatar}`)
                    channel.send({embeds: [embed]}).catch(err => {
                        console.log('log nn envoyer :' + err);
                    })
                }else if (!newState.channelId) {
                    //channel.send(`<@${oldState.id}> à quitter le vocal <#${oldState.channelId}>`)

                    const embed = new Discord.MessageEmbed()
                        .setColor("#FF7C00")
                        .setTitle("Log Serveur")
                        .setURL("https://discord.js.org/")
                        .setAuthor("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
                        .setDescription(`"${(ServerConfig.valMention) ? UserSpecVoc : userInfo.username}" à quitter le vocal <#${oldState.channelId}>`)
                        .setThumbnail(`${avatar}`)
                    channel.send({embeds: [embed]}).catch(err => {
                        console.log('log nn envoyer :' + err);
                    })
            
                }else if (oldState.channelId && newState.channelId) {
                    //channel.send(`<@${oldState.id}> vient du vocal <#${oldState.channelId}> et a rejoint <#${newState.channelId}>`)
                    function sendEmbet(val) {
                        const embed = new Discord.MessageEmbed()
                            .setColor("#FF7C00")
                            .setTitle("Log Serveur")
                            .setURL("https://discord.js.org/")
                            .setAuthor("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
                            .setDescription(val)
                            .setThumbnail(`${avatar}`)
                        channel.send({embeds: [embed]}).catch(err => {
                            console.log('log nn envoyer :' + err);
                        })
                    }
                    console.log(newState)
                    if(oldState.channelId !== newState.channelId) {
                        sendEmbet(`"${(ServerConfig.valMention) ? UserSpecVoc : userInfo.username}" à rejoint le vocal "<#${newState.channelId}>" et viens du vocal "<#${oldState.channelId}>"`)
                    }

                    /* mute et sourdine */
                    if (oldState.selfMute && !newState.selfMute) {
                        if(oldState.selfDeaf) {
                            sendEmbet(`"${(ServerConfig.valMention) ? UserSpecVoc : userInfo.username}" demuté et son retablie dans "<#${newState.channelId}>"`);
                        }else {
                            sendEmbet(`"${(ServerConfig.valMention) ? UserSpecVoc : userInfo.username}" demuté dans "<#${newState.channelId}>"`);
                        }
                    }else if (!oldState.selfMute && newState.selfMute) {
                        if(newState.selfDeaf) {
                            sendEmbet(`"${(ServerConfig.valMention) ? UserSpecVoc : userInfo.username}" muté et son coupé dans "<#${newState.channelId}>"`);
                        }else {
                            sendEmbet(`"${(ServerConfig.valMention) ? UserSpecVoc : userInfo.username}" muté dans "<#${newState.channelId}>"`);
                        }
                    }else if(!oldState.selfDeaf && newState.selfDeaf) {
                        sendEmbet(`"${(ServerConfig.valMention) ? UserSpecVoc : userInfo.username}" son coupé dans "<#${newState.channelId}>"`);
                    }else if(oldState.selfDeaf && !newState.selfDeaf) {
                        sendEmbet(`"${(ServerConfig.valMention) ? UserSpecVoc : userInfo.username}" son retablie dans "<#${newState.channelId}>"`);
                    }

                    /* server mute et server sourdine */
                    
                }
                
            }
        }else {
            console.log(`Le fichier "${msg.guild.id}.json" n'a pas put etre lu`);
        }
    });
    const channel = bot.channels.cache.get('872528903602847754');
    
  }
})


bot.login(process.env.TOKEN);