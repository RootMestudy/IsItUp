const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

function ping_embed(client){
    let ping = Math.round(client.ws.ping);
    let pingEmbed = new Discord.MessageEmbed()
        .addFields(
            { name: 'Bot latency', value: `${ping}ms` }
        )
    return (pingEmbed);
}

function edit_ping_embed(msg, client) {
    let edit_embed = ping_embed(client);
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
    msg.channel.send("Pinging...").then(mes => {
        mes.delete({ timeout: 1000 });
        msg.channel.send(ping_embed(client)).then(mes => {
            setInterval(() => edit_ping_embed(mes, client), 1000);
        })
    })
  }
});

client.login(config.token);