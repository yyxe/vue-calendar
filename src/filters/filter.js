function format (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

function formatDate (time) {
  let date = new Date(time)
  return format(date, 'yyyy-MM-dd hh:mm')
}
function formatDateTime(time) {
  let date = new Date(time)
  return format(date, 'hh:mm')
}


function formatMouth (time) {
  let date = new Date(time)
  return format(date, 'yyyy年M月')
}
function formatMouths (time) {
  let date = new Date(time)
  return format(date, 'yyyy-MM')
}

function formatMouthDate (time) {
  let date = new Date(time)
  return format(date, 'yyyy年M月d日')
}
function formatMouthDates (time) {
  let date = new Date(time)
  return format(date, 'yyyy-MM-dd')
}
function sliceList1(list) {
  return list.slice(0, 12)
}
function sliceList2(list) {
  return list.slice(12)
}

function noticeDate(value) {
  let date = new Date(value)
  let dat = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()

  let newDate = new Date()
  let newDay = newDate.getDate()
  let newMonth = newDate.getMonth()+1
  let newYear = newDate.getFullYear()
  let newDat = newYear + '-' + newMonth + '-' + newDay

  if (dat === newDat) {//今天
    let min = date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes()
    let hour = date.getHours() > 9 ? date.getHours() : '0'+date.getHours()
    return hour + ':' + min
  }

  //昨天
  let yesterday
  if(newDay == 1){
    if(newYear % 4 === 0 && newMonth === 3 ){//闰年2月
      yesterday = newYear + '-' + (newMonth - 1) + '-29'
    }else if(newMonth === 3 ){
      yesterday = newYear + '-' + (newMonth - 1) + '-28'
    }else if(newMonth === 1 ){
      yesterday = (newYear-1) + '-12-31'
    }else if(newMonth === 2 || newMonth === 4|| newMonth === 6|| newMonth === 8|| newMonth === 9|| newMonth === 11){
      yesterday = newYear + '-' + (newMonth - 1) + '-31'
    }else if(newMonth === 5 || newMonth === 7|| newMonth === 10|| newMonth === 12){
      yesterday = newYear + '-' + (newMonth - 1) + '-30'
    }
  }else{
    yesterday = newYear + '-' + newMonth + '-' + (newDay - 1)
  }
  if (dat === yesterday) {//昨天
    let min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    return '昨天 '+hour + ':' + min
  }
  //年份相等
  if(newYear === date.getFullYear()){
    return date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
  }
  //日期
  return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
}
function attendanceDate(value){
  let date = new Date(value)

  let a = ["日", "一", "二", "三", "四", "五", "六"];
  let week = date.getDay();
  let weekName = "星期"+ a[week];
  let hour = date.getHours() > 9 ? date.getHours() : '0'+date.getHours();
  let min = date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes();

  let dat = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + hour + ':' + min + '('+weekName+')'
  return dat;
}
function rankFilter(val) {
  const obj = {
    4:'C',
    5:'B',
    6: 'B',
    7: 'B',
    8: 'A',
    9: 'A',
    10: 'A'
  }
  if(val){
    return obj[val]
  }
  return ''
}
function rankFilter2(val) {
  const obj = {
    4:'',
    5:'-',
    6: '',
    7: '+',
    8: '-',
    9: '',
    10: '+'
  }
  if(val){
    return obj[val]
  }
  return ''
}
function backgroundFilter(val) {
  const obj = {
    4: '#ffd801',
    5: '#ffc001',
    6: '#ff9601',
    7: '#f87c01',
    8: '#ff6442',
    9: '#ff5029',
    10: '#f02c00'
  }
  if(val){
    return 'background:' +  obj[val]
  }
  return ''
}
function recordStatus(val) {
  const obj = {
    'NORMAL':'正常',
    'LEAVE':'请假',
    'LATE': '迟到',
    'LEAVE_EARLY': '早退',
  }
  if(val){
    return obj[val]
  }
  return ''
}
function recordStatusColor(val) {
  const obj = {
    'NORMAL':'#37A4ED',
    'LEAVE':'#9EDA43',
    'LATE': '#FF9658',
    'LEAVE_EARLY': '#F66C67',
  }
  if(val){
    return 'border-color:' + obj[val] + ';' + 'color:' + obj[val]
  }
  return ''
}
function subjectFilter(val) {
  const obj = {
    'LANGUAGE':'语文',
    'MATHEMATICS':'数学',
    'PHYSICAL': '物理',
    'ENGLISH': '英语',
    'CHEMISTRY': '化学',
    'HISTORY': '历史',
    'GEOGRAPHY': '地理'
  }
  if(val){
    return  obj[val]
  }
  return ''
}

function handleCoumesAddr(val) {
  const obj = {
    'CANTEEN':'食堂',
    'SUPERMARKET':'超市',
    'DORMITORY': '宿舍',
    'OTHER': '其他'
  }
  if(val){
    return obj[val]
  }
  return ''
}
function handleCoumesType(val) {
  const obj = {
    'MEAL':'就餐',
    'SHOP':'购物',
    'WATER': '用水',
    'WASH': '洗澡',
    'OTHER': '其他'
  }
  if(val){
    return obj[val]
  }
  return ''
}

function handleAttendanceType(val) {
  const obj = {
    'GO_TO_SCHOOL':'到校',
    'LEAVE_SCHOOL':'离校'
  }
  if(val){
    return obj[val]
  }
  return ''
}

function handleAttendanceStatus(val) {
  const obj = {
    'NORMAL':'正常',
    'LATE': '迟到',
    'LEFT_EARLY': '早退',
    'ABSENCE' : '缺勤',
    'ABNORMAL' : '异常'
  }
  if(val){
    return obj[val]
  }
  return ''
}

function attendanceStatus(val) {
  const obj = {
    'NORMAL':'normal',
    'LATE': 'late',
    'LEFT_EARLY': 'left-early',
    'ABSENCE' : 'absence',
    'ABNORMAL' : 'abnormal'
  }
  if(val){
    return obj[val]
  }
  return ''
}

function getMonday(type, dates) {
  var now = new Date();
  var nowTime = now.getTime();
  var day = now.getDay();
  var longTime = 24 * 60 * 60 * 1000;
  var n = longTime * 7 * (dates || 0);
  if (type == "s") {
    var dd = nowTime - (day - 1) * longTime + n;
  };
  if (type == "e") {
    var dd = nowTime + (7 - day) * longTime + n;
  };
  dd = new Date(dd);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
  var d = dd.getDate();
  m = m < 10 ? "0" + m: m;
  d = d < 10 ? "0" + d: d;
  var day = y + "-" + m + "-" + d;
  return day;
}

function getMonth(type, months) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (Math.abs(months) > 12) {
    months = months % 12;
  };
  if (months != 0) {
    if (month + months > 12) {
      year++;
      month = (month + months) % 12;
    } else if (month + months < 1) {
      year--;
      month = 12 + month + months;
    } else {
      month = month + months;
    };
  };
  month = month < 10 ? "0" + month: month;
  var date = d.getDate();
  var firstday = year + "-" + month + "-" + "01";
  var lastday = "";
  if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
    lastday = year + "-" + month + "-" + 31;
  } else if (month == "02") {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = year + "-" + month + "-" + 29;
    } else {
      lastday = year + "-" + month + "-" + 28;
    };
  } else {
    lastday = year + "-" + month + "-" + 30;
  };
  var day = "";
  if (type == "s") {
    day = firstday;
  } else {
    day = lastday;
  };
  return day;
}

export { formatDate, formatMouth, formatMouths , formatMouthDate, formatMouthDates, getMonday, getMonth, noticeDate,attendanceDate, rankFilter, backgroundFilter, formatDateTime, recordStatus, recordStatusColor, subjectFilter, rankFilter2, handleCoumesAddr, handleCoumesType, handleAttendanceType, handleAttendanceStatus, attendanceStatus}
