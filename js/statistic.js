/**
 * Author: Xu Yu
 * Date: 2014/10/28
 * Time: 15:47
 * Email: xu.yu@ctrip.com
 */
(function(){
    var timeFormat="HH:mm";
    var totalTime=0, workDays= 0, workTimePerDay=0;

//    var $table = $("#ctl00_cphMain_CalendarAC");
    var $table = $(window.frames['Main'].document.getElementById('ctl00_cphMain_CalendarAC'));
    var $list = $table.find('table.listAC');
    _.each($list, function(item){
        var timeStr=$(item).find('td')[1].innerHTML;
        if(timeStr=='无刷卡记录') return;
        var arr=timeStr.split('~');
        var beginTime=moment(arr[0], timeFormat);
        var endTime=moment(arr[1], timeFormat);

        totalTime+=endTime-beginTime;
        workDays++;
    });

    var totalHours= (totalTime/(1000*3600)).toFixed(2);
    workTimePerDay=(totalHours/(workDays)).toFixed(2);

    chrome.runtime.sendMessage({
        totalTime: totalHours,
        workDays: workDays,
        workTimePerDay: workTimePerDay
    }, function(response) {
        console.log(response.farewell);
    });
})();


