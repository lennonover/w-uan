/**
 * @author: walei
 * @date:   2017-12-10
 * @desc:   日常工具方法
 */
let uan = {
    /**
     * 获取 url 参数
     * @param {String | null} prop 
     * @returns {String}
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
     * @returns {String}
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
       @returns {String}
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
     * @returns {exports}
     */
    setCookie (name, value, day) {
        let nowDate = new Date();
        nowDate.setDate(nowDate.getDate() + day);
        document.cookie = name + '=' + value + ';expires=' + nowDate;
        return this;
    },

    /**
     * 获取 cookie
     * @param {String} name 名称
     * @returns {*}
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
     * @returns {exports}
     */
    removeCookie (name) {
        this.setCookie(name, 1, -1);
        return this;
    },

    /**
     * LocalStorage 过期时间，默认30天
     */ 
    ageLocalStorage: 30*24*60*60*1000,
    
    /**
     * 设置 LocalStorage 过期时间
     * @param {Number} age 天
     * @returns {exports}
     */
    setAgeLocalStorage(age){
        this.ageLocalStorage = age*24*60*60*1000;
        return this;
    },

    /**
     * 设置 localStorage
     * @param {String} key
     * @param {String} value
     */
    setLocalStorage(key, value){
        localStorage.removeItem(key);
        let isObject = value instanceof Object,
            _time = new Date().getTime(),
            _age = this.ageLocalStorage;

        // 如果不是对象，新建一个对象把 value 存起来
        if(!isObject) {
            let b = value;
            value = {};
            value._value = b;
        }
        // 加入时间
        value._time = _time;
        // 过期时间
        value._age = _time + _age;
        // 是否一个对象
        value._isObject = isObject;
        localStorage.setItem(key, JSON.stringify(value));
        return this;
    },

    /**
     * 判断一个 localStorage 是否过期
     * @param {String} key
     * @returns {boolean}
     */
    isExpireLocalStorage(key) {

        let isExpire = true,
            value = localStorage.getItem(key),
            now = new Date().getTime();

        if(value) {
            value = JSON.parse(value);
            // 当前时间是否大于过期时间
            isExpire = now > value._age;
        } else {
            // 没有值也是过期
        }
        return isExpire;
    },

    /**
     * 获取某个 localStorage 值
     * @param {String} key
     * @returns {*}
     */
    getLocalStorage(key) {
        let isExpire = this.isExpireLocalStorage(key),
            value = null;
        if(!isExpire) {
            value = localStorage.getItem(key);
            value = JSON.parse(value);
            if(!value._isObject) {
                value = value._value;
            }
        }
        return value;
    },

    /**
     * 删除某个 localStorage 值
     * @param {String} key
     * @returns {exports}
     */
    removeLocalStorage (key) {
        localStorage.removeItem(key);
        return this;
    },

    /**
     * 是否是偶数
     * @param {Number} num 
     * @returns {boolean}
     */
    isEven (num){
        return num % 2 === 0;
    },

    /**
     * 取范围内的随机整数
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    randomIntegerInRange (min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min
    },

    /**
     * 取范围内的随机数
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    randomNumberInRange (min, max){
        return Math.random() * (max - min) + min;
    },

    /**
     * 方法运行时间
     * @param {Function} func 
     * @returns {Number}
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
     * @returns {String}
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