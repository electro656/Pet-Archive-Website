"use strict";

const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// 7. (Nâng cao) Chức năng Import/Export dữ liệu

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
let fileInput = document.getElementById("input-file");
let petArr = getFromStorage("petArr");

exportBtn.addEventListener("click", function () {
  const dataInput = petArr;
  const dataJs = new Blob([JSON.stringify(dataInput)], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(dataJs, "petData.json");
});

let dataStr;
let petImport;

function readAndSaveFile(e) {
  dataStr = e.target.result;
  petImport = JSON.parse(dataStr);
  console.log("Imported new pet data:", petImport);

  if (petArr.length === 0) {
    // If petArr is empty, add new data
    for (let i in petImport) {
      petArr.push(petImport[i]);
    }
    console.log("Data imported!");
  } else if (petArr.length !== 0) {
    // If petArr is not empty, replace old data with new data that has same ID and add new ones with new ID
  }
  saveToStorage("petArr", petArr);
}

function importFile(e) {
  // If there's no file, do nothing
  if (!fileInput.value.length) return;

  // Create a new FileReader() object
  let reader = new FileReader();

  // Setup the callback event to run when the file is read
  reader.onload = readAndSaveFile;

  // Read the file
  reader.readAsText(fileInput.files[0]);
}

importBtn.addEventListener("click", importFile);
