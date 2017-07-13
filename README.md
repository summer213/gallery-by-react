# gallery-by-react
start learn react
1. 安装yeoman生成工程目录

    (1) 输入install -g yo 命令
 
 
    (2) 查看yo版本  yo -version
    
    
    (3) 安装generator ：npm install -g generator-react-webpack生成目录结构
    
    
     [distcontent](http://github.com/summer213/gallery-by-react/raw/master/images/distcontent.png) 
     
     解释下目录：
     
     dist是生成目录，src是开发目录，在src下components下的main.js进行开发
     
     package.jsons 是webpack的配置文件，存放信息，包含依赖信息
     
     在cfg文件夹下，对webpack任务进行配置，分配具体任务，告诉webpack干什么
    
 2. 运行npm install安装依赖
 
 3. 在cfg目录下的defaults.js文件中，可以修改本地调试的端口号，默认是localhost:8000
  [dist](https://github.com/summer213/gallery-by-react/raw/master/src/images/dist.png)
  
 4. 打开本地服务器，运行npm start 命令，可以在本地调试代码
 
 5. 运行后，若是出现webpack: Compiled successfully.，就表示大功告成了。
 [succeed](https://github.com/summer213/gallery-by-react/raw/master/src/images/success.png)
 
 6. webpack工具可以实时监听代码的修改，在文档修改保存后，浏览器会热加载，自动显示为最新效果
 
 
 可以愉快地撸代码了~
