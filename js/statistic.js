/**
 * Author: Xu Yu
 * Date: 2014/10/28
 * Time: 15:47
 * Email: xu.yu@ctrip.com
 */
(function () {
    var timeFormat = "HH:mm";
    var totalTime = 0, workDays = 0, workTimePerDay = 0, diff, need;
    var ONEDAY = 9;//一天应该工作9小时

//    var $table = $("#ctl00_cphMain_CalendarAC");
    var $table = $(window.frames['Main'].document.getElementById('ctl00_cphMain_CalendarAC'));
    var dataCls = 'table.listAC';

    var $rows = $table.find('tr');
    var availableRows = [];
    _.each($rows, function (row) {
        if ($(row).find(dataCls).length) {
            availableRows.push(row)
        }
    });

    _.each(availableRows, function (row) {
        var tds = $(row).children();
        _.each(tds, function (td, index) {
            var $item = $(td).find(dataCls);
            if ($item.length == 0) return;

            var timeStr = $item.find('td')[1].innerHTML;
            if (timeStr == '无刷卡记录' || $item.find('[title^="请假/外出申请记录"]').length) return;
            var arr = timeStr.split('~');
            if (arr.length == 2 && arr[0] && arr[1]) {
                var beginTime = moment(arr[0], timeFormat);
                var endTime = moment(arr[1], timeFormat);
            } else {
                return;
            }

            totalTime += endTime - beginTime;

            if (index == 0 || index == 6) {

            } else {
                workDays++;
            }
        })
    });

    var totalHours = (totalTime / (1000 * 3600)).toFixed(2);
    workTimePerDay = (totalHours / (workDays)).toFixed(2);
    need = workDays * ONEDAY;
    diff = (totalHours - need).toFixed(2);

    chrome.runtime.sendMessage({
        totalTime: totalHours,
        workDays: workDays,
        workTimePerDay: workTimePerDay,
        need: need,
        diff: diff
    }, function (response) {
        console.log(response.farewell);
    });
})();


