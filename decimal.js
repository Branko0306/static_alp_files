
$(function () {
    $(".decimal").keydown(decimalEvent);
    $(".decimal").click(clearIfZero);
});

function clearIfZero(event) { 
    if ($(this).val() === '0' || $(this).val() === '0,000' || $(this).val() === '0,00') {
        $(this).val('');
    }
}

function decimalEvent(event) {
    if (event.shiftKey === true) {
        event.preventDefault();
    } 

    var dozvoli = false;
    if ((event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode === 8 ||
        event.keyCode === 9 ||
        event.keyCode === 37 ||
        event.keyCode === 39 ||
        event.keyCode === 46 || 
        event.keyCode === 110 ||
        event.keyCode === 188) { 
        dozvoli = true;
    } 
     
    
    

    if ($(this).val().length === 0 && (event.keyCode === 109 || event.keyCode === 189)) {
        dozvoli = true;
    }
    
    if ($(this).val().length > 0 && $(this).val().indexOf('-') === -1 && (event.keyCode === 109 || event.keyCode === 189)) {
        $(this).val('-' + $(this).val());
        dozvoli = false;
    }

    if (dozvoli === false) {
        event.preventDefault();
    }

    if ($(this).val().indexOf(',') !== -1 && (event.keyCode === 110 || event.keyCode === 188)) { 
        event.preventDefault();
        return;
    }
}