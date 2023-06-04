// graph ///////////////////////////////////////////////////////
const $close = document.querySelector('#close'); // dialog 닫기
const dialog = document.querySelector('dialog'); // dialog 창

$close.addEventListener('click', () =>{
    document.querySelector("#myChart").innerHTML = "";
    dialog.close();
})

let lineDraw = (name) =>{
    let showColumnName = name; // 그려줄 열 이름

    let yData =[]; // y축 값 배열
    let xData =[]; // x축 값 배열

    // 저장된 데이터를 불러옴
    let ex_data = JSON.parse(document.getElementById('jsonObject').value);

    // x축 열 이름
    let xColumn = document.querySelector('#x_label').options[document.querySelector('#x_label').selectedIndex].value;

    if(xColumn === "null"){
        alert('x축을 선택해 주세요')
        return;
    }

    for(let i in ex_data){
        xData.push(ex_data[i][xColumn]); // x값
        yData.push(ex_data[i][showColumnName]); // y값
    }


    // 색 지정
    let RGB_1 = Math.floor(Math.random() * (255 + 1));
    let RGB_2 = Math.floor(Math.random() * (255 + 1));
    let RGB_3 = Math.floor(Math.random() * (255 + 1));

    const draw_data = [{
        label: showColumnName, // 데이터의 제목
        borderColor: 'rgba(' + RGB_1 + ',' + RGB_2 + ',' + RGB_3 + ',0.7)', // 색상
        data: yData, // 데이터
        pointStyle: false,
    }]

    const labels = xData;

    // 데이터
    const showData = {
        labels: labels,
        datasets: draw_data,
    };

    // 설정 값
    const config = {
        type: 'line', // 그래프 종류
        data: showData, // 데이터
        options: {
            elements: { // 그래프 pointer 작게 만들어 잘 안보이게 함
                point: {
                    borderWidth: 0,
                    radius: 1,
                    backgroundColor: 'rgba(0,0,0,0)'
                }
            },
            responsive: true, // false=그래프 크기를 css를 이용 지정 가능
            display: 'true',
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: true,
                    // type: 'logarithmic',
                }],
                xAxes: [{
                    barThickness: 10,
                    gridLines: {
                        display: false
                    },
                    offset: true
                }],
            }
        }
    }

    let chart = new Chart(document.getElementById('myChart'), config);
    dialog.showModal();
}
