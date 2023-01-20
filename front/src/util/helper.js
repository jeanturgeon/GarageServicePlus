// Convertir un nombre de minutes (p. ex. 105) au string de type time correspondant ("01:45") 
export function convertToTypeTime(totalMinutes) {
    let minutes = parseInt(totalMinutes) % 60;
    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    } else {
        minutes = minutes.toString();
    }

    let hours = parseInt(totalMinutes - minutes) / 60;
    if (hours < 10) {
        hours = "0" + hours.toString();
    } else {
        hours = hours.toString();
    }

    let convertedDuration = hours + ":" + minutes;
    return convertedDuration;
}

// Convertir un string de type time (p. ex. "01:45") au nombre de minutes correspondant (105)
export function convertToMinutes(timeString) {
    if (timeString === "") {
        timeString = "00:00";
    }
    let convertedTime = parseInt(timeString.slice(0, timeString.indexOf(":"))) * 60 + parseInt(timeString.slice(timeString.indexOf(":") + 1));
    return convertedTime;
}

// Calculer l'heure de fin selon l'heure de début en type time et la durée en minutes
export function calculateEndTime(startTimeInTypeTime, durationInMinutes) {
    let startTimeInMinutes = convertToMinutes(startTimeInTypeTime);
    let endTimeInMinutes = parseInt(startTimeInMinutes) + parseInt(durationInMinutes);
    let endTimeInTypeTime = convertToTypeTime(endTimeInMinutes);
    return endTimeInTypeTime;
}

// Obtenir le deuxième prochain lundi si workdayDigit  = 0, deuxième prochain mardi si workdayDigit = 1, etc. (inspiré de : https://bobbyhadz.com/blog/javascript-get-date-of-next-monday)
export function getSecondNextMonday(workdayDigit, date = new Date()) {
    const dateCopy = new Date(date.getTime());
  
    const nextMonday = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + (((7 - dateCopy.getDay() + 1) % 7) + 7 + workdayDigit || 14 + workdayDigit),
      ),
    );
  
    return nextMonday;
  }