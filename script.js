const places = document.querySelectorAll('.t-place');
const sTimes = document.querySelectorAll('.t-sTime');
const fTimes = document.querySelectorAll('.t-fTime');
const summaries = document.querySelectorAll('.t-summary');
const costs = document.querySelectorAll('.t-cost');
const tables = document.querySelectorAll('.table');
const today = document.querySelector('.today');
const nLink = document.querySelectorAll('n-link');
const schedules = document.querySelectorAll('.schedule');

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
};

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
    today.innerText = `${year}년 ${month}월 ${day}일 ${hour}:${minute}:${second}`;
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