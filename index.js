var telegramBot = require('node-telegram-bot-api');
var token = '206854238:AAHjJ2ZRFTB13L1bEM_zmh27upY_XYgyM14';
var Quotes = require('./bashim/index.js');

var bot = new telegramBot(token, {polling: true});

var quotes = new Quotes.Quotes();
var count = 0;
var haveQuotes = false;

console.log('Started bot!');
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var quoteMsg = 'Пусто';
    console.log(msg);
    if(msg.text == 'update' && haveQuotes == false) {
        quotes.readQuotes();
        console.log('Получаем цитат...');
        bot.sendMessage(chatId, 'Получаем цитаты...');
        haveQuotes = true;
    } else {
        if (haveQuotes) {
            var list = require('./quotes.json');
            if (count > list.length) {
                quoteMsg = 'Циататы закончились!'
                count = 0;
            } else {
                quoteMsg = list[count];
                count = count+1;
            }
            bot.sendMessage(chatId, quoteMsg);
        }
    }
});
