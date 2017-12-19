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

- 是否是偶数

    uan.isEven(8) -> true

- 取范围内的随机整数

    uan.randomIntegerInRange(4, 8) -> 6

- 取范围内的随机数

    uan.randomNumberInRange(4, 8) -> 6.5456327

- 方法运行时间

    uan.timeTaken(function(){
        console.log(6)
    })


