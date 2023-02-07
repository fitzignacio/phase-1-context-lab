const createEmployeeRecord = function (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function (arrayOfArrays) {
    return arrayOfArrays.map(function (array) {
        return createEmployeeRecord(array)
    })
}

const createTimeInEvent = function (timeInString) {
    let date = timeInString.slice(0, 10)
    let hour = +timeInString.slice(11)
    this.timeInEvents.push({ type: "TimeIn", date: date, hour: hour })
    return this
}

const createTimeOutEvent = function (timeOutString) {
    let date = timeOutString.slice(0, 10)
    let hour = +timeOutString.slice(11)
    this.timeOutEvents.push({ type: "TimeOut", date: date, hour: hour })
    return this
}

const hoursWorkedOnDate = function (date) {
    let inEvents = this.timeInEvents.filter(function (e) {
        return e.date === date
    })
    let outEvents = this.timeOutEvents.filter(function (e) {
        return e.date === date
    })
    let totalHours = 0
    for (let i = 0; i < inEvents.length; i++) {
        totalHours += outEvents[i].hour - inEvents[i].hour
    }
    return totalHours / 100
}

const wagesEarnedOnDate = function (date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    const payable = eligibleDates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate.call(this, d)
    }, 0)
    return payable
}

const findEmployeeByFirstName = function (collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString)
}

const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce((memo, employee) => {
        return memo + allWagesFor.call(employee)
    }, 0)
}
