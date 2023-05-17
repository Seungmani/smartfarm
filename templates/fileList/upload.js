// Excel class 불러오기
import { Excel } from '/templates/JS/excel_show.mjs';

const $spreadsheet = document.querySelector('#spreadsheet')
const $file_drag = document.querySelector('#file_drag'); // 파일 drag 
const $file_input = document.querySelector('#file_input'); // 파일 선택 
const $file_icon = document.querySelector('#file_icon'); // 엑셀 icon 
const $file_name = document.querySelector('#file_name'); // 파일 이름

const $cancel = document.querySelector('#cancel'); // dialog 닫기(취소)
const $confirm = document.querySelector('#confirm'); // dialog 닫기(확인)
const $upload = document.querySelector('#upload'); // dialog 열기
const dialog = document.querySelector('dialog'); // dialog 창

// 팝업 창 보여주기
$upload.addEventListener('click', () => {
    dialog.showModal();
})

let data; // 데이터

$file_input.addEventListener('change', (event) => {
    // 파일 읽기
    let selectedFile = event.target.files[0];
    let reader = new FileReader();

    $file_icon.style.display = 'none'; // 파일 이미지 숨김
    $file_drag.style.display = 'none'; // 파일 input 숨김
    $file_name.value = selectedFile.name;

    reader.onload = function (evt) { // excel to Json
        let resultData = evt.target.result; // reader.result

        //바이너리 형태로 엑셀파일을 읽는다.
        let workbook = XLSX.read(resultData, { type: 'binary' });
        //엑셀파일의 시트 정보를 읽어서 JSON 형태로 변환한다. sheet 하나만 가져옴
        let ex_data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);

        data = new Excel(ex_data, $spreadsheet);
    }

    reader.onerror = function (event) { //  읽기 동작에 에러가 생길 때마다 발생합니다.
        console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsBinaryString(selectedFile); // 이걸 읽고 onload 실행?
});

// drag in 확인
$file_drag.addEventListener('dragenter', function (e) {
    e.preventDefault();
    this.style.backgroundColor = '#999';
});

// drag out 확인
$file_drag.addEventListener('dragleave', function (e) {
    e.preventDefault();
    this.style.backgroundColor = '';
});

// drag로 파일 올리기
$file_drag.addEventListener('drop', (event) => {
    // 파일 읽기
    let selectedFile = event.dataTransfer.files[0];
    let reader = new FileReader();

    $file_icon.style.display = 'none'; // 파일 이미지 숨김
    $file_drag.style.display = 'none'; // 파일 input 숨김
    $spreadsheet.style.backgroundColor = '';
    $file_name.value = selectedFile.name;

    reader.onload = function (evt) { // excel to Json
        let resultData = evt.target.result; // reader.result

        //바이너리 형태로 엑셀파일을 읽는다.
        let workbook = XLSX.read(resultData, { type: 'binary' });
        //엑셀파일의 시트 정보를 읽어서 JSON 형태로 변환한다. sheet 하나만 가져옴
        let ex_data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);

        data = new Excel(ex_data, $spreadsheet);
    }

    reader.onerror = function (event) { //  읽기 동작에 에러가 생길 때마다 발생합니다.
        console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsBinaryString(selectedFile); // 이걸 읽고 onload 실행?
});

///////////// 값 초기화 하기

$cancel.addEventListener('click', () => {
    dialog.close();
})

$confirm.addEventListener('click', () => {
    // ajax로 저장 후 html 초기화

    dialog.close();
    $spreadsheet.textContent = "";
    $file_icon.style.display = 'block'; // 파일 이미지 보여줌
    $file_drag.style.display = 'block'; // 파일 input 보여줌
})