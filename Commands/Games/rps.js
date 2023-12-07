const { RockPaperScissors } = require('discord-gamecord');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rock-paper-scissors')
    .setDescription('Play a game of Rock Paper Scissors!')
    .addUserOption(option => option.setName('user').setDescription('User to play Tic Tac Toe with!').setRequired(true)),
    async execute (interaction) {

const Game = new RockPaperScissors({
  message: interaction,
  isSlashGame: false,
  opponent: interaction.options.getUser('user'),
  embed: {
    title: 'Rock Paper Scissors',
    color: '#5865F2',
    description: 'Press a button below to make a choice.'
  },
  buttons: {
    rock: 'Rock',
    paper: 'Paper',
    scissors: 'Scissors'
  },
  emojis: {
    rock: '🌑',
    paper: '📰',
    scissors: '✂️'
  },
  mentionUser: true,
  timeoutTime: 60000,
  buttonStyle: 'PRIMARY',
  pickMessage: 'You chose {emoji}.',
  winMessage: '**{player}** won the Game! Congratulations!',
  tieMessage: 'The Game tied! No one won the Game!',
  timeoutMessage: 'The Game went unfinished! No one won the Game!',
  playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
});

Game.startGame();
Game.on('gameOver', result => {
  console.log(result);  // =>  { result... }
})}};