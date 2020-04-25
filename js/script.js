
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
    
    timeid.textContent = "Numbers last updated: " + timeobj[0] + ", " + timeobj[1].split(".")[0];
    console.log(obj);
    var labels = [];
    var data=[];
    obj.data.forEach(element => {
       labels.push(element.day.split("2020-")[1]);
       data.push(element.summary.total);

    });
    let statedict = {};
    let h=0;
    const temp = today.regional;

    temp.forEach(elem => {
        statedict[elem.loc] = elem.totalConfirmed;
       
    })

    console.log(statedict);
    const items = Object.keys(statedict).map(function(key) {
        return [key, statedict[key]];
    });
      
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    statedict = {};
    items.forEach(elem=>{
        if(elem[1]>10)
        statedict[elem[0]]=elem[1];
    })
    console.log(statedict);
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
            responsive: true,
            elements: {
                point:{
                    radius: 3
                }
            },
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let curr =  tooltipItem.yLabel;
                        return curr;
                        
                    },
                    afterLabel: function(tooltipItem, data) {
                        let prevIndex = tooltipItem.index-1;
                        let curr =  tooltipItem.yLabel;
                        let prev = prevIndex>=0?data.datasets[0].data[prevIndex]:curr;
                        
                        let incr = curr-prev;
                        let label = "(+" + incr + ")";

                        console.log(label);
                        console.log(incr);
                        return label;
                    }
                }
            },
            scales: {
                xAxes:[{
                    ticks: {
                        display:true,
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
                    //     color: "rgba(0, 0, 0, 0.5)",
                    //     drawBorder: true,
                    // },
                }]
            }
        }

    });
    
    var ctx2 = document.getElementById('state');
    var myBarChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: Object.keys(statedict),
            datasets: [{
                label: '',
                data: Object.keys(statedict).map(function (key) 
                        { 
                           return statedict[key]; 
                        }),
                borderWidth: 1,
                backgroundColor: 'rgba(0, 148, 255, 0.3)' ,
            }]
        },
        options: {
            responsive: true,
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
                        display:true,
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
                    //     color: "rgba(0, 0, 0, 0.5)",
                    //     drawBorder: true,
                    // },
                }]
            }
        }

    });
    

}

request.send();

// request.open('GET', 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise', true);
// request.onload = function() {
//     const obj = JSON.parse(this.response)
//     console.log(obj);
    
//     // values = [1,65,8,98,689,12,33,2,3,789];
//     // var topValues = values.sort((a,b) => b-a).slice(0,5);
//     // console.log(topValues); // [ 1, 2, 3, 8, 12 ]



//     // var ctx = document.getElementById('state');
//     // var myChart = new Chart(ctx, {
//     //     type: 'doughnut',
//     // data: {
//     //     datasets: [{
//     //         data: [
//     //            3, 4,5,2,3,4
//     //         ],
//     //         backgroundColor: [
//     //             'rgba(255, 99, 132, 1)',
//     //             'rgba(54, 162, 235, 1)',
//     //             'rgba(255, 206, 86, 1)',
//     //             'rgba(75, 192, 192, 1)',
//     //             'rgba(153, 102, 255, 1)',
//     //             'rgba(255, 159, 64, 1)'
//     //         ],
//     //         label: 'Dataset 1'
//     //     }],
//     //     labels: [
//     //         'Red',
//     //         'Orange',
//     //         'Yellow',
//     //         'Green',
//     //         'Blue'
//     //     ]
//     // },
//     // options: {
//     //     responsive: true,
//     //     legend: {
//     //         display: false
            
//     //     },
//     //     animation: {
//     //         animateScale: true,
//     //         animateRotate: true
//     //     }
//     // }
//     // });
// }

// request.send();