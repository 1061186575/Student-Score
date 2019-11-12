/**
 * 打算用来替换vue的v-for
 * @param append_place_id
 * @param data
 * @param string_template
 */

export default function vFor(append_place_id, data, string_template) {

    let flag =  typeof append_place_id == 'string' &&
                typeof string_template == 'string' &&
                data instanceof Array;
    if (!flag) throw 'vFor 参数有误';

    var matchRes = string_template.match(/{{.+?}}/g); // 找到所有的花括号{{ xxx }}
    matchRes = matchRes.map((d) => d.slice(2,d.length-2).trim()); // 把{{ xxx }}变成xxx
    var all_student_str = "";

    data.forEach(obj => {
        var replaceRes = string_template;
        matchRes.forEach(d => {
            replaceRes = replaceRes.replace(/{{.+?}}/, obj[d]); //把{{ xxx }}里的值替换成data里的值
        });
        all_student_str += replaceRes;
    });
    document.getElementById(append_place_id).innerHTML = all_student_str; // 替换后添加到页面
}

