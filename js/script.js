
datax = [[15, 3, 11, 2, 3,2,1],[5, 13, 11, 2, 13,2,1],[5, 3, 11, 2, 13,12,1],[15, 3, 1, 2, 13,2,11],[3, 13, 11, 2, 3,5,1]]
bg = ['rgb(250, 219, 216 )','rgb(214, 234, 248)','rgb(212, 239, 223 )','rgb(252, 243, 207)','rgb(232, 218, 239)'];
bgx = ['rgb(203, 67, 53)','rgb(46, 134, 193)','rgb(34, 153, 84 )','rgb(212, 172, 13)','rgb(125, 60, 152)'];
var i=0;
// const cards = document.querySelectorAll('.card');
// cards.forEach(c => {
//     c.style.color = bgx[i];
//     i+=1;
// });
// i=0;
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
