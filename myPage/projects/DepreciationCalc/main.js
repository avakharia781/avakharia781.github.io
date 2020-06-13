//Declarations:**************************************
var assetCost  = 0;
let salvageVal = 0;
var deprMethod;
var years      = 0;
var row; 
var column;
var depr = 0;
var yearNo = 0;
var openBoolVal = 0;
var accumDepri = 0;
var endingBookVal = 0;
var chartYear = [];
var chartDepr = [];
var myChart;
var table;
var calcDepr   = document.getElementById("calcDepr");
var reset = document.getElementById("reset");

calcDepr.addEventListener('click',calculateDepreciation);
reset.addEventListener('click', resetOutput);

function checkMethod(){
    if(deprMethod = document.getElementById("method").value == 'decBal'){
        document.getElementById("depRate").style.display="inline-block"
        document.getElementById("depRateL").style.display="inline-block"
    }else{
        document.getElementById("depRate").style.display="none"
        document.getElementById("depRateL").style.display="none"        
    }
}

function calculateDepreciation(){
    years = document.getElementById("years").value;
    assetCost = document.getElementById("assetCost").value;
    salvageVal = document.getElementById("salvage").value;
    deprMethod = document.getElementById("method").value;
    if(assetCost < 1000){
        document.getElementById("output").innerHTML = '<h2>Asset Value too Low</h2>'
        document.getElementById("output").style.color = 'red';
    }else if(salvageVal < 200){
        document.getElementById("output").innerHTML = '<h2>Salvage Value too Low</h2>'
        document.getElementById("output").style.color = 'red';
    }else if(years <= 1){
        document.getElementById("output").innerHTML = '<h2>Number of Years has to be more than 1</h2>'
        document.getElementById("output").style.color = 'red';
    }else{
        createTable();
        switch(deprMethod){
        case 'stLine':
            getStraightLineDepr();
            break;
        case 'decBal':
            getDecliningBalDepr();
            break;
        case 'yearDi':
            getYearDigitDepr();
            break;
        };
        event.preventDefault();
        drawChart()
    }
}

function getStraightLineDepr(){
    openBoolVal = assetCost
    for(var i=0; i<years; i++){
        yearNo += 1;
        openBoolVal -= depr;
        depr = (openBoolVal - salvageVal)/(years-i);
        deprPercent = (depr/(openBoolVal-salvageVal))*100;
        accumDepri += depr;
        assetCost -= depr;
        endingBookVal = assetCost;
        
        createTableCells(i+1, yearNo, openBoolVal, deprPercent, depr, accumDepri, endingBookVal)
        addInChartArray(yearNo,depr.toFixed(2));
    }
}


function getDecliningBalDepr(){
    var depFactor = 100/years;
    var deprRate = document.getElementById("depRate").value;
    var flag = false;
    openBoolVal = assetCost;

    for(var i=0; i<years; i++){
        yearNo += 1;
        openBoolVal -= depr;
        deprPercent = depFactor * deprRate;
        depr = (openBoolVal*deprPercent)/100;
        if((openBoolVal - depr) < salvageVal){
            depr = openBoolVal -salvageVal;
            deprPercent = 0;
            flag = true;
        }
        accumDepri += depr;
        assetCost -= depr;
        endingBookVal = assetCost;

        createTableCells(i+1, yearNo, openBoolVal, deprPercent, depr, accumDepri, endingBookVal)
        addInChartArray(yearNo,depr.toFixed(2));
    }

}

function getYearDigitDepr(){
    openBoolVal = assetCost
    var totalLife = 0;
    var depreciableAmnt = assetCost - salvageVal;
    for(var i=1; i<=years; i++){
        totalLife += i;
    }
    for(var i=0; i<years; i++){
        yearNo += 1;
        openBoolVal -= depr;
        deprPercent = ((years-i)/totalLife)*100;
        depr = (depreciableAmnt * deprPercent)/100;
        accumDepri += depr;
        assetCost -= depr;
        endingBookVal = assetCost;
        
        createTableCells(i+1, yearNo, openBoolVal, deprPercent, depr, accumDepri, endingBookVal)
        addInChartArray(yearNo,depr.toFixed(2));
    }
}

function resetOutput(){
    location.reload()
}

function createTable(){
    table = document.createElement("table");
    row = table.insertRow(0);
    column = row.insertCell(0);
    column.innerHTML = 'Year No';
    column = row.insertCell(1);
    column.innerHTML = 'Opening Balance';
    column = row.insertCell(2);
    column.innerHTML = 'Depreciation Percent';
    column = row.insertCell(3);
    column.innerHTML = 'Depreciation Amount';
    column = row.insertCell(4);
    column.innerHTML = 'Accumulated Depreciation';
    column = row.insertCell(5);
    column.innerHTML = 'Ending Balance';
    document.getElementById("output").appendChild(table);
}

function createTableCells(i_rowId,
                          i_yearNo,
                          i_openBoolVal,
                          i_deprPercent,
                          i_depr,
                          i_accumDepri,
                          i_endingBookVal){

    row = table.insertRow(i_rowId);
    column = row.insertCell(0);
    column.innerHTML = i_yearNo;
    column = row.insertCell(1);
    column.innerHTML = i_openBoolVal.toFixed(2);
    column = row.insertCell(2);
    column.innerHTML = i_deprPercent.toFixed(2) +"%";
    column = row.insertCell(3);
    column.innerHTML = i_depr.toFixed(2);
    column = row.insertCell(4);
    column.innerHTML = i_accumDepri.toFixed(2);
    column = row.insertCell(5);
    column.innerHTML = i_endingBookVal.toFixed(2);  
}

function addInChartArray(i_year, i_depr){
    chartYear.push(`Year${i_year}`);
    chartDepr.push(i_depr);
}

function drawChart(){
    myChart = document.getElementById("myChart").getContext('2d');

    let depChart = new Chart(myChart, {
        type: 'pie', //bar, horizontalBar, pie, lines, donughts, polarArea, radar
        data:{
            labels:chartYear,
            datasets:[{
                label:'Depreciation',
                data:chartDepr,
                backgroundColor:[
                '#7aeb17',
                '#17ebba',
                '#175aeb',
                '#d617eb',
                '#eb1768',
                '#fa0505',
                '#eb6117',
                '#ebd217',
                ],
                borderWidth:2,
                borderColor:'#dcdef5',
                hoverBorderWidth:3,
                hoverBorderColor: '#0000'
            }],
        },
        options:{
            padding: {
                left: 100,
                right: 100,
                top: 100,
                bottom: 100
            }
        }
    });

}