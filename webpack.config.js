var path=require("path");
module.exports={
    entry:"./js/uan.js",
    output:{
        path:__dirname,
        filename:"build/uan-min.js"
    },
    module:{
        loaders:[{
            test:path.join(__dirname,"es6"),
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
             }
        }]
    }
}