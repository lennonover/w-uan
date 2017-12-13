/**
 * @author: walei
 * @date:   2017-12-10
 * @desc:   日常工具方法
 */
let uan = {
    /**
     * 去除空格 
     * @param {String} str 
     * @param {Number} type 1-所有空格  2-前后空格  3-前空格 4-后空格
     */
    trim(str, type) {
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },
    /**
     * 转换大小写
     * @param {String} str  
     * @param {Number} type 
        1: 首字母大写
        2：首页母小写
        3：大小写转换
        4：全部大写
        5：全部小写
     */
    changeLetter(str, type) {
        function ToggleCase(str) {
            let itemText = ""
            str.split("").forEach(item => {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                } else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                } else {
                    itemText += item;
                }
            });
            return itemText;
        }

        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
                });
            case 2:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },
}