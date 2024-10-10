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
    /*
    places.forEach(e => {
        if (placeWidth < e.scrollWidth){
            placeWidth = e.scrollWidth;
        } 
    });
    places.forEach(e=> e.style.width = placeWidth + 'px');
    
    ///
    
    //sTimes
    sTimes.forEach(e => {
        if (sTimeWidth < e.scrollWidth){
            sTimeWidth = e.scrollWidth;
        } 
        
    });
    sTimes.forEach(e=>e.style.width = sTimeWidth + 'px');
    //
    
    //
    fTimes.forEach(e => {
        if (fTimeWidth < e.scrollWidth){
            fTimeWidth = e.scrollWidth;
        } 
    });
    fTimes.forEach(e=>e.style.width = fTimeWidth + 'px');
    ///

    //
    summaries.forEach(e => {
        if (summariesWidth < e.scrollWidth){
            summariesWidth = e.scrollWidth;
        } 
    });
    summaries.forEach(e=>e.style.width = summariesWidth + 'px');
    ///
    */

    //
    costs.forEach(e => {
        e.textContent = formatCurrency(e.textContent);
        if (costsWidth < e.scrollWidth){
            costsWidth = e.scrollWidth;
        } 
    });
    costs.forEach(e=>e.style.width = costsWidth + 'px');
    ///
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