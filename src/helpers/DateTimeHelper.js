function currentDateTimeString() {
    const currentDateTime = new Date();

    const currentDateTimeString = `${currentDateTime.getUTCFullYear()}${currentDateTime.getUTCMonth()}${currentDateTime.getUTCDate()}${currentDateTime.getUTCHours()}${currentDateTime.getUTCMinutes()}${currentDateTime.getUTCSeconds()}${currentDateTime.getUTCMilliseconds()}`;

    return currentDateTimeString;
}

const DateTimeHelper = {
    currentDateTimeString: currentDateTimeString,
};

export { DateTimeHelper };
