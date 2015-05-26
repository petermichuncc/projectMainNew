// Helper for the parts template that feeds it data
Meteor.subscribe('parts');
Meteor.subscribe('PressCycles');
  start_time = moment().format("YYYY-MM-DD hh:mm:ss.SSS");
  console.log("This is the current time "+ start_time);
 //var start_time = Parts.findOne().timeStamp;
// console.log("This is the time stamp " +moment().Parts.find().timeStamp.format("YYYY-MM-DD hh:mm:ss.SSS"));

console.log(start_time);
// console.log("This is your cavitation" +Parts.findOne().cavitation);

Template.job.helpers({
  calculateTime: function () {
         //calculate the amount of time needed for the job
         estimatedTime = (Parts.findOne().quantity / Parts.findOne().cavitation) *"23";
         displayHours = moment().seconds(estimatedTime).format("YYYY-MM-DD hh:mm:ss.SSS");
         console.log("This is the display hours time"+ displayHours);
         return displayHours;

     },
  parts: function() {
    return Parts.find();
   },
   columns: function() {
     // the context is a part
     var result = _.values(this.data);
     result.unshift(this.text);
     return result;
   },
   earnedHours: function () {
        var earnedHoursCalc = ((Cycles.find({PressNumber: '1'}, {sort: {CycleTimeStamp: -1}}).count()) * Parts.findOne().cavitation) / Parts.findOne().quantity;
        earnedHoursCalc = earnedHoursCalc.toFixed(2);
        return earnedHoursCalc;
        
    },
     incomingCycles: function () {
        //grab all cycles from today
    if (moment().format("YYYY-MM-DD hh:mm:ss.SSS") < displayHours) {
         Meteor.subscribe('cycles-recent', start_time);
     }
        return (Cycles.find({PressNumber: '1'}, {sort: {CycleTimeStamp: -1}}).count()) * Parts.findOne().cavitation ;
        console.log("This is the cycles find"+Cycles.find({PressNumber: '1'}, {sort: {CycleTimeStamp: -1}}).count());
    },
    
    returnTimeStamp: function () {
        //calculate the amount of time needed for the job
        var timeStamp = parts.findOne().timeStamp;
        return timeStamp;
   
    }

});


// var partStats = {
//     workcenterName: Machines.findOne().machinenumber,
//      partNumber: Parts.findOne().partnumber,
//      partCycleTime: "23",
//      partsPlanned: Parts.findOne().quantity,
//      cavities: Parts.findOne().cavitation,
//      tech: Parts.findOne().initials,
//      startTime: start_time
//  };




















// Meteor.subscribe('parts-to-access', function () {
//     var test = Parts.find({workcenter: '304A'}).fetch();
//     console.log(test[0].cavitation);
// });
// Meteor.subscribe('PressCycles');
// //console.log("Getting a single entry: "+ Parts.find().count() );

// var start_time = moment().hour(7).format("YYYY-MM-DD hh:mm:ss.SSS");
// console.log(start_time);


// Template.job.helpers({
//     calculateTime: function () {
//         //calculate the amount of time needed for the job
//         var estimatedTime = (partStats.partsPlanned / partStats.cavities) * partStats.partCycleTime;
//         return displayHours = moment().startOf('day').seconds(estimatedTime).format('H:mm:ss');
//     },
//     currentTime: function () {
//         Meteor.call("getCurrentTime", {
//             onResultRecieved: function (err, result) {
//                 console.log("RESULT: " + result);
//             }
//         });
//     },
//     incomingCycles: function () {
//         //grab all cycles from today
//         Meteor.subscribe('cycles-recent', partStats.startTime);
//         return (100 * partStats.cavities);
//     },
//     partsPlanned: function () {
//         return partStats.partsPlanned;
//     },
//     partNumber: function () {
//          return partStats.partNumber;
//     },
//     earnedHours: function () {
//         var earnedHoursCalc = (1 * partStats.cavities) / partStats.partsPlanned;
//         return earnedHoursCalc;
//     },
//     parts: function() {
//     return Parts.find();
//    },
//    columns: function() {
//      // the context is a part
//      var result = _.values(this.data);
//      result.unshift(this.text);
//      return result;
// }
// });
