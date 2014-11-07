var mockplus=require('../export');
mockplus.config({
    'boolean':'1-10',
    'array':'1-10',
    'object':'1'
})
mockplus.toDoc(__dirname+'/json/i.json',__dirname + '/doc/i.md');
mockplus.toMock(__dirname+'/json/i.json',__dirname + '/mock/i.json');
mockplus.generator(__dirname+'/json/i.json',__dirname+'/mockData/i.json');








