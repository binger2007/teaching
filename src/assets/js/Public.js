export {
  uuid,
  timestampToTime,
  generateOptions,
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  getFirstDayOfSeason,
  getFirstDayOfYear,
  computedDepartmentPath,
  dateToTime,
  getCurrentDate
};
function getCurrentDate(format) {
  var now = new Date();
  var year = now.getFullYear(); //得到年份
  var month = now.getMonth(); //得到月份
  var date = now.getDate(); //得到日期
  var day = now.getDay(); //得到周几
  var hour = now.getHours(); //得到小时
  var minu = now.getMinutes(); //得到分钟
  var sec = now.getSeconds(); //得到秒
  month = month + 1;
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;
  if (hour < 10) hour = "0" + hour;
  if (minu < 10) minu = "0" + minu;
  if (sec < 10) sec = "0" + sec;
  var time = "";
  //精确到天
  if (format == 1) {
    time = year + "-" + month + "-" + date;
  }
  //精确到分
  else if (format == 2) {
    time =
      year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
  }
  return time;
}
// 生成uuid
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

//时间戳转换成日期时间格式
function timestampToTime(timestamp, showHours) {
  var timestamp = timestamp;
  if (timestamp.length == 10) {
    timestamp *= 1000;
  }
  timestamp = parseInt(timestamp);

  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (showHours) {
    return Y + M + D + h + m + s;
  } else {
    return Y + M + D;
  }
}

//时间转换成日期时间格式,非时间戳
function dateToTime(date, showHours) {
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (showHours) {
    return Y + M + D + h + m + s;
  } else {
    return Y + M + D;
  }
}

//递归生成树形结构
/**
 * 该方法用于将有父子关系的数组转换成树形结构的数组
 * 接收一个具有父子关系的数组作为参数
 * 返回一个树形结构的数组
 */
function generateOptions(data, type) {
  //type是返回树状结构还是列表结构，false:树状结构，true列表结构
  //没有父节点的数据
  let arr = [];
  let departmentId = sessionStorage.getItem("departmentId");
  let parents = data.filter(
    value => value.id == departmentId || value.id == null
  );
  //有父节点的数据
  let childrens = data.filter(
    value => value.id != departmentId && value.id != null
  );
  //定义转换方法的具体实现
  let translator = (parents, childrens) => {
    //遍历父节点数据
    parents.forEach(parent => {
      arr.push(parent);
      parent.value = parent.id;
      parent.departmentPath = parent.departmentPath
        ? parent.departmentPath
        : parent.label;
      //遍历子节点数据
      childrens.forEach((current, index) => {
        //此时找到父节点对应的一个子节点
        if (current.p_id === parent.id) {
          //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
          let temp = JSON.parse(JSON.stringify(childrens));
          //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
          temp.splice(index, 1);
          //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
          current.departmentPath = parent.departmentPath + "/" + current.label;
          translator([current], temp);
          //把找到子节点放入父节点的childrens属性中
          typeof parent.children !== "undefined"
            ? parent.children.push(current)
            : (parent.children = [current]);
          if (JSON.stringify(arr).indexOf(JSON.stringify(current)) == -1) {
            arr.push(current); // 将对象添加到数组中(后增)
          }
        }
      });
    });
  };
  //调用转换方法
  translator(parents, childrens);
  //返回最终的结果
  return [parents, arr];
}

//获取这周的周一
function getFirstDayOfWeek(date) {
  var weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7

  date.setDate(date.getDate() - weekday + 1); //往前算（weekday-1）天，年份、月份会自动变化
  return date;
}

//获取当月第一天
function getFirstDayOfMonth(date) {
  date.setDate(1);
  return date;
}

//获取当季第一天
function getFirstDayOfSeason(date) {
  var month = date.getMonth();
  if (month < 3) {
    date.setMonth(0);
  } else if (2 < month && month < 6) {
    date.setMonth(3);
  } else if (5 < month && month < 9) {
    date.setMonth(6);
  } else if (8 < month && month < 11) {
    date.setMonth(9);
  }
  date.setDate(1);
  return date;
}

//获取当年第一天
function getFirstDayOfYear(date) {
  date.setDate(1);
  date.setMonth(0);
  return date;
}

//计算单位路径
function computedDepartmentPath(data, id) {
  var departmentPath;
  data.forEach(ele => {
    if (ele.id == id) {
      departmentPath = ele.departmentPath;
    }
  });
  return departmentPath;
  // let arr = Array.from(indexArray);
  // for (let i = 0, len = data.length; i < len; i++) {
  //   arr.push(data[i].label);
  //   if (data[i].id === id) {
  //     return arr;
  //   }
  //   let children = data[i].children;
  //   if (children && children.length) {
  //     let result = computedDepartmentPath(children, id, arr);
  //     if (result) return result;
  //   }
  //   arr.pop();
  // }
}
