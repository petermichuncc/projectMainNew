// Meteor.subscribe('parts-to-access', function () {
//     var test = Parts.find({workcenter: '304A'}).fetch();
//     console.log(test[0].cavitation);
// });

//console.log("Getting a single entry: "+ Parts.find().count() );

var start_time = moment().hour(7).format("YYYY-MM-DD hh:mm:ss.SSS");
console.log(start_time);


Template.job.helpers({
    calculateTime: function () {
        //calculate the amount of time needed for the job
        var estimatedTime = (partStats.partsPlanned / partStats.cavities) * partStats.partCycleTime;
        return displayHours = moment().startOf('day').seconds(estimatedTime).format('H:mm:ss');
    },
    currentTime: function () {
        Meteor.call("getCurrentTime", {
            onResultRecieved: function (err, result) {
                console.log("RESULT: " + result);
            }
        });
    },
    incomingCycles: function () {
        //grab all cycles from today
        Meteor.subscribe('cycles-recent', partStats.startTime);
        return (100 * partStats.cavities);
    },
    partsPlanned: function () {
        return partStats.partsPlanned;
    },
    partNumber: function () {
         return partStats.partNumber;
    },
    earnedHours: function () {
        var earnedHoursCalc = (1 * partStats.cavities) / partStats.partsPlanned;
        return earnedHoursCalc;
    },
    parts: function() {
    return Parts.find();
   },
   columns: function() {
     // the context is a part
     var result = _.values(this.data);
     result.unshift(this.text);
     return result;
}
});
