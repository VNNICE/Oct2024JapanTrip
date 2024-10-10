window.onload = function()
{
    const places = document.querySelectorAll('.t-place');
    const sTimes = document.querySelectorAll('.t-sTime');
    const fTimes = document.querySelectorAll('.t-fTime');
    const summaries = document.querySelectorAll('.t-summary');
    const costs = document.querySelectorAll('.t-cost');
    const tables = document.querySelectorAll('.table');
    
    let placeWidth = 0;
    let sTimeWidth = 0;
    let fTimeWidth = 0;
    let summariesWidth = 0;
    let costsWidth = 0;
    
    SetWidth(places, placeWidth);
    SetWidth(sTimes, sTimeWidth);
    SetWidth(fTimes, fTimeWidth);
    SetWidth(summaries, summariesWidth);
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

    let tableMinWidth = placeWidth + sTimeWidth + fTimeWidth + sTimeWidth + costsWidth + 300;
    tables.forEach(e=>e.style.minWidth = tableMinWidth + 'px');
    tables.forEach(table => {
        const costElements = table.querySelectorAll('.t-cost'); 
        let totalCost = 0;
        costElements.forEach(e => {
            totalCost += parseInt(e.textContent.replace(/[^0-9]/g, '')) || 0; 
        });
        const totalCostElement = table.querySelector('#totalCost');
        totalCostElement.textContent = '계: ' + formatCurrency(totalCost); 
    });
};

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