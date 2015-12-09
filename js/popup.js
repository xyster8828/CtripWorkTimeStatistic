/**
 * Author: Xu Yu
 * Date: 2014/10/28
 * Time: 15:11
 * Email: xu.yu@ctrip.com
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse({
            farewell: 111
        });

        if(request.totalTime){
            $("[data-ctr=total]").html(request.totalTime+'h');
            $("[data-ctr=days]").html(request.workDays);
            $("[data-ctr=average]").html(request.workTimePerDay+'h');
            $("[data-ctr=need]").html(request.need);
            $("[data-ctr=diff]").html(request.diff+'h');
            $("[data-ctr=maxCount]").html(request.maxOrderCount);
        }
    });

//执行content script，通过dom获取信息，并进行统计
chrome.tabs.executeScript(null, {file: "js/statistic.js"});