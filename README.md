mock-plus
===========

mock-plus is a encapsulation of mockjs, it will be more convenient to use mockjs with it.

> * toDoc(input, output)<br/>
Aim to generate documentation to describe your interface<br/>
input: give the path of your json file<br/>
output: give the path where you wanna save the documentation<br/>

> * toMock(input, output)<br/>
Aim to generate mock template<br/>
input: give the path of your josn file<br/>
output: give the paht where you wanna save the template<br/>

> * generator(input, output)<br/>
Aim to generate mock data for testing<br/>
input: give the path of your json file<br/>
output: give the path where you wanna save the mock data<br/>

> * config(ops)<br/>
Config the default rule for every type of data.<br/>
According to mockjs, the types include: boolean, integer, float, string, array, object. Visit [mockjs](http://mockjs.com/) for detail.<br/>

>* getRule()<br/>
You can use this method to see what default rules you will use to generate the mock data.

####You should know:
> * There is no default rules for array or object, <br/>
because that may cause some unexpected problems such as some attributes get lost.<br/>
so, be careful if you wanna add default rule for array or object.<br/>

based on [mace](https://github.com/lichenhao/mace)、[json-parser](https://github.com/kaelzhang/node-json-parser)、[mockjs](https://github.com/nuysoft/Mock)