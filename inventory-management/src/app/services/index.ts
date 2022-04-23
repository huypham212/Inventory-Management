import { formatDate } from '@angular/common';

export const getDateString = (datetime: number) => {

    var datetimeString = formatDate(new Date(datetime * 1000), "dd/MM/yyyy hh:mm:ss a", "en-US", "GMT+07:00");

    var arrDatetime = datetimeString.split(" ");

    arrDatetime.forEach(element => {
        if (arrDatetime.indexOf(element) === 2) {
            if (element == "PM") {
                arrDatetime[2] = "CH";
            }
            else {
                arrDatetime[2] = "SA";
            }
        }
    })

    console.log(datetimeString, arrDatetime);
    return arrDatetime[0] + " " + arrDatetime[1] + " " + arrDatetime[2];

}