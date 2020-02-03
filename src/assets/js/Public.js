export {
  uuid,
  timestampToTime,
  generateOptions,
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  getFirstDayOfSeason,
  getFirstDayOfYear,
  computedDepartmentPath
};

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

//递归生成树形结构

function generateOptions(params) {
  //生成Cascader级联数据
  var result = [];
  for (let param of params) {
    param.value = param.id;
    if (param.p_id == 0) {
      //判断是否为顶层节点
      param.children = getchilds(param.id, params); //获取子节点
      result.push(param);
    }
  }
  return result;
}

function getchilds(id, array) {
  let childs = new Array();
  for (let arr of array) {
    //循环获取子节点
    if (arr.p_id == id) {
      childs.push(arr);
    }
  }
  for (let child of childs) {
    //获取子节点的子节点
    let childscopy = getchilds(child.id, array); //递归获取子节点
    if (childscopy.length > 0) {
      child.children = childscopy;
    }
  }
  return childs;
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
function computedDepartmentPath(arr, item) {
  var tarArr = [];
  var pathId = item.p_ids + item.department_id;
  var pathIdArr = pathId.split(",");
  pathIdArr.forEach(ele => {
    arr.forEach(item => {
      if (item.id == ele) {
        tarArr.push(item.label);
      }
    });
  });
  return tarArr.join("/");
}

//生成树状表格结构
// function generateTabelTree(dataArray, id) {
//   // console.log(dataArray, id);
//   var resultArray = []; //一级栏目
//   var arrResidue = []; //一级栏目
//   // var arrResidue = [];
//   var level = 1;
//   dataArray.forEach(ele => {
//     if (ele.id == id) {
//       ele.level = level;
//       resultArray.push(ele);
//     }
//     if (ele.p_id == id) {
//       var res = loadChildrenData(dataArray, ele, level + 1);
//       resultArray.push(res);
//     }
//   });

//   return resultArray;
// }
// function loadChildrenData(originArray, item, level) {
//   // resultArray.forEach(ele1 => {
//   //   ele1.children = [];
//   //   // console.log(ele1.id);
//   //   arrResidue.forEach(ele2 => {
//   //     if (ele1.id == ele2.p_id) {
//   //       ele2.level = level;
//   //       console.log(ele1.id + "|" + ele2.p_id);
//   //       ele1.children.push(ele2);
//   //       // if (!ele1.children) {
//   //       //   ele1.children = [ele2];
//   //       // } else {
//   //       //   ele1.children.push(ele2);
//   //       // }
//   //     }
//   //   });
//   //   if (ele1.children && ele1.children.length > 0) {
//   //     loadChildrenData(ele1.children, arrResidue, level + 1);
//   //   }
//   // });

//   originArray.forEach(element => {
//     if (element.p_id == item.id) {
//       element.level = level;
//       if (!item.children) {
//         item.children = [element];
//       } else {
//         item.children.push(element);
//       }
//     }
//   });
//   return item;
// }
