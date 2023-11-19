import Excel from "../JS/excel_show.mjs";
import { Loading, CloseLoading } from "../JS/loading.mjs";

const $spreadsheet = document.querySelector("#spreadsheet");
const $fileUploadDrag = document.querySelector("#fileUploadDrag");
const $fileUploadInput = document.querySelector("#fileUploadInput");
const $fileIcon = document.querySelector("#fileIcon");
const $fileName = document.querySelector("#fileName");
const $uploadFile = document.querySelector("#uploadFile");

let selectedFile;

function fileSetting() {
  $fileIcon.style.display = "none";
  $fileUploadDrag.style.display = "none";
  $spreadsheet.style["align-items"] = "start";
  $fileName.value = selectedFile.name.replace(/\s/g, "_");
}

function showFileContent(fileContent) {
  const workbook = XLSX.read(fileContent, { type: "binary" });
  const sheetData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
  new Excel(sheetData.slice(0, 100), $spreadsheet);
  CloseLoading();
}

function readFileContent(file, callback) {
  const reader = new FileReader();
  Loading();

  reader.onload = function (event) {
    callback(event.target.result);
  };

  reader.onerror = function (event) {
    console.error(event.target.error);
    CloseLoading();
  };

  reader.readAsBinaryString(file);
}

$fileUploadInput.addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
  if (!selectedFile) {
    return;
  }
  $spreadsheet.innerHTML = "";
  showFile();
});

$fileUploadDrag.addEventListener("dragenter", (event) => {
  event.preventDefault();
  $fileUploadDrag.style.backgroundColor = "#999";
});

$fileUploadDrag.addEventListener("dragleave", (event) => {
  event.preventDefault();
  $fileUploadDrag.style.backgroundColor = "";
});

$fileUploadDrag.addEventListener("drop", (event) => {
  event.preventDefault();
  selectedFile = event.dataTransfer.files[0];
  showFile();
});

function showFile() {
  fileSetting();
  readFileContent(selectedFile, showFileContent);
}

$uploadFile.addEventListener("click", () => {
  $spreadsheet.textContent = "";
  $fileIcon.style.display = "block";
  $fileUploadDrag.style.display = "block";
});
