/**
 * Created by ruby on 2014/11/3.
 */
var fs=require('fs');
var jsonParser=require('json-parser');
var util=require('mace')(module);
var Mock=require('mockjs');


exports.options={
    thead:'字段 | 类型 | 名称 | 规则 | 描述 | 详情',
    tbody:'---|------|------|------|------|---',
    mockRule:{
        'string': '@STRING',
        'integer': '@INTEGER',
        'float': '@FLOAT',
        'boolean': '@BOOLEAN'
        //简单类型的默认生成规则为随机值
        //数组和对象不能添加默认规则，因为内部属性未知。
        //例如内部属性是一个大的数据块，如果自动编辑会导致数据不完整
        //也就是当遇到array和object的数据，用户需要自行编辑生成规则
    }
}
exports.config=function(ops){
    exports.options=util.merge(exports.options,ops);
}

/*helper*/
var helper={};
helper.isComment=function(key){
    //判断是否为注释
    if(/(\/\/)+/.test(key)){
        return true;
    }
}
helper.getComment=function(obj,key){
    if(helper.type(obj)=='object' && '// '+key in obj){
        var topComments=obj['// '+key][0];
        return {
            title:(typeof topComments[0]!='undefined') ? topComments[0].replace(/\/\/\s*/,'') : '-',
            desc:(typeof topComments[1]!='undefined') ? topComments[1].replace(/(\/|\*|\s)*/g,'') : '-'
        }
    }else{
        return {
            title:'-',
            desc:'-'
        }
    }
}
helper.getKeyInfo=function(key){
    var key=key.split('|');
    return {
        key:key[0],
        rule:key[1] || ''
    }
}
helper.type=function(data){
    //对util.type封装
    var dataType=util.type(data);
    if(dataType==='number'){
        if(parseInt(data)===data){
            return 'integer';
        }else{
            return 'float';
        }
    }else{
        return dataType;
    }
}

exports.mockInit=function(data,result){
    //生成mock模板
    var result=typeof result!='undefined' ? result : {};
    for(var i in data){
        if(!(helper.isComment(i))){
            var dataType=helper.type(data[i]);
            var keyInfo=helper.getKeyInfo(i);
            var key=keyInfo.key;
            var rule=keyInfo.rule || exports.options.mockRule[dataType];
            if(dataType==='array' || dataType==='object'){
                var wrap=helper.type(data[i])==='array' ? [] : {};
                exports.mockInit(data[i],wrap);
                if(helper.type(result)==='array'){
                    //如果它是数组里的项
                    result.push(wrap);
                }else{
                    //如果它是对象的项
                    if(/^@/.test(rule)){
                        //当内部数组或对象被设置了@规则
                        result[key]=rule;
                    }else if(!!rule){
                        result[key+'|'+rule]=wrap;
                    }else{
                        result[key]=wrap;
                    }

                }
            }else{
                if(helper.type(result)==='array'){
                    result.push(data[i]);
                }else{
                    if(/^@/.test(rule)){
                        result[key]=rule;
                    }else{
                        result[key+'|'+rule]=data[i];
                    }
                }
            }
        }
    }
    return result;
}
exports.analysis=function(data){
    /*将数据和注释进行格式化，用于生成markdown*/
    var result={};
    for(var i in data){
        if(!(helper.isComment(i)) && i!='_layer'){
            var comments=helper.getComment(data,i);
            var keyInfo=helper.getKeyInfo(i);
            var key=keyInfo.key;
            var rule=keyInfo.rule;

            result[i]={
                key:key,
                value:data[i],
                type:helper.type(data[i]),
                title:comments.title,
                desc:comments.desc,
                rule:rule || '-'
            }
            var dataType=helper.type(data[i]);
            if(dataType==='object' || dataType==='array'){
                //将原始数据改写，加入_layer属性记录层级，以便以下注释解析过程获取层级
                data[i]['_layer']=(data._layer ? data._layer : '') + '['+key+']';

                result[i].detail='['+key+'](#'+key+')';
                var layer=data._layer ? data._layer : '';
                result['$'+layer+'['+key+']']=exports.analysis(data[i]);
            }else{
                result[i].detail='-';
            }
        }
    }
    return result;
}

exports.docInit=function(data){
    //生成markdown文档
    var out=[];
    var next=[];
    out.push(exports.options.thead);
    out.push(exports.options.tbody);
    for(var i in data){
        if(!(/^\$/.test(i))){
            var info=data[i];
            var temp=[info.key,info.type,info.title,info.rule,info.desc,info.detail];
            out.push(temp.join(' | '));
        }else{
            var $data=data[i];
            next.push('#####关于'+ i.replace(/\$/,'')+'的描述');
            next.push(exports.docInit($data));
        }
    }
    out.push(next.join('\n'));
    return out.join('\n');
}

exports.toDoc=function(input,output){
    //生成md文件
    var data=jsonParser.parse(fs.readFileSync(input,'utf-8'));
    var result=exports.analysis(data);
    var doc=exports.docInit(result);
    fs.writeFileSync(output,'###接口描述\n'+doc);
}

exports.toMock=function(input,output){
    //生成mock模板
    var data=jsonParser.parse(fs.readFileSync(input,'utf-8'));
    var tpl=exports.mockInit(data);
    fs.writeFileSync(output,JSON.stringify(tpl));
}

exports.generator=function(input,output){
    //生成mock数据
    var data=jsonParser.parse(fs.readFileSync(input,'utf-8'));
    var tpl=exports.mockInit(data);
    var mockData=Mock.mock(tpl);
    fs.writeFileSync(output,JSON.stringify(mockData));
}

//exports.toDoc(__dirname+'/json/i.json',__dirname + '/doc/i.md');
//exports.toMock(__dirname+'/json/i.json',__dirname + '/mock/i.json');
//exports.generator(__dirname+'/json/i.json',__dirname+'/mockData/i.json');