
/**
 * 获取元素
 */
export function $$(s) {
    if (document.querySelectorAll(s).length === 1) {
        return document.querySelector(s);
    }
    return document.querySelectorAll(s);
}

/**
 * 验证是否必填
 * @param obj
 * @param exceptArr
 * @param msg
 * @returns {boolean}
 */
export function requiredValidator(obj, exceptArr, msg = "所有项都是必填的!") {
    // 将对象中的某些属性排除在必填项之外
    function except(key) {
        if (exceptArr && exceptArr instanceof Array) {
            for (let arrValue of exceptArr) {
                if (key === arrValue) return true;
            }
        }
        return false;
    }
    for (let key in obj) {
        if (obj[key] === '' && !except(key)) {
            alert(msg);
            return false;
        }
    }
    return true;
}

/**
 * 获取表单数据
 * @param elem
 */
export function getFormData(elem) {
    if (!(elem instanceof HTMLElement)) {
        throw 'getFormData没有参数或者参数错误';
    }
    let allData = {};
    for (let [name, value] of new FormData(elem)) {
        allData[name] = value;
    }
    return allData;
}



