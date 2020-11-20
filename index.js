const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

	const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  // Simple ping command  
  if (command === 'ping') {
    msg.reply('pong');
  }


});

client.login(config.token);