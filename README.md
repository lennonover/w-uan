# w-uan

## 使用

- 获取 url 参数

    uan.getUrlParams(参数)

    uan.getUrlParams() 所有

- 去除空格

    uan.trim(' 123  3 ',1); -> '1233'

- 大小写转换

    uan.changeLetter('ahdngfl',1) -> Ahdngfl

- 计数数组中值的出现次数

    uan.countOccurrences([1,2,3,4,1,2,3,1],1) -> 3

- 设置 cookie

    uan.setCookie('COOKIE', 'testcookie', 1)

- 获取 cookie

    uan.getCookie('COOKIE')

- 删除 cookie

    uan.changeLetter('COOKIE')

- 设置 LocalStorage 时间
    
    单位天 默认30天 可链式操作         
    uan.setAgeLocalStorage(1)

- 设置 LocalStorage

    uan.setLocalStorage('a','abc')

- 获取 LocalStorage

    uan.setLocalStorage('a');

- 删除 LocalStorage 

    uan.removeLocalStorage('a')

- 是否是偶数

    uan.isEven(8) -> true

- 取范围内的随机整数

    uan.randomIntegerInRange(4, 8) -> 6

- 取范围内的随机数

    uan.randomNumberInRange(4, 8) -> 6.5456327

- 方法运行时间

    uan.timeTaken(() => Math.acosh(200)) -> timeTaken: 0.06201171875ms 

- 数字金额转大写

    uan.numToUppercase(474636732.08) -> 肆亿柒仟肆佰陆拾叁万陆仟柒佰叁拾贰元捌分


