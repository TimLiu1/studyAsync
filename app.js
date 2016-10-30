'use strict'

const async = require('async');
const fs = require('fs');

/**
 * @series 所有函数顺序执行，上一个函数执行成功之后才会执行后面的函数，如果某个函数出错不执行后面的函数直接跳转到错误处理步骤，
 * 但是之前执行的结果依然能够被打印。
 * 
 */
async.series([
    function (cb) {
        fs.readFile('./file1.json', 'utf-8', (err, result1) => {
            if (err) {
                return cb(err)
            }
            cb(null, result1);
        })

    },
    function (cb) {
        fs.readFile('./file2.json', 'utf-8', (err, result2) => {
            if (err) {
                return cb(err)
            }
            cb(null, result2);
        })

    },
    function (cb) {
        fs.readFile('./file3.json', 'utf-8', (err, result3) => {
            if (err) {
                return cb(err)
            }
            cb(null, result3);
        })

    }
], (err, result) => {
    if (err) {
        console.log(err);
    }
    // console.log(result)
})

/**
 * @parallel 多个函数并行执行, 只有所有函数都执行成功才会返回最后的结果，这是和series的区别
 * 
 */
async.parallel([
    function (cb) {
        fs.readFile('./file1.json', 'utf-8', (err, result1) => {
            if (err) {
                return cb(err)
            }
            cb(null, result1);
        })

    },
    function (cb) {
        fs.readFile('./file2.json', 'utf-8', (err, result2) => {
            if (err) {
                return cb(err)
            }
            cb(null, result2);
        })

    },
    function (cb) {
        fs.readFile('./file3.json', 'utf-8', (err, result3) => {
            if (err) {
                return cb(err)
            }
            cb(null, result3);
        })

    }
], (err, result) => {
    if (err) {
        console.log(err);
    }
    // console.log(result)
})

/**
 * @waterfall 函数依次执行,前一个函数的结果是后一个函数的参数,第二个函数必须有两个参数，第一个是上一个函数的参数，第二个是回调函数，
 * 否则报错，而且如果有一个函数报错则不会打印任何处理得出的正确结果
 * 
 */
async.waterfall([
    function (cb) {
        cb(null, 'utf-8')
    },
    function (arg, cb) {
        //测试是否传入
        console.log(arg)
        fs.readFile('./file2.json', arg, (err, result2) => {
            if (err) {
                return cb(err)
            }
            cb(null, result2);
        })

    },
    function (arg, cb) {
        fs.readFile('./file.json', 'utf-8', (err, result3) => {
            if (err) {
                return cb(err)
            }
            cb(null, result3);
        })

    }
], (err, result) => {
    if (err) {
        console.log(err);
    }
    // console.log(result)
})

//