
//validacija razmak
$.validator.methods.range = function (value, element, param) {
    var globalizedValue = value.replace(".", "");
    return this.optional(element) || (globalizedValue >= param[0] && globalizedValue <= param[1]);
};

//validacija decimalnog broja
$.validator.methods.number = function (value, element) {
    var globalizedValue = value.replace(".", "");
    console.log("Globalvalue: " + globalizedValue + ", value: " + value);
    return this.optional(element) || /^[+-]?(\d*\,)?\d+$/.test(globalizedValue);
};

//validacija email-a
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}