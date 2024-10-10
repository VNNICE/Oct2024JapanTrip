window.onload = function()
{
    const places = document.querySelectorAll('.t-place');
    const sTimes = document.querySelectorAll('.t-sTime');
    const fTimes = document.querySelectorAll('.t-fTime');
    const summaries = document.querySelectorAll('.t-summary');
    const costs = document.querySelectorAll('.t-cost');
    
    let placeWidth = 0;
    let sTimeWidth = 0;
    let fTimeWidth = 0;
    let summariesWidth = 0;
    let costsWidth = 0;
    
    //Place
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
    //
    costs.forEach(e => {
        if (costsWidth < e.scrollWidth){
            costsWidth = e.scrollWidth;
        } 
    });
    costs.forEach(e=>e.style.width = costsWidth + 'px');
    ///
};