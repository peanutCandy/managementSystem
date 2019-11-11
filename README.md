## ***\*ui组件库\****

PC端

element ui 饿了吗公司出品

iview 个人出品

ant design for vue 阿里

移动端

vant 有赞

cube ui 滴滴

mint ui 饿了吗

 

 

## ***\*项目概述-电商后台管理系统的功能划分\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps1.jpg) 

 

## ***\*项目初始化-前端项目初始化\****

1、练习阶段，我们没有必要初始化git

2、练习阶段，我们把eslint禁用掉

 

## ***\*项目初始化-安装MySQL\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps2.jpg) 

 

## ***\*项目初始化-配置API接口服务器并使用PostMan调试接口\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps3.jpg) 

## ***\*项目搭建\****

1、电脑管理、杀毒软件全部关掉退出

2、不要用powershell,用cmd

3、用管理员权限运行vue ui

4、网速确保没有问题

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps4.jpg) 

1、[https://js-class.gitee.io/#/login](#/login)（添加到书签）

2、搭建后台接口服务器（先开数据库，再跑服务器）

(1) 执行npm install安装项目依赖

(2) 开启phpStudy，把mysql跑起来

(3) 执行node app.js让后台跑起来

① 如果失败有可能是数据库密码错了，修改config/default.json文件中的mysql密码

(4) 打开接口文档

3、一步到位直接配置好了，一会儿就开始用这个做项目

(1) 先把项目搭建好

① 不建议配置eslint(大家以后上班的时候公司要求用这个再说，因为太严格了，不方便我们学习)

(2) 启动起来

(3) 分析项目目录

① src是我们关心的目录，其他的可以忽略掉

② main.js是主入口文件，其他所有的文件都是引入到这里面

③ router.js是路由配置文件

④ $mount如何理解??

(4) 介绍vue.config.js的作用，可以覆盖默认的配置项

(5) 然后安装element ui

① 按需导入 可以减少项目的体积

(6) 安装axios

4、开始看视频做项目

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps5.jpg) 

 

1、安装的是依赖 npm install

2、插件关系和vue更紧密一点，同时官方把东西封装成插件

axios只是一个发送ajax库，在任何地方都可以使用

 

## ***\*分析登录过程以及token的原理\****

1、我们第一次去商场买东西

2、商场给我们办一张会员卡

3、我们把会员卡存起来

4、下次再去商场的时候在付款之前出示会员卡，就会有打折

 

存储技术：

1、cookie 兼容IE

2、localStorage 多页面普通项目

3、sessionStorage --> spa:单页面应用

(1) vue，react来写的项目

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps6.jpg) 

 

## ***\*分析登录页面的布局结构并梳理项目结构\****

第一步、打开element ui文档 

[https://element.eleme.io/#/zh-CN/component/button](#/zh-CN/component/button)

第二步、讲解如何使用文档（CTRL+F)

第三步、把src中东西全部删除掉，然后把清理好的代码拷贝进去

 

如何清理：

\- 清理app.vue，将没用的内容和helloworld组件删除

\- 清理router.js，清空路由规则

\- 删除components里面helloworld组件

\- 删除views文件夹

 

## ***\*渲染Login组件并实现路由重定向\****

let's coding ~~

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps7.jpg) 

 

第一步、创建文件components/Login.vue，输入vue,然后按一下回车,把样式这块添加lang="less"（为了后面方便，我们直接去修改代码片段）

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps8.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps9.jpg) 

第二步、修改router.js文件

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps10.jpg) 

 

第三步、在App.vue中放一个占位符

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps11.jpg) 

 

## ***\*设置背景色并在屏幕中央绘制登录盒子\****

第一步、创建src/assets/css/global.css文件 （对所有的组件全部生效的代码）

 

因为百分比相对于父元素，所以给html，body，app都要设置100%



第二步、在main.js中导入global.css

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps12.jpg) 

 

第三步、登录组件HTML结构（src/components/Login.vue）



 

第四步、在src/components/Login.vue中写样式



 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps13.jpg) 

## ***\*绘制默认头像\****

第一步、添加头像html代码(components/Login.vue)



 

第二步、添加头像的样式代码

 



 

## ***\*绘制登录表单区域\****

第一步、理解Vue.use

 



 

和如下的代码是等价的



 

优点：我们可以在install函数当中做很多事情：定义指令，定义过滤器等

 

第二步、由于我们要用到Button,Form,FormItem,Input,所以我们导入并使用一下这几个东西

（src/plugins/element.js）



 

 

第三步、理解表单结构

 

[https://element.eleme.io/#/zh-CN/component/form](#/zh-CN/component/form)

 

el-form>el-form-item>el-input

 

理解：

1、整个表单用el-form表示

2、每一项表单控件用el-form-item来包裹

3、输入框用el-input表示

 

第四步、完成用户名和密码区域

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps14.jpg) 

 

第五步、完成按钮区域

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps15.jpg) 

 

第六步、添加样式（直接拷贝代码）

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps16.jpg) 

 

 



 

## ***\*绘制带icon的input输入框\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps17.jpg) 

 

[https://element.eleme.cn/#/zh-CN/component/input#dai-icon-de-shu-ru-kuang](#/zh-CN/component/input#dai-icon-de-shu-ru-kuang)

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps18.jpg) 

第一步、添加图标

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps19.jpg) 

第二步、引入字体图标库

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps20.jpg) 

第三步、设置自定义图标

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps21.jpg) 

 



 

 

## ***\*实现表单的数据绑定\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps22.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps23.jpg) 

 

## ***\*实现表单数据验证\****

[https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng](#/zh-CN/component/form#biao-dan-yan-zheng)

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps24.jpg) 

第一步、



 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps25.jpg) 

 

注意事项：

1、有值却不能通过，如果要生效，我们其实还需要添加:model属性

(1) 你可以这样理解：prop属性必须要通过:model才能知道验证哪一个值

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps26.jpg) 

2、如果成功了，没有绿色的提示，这个是element ui的版本变了导致的

## ***\*实现表单的重置功能\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps27.jpg) 

在事件函数内部利用resetFields方法进行表单重置，如果想拿到resetFields需要拿到表单组件的实例对象

 

第一步、知识点：ref 当前元素可以用$event在事件触发的时候获取，对于任意元素，可以用ref去获取，它的作用类似于id，是唯一的

 



 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps28.jpg) 

 

第三步、给el-form添加ref属性

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps29.jpg) 

 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps30.jpg) 

## ***\*实现登录前表单数据的预验证\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps31.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps32.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps33.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps34.jpg) 

 

## ***\*配置axios发起登录请求\****

环境没有搭建成功的同学使用接口：https://www.liulongbin.top:8888/api/private/v1/

第一步、main.js中的配置



 

解释一下为什么要这样写：把axios起一个名字叫$http，挂到vue实例对象的原型身上，这样在任何一个组件当中都可以使用

 

第二步、



 

解释一下const {data:res}为什么要这样写

 

## ***\*配置Message全局弹框组件\****

第一步、

为什么element ui要这样做而不是像之前那些组件一样玩？因为这个插件有点类似之前的alert，完全是js代码，不涉及到html之类的东西



 

第二步、

 



 

## ***\*完善登录之后的操作\****

要完成的功能：登录成功之后跳转到后台首页Home.vue

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps35.jpg) 

 

第一步、创建Home.vue文件

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps36.jpg) 

第二步、配置后台主页路由

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps37.jpg) 

第三步、改造Login.vue代码



 

## ***\*路由导航守卫控制页面访问权限\****

知识点：导航守卫

https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

 

如何理解：所有的人进这栋大楼的任何一个房间之前，都必须要经过保安的安检，这就是导航守卫的作用

 

第一步、把router.js代码改造如下

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps38.jpg) 

第二步、



 

## ***\*实现退出功能\****

所谓的退出指的是清除掉sessionStorage然后再路由重定向到/login

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps39.jpg) 

 



 

## ***\*修改element-ui组件的按需导入形式\****

这块可以做一件事情：

由于当前这个文件后面的代码是类似的，也没有啥技术含量，我们直接把所有的涉及到的组件全部提前写好，后面就不需要写了。



 

## ***\*实现基本的主页布局\****

[https://element.eleme.cn/#/zh-CN/component/container](#/zh-CN/component/container)

 

打开 elementui_study/布局目录，学习如何布局

 

1、重置margin,padding默认值

2、elementui的组件会默认给我们生成一个同名的类名

3、让外层容器高度为100%

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps40.jpg) 

4、添加背景颜色

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps41.jpg) 

5、第四种布局

 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps42.jpg) 

 

Home.vue代码如下：



 

## ***\*美化主页的header区域\****

第一步、复习flex布局

justify-content属性的理解：设置主轴的排列方式

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps43.jpg) 

 

align-items：

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps44.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps45.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps46.jpg) 

 

第二步、代码如下：



 

## ***\*实现导航菜单的基本结构\****

第一步、学习导航组件

[https://element.eleme.cn/#/zh-CN/component/menu](#/zh-CN/component/menu)

 

1、理解ul,li



 

2、使用el-menu el-submenu实现等价的代码：

index的作用类似id,是唯一的，必须要写，否则会报错



 

理解slot="title":这是一个具名插槽，表示里面的东西是一级导航的标题文字

 

3、美化导航

background-color 设置菜单的背景色

text-color 设置菜单的文字颜色

 



 

4、激活导航



 

 

第二步、

 

代码如下：



 

## ***\*通过axios拦截器添加token验证\****

第一步、通过直接写ajax代码发现返回不了数据，提示无效的token

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps47.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps48.jpg) 

第二步、添加token头信息

created(){

this.$http.get('menus',{headers:{Authorization:sessionStorage.getItem('token')}}).then(data**=>****console**.log(data))

},

 

第三步、这样写的话，每个ajax请求都必须要携带头信息，为了简化代码，我们用请求拦截器，在所有的请求发送之前，给它追加token头信息

 



 

## ***\*获取左侧菜单数据\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps49.jpg) 



 

接下来，我们去vue调试工具中查看数据是否成功挂载上去了

 

## ***\*通过双层for循环渲染左侧菜单\****

第一步、渲染最外层

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps50.jpg) 

 

第二步、渲染里层



 

## ***\*为选中项设置字体颜色并添加分类图标\****

这里面用到了的技巧

 



 

 

思路一：



 

思路二：

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps51.jpg) 



 

## ***\*每次只能打开一个菜单项并解决边框问题\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps52.jpg) 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps53.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps54.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps55.jpg) 

 

## ***\*实现侧边栏的折叠与展开效果\****

第一步、给el-menu添加collapse属性

第二步、修改el-aside的宽度为64px

第三步、定义一个变量isCollapse，值为false

第四步、修改collapse属性为 :collapse="isCollapse"

第五步、修改width="64px"为 :width="isCollapse?'64px':'200px'"

第六步、添加切换盒子



 

让它居中



 

 

第七步、去掉折叠动画效果

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps56.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps57.jpg) 

## ***\*实现首页路由的重定向效果\****

思路：

1、我们发现左侧对应的路由左侧栏肯定需要复用，所以这块需要用到嵌套路由

2、思路：把左侧的所有的路由当作为/home的子路由

 

第一步、<main>中添加router-view占位符

第二步、创建components/Welcome.vue单文件组件

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps58.jpg) 

第三步、在router.js中引入

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps59.jpg) 

 

## ***\*实现侧边栏路由链接的改造\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps60.jpg) 

 

第一步、给el-menu添加router属性

第二步、修改index值

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps61.jpg) 

 

## ***\*通过路由的形式展示用户列表组件\****

第一步、创建Users.vue

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps62.jpg) 

第二步、配置用户路由

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps63.jpg) 

 

## ***\*在sessionStorage中保存左侧菜单的激活状态\****

理解代码：



 

 

要做的事情：保持导航激活状态刷新的时候也不会丢失

 

第一步、切换到/users,发现变黄了，但刷新页面发现失效了

第二步、给el-menu添加default-active="/users"，发现刷新也是没有问题的

第三步、:default-active="activePath"

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps64.jpg) 

第四步、点击的时候把当前的切换的路径保存到sessionStorage当中

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps65.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps66.jpg) 

 

第五步、页面一打开，就去获取当前的导航值，然后设置activePath

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps67.jpg) 

 

## ***\*绘制用户列表组件的基础布局结构\****

第二步、添加面包屑



 

第三步、添加卡片



 

第四步、修改global.css添加样式



 

第四步、在卡片利用栅格布局



 

第五步、左侧放一个复合型搜索框

[https://element.eleme.cn/#/zh-CN/component/input#fu-he-xing-shu-ru-kuang](#/zh-CN/component/input#fu-he-xing-shu-ru-kuang)

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps68.jpg) 

第六步、右侧放添加按钮



第七步、设置两列之间的间距

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps69.jpg) 

 

## ***\*获取用户列表数据\****

Users.vue



 

## ***\*使用el-table组件渲染基本的用户列表\****

 

第一步、渲染表格

 

理解：

data:表格数据

border:带有边框的表格 

stripe：隔行换色的样式

label：表头文字

prop：当前这一列用到的数据

 



第二步、修改global.css



 

## ***\*为表格添加索引列\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps70.jpg) 

 

注意：不要打印scope,否则会出现循环引用错误

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps71.jpg) 

## ***\*自定义状态列的显示效果\****

问题：mg_state不显示，因为布尔值没办法直接显示出来的

 

第一步、复习作用域插槽



 

 

第二步、利用作用域插槽来完成switch组件的传值

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps72.jpg) 



 

## ***\*通过作用域插槽渲染操作列\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps73.jpg) 

 

el-button相关属性

size:大小

type:按钮类型

icon:图标类名

 

el-tooltip相关属性：

effect:默认提供的主题 值只有dark或light

content:提示内容

placement:方位

enterable为false，禁止鼠标进入提示区域

 

 



 

## ***\*实现分页效果\****

[https://element.eleme.cn/#/zh-CN/component/pagination#fu-jia-gong-neng](#/zh-CN/component/pagination#fu-jia-gong-neng)

 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps74.jpg) 



 

第二步、



 

 

第三步、



 

## ***\*修改用户状态\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps75.jpg) 

 

第一步、



 

第二步、



## ***\*实现搜索功能\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps76.jpg) 

 



 

## ***\*渲染添加用户的对话框\****

[https://element.eleme.cn/#/zh-CN/component/dialog](#/zh-CN/component/dialog)

 

第一步、拷贝对话框代码



 

第二步、修改里面的变量和文字



 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps77.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps78.jpg) 

 

补充知识点：

如果有同学对sync这块好奇，可以看如下文档

[https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6](#sync-修饰符)

 

下面的代码是对sync的理解：

 

第一步的代码是错的：



 

第二步、代码是对的，但是太繁琐了



 

上面的$event如何理解：

[https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E4%BA%8B%E4%BB%B6%E6%8A%9B%E5%87%BA%E4%B8%80%E4%B8%AA%E5%80%BC](#使用事件抛出一个值)

 

 

第三步：用到了sync修饰符

 



 

第四步、应用场景 



 

 



 

## ***\*添加用户-渲染添加用户的表单\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps79.jpg) 

 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps80.jpg) 

第二步、

[https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng](#/zh-CN/component/form#biao-dan-yan-zheng)

 

:model,:rules是为了表单验证的

ref可以获取到当前这个表单对象

label-width:设置表单控件的文字的宽度

 



 

 

第三步、



 

第四步、与上面的操作方法同理，我们把密码、邮箱、手机也搞出来

 



 



 

## ***\*自定义邮箱和手机号的校验规则\****

第一步、

 

rule:校验规则

value:当前用户输入的值

cb 回调函数

 

理解如下的代码：



 

 



 

第二步、



 

## ***\*实现添加表单的重置操作\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps81.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps82.jpg) 

## ***\*实现添加用户前的表单预校验\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps83.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps84.jpg) 

## ***\*调用API接口完成添加用户的操作\****



 

## ***\*展示修改用户的对话框\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps85.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps86.jpg) 

 

第二步、



 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps87.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps88.jpg) 

 

## ***\*根据Id查询对应的用户信息\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps89.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps90.jpg) 

第二步、调用编辑接口获取当前这个用户的信息

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps91.jpg) 



 

 

## ***\*渲染修改用户的表单\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps92.jpg) 

 

第一步、



 

 

第二步、

 



 

## ***\*实现修改用户表单的重置操作\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps93.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps94.jpg) 

 

## ***\*完成提交修改之前的表单预验证\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps95.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps96.jpg) 

 

## ***\*提交表单完成用户信息的修改\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps97.jpg) 

 



 

 

## ***\*弹框询问用户是否确认删除数据\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps98.jpg) 

 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps99.jpg) 

第三步、弹框询问用户是否删除数据



 

## ***\*删除用户-调用API完成删除用户的操作\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps100.jpg) 

 

解决一个小bug:

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps101.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps102.jpg) 

## ***\*通过路由展示权限列表组件\****

第一步、创建权限列表组件

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps103.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps104.jpg) 

## ***\*权限列表-绘制面包屑导航和卡片视图\****

第一步、画面包屑导航

 



 

第二步、

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps105.jpg) 

 

## ***\*权限列表-调用API获取权限列表的数据\****



## ***\*权限列表-渲染权限列表UI结构\****



 

 

## ***\*介绍 用户-角色-权限 三者之间的关系\****

张三既是财务总监，又是行政主管

财务总结这个角色可以有的权限有...

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps106.jpg) 

 

## ***\*角色列表-通过路由展示角色列表组件\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps107.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps108.jpg) 

## ***\*角色列表-绘制基本布局结构并获取列表数据\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps109.jpg) 

 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps110.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps111.jpg) 

 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps112.jpg) 

 

第四步、



 

 

## ***\*角色列表-渲染角色列表数据\****



 

 

## ***\*角色列表-说明角色列表需要完成的功能模块\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps113.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps114.jpg) 

## ***\*角色列表-分析角色下权限渲染的实现思路\****



 

下面的代码有点混乱，画图分析：

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps115.jpg) 

## ***\*角色列表-通过第一层for循环渲染一级权限\****

 



 

## ***\*角色列表-美化一级权限的UI结构\****

第一步、



 

第二步、



 

## ***\*角色列表-通过第二层for循环渲染二级权限\****



 

## ***\*角色列表-通过第三层for循环渲染三级权限\****



 

## ***\*角色列表-点击删除权限按钮弹出确认提示框\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps116.jpg) 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps117.jpg) 

第二步、



 

第三步、



 

 

## ***\*角色列表-完成删除角色下指定权限的功能\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps118.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps119.jpg) 

 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps120.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps121.jpg) 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps122.jpg) 

 

第四步、

按同样的思路去处理二级、一级标签

 

## ***\*分配权限-弹出分配权限对话框并请求权限数据\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps123.jpg) 

 

第二步、



 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps124.jpg) 

 

第四步、



 

 

## ***\*分配权限-初步配置并使用el-tree树形控件\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps125.jpg) 

[https://element.eleme.cn/#/zh-CN/component/tree](#/zh-CN/component/tree)

 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps126.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps127.jpg) 

 

## ***\*分配权限-优化树形控件的展示效果\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps128.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps129.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps130.jpg) 

 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps131.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps132.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps133.jpg) 

 

## ***\*分配权限-分析已有权限默认勾选的实现思路\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps134.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps135.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps136.jpg) 

 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps137.jpg) 

 

## ***\*分配权限-\*******\*加载当前角色已有的权限\****

思路一：



 

思路二、如果有100层循环，这个循环就要写100次



 

 

 

 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps138.jpg) 

 



 

 



 

 



因为我们再点击显示权限对话框的时候，要获取当前角色所有的三级角色id，所以在点击的事件函数将当前这一行的数据传递过去

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps139.jpg) 

 

第一步、定义一个空数组，用于存id值

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps140.jpg) 

 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps141.jpg) 

 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps142.jpg) 

 

 

## ***\*分配权限-在关闭对话框时重置defKeys数组\****

如果大家按我上面的做法，这块不需要去重置

 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps143.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps144.jpg) 

## ***\*分配权限-调用API完成分配权限的功能\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps145.jpg) 

 

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps146.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps147.jpg) 

第三步、

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps148.jpg) 

 

第四步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps149.jpg) 

 

第五步、

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps150.jpg) 

第六步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps151.jpg) 

第七步、

 



 

## ***\*分配角色-渲染分配角色的对话框并请求角色列表数据\****

Users.vue组件

 

第一步、



 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps152.jpg) 

 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps153.jpg) 

 

第四步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps154.jpg) 

 

第五步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps155.jpg) 

 

第六步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps156.jpg) 

 

第七步、



 

 

第八步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps157.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps158.jpg) 



 

 

## ***\*分配角色-渲染角色列表的select下拉菜单\****



 

## ***\*分配角色-完成分配角色的功能\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps159.jpg) 



 

第二步、



 



 

 

## ***\*商品分类-介绍商品分类功能的作用\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps160.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps161.jpg) 

 

## ***\*商品分类-通过路由加载商品分类组件\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps162.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps163.jpg) 

 

## ***\*商品分类-绘制商品分类组件的基本页面布局\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps164.jpg) 

 

第一步、



 

 

第二步、卡片视图区域

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps165.jpg) 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps166.jpg) 

 

第四步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps167.jpg) 

 

## ***\*商品分类-调用API获取商品分类列表数据\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps168.jpg) 

 



 

## ***\*商品分类-初步使用vue-table-with-tree-grid树形表格组件\****

第一步、安装依赖》运行依赖并在main.js中注册

 

npm install  vue-table-with-tree-grid

 

在main.js中引入组件

 



 

第二步、在页面上使用tree-table组件



 

第三步、在data中定义columns，数组里面的每一项就代表每一列，每一项里面的label为列标题，prop为列展示的数据



 

第四步、表格的细化，添加

selection-type：是否显示复选框

expand-type：是否显示展开行

