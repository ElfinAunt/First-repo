function responsive() {
    if (window.screen.width<400) {
        document.getElementsByClassName("status_display")[0].style.border = "none";
        document.getElementsByClassName("status_display")[0].style.width = "auto";

    }
    else{

        document.getElementsByClassName("status_display")[0].style.border = "";
        document.getElementsByClassName("status_display")[0].style.width = "";
    }
}
responsive();
window.onresize = ()=>{
    responsive();
    getMoistureReadings();
}
let watering_duration = 5000;
let watering_interval = 86400000;
let milliseconds;
window.onload = ()=>{
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/get_interval_and_duration_values")
    xhttp.send();
    xhttp.onload=(values)=>{
        values = values.target.response;
        values = values.substring(values.indexOf("|")+1,values.indexOf("\n")).split(",");
        let interval_options = document.getElementsByClassName("Interval_menu")[0].options;
        let duration_options = document.getElementsByClassName("Duration_menu")[0].options;
        for(let i = 0; i<interval_options.length;i++){
            if (interval_options[i].value == Number(values[1])){
                document.getElementsByClassName("Interval_menu")[0].selectedIndex = i;
                watering_interval =  Number(values[1]);
            }  
        }
        for(let i = 0;i<duration_options.length;i++){
            if (duration_options[i].value == Number(values[0])){
                document.getElementsByClassName("Duration_menu")[0].selectedIndex = i;
                watering_duration = Number(values[0]);
            }  
        }
        // getTimeRemaining();
    }
}


function getMoistureReadings(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET","/get_moisture_readings")
    xhttp.send();
    xhttp.onload = (moisture_readings)=>{
        let readings = moisture_readings.target.response.substring(0,moisture_readings.target.response.indexOf('\n'));        
        document.getElementsByClassName("moisture_readings")[0].getElementsByTagName("label")[1].innerText = readings+"%";
    }
}
function waterPlant(){
    document.getElementsByClassName("Water_Plant")[0].disabled = true;
    console.log(`giving water for ${watering_duration}s`);
    // setTimeout(()=>{
    //     document.getElementsByClassName("Water_Plant")[0].disabled = '';
    // },Number(watering_duration)+1500);
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",`/water_plant:${watering_duration}|`);
    xhttp.send();
    xhttp.onload = (status)=>{
        document.getElementsByClassName("Water_Plant")[0].disabled = '';
        console.log("watering done");
    }
}

document.getElementsByClassName("Interval_menu")[0].onchange = (selected_interval)=>{
    watering_interval = selected_interval.target.value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",`/change_watering_interval:${watering_interval}|`)
    xhttp.send()
    xhttp.onload = ()=>{
        console.log("changed watering interval ");
    }
}
document.getElementsByClassName("Duration_menu")[0].onchange = (selected_duration)=>{
    watering_duration = selected_duration.target.value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",`/change_watering_duration:${watering_duration}|`)
    xhttp.send()
    xhttp.onload = ()=>{
        console.log("changed watering duration ");
    }
}

// function getTimeRemaining(){
//     let xhttp = new XMLHttpRequest();
//     xhttp.open("GET",`/get_time_remaining`)
//     xhttp.send()
//     xhttp.onload = (milliseconds)=>{
//         milliseconds = milliseconds.target.response;
//         milliseconds = milliseconds.substring(milliseconds.indexOf("|")+1,milliseconds.indexOf("\n"))
//         console.log(milliseconds);
//         milliseconds = Number(milliseconds);
//         // msToHMS(milliseconds)
//     }
// }
// function msToHMS(milliseconds) {
//     let totalSeconds = milliseconds / 1000;
//     let hours = Math.floor(totalSeconds / 3600);
//     let minutes = Math.floor((totalSeconds % 3600) / 60);
//     let seconds = (totalSeconds % 60).toFixed(2);
//     console.log(`${hours}h ${minutes}m ${seconds}s`);
//     milliseconds-=1
//     // return `${hours}h ${minutes}m ${seconds}s`;
// }

// setInterval(()=>{
//     let totalSeconds = milliseconds / 1000;
//     let hours = Math.floor(totalSeconds / 3600);
//     let minutes = Math.floor((totalSeconds % 3600) / 60);
//     let seconds = (totalSeconds % 60).toFixed(2);
//     console.log(`${hours}h ${minutes}m ${seconds}s`);
//     milliseconds-=1
// },1000)

// if(time_remaining<=0){
//     getTimeRemaining();
// }








