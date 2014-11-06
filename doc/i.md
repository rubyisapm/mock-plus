###接口描述文档
> * 接口类型:object
> * 接口描述:关于该接口的描述...

字段 | 类型 | 名称 | 规则 | 描述 | 详情
---|------|------|------|------|---
name | object | 名字 | - | - | [name](#name)
hobby | array | 兴趣爱好 | - | - | [hobby](#hobby)
address | object | 所在地 | - | 现居地址 | [address](#address)
email | string | 邮箱 | @EMAIL | 注册邮箱 | -
icon | string | 头像 | @IMAGE('200x100', '#00405d', '#FFF', 'Mock.js') | 社区网站头像 | -
food | string | 喜欢的食物 | @PICK(['cookie','water','wine']) | - | -
date | string | 注册日期 | @DATE('yyyy-MM-dd') | - | -
space | string | 个人主页 | @URL | 个人中心地址 | -
sentence | string | 喜欢的一句话 | @SENTENCE(10) | - | -
age | integer | 年龄 | @NATURAL(10,27) | - | -
powers | object | 网站权限 | - | 在该网站的权限 | [powers](#powers)
#####关于[name]的描述
字段 | 类型 | 名称 | 规则 | 描述 | 详情
---|------|------|------|------|---
first | string | - | @FIRST | - | -
last | string | - | @LAST | - | -

#####关于[hobby]的描述
字段 | 类型 | 名称 | 规则 | 描述 | 详情
---|------|------|------|------|---
0 | string | - | - | - | -
1 | string | - | - | - | -
2 | string | - | - | - | -

#####关于[address]的描述
字段 | 类型 | 名称 | 规则 | 描述 | 详情
---|------|------|------|------|---
area | string | - | @AREA | - | -
region | string | - | @REGION | - | -

#####关于[powers]的描述
字段 | 类型 | 名称 | 规则 | 描述 | 详情
---|------|------|------|------|---
community | object | 社区权限 | - | - | [community](#community)
manage | object | 管理权限 | - | - | [manage](#manage)
#####关于[powers][community]的描述
字段 | 类型 | 名称 | 规则 | 描述 | 详情
---|------|------|------|------|---
read | boolean | 浏览权限 | @BOOLEAN(1,6,false) | 是否可浏览社区文章 | -
write | boolean | 发布权限 | - | 是否可以发布文章 | -

#####关于[powers][manage]的描述
字段 | 类型 | 名称 | 规则 | 描述 | 详情
---|------|------|------|------|---
read | boolean | 查看用户权限 | 10-1 | 是否可查看用户信息 | -
write | boolean | 操作用户权限 | 1 | 是否可以对用户进行增删改操作 | -
