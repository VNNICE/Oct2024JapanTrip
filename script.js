const places = document.querySelectorAll('.t-place');
const sTimes = document.querySelectorAll('.t-sTime');
const fTimes = document.querySelectorAll('.t-fTime');
const summaries = document.querySelectorAll('.t-summary');
const costs = document.querySelectorAll('.t-cost');
const tables = document.querySelectorAll('.table');
const timer = document.querySelector('.timer');
const nLink = document.querySelectorAll('n-link');
const schedules = document.querySelectorAll('.schedule');
const globalDate = new Date('2024-10-26T15:00:00');

let placeWidth = 0;
let sTimeWidth = 0;
let fTimeWidth = 0;
let summariesWidth = 0;
let costsWidth = 0;

RealTimeClock();
setInterval(RealTimeClock, 1000);


window.onload = function()
{
    SetWidth(places, placeWidth);
    SetWidth(sTimes, sTimeWidth);
    SetWidth(fTimes, fTimeWidth);
    SetWidth(summaries, summariesWidth);
    SetWidthByCost(costs, costsWidth);
    TotalCostCalculation(tables);
    CreateNlinksFromSchedules();
    ShowTodaysSchedule();
};

function ShowTodaysSchedule()
{
    tables.forEach(table=>
        { 
            const selectedSchedule = table.querySelector('.schedule');
            const nowDate = new Date(globalDate.getFullYear(), globalDate.getMonth(), globalDate.getDate());

            const [targetMonth, targetDay] = selectedSchedule.textContent.split('/').map(Number);
            const targetDate = new Date(globalDate.getFullYear(), targetMonth - 1, targetDay);
            if(nowDate < targetDate) 
            {
                return;
            }
            const targetData = selectedSchedule.querySelectorAll('.data');
            if (nowDate.toDateString() === targetDate.toDateString())
                {
                    targetData.forEach(data=>
                    {
                        const startTime = data.querySelector('.t-stime')?.textContent;
                        const endTime = data.querySelector('.t-ftime')?.textContent;        
                        const [startHour, startMinute] = startTime.split(':').map(Number);
                        const [endHour, endMinute] = endTime.split(':').map(Number);
        
                        const targetStartTime = startHour * 60 + startMinute;
                        const targetEndTime = endHour * 60 + endMinute;
                        const nowTime = globalDate.getHours() * 60 + globalDate.getMinutes();
                        alert(`${nowTime} and ${targetStartTime} and ${targetEndTime}`);
                        if (nowTime >= targetStartTime && nowTime < targetEndTime) {
                            data.style.backgroundColor = 'yellow';
                        }
                    });
                }
            else if(nowDate > targetDate)
                {
                    targetData.forEach(data=>{
                        data.style.backgroundColor = 'gray';
                        data.style.color = 'white';
                    });
                }
        });
}

function CreateNlinksFromSchedules(){
    const nLinkGroup = document.getElementById('n-links');
    
    schedules.forEach(schedule => {
        const date = schedule.textContent.trim();
        const e_nlink = document.createElement('n-link');
        e_nlink.textContent = date;
        
        e_nlink.addEventListener('click', function(){
            schedule.scrollIntoView({behavior: 'smooth', block: 'start'});
        });
        
        nLinkGroup.appendChild(e_nlink);
    });
}

function RealTimeClock(){
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    timer.innerText = `${year}년 ${month}월 ${day}일 ${hour}:${minute}:${second}`;
}

function TotalCostCalculation(tables){
    tables.forEach(table => {
        const costElements = table.querySelectorAll('.t-cost'); 
        let totalCost = 0;
        costElements.forEach(e => {
            totalCost += parseInt(e.textContent.replace(/[^0-9]/g, '')) || 0; 
        });
        const totalCostElement = table.querySelector('#totalCost');
        totalCostElement.textContent = '계: ' + formatCurrency(totalCost); 
    });
}

function SetWidthByCost(costs, costsWidth){
    costs.forEach(e => {
        const originalValue = e.textContent;
        const formattedValue = formatCurrency(e.textContent);
        if(!isNaN(parseInt(originalValue))){
            e.textContent = formattedValue;
        }
        if (costsWidth < e.scrollWidth){
            costsWidth = e.scrollWidth;
        } 
    });
    costs.forEach(e=>e.style.width = costsWidth + 'px');
}

function SetWidth(attribute, attributeWidth){
    attribute.forEach(e => {
        if (attributeWidth < e.scrollWidth){
            attributeWidth = e.scrollWidth;
        } 
    });
    attribute.forEach(e=> e.style.width = attributeWidth + 'px');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
        minimumFractionDigits: 0, 
    }).format(amount);
}