var Crawler = require('crawler'),
    url = require('url'),
    fs = require('fs'),
    conf = require('./config/conf.json');

var urlBash = conf.url;
var list = {};

function Quotes() {};

Quotes.prototype.readQuotes = function() {
    var craw = new Crawler({
        forceUTF8: true,
        jQuery: {
            name: 'cheerio',
            options: {
                normalizeWhitespace: false,
                xmlMode: false,
                decodeEntities: true
            }
        },
        callback: function(error, result, $) {
            if(error) {
                console.log('Возникла ошибка: ', error);
                return;
            };
            var t = $('body').html();
            t = t.replace(/<br>/ig, '\n');
            $('body').html(t);
            $(conf.selector).each(function(k, v) {
                list[k] = $(v).text();
            });
            fs.writeFileSync('./quotes.json', JSON.stringify(list));
            return;
        }
    });
    craw.queue(urlBash);
};

module.exports.Quotes = Quotes;
// var test = new Quotes();
// test.readQuotes();
