// 라우터에서 가져온 데이터를 웹상으로 띄우기
/**
 * fetch() 함수를 이용하여 라우터에서 넘겨준 데이터를 웹상으로 띄운다
 * 
 * - html과 직접 연결되는 model 역할을 하는 자바스크립트의 경우.
 * node에서 사용하는 require() 함수를 못 사용하므로 html에서 js를 불러오는 cdn 방식 사용하기
 */
window.onload(sendAjax(1));

function sendAjax(btn) {
    console.log("sendAjax()");

    // 데이터 가져오기
    fetch('/data').then((res) => res.json())
    .then((res) => {

        console.log("그래프 실행");
        console.log("가져온 데이터 res:", res);
        // var check = res.resData.core[0];
        // var check = check[0];
        // console.log("데이터 테스트:", check);
        

        // 차트 제목 수정
        var strTitle;
        var dataArray;
        var label;
        if(btn <= 5) { // core1~core5
            strTitle = "Core" + btn + "의 Task별 수행능력";
            dataArray = Object.values(res.resData.core);
            label = ['task1', 'task2', 'task3', 'task4', 'task5'];
        } else { // task1~task5
            btn = btn-5;
            strTitle = "Task" + btn + "의 Core별 수행능력";
            dataArray = Object.values(res.resData.task);
            label = ['core1', 'core2', 'core3', 'core4', 'core5'];
        }
        var title = document.getElementById('title');
        title.textContent = strTitle;
        var row = dataArray[btn-1];
        var data = [];


        console.log("row: ", row);
        // console.log("core:", res.resData.core);
        // console.log("task:", res.resData.task);

        // task1~task5/core1~core5 나눠 저장하기
        for(let i = 1; i <= 5; i++) {
            col = [];
            for(let j = i; j <= row.length; j+=5) {
                col.push(row[j-1]);
            }
            data[i-1] = col;
        }
        console.log("data:", data);

        // 변수
        var maxList = new Array(5).fill(0);
        var minList = new Array(5).fill(10000);
        var avgList = new Array(5).fill(0);
        var stdList = new Array(5).fill(0);
        var devTotal = new Array(5).fill(0);
        var dev = 0;

        MAX(data);
        MIN(data);
        AVG(data);
        STD(data);

        console.log("MAX:", maxList);
        console.log("MIN:", minList);
        console.log("AVG:", avgList);
        console.log("STD:", stdList);

        function MAX(data) { // MAX
            for(let i = 0; i < data.length; i++) { // task1~task5/core1~core5
                maxList[i] = Math.max.apply(null, data[i]);
            }
        }
        function MIN(data) { // MIN
            for(let i = 0; i < data.length; i++) { // task1~task5/core1~core5
                minList[i] = Math.min.apply(null, data[i]);
            }
        }
        function AVG(data) { // AVG
            for(let i = 0; i < data.length; i++) { // task1~task5/core1~core5
                var temp = data[i];
                for(let j = 0; j < data[0].length; j++) {
                    avgList[i] += temp[j];
                }
                avgList[i] /= data[0].length;
            }
        }
        function STD() { // STD
            for(let i = 0; i < data.length; i++) { // task1~task5/core1~core5
                var temp = data[i];
                for(let j = 0; j < temp.length; j++) {
                    dev = temp[j] - avgList[i];
                    devTotal[i] += Math.pow(dev,2);
                }
            }
            for (let i = 0; i < stdList.length; i++) {
                stdList[i] = Math.sqrt(devTotal[i] / data.length);
            }
        }

        // chart.js 그래프 띄우기
        var ctx = document.getElementById('test1').getContext('2d');
        var mychart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    label: 'MAX',
                    fill: false, // 채우기 없음
                    lineTension: 0, // 숫자가 높을 수록 둥글어짐
                    pointRadius: 2, // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgba(108, 241, 255, 1)',
                    borderColor: 'rgba(108, 241, 255, 1)',
                    data: maxList
                }, {
                    label: 'MIN',
                    display: false,
                    fill:false,
                    lineTension: 0,
                    pointRadius: 2,
                    backgroundColor: 'rgba(255, 127, 239, 1)',
                    borderColor: 'rgba(255, 127, 239, 1)',
                    data: minList
                }, {
                    label: 'AVG',
                    display: false,
                    fill:false,
                    lineTension: 0,
                    pointRadius: 2,
                    backgroundColor: 'rgba(44, 255, 94, 1)',
                    borderColor: 'rgba(44, 255, 94, 1)',
                    data: avgList
                }, {
                    label: 'STD',
                    display: false,
                    fill:false,
                    lineTension: 0,
                    pointRadius: 2,
                    backgroundColor: 'rgba(192, 95, 255, 1)',
                    borderColor: 'rgba(192, 95, 255, 1)',
                    data: stdList
                }]
            },
            options: {
                events: ['click'],
                animation: {
                    animateScale: true
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            },
        });

        var ctx = document.getElementById('test2').getContext('2d');
        var mychart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: label,
                datasets: [{
                    label: 'MAX',
                    backgroundColor: 'rgba(108, 241, 255, 0.4)',
                    borderColor: 'rgba(108, 241, 255, 0.8)',
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(108, 241, 255, 1)",
                    data: maxList
                }, {
                    label: 'MIN',
                    backgroundColor: 'rgba(255, 127, 239, 0.4)',
                    borderColor: 'rgba(255, 127, 239, 0.8)',
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(255, 127, 239, 1)",
                    data: minList
                }, {
                    label: 'AVG',
                    backgroundColor: 'rgba(44, 255, 94, 0.4)',
                    borderColor: 'rgba(44, 255, 94, 0.8)',
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(44, 255, 94, 1)",
                    data: avgList
                }, {
                    label: 'STD',
                    backgroundColor: 'rgba(192, 95, 255, 0.4)',
                    borderColor: 'rgba(192, 95, 255, 0.8)',
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(192, 95, 255, 1)",
                    data: stdList
                }]
            },
            options: {
                events: ['click'],
                animation: {
                    animateScale: true
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
            
        });

        var ctx = document.getElementById('test3').getContext('2d');
        var mychart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: label,
                datasets: [{
                    label: 'MAX',
                    fill: false,
                    lineTension: 0, // 숫자가 높을 수록 둥글어짐
                    backgroundColor: 'rgba(108, 241, 255, 0.4)',
                    borderColor: 'rgba(108, 241, 255, 0.8)',
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(108, 241, 255, 1)",
                    data: maxList
                }, {
                    label: 'MIN',
                    fill: false,
                    lineTension: 0, // 숫자가 높을 수록 둥글어짐
                    backgroundColor: 'rgba(255, 127, 239, 0.4)',
                    borderColor: 'rgba(255, 127, 239, 0.8)',
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(255, 127, 239, 1)",
                    data: minList
                }, {
                    label: 'AVG',
                    fill: false,
                    lineTension: 0, // 숫자가 높을 수록 둥글어짐
                    backgroundColor: 'rgba(44, 255, 94, 0.4)',
                    borderColor: 'rgba(44, 255, 94, 0.8)',
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(44, 255, 94, 1)",
                    data: avgList
                }, {
                    label: 'STD',
                    fill: false,
                    lineTension: 0, // 숫자가 높을 수록 둥글어짐
                    backgroundColor: 'rgba(192, 95, 255, 0.4)',
                    borderColor: 'rgba(192, 95, 255, 0.8)',
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(192, 95, 255, 1)",
                    data: stdList
                }]
            },
            options: {
                events: ['click'],
                animation: {
                    animateScale: true
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
            
        });

        var ctx = document.getElementById('test4').getContext('2d');
        var mychart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: label,
                datasets: [{
                    label: 'MAX',
                    backgroundColor: 'rgba(108, 241, 255, 1)',
                    borderColor: 'rgba(108, 241, 255, 1)',
                    data: maxList
                }, {
                    label: 'MIN',
                    backgroundColor: 'rgba(255, 127, 239, 1)',
                    borderColor: 'rgba(255, 127, 239, 1)',
                    data: minList
                }, {
                    label: 'AVG',
                    backgroundColor: 'rgba(44, 255, 94, 1)',
                    borderColor: 'rgba(44, 255, 94, 1)',
                    data: avgList
                }, {
                    label: 'STD',
                    backgroundColor: 'rgba(192, 95, 255, 1)',
                    borderColor: 'rgba(192, 95, 255, 1)',
                    data: stdList
                }]
            },
            options: {
                events: ['click'],
                animation: {
                    animateScale: true
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
            
        });

    })
    .catch((err) => {
        console.log('차트 생성 중 에러 발생: ', err);
    });
}
