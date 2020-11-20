const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

function ping_embed(client, react){
    let ping = Math.round(client.ws.ping);
    let pingEmbed = new Discord.MessageEmbed()
        .addFields(
            { name: 'Bot latency', value: `${ping}ms` }
        )
    if (react == 1) {
        pingEmbed
        .setTimestamp()
	    .setFooter('Monitor stopped');
    } else {
        pingEmbed
        .setTimestamp()
	    .setFooter('React with ❌ to stop monitor');
    }
    return (pingEmbed);
}

function edit_ping_embed(msg, client, react) {
    let edit_embed = ping_embed(client, react);
    msg.edit(edit_embed);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

	const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  if (command === 'ping') {
      let react = 0;
    msg.channel.send("Pinging...").then(mes => {
        mes.delete({ timeout: 1000 });
        msg.channel.send(ping_embed(client)).then(mes => {
            mes.react("❌");
            const filter = (reaction, user) => {
                return ['❌'].includes(reaction.emoji.name) && user.id === msg.member.user.id;
            };
            mes.awaitReactions(filter, {max: 1})
                .then(collected => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === '❌')
                        react = 1;
                })
                if (react == 1) {
                    edit_ping_embed(mes, client, react);
                    return 0;
                }
            setInterval(() => edit_ping_embed(mes, client, react), 1000);
        })
    })
  }
});

client.login(config.token);