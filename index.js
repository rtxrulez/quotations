var telegramBot = require('node-telegram-bot-api'),
    nconf = require('nconf'),
    Quotes = require('./bashim/index.js');
require('shelljs/global');
var token = '206854238:AAHjJ2ZRFTB13L1bEM_zmh27upY_XYgyM14';

var bot = new telegramBot(token, {polling: true});

var quotes = new Quotes.Quotes();

// загрузка настрек
nconf.use('file', { file: './config/config.json'});
nconf.load();
var config = {
    'count': nconf.get('count'),
    'haveQuotes': nconf.get('haveQuotes')
};
var users = {
    user: ['', '']
}

console.log('Started bot!');
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var quoteMsg = 'Пусто';
    msg.text = msg.text.replace(/\s+/g, '').toLowerCase();
    console.log('команда ', msg);
    if(msg.text == 'reboot') {
        bot.sendMessage(chatId, 'Мы перезагружаем комп!');
        echo('is reboot!');
        reboot;
        return false;
    }
    if(msg.text == 'update' && config.haveQuotes == false) {
        quotes.readQuotes();
        console.log('Получаем цитат...');
        bot.sendMessage(chatId, 'Получаем цитаты...');
        config.haveQuotes = true;
        nconf.set('haveQuotes', true);
        nconf.save();
        return;
    } else {
        if (config.haveQuotes) {
            var list = require('./quotes.json');
            if (config.count > list.length) {
                quoteMsg = 'Циататы закончились!'
                config.count = 0;
                nconf.set('count', 0);
                nconf.save();
            } else {
                quoteMsg = list[config.count];
                config.count = config.count+1;
                nconf.set('count', config.count);
                nconf.save();
            }
            bot.sendMessage(chatId, quoteMsg);
        }
    }
});