show-index：是否显示索引列

index-text：设置索引列标题

show-row-hover：是否有鼠标高亮效果

border：边框

 



 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps169.jpg) 

 

## ***\*商品分类-使用自定义模板列渲染表格数据\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps170.jpg) 

第二步、



 

 

第三步、



 

## ***\*商品分类-渲染排序和操作对应的UI结构\****

第一步、



 

第二步、



 

 

第三步、



 

 

第四步、

{

​     label:'操作',

​     **//表示将当前列定义为模板列**

​     type:'template',

​     **//表示当前这一列使用模板名称**

​     template:'opt'

​    }

 

第五步、

<template **slot**="opt" **slot-scope**="scope">

​     <el-button **size**="mini" **type**="primary" **icon**="el-icon-edit">编辑</el-button>

​     <el-button **size**="mini" **type**="danger" **icon**="el-icon-delete">删除</el-button>

​    </template>

 

## ***\*商品分类-实现分页功能\****



 

## ***\*商品分类-渲染添加分类的对话框和表单\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps171.jpg) 

 

第一步、

 



 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps172.jpg) 



 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps173.jpg) 

## ***\*商品分类-获取父级分类数据列表\****

第一步、



 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps174.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps175.jpg) 

## ***\*商品分类-渲染级联选择器\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps176.jpg) 



 

 **/\* 解决cascader-menu的bug \*/**

**.el-cascader-menu**{

  **height**: 240px;

 }

 

注意事项：

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps177.jpg) 

 

上面这个警告的原因是视频中用的这种方式有点过时了，可以忽略这个警告，也可以看文档用最新的写法，就不会出现这个错

## ***\*商品分类-根据父分类的变化处理表单中的数据\****



 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps178.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps179.jpg) 

 

## ***\*商品分类-在对话框的close事件中重置表单数据\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps180.jpg) 



 

## ***\*商品分类-完成添加分类的操作\****



 

## ***\*分类参数-介绍分类参数功能的作用\****

静态属性：电脑的价格、产地

动态属性：电脑的颜色

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps181.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps182.jpg) 

## ***\*通过路由加载分类参数组件页面\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps183.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps184.jpg) 

## ***\*渲染分类参数页面的基本UI结构\****

第一步、添加面包屑



 

第二步、添加卡片和提示信息



 



 

## ***\*调用API获取商品分类列表数据\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps185.jpg) 

 



 

 

## ***\*渲染商品分类的级联选择框\****



 



 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps186.jpg) 

## ***\*控制级联选择框的选中范围\****

限制只能选择3级



 

 

## ***\*渲染分类参数的Tabs页签\****



 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps187.jpg) 

 

handleTabClick(){

​    **console**.log(this.activeName)

  }

 

## ***\*渲染添加参数按钮并控制按钮的禁用状态\****



 

computed:{

   **//如果按钮需要被禁用，返回true 否则返回false**

   isBtnDisabled(){

​     if(this.selectCatKeys.length != 3){

​       return true 

​     }else{

​       return false 

​     }

   }

 }

 

## ***\*获取参数列表数据\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps188.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps189.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps190.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps191.jpg) 



 

 

## ***\*切换Tabs面板后重新获取参数列表数据\****



 

 

## ***\*将获取到的参数数据挂载到不同的数据源上\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps192.jpg) 



 

 

## ***\*渲染动态参数和静态属性的Table表格\****

 



 

## ***\*渲染添加参数的对话框\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps193.jpg) 

第二步、



 

第三步、在data中添加



 

第四步、在方法中添加

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps194.jpg) 

第五步、在计算属性中添加

**//动态计算标题的文本**

   titleText(){

​    if(this.activeName == 'many'){

​     return '动态参数'

​    }else{

​     return '静态属性'

​    }

   }

 

## ***\*完成动态参数和静态属性的添加操作\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps195.jpg) 

 



 

## ***\*渲染修改参数的对话框\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps196.jpg) 

 

第二步、



 

第三步、添加data数据



 

第四步、添加方法



 

## ***\*完成修改参数的操作\****

editParams() {

​    this.$refs.editFormRef.validate(**async** valid**=>**{

​     if(!valid)return 

​     **const** {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,{attr_name:this.editForm.attr_name,attr_sel:this.activeName})

​     if(res.meta.status != 200){

​      return this.$message.error('修改参数失败')

​     }

​     this.$message.success('修改参数成功')

​     this.getParamsData()

​     this.editDialogVisible = false 

  }

 

## ***\*完成删除参数的业务逻辑\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps197.jpg) 

第二步、

 



 

## ***\*渲染参数下的可选项\****

第一步、



 

第二步、



 

## ***\*解决attr_vals为空字符串时候的小问题\****

res.data.forEach(item => {

​    item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];

   });

 

## ***\*控制按钮与文本框的切换显示\****

第一步、



 

第二步、data中添加数据

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps198.jpg) 

第三步、方法中

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps199.jpg) 

第四步、样式

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps200.jpg) 

 

## ***\*为每一行数据提供单独的inputVisible和inputValue\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps201.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps202.jpg) 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps203.jpg) 

第四步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps204.jpg) 

 

## ***\*让文本框自动获得焦点\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps205.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps206.jpg) 

 

理解nextTick

 

**//1. 先看一下代码一**

   **//数据变了 --> 虚拟dom改变 --> 真实的dom更新 结论：数据变了，真实的dom并不能立马进行更新**

   **//直接在数据变了之后，立马就focus，就有可能会导致代码一中的情况**

   **//文档上解释：Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更**

   **//如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的**

   **//然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作**

   **//vue 在内部对异步队列尝试使用原生的 Promise.then和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替**

   **//说白了，就是把降低了代码执行的优先级，只有当前所有的代码执行结束之后再去执行回调函数里面的代码**

 

 

 

第一步、



 

第二步、



 

 

可能你还没有注意到，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

 

代码越早执行越好

 

微任务

宏任务

 

第一步、理解setImmediate

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setImmediate

 

该方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数。

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps207.jpg) 

第二步、同步与异步简介

我们知道，Javascript语言的执行环境是单线程（single thread）的。

 

所谓"单线程"，就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推。

 

这种模式的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段Javascript代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。

 

为了解决这个问题，Javascript语言将任务的执行模式分成两种：同步（Synchronous）和异步（Asynchronous）。

 

同步模式就是后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的；

 

异步模式则完全不同，每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行队列上的后一个任务，而是执行回调函数；后一个任务则是不等前一个任务的回调函数的执行而执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。

 

"异步模式"非常重要。在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应，最好的例子就是Ajax操作。在服务器端，"异步模式"甚至是唯一的模式，因为执行环境是单线程的，如果允许同步执行所有http请求，服务器性能会急剧下降，很快就会失去响应。

 

第三步、理解异步任务队列

 

可能有人告诉你，Javascript内部存在着先进先出的异步任务队列，仅仅用以存储异步任务，与同步任务分开管理。进程执行完全部同步代码后，每当进程空闲、触发回调或定时器到达规定的时间，Javascript会从队列中顺序取出符合条件的异步任务并执行之。

 

我们简单验证一下，

 



 

上面的代码我们都知道输出是，1 2 3，因为setTimeout是异步任务，而timeout1又比timeout2先注册，所以最终输出了这个结果。

 

接下来再看一段比较复杂的代码

 



![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps208.jpg) 

 

第四步、理解线程、事件循环和任务队列

 

Javascript是单线程的，但是却能执行异步任务，这主要是因为 JS 中存在事件循环（Event Loop）和任务队列（Task Queue）。

 

事件循环：JS 会创建一个类似于 while (true) 的循环，每执行一次循环体的过程称之为Tick。每次Tick的过程就是查看是否有待处理事件，如果有则取出相关事件及回调函数放入执行栈中由主线程执行。待处理的事件会存储在一个任务队列中，也就是每次Tick会查看任务队列中是否有需要执行的任务。

 

任务队列按类型可以划分为多种：ajax任务队列、定时器任务队列、promise任务队列

 

为什么setTimeout会后于promise.then执行呢，原因或许就是它所处的任务队列优先级较低。

 

在js引擎中，我们可以按性质把任务分为两类，macrotask（宏任务）和 microtask（微任务）。

 

macrotask（按优先级顺序排列）: script(你的全部JS代码，“同步代码”）, setTimeout, setInterval, setImmediate

microtask（按优先级顺序排列）:process.nextTick,Promises（这里指浏览器原生实现的 Promise）

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps209.jpg) 

 



 

 

## ***\*实现文本框与按钮的切换显示\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps210.jpg) 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps211.jpg) 

第二步、

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps212.jpg) 

## ***\*完成参数可选项的添加操作\****



 

## ***\*删除参数下的可选项\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps213.jpg) 

第二步、



## ***\*清空表格数据\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps214.jpg) 

 

## ***\*完成静态属性表格中的展开行效果\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps215.jpg) 

 

## ***\*通过路由加载商品列表组件\****

第一步、创建List.vue



 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps216.jpg) 

 

## ***\*获取商品列表数据\****

 



 

## ***\*渲染商品表格数据\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps217.jpg) 

 

## ***\*自定义格式化时间的全局过滤器\****

main.js

 



 

## ***\*实现商品列表的分页功能\****

第一步、



 

第二步、



## ***\*实现搜索与清空的功能\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps218.jpg) 

## ***\*根据Id删除商品数据\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps219.jpg) 

第二步、



 

## ***\*通过编程式导航跳转到商品添加页面\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps220.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps221.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps222.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps223.jpg) 

 

## ***\*渲染添加页面的基本结构\****

第一步、



 

第二步、



 

## ***\*美化步骤条组件\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps224.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps225.jpg) 

第三步、



https://github.com/masterkong/blog/issues/7

 

## ***\*渲染tab栏区域\****



 

## ***\*实现步骤条和tab栏的数据联动效果\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps226.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps227.jpg) 

 

## ***\*分析表单的组成部分\****



 

## ***\*绘制基本信息面板的UI结构\****

第一步、



 

第二步、



 

## ***\*获取商品分类数据\****



 

## ***\*绘制商品分类的级联选择器\****

第一步、



 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps228.jpg) 

 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps229.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps230.jpg) 

 

第四步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps231.jpg) 

 

## ***\*只允许选中三级商品分类\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps232.jpg) 

## ***\*阻止页签切换\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps233.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps234.jpg) 

 

## ***\*获取动态参数列表数据\****



 

## ***\*绘制商品参数面板中的复选框组\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps235.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps236.jpg) 

 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps237.jpg) 

## ***\*优化复选框的样式\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps238.jpg) 

## ***\*获取静态属性列表数据\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps239.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps240.jpg) 

 

## ***\*渲染商品属性面板的UI结构\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps241.jpg) 

 

## ***\*初步使用upload上传组件\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps242.jpg) 

 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps243.jpg) 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps244.jpg) 

 

## ***\*手动为upload组件绑定headers请求头\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps245.jpg)![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps246.jpg) 

 

## ***\*监听upload组件的on-success事件\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps247.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps248.jpg) 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps249.jpg) 

 

## ***\*监听upload组件的on-remove事件\****

## ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps250.jpg)***\*实现图片的预览效果\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps251.jpg) 

 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps252.jpg) 

 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps253.jpg) 

 

第四步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps254.jpg) 



## ***\*安装并配置vue-quill-editor\****

第一步、

npm i vue-quill-editor

 

 

 

第二步、



 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps255.jpg) 

 

第四步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps256.jpg) 

 

## ***\*实现表单数据的预验证\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps257.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps258.jpg) 

 

## ***\*把goods_cat从数组转换为字符串\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps259.jpg) 

 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps260.jpg) 

 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps261.jpg) 

 

## ***\*处理attrs数组\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps262.jpg) 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps263.jpg) 

## ***\*完成商品添加操作\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps264.jpg) 

 

## ***\*通过路由渲染订单列表页面\****

注意：这个接口搜索功能用不了，因为后台没有去做，大家不需要自己去做

 

第一步、order/Order.vue



 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps265.jpg) 

 

## ***\*根据分页获取订单数据列表\****



 

## ***\*渲染订单table表格\****



 

## ***\*实现分页功能\****

第一步、



 

第二步、



 

## ***\*实现省市区县数据联动效果\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps266.jpg) 

第二步、



 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps267.jpg) 

第四步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps268.jpg) 

第五步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps269.jpg) 

 

## ***\*展示物流进度对话框并获取物流信息\****

第一步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps270.jpg) 

 

第二步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps271.jpg) 

 

第三步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps272.jpg) 

第四步、

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps273.jpg) 

 

## ***\*手动导入并使用Timeline组件\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps274.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps275.jpg) 

 

## ***\*通过路由加载数据报表组件\****

[https://v-charts.js.org/#/](#/)

 



 

## ***\*通过nprogress添加进度条效果\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps276.jpg) 

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps277.jpg) 

 

## ***\*生成打包报告\****

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps278.jpg) 

## ***\*通过vue.config.js修改webpack的默认配置\****

## ![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps279.jpg)***\*介绍configureWebpack与chainWebpack\****

 

![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml24092\wps280.jpg)https://cn.vuejs.org/v2/guide/components-dynamic-async.html

[https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD](#路由懒加载)