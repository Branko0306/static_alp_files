//sortiranje decimalnog broja sa zarezom 1234,04
$.extend(jQuery.fn.dataTableExt.oSort, {
    "numeric-comma-pre": function (a) {

        a = a.replace(".", "");
        a = a.replace(",", ".");
        var x = (a == "-") ? 0 : a;
        return parseFloat(x);
    },

    "numeric-comma-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "numeric-comma-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

//sortiranje currency polja tipa 10.345,56 kn
$.extend(jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function (a) {

        a = a.replace(".", "");
        a = a.replace(",", ".");
        a = (a === "-") ? 0 : a.replace(/[^\d\-\.]/g, "");

        return parseFloat(a);
    },

    "currency-asc": function (a, b) {
        return a - b;
    },

    "currency-desc": function (a, b) {
        return b - a;
    }
});

//sortiranje stupca tipa mjesec godina 10/2017
$.extend(jQuery.fn.dataTableExt.oSort, {
    "stringMonthYear-pre": function (s) {
        var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

        var dateComponents = s.split("/");
        dateComponents[0] = dateComponents[0].replace(",", "");
        dateComponents[1] = jQuery.trim(dateComponents[1]);

        var year = dateComponents[1];

        var month = 0;
        for (var i = 0; i < months.length; i++) {
            if (months[i].toLowerCase() == dateComponents[0].toLowerCase().substring(0, 1)) {
                month = i;
                break;
            }
            if (months[i].toLowerCase() == dateComponents[0].toLowerCase().substring(0, 2)) {
                month = i;
                break;
            }
        }

        return new Date(year, month, 1);
    },

    "stringMonthYear-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "stringMonthYear-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

//sortiranje polja tipa 1/2015
$.extend(jQuery.fn.dataTableExt.oSort, {
    "numberYear-pre": function (s) {

        var components = s.split("/");
        components[0] = components[0].replace(",", "");
        components[1] = jQuery.trim(components[1]);

        var number = components[0];
        var year = components[1];

        return parseInt(year) + parseInt(number);
    },

    "numberYear-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "numberYear-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

//sortiranje polja tipa 2023/123
$.extend(jQuery.fn.dataTableExt.oSort, {
    "yearNumber-pre": function (s) {

        if (s === '')
            return 0;

        var components = s.split("/");
        components[0] = components[0].replace(",", "");
        components[1] = jQuery.trim(components[1]);

        var year = components[0];
        var number = components[1];

        return parseInt(year) + parseInt(number);
    },

    "yearNumber-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "yearNumber-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

// Custom sortiranje za checkbox
$.fn.dataTable.ext.order['dom-checkbox'] = function (settings, col) {
    return this.api().column(col, { order: 'index' }).nodes().map(function (td, i) {
        return $('input[type="checkbox"]', td).prop('checked') ? 0 : 1;
    });
};

//sortiranje polja tipa date 1.12.2017 15:30:12 ( dd.mm.yyyy. HH:mm:ss)
$.extend(jQuery.fn.dataTableExt.oSort, {
    "date-pre": function (a) {

        if ($.trim(a) !== '') {

            var frDatea = $.trim(a).split(' ');

            var frDatea2 = frDatea[0].split('.');

            var frTimea = '';
            if (frDatea.length > 1)
                frTimea = frDatea[1].split(':');

            var year = frDatea2[2];
            var month = frDatea2[1];
            var day = frDatea2[0];


            var hour = 0;
            var minute = 0;
            var sec = 0;

            if (frTimea !== '') {
                hour = frTimea[0];
                minute = frTimea[1];
                sec = frTimea[2];
            }

            if (frDatea[2] === 'PM')
                hour = parseInt(hour) + 12;


            var datum = new Date(parseInt(year), parseInt(month - 1), parseInt(day), parseInt(hour), parseInt(minute), parseInt(sec), 0);
            return datum;
        } else {
            return new Date(2100, 1, 1, 0, 0, 0);
        }
    },

    "date-asc": function (a, b) {
        var dateA = new Date(a);
        var dateB = new Date(b);
        return (dateA < dateB) ? -1 : ((dateA > dateB) ? 1 : 0);
    },

    "date-desc": function (a, b) {
        var dateA = new Date(a);
        var dateB = new Date(b);
        return (dateA < dateB) ? 1 : ((dateA > dateB) ? -1 : 0);
    }
});


//prepoznavanje currency polja
(function () {

    var validChars = "0123456789" + ".-,'" + " kn";

    // Init the regex just once for speed - it is "closure locked"
    var
        str = jQuery.fn.dataTableExt.oApi._fnEscapeRegex(validChars),
        re = new RegExp('[^' + str + ']');

    jQuery.fn.dataTableExt.aTypes.unshift(
        function (data) {
            if (typeof data !== 'string' || re.test(data)) {
                return null;
            }

            return 'currency';
        }
    );

}());

//prepoznavanje decimalnog broja
jQuery.fn.dataTableExt.aTypes.unshift(
    function (sData) {

        if (sData === '') {
            return 'numeric-comma';
        }

        var sValidChars = "0123456789,.";
        var Char;
        var bDecimal = false;
        var iStart = 0;

        sData = sData.replace(".", "");
        sData = sData.replace(",", ".");

        /* Negative sign is valid -  the number check start point */
        if (sData.charAt(0) === '-') {
            iStart = 1;
        }

        /* Check the numeric part */
        for (i = iStart; i < sData.length; i++) {
            Char = sData.charAt(i);
            if (sValidChars.indexOf(Char) == -1) {
                return null;
            }
        }

        return 'numeric-comma';
    }
);

//prepoznavanje datumskog polja (dd.mm.yyyy HH:mm:ss)
jQuery.fn.dataTableExt.aTypes.unshift(
    function (sData) {

        const regexDateTime = /^\d{1,2}.\d{1,2}.\d{4}. \d{1,2}:\d{1,2}:\d{1,2}$/;
        const regexDate = /^\d{1,2}.\d{1,2}.\d{4}.$/;
        let m;

        var isDate = null;

        if (sData === '') {
            isDate = 'date';
        }

        if ((m = regexDateTime.exec(sData)) !== null) {
            isDate = 'date';
        }

        if ((m = regexDate.exec(sData)) !== null) {
            isDate = 'date';
        }

        return isDate;
    }
);

//prepoznavanje 2023/123
jQuery.fn.dataTableExt.aTypes.unshift(
    function (sData) {

        let regex = /^.*([A-Za-z0-9]+(\/[A-Za-z0-9]+)+).*$/i;
        if (regex.test(sData)) {
            return true;
        }

        return '';
    }
);



jQuery.fn.dataTableExt.oApi.fnFilterClear = function (oSettings) {
    var i, iLen;

    /* Remove global filter */
    oSettings.oPreviousSearch.sSearch = "";

    /* Remove the text of the global filter in the input boxes */
    if (typeof oSettings.aanFeatures.f != 'undefined') {
        var n = oSettings.aanFeatures.f;
        for (i = 0, iLen = n.length; i < iLen; i++) {
            $('input', n[i]).val('');
        }
    }

    /* Remove the search text for the column filters - NOTE - if you have input boxes for these
     * filters, these will need to be reset
     */
    for (i = 0, iLen = oSettings.aoPreSearchCols.length; i < iLen; i++) {
        oSettings.aoPreSearchCols[i].sSearch = "";
    }

    /* Redraw */
    oSettings.oApi._fnReDraw(oSettings);
};