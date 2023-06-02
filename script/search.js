"use strict";

const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

let petArr = getFromStorage("petArr");
let healthyPetArr = getFromStorage("healthyPetArr");
let breedArr = getFromStorage("breedArr");
let searchArr;
let option;

const findBtn = document.getElementById("find-btn");

const breedNameArr = [];

for (let i = 0; i < breedArr.length; i++) {
  if (!breedNameArr.includes(breedArr[i].breed)) {
    breedNameArr.push(breedArr[i].breed);
  }
}

const renderBreedOptions = function (arr) {
  // console.log(breedSelect);
  breedInput.innerHTML = `<option>Select Type</option>`;
  for (let i = 0; i < arr.length; i++) {
    option = document.createElement("option");
    option.innerHTML = `<option>${arr[i]}</option>`;
    breedInput.appendChild(option);
  }
};

renderBreedOptions(breedNameArr);

const renderTableSearch = function (petArray) {
  const tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = ""; // Xóa bỏ các dòng trong table trên trang web

  for (let i = 0; i < petArray.length; i++) {
    let row = document.createElement("tr");

    row.innerHTML = `<tr class="pet-row">
    <th class="id-cell" scope="row">${petArray[i].id}</th>
      <td>${petArray[i].name}</td>
      <td>${petArray[i].age}</td>
      <td>${petArray[i].type}</td>
      <td>${petArray[i].weight} kg</td>
      <td>${petArray[i].length} cm</td>
      <td>${petArray[i].breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${petArray[i].color}"></i>
      </td>
      <td><i class="bi ${
        petArray[i].vaccinated === false
          ? "bi-x-circle-fill"
          : "bi-check-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        petArray[i].dewormed === false
          ? "bi-x-circle-fill"
          : "bi-check-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        petArray[i].sterilized === false
          ? "bi-x-circle-fill"
          : "bi-check-circle-fill"
      }"></i></td>
      <td>${petArray[i].date}</td>
      
   </tr>`;
    tableBodyEl.appendChild(row);
  }
};

renderTableSearch(petArr);

findBtn.addEventListener("click", function () {
  searchArr = petArr;
  if (idInput.value) {
    searchArr = searchArr.filter((obj) => obj.id.includes(idInput.value));
  }
  if (nameInput.value) {
    searchArr = searchArr.filter((obj) => obj.name.includes(nameInput.value));
  }
  if (typeInput.value !== "Select Type") {
    searchArr = searchArr.filter((obj) => obj.type === typeInput.value);
  }
  if (breedInput.value !== "Select Type") {
    searchArr = searchArr.filter((obj) => obj.breed === breedInput.value);
  }
  if (vaccinatedInput.checked) {
    searchArr = searchArr.filter(
      (obj) => obj.vaccinated === vaccinatedInput.checked
    );
  }
  if (dewormedInput.checked) {
    searchArr = searchArr.filter(
      (obj) => obj.dewormed === dewormedInput.checked
    );
  }
  if (sterilizedInput.checked) {
    searchArr = searchArr.filter(
      (obj) => obj.sterilized === sterilizedInput.checked
    );
  }
  renderTableSearch(searchArr);
  // console.log(searchArr);
});
