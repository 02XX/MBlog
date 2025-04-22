function cryptoPlugin() {  
    return {  
        name: 'crypto-plugin',  
        enforce: 'pre', // 插件顺序，在Vite核心插件前执行  
        transform(src, id) {
	        //id:文件名，判断要处理的文件
	        if (id.indexOf('.md') !== -1){
			    //Markdown中的文字加密后，放到解密函数的参数中
			    //TODO 这部分我已验证了替换的可行性，还差写个加密解密
		        return src.replace('原文', '处理过的密文')  
	        }  
        },  
    };  
}  
  
export default cryptoPlugin