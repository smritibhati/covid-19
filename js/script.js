
datax = [[15, 3, 11, 2, 3,2,1],[5, 13, 11, 2, 13,2,1],[5, 3, 11, 2, 13,12,1],[15, 3, 1, 2, 13,2,11],[3, 13, 11, 2, 3,5,1]]
bg = ['rgb(250, 219, 216 )','rgb(214, 234, 248)','rgb(212, 239, 223 )','rgb(252, 243, 207)','rgb(232, 218, 239)'];
bgx = ['rgb(203, 67, 53)','rgb(46, 134, 193)','rgb(34, 153, 84 )','rgb(212, 172, 13)','rgb(125, 60, 152)'];
var i=0;
const charts = document.querySelectorAll('canvas');
charts.forEach(ctx => {
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', ''],
            datasets: [{
                label: '',
                data: datax[i],
                backgroundColor: [
                    bg[i]
                ],
                borderColor: [
                   
                    bgx[i]
                ],
                borderWidth: 2
            }]
        },
        options: {
            elements: {
                point:{
                    radius: 0
                }
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        display:false,
                        color: "rgba(0, 0, 0, 0)",
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        display:false,
                        color: "rgba(0, 0, 0, 0)",
                        drawBorder: false,
                    },
                  }]
            }
        }  
    });
    i=i+1;
});


var request = new XMLHttpRequest();

request.open('GET', 'https://api.rootnet.in/covid19-in/stats/history', true);


request.onload = function() {
    const obj = JSON.parse(this.response)
    const len = obj.data.length;
    const today = obj.data[len-1];
    const hist = obj.data[len-2];
   
    const tsum = today.summary;
    const hsum = hist.summary;
    const cards = [ tsum.total, tsum.total - hsum.total , tsum.deaths,  tsum.deaths - hsum.deaths, tsum.discharged];
    const cardtxts = document.querySelectorAll('.card-text');
    cardtxts.forEach((el,index) => {
       el.textContent =  cards[index];
    });
    
    const timeid = document.querySelector('#time');
    const timeobj = obj.lastRefreshed.split("T");
    
    timeid.textContent = "Statistics updated at " + timeobj[0] + ", " + timeobj[1].split(".")[0];
    console.log(obj);
    var labels = [];
    var data=[];
    obj.data.forEach(element => {
       labels.push(element.day.split("2020-")[1]);
       data.push(element.summary.total);
    });
    console.log(data.slice(-11,0));
    var ctx = document.getElementById('history');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.slice(len-11,len),
            datasets: [{
                label: '',
                data: data.slice(len-11,len),
                
                borderColor: [
                    'rgba(0, 148, 255, 1)',
                ],
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            elements: {
                point:{
                    radius: 3
                }
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes:[{
                    ticks: {
                        display:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        drawBorder: false,
                    }
                    }
                ],
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    // gridLines: {
                    //     color: "rgba(0, 0, 0, 0)",
                    //     drawBorder: false,
                    // },
                }]
            }
        }

    });

    var ctx = document.getElementById('state');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.slice(len-11,len),
            datasets: [{
                label: '',
                data: data.slice(len-11,len),
                
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            elements: {
                point:{
                    radius: 0
                }
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes:[{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        drawBorder: false,
                    }
                    }
                ],
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        drawBorder: false,
                    },
                }]
            }
        }

    });
}

request.send();
