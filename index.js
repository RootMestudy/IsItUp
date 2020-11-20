const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

	const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  // Simple ping command  
  if (command === 'ping') {
    msg.channel.send("Pinging...").then(mes => {
        let ping = Math.round(client.ws.ping)
        mes.edit(`Latency is ${ping}ms`);
    })
  }

  

});

client.login(config.token);