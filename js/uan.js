/**
 * @author: walei
 * @date:   2017-12-10
 * @desc:   日常工具方法
 */
let uan = {
    /**
     * 获取 url 参数
     * @param {String | null} prop 
     */
    getUrlParams ( prop ) {
        let params = {};
        let search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
        let definitions = search.split( '&' );
    
        definitions.forEach( function( val, key ) {
            let parts = val.split( '=', 2 );
            params[ parts[ 0 ] ] = parts[ 1 ];
        } );
    
        return ( prop && prop in params ) ? params[ prop ] : params;
    },

    /**
     * 去除空格 
     * @param {String} str 
     * @param {Number} type 1-所有空格  2-前后空格  3-前空格 4-后空格
     */
    trim (str, type) {
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
        6: 大写每个单词的首字母
     */
    changeLetter (str, type) {
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
                return str.replace(/\b\w+\b/g, word  => word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase());
            case 2:
                return str.replace(/\b\w+\b/g, word  => word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase());
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            case 6:
                return str.replace(/\b[a-z]/g, char => char.toUpperCase());
            default:
                return str;
        }
    },

    /**
     * 计数数组中值的出现次数
     * @param {Array} arr 
     * @param {String | Number} value 
     */
    countOccurrences (arr, value){
        arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
    },

    /**
     * 设置 cookie
     * @param {String} name 名称
     * @param {String} value 值
     * @param {Number} day 时间（天数）
     */
    setCookie (name, value, day) {
        let nowDate = new Date();
        nowDate.setDate(nowDate.getDate() + day);
        document.cookie = name + '=' + value + ';expires=' + nowDate;
    },

    /**
     * 获取 cookie
     * @param {String} name 名称
     */
    getCookie (name) {
        let arr = document.cookie.split('; ');
        for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    },

    /**
     * 删除 cookie 名称
     * @param {String} name 
     */
    removeCookie (name) {
        this.setCookie(name, 1, -1);
    },

    /**
     * 是否是偶数
     * @param {Number} num 
     */
    isEven (num){
        return num % 2 === 0;
    },

    /**
     * 取范围内的随机整数
     * @param {Number} min 
     * @param {Number} max 
     */
    randomIntegerInRange (min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min
    },

    /**
     * 取范围内的随机数
     * @param {Number} min 
     * @param {Number} max 
     */
    randomNumberInRange (min, max){
        return Math.random() * (max - min) + min;
    },

    /**
     * 方法运行时间
     * @param {Function} func 
     */
    timeTaken (func){
        console.time('timeTaken');  
        const r = func();
        console.timeEnd('timeTaken');  
        return r;
    },

    /**
     * 数字金额转大写
     * @param {number} n 
     */
    numToUppercase(n) {
        let fraction = ['角', '分'];
        let digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        let unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];

        // 向右移位
        function shiftRight(number, digit){
            digit = parseInt(digit, 10);
            let value = number.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] + digit) : digit))
        }
        // 向左移位
        function shiftLeft(number, digit){
            digit = parseInt(digit, 10);
            let value = number.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] - digit) : -digit))
        }
        let head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        let s = '';
        for (let i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(shiftRight(n,1+i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (let i = 0; i < unit[0].length && n > 0; i++) {
            let p = '';
            for (let j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(shiftLeft(n, 1));
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
    }
     
}