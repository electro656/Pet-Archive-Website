"use strict";

// TASK 1. Bổ sung Animation cho Sidebar

const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// Bổ sung code từ Assignment 1

const submitBtn = document.getElementById("submit-btn");
const healthBtn = document.getElementById("healthy-btn");
// const bmiBtn = document.getElementById("bmi-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

let petArr = getFromStorage("petArr");

let healthyCheck = false;
let healthyPetArr = getFromStorage("healthyPetArr");
// console.log(petArr);

// saveToStorage("petArr", JSON.stringify(["3", "4", "5"]));
// const nulled = localStorage.getItem([]);
// console.log(JSON.parse([]) ?? []);

let petBMIS = document.querySelectorAll(".BMI-number");

let idArr = getFromStorage("idArr");
// idArr.push("P001", "P002");

const rowArray = [];

// const petP001 = {
//   id: "P001",
//   name: "Tom",
//   age: 3,
//   type: "Cat",
//   weight: 5,
//   length: 50,
//   color: "red",
//   breed: "Tabby",
//   vaccinated: true,
//   dewormed: true,
//   sterilized: true,
//   BMI: "?",
//   date: "01/03/2022",
// };

// const petP002 = {
//   id: "P002",
//   name: "Tyke",
//   age: 5,
//   type: "Dog",
//   weight: 3,
//   length: 40,
//   color: "green",
//   breed: "Mixed Breed",
//   vaccinated: false,
//   dewormed: false,
//   sterilized: false,
//   BMI: "?",
//   date: "02/03/2022",
// };

// petArr.push(petP001);
// petArr.push(petP002);

// TASK 5. Hiển thị danh sách thú cưng
const renderTableData = function (petArray) {
  const tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = ""; // Xóa bỏ các dòng trong table trên trang web
  idArr = [];

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
      <td>
        <button
          type="button"
          class="btn btn-danger"
          value="Delete"
          onclick="deleteRow(this)"
        >
          Delete
        </button>
     </td>
   </tr>`;
    tableBodyEl.appendChild(row);
    idArr.push(petArray[i].id);
    saveToStorage("idArr", idArr);
  }
};

let dataDate = new Date();

// TASK 1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // TASK 2. Lấy được dữ liệu từ các Input Form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    BMI: "?",
    date: `${dataDate.getDate()}/${
      dataDate.getMonth() + 1
    }/${dataDate.getFullYear()}`,
    date2: new Date(),
  };

  // TASK 3. Validate dữ liệu hợp lệ

  if (idInput.value === "") alert(`Please input for id`);
  if (nameInput.value === "") alert(`Please input for name`);
  if (ageInput.value === "") alert(`Please input for age`);
  if (typeInput.value === "Select Type") alert(`Please select Type!`);
  if (weightInput.value === "") alert(`Please input for weight`);
  if (lengthInput.value === "") alert(`Please input for length`);
  if (breedInput.value === "Select Type") alert(`Please select Breed!`);

  if (idArr.includes(data.id)) alert("ID must be unique!");

  if (ageInput.value < 1 || ageInput.value > 15)
    alert("Age must be a number between 1 and 15!");

  if (weightInput.value < 1 || weightInput.value > 15)
    alert("Weight must be a number between 1 and 15!");

  if (lengthInput.value < 1 || lengthInput.value > 100)
    alert("Length must be a number between 1 and 100!");

  // TASK 6. Xóa các dữ liệu vừa nhập trên Form

  const clearInput = function () {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    breedInput.value = "Select Type";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  };

  const validateData = function (dataArray) {
    if (
      dataArray.id !== "" &&
      !idArr.includes(dataArray.id) &&
      dataArray.name !== "" &&
      dataArray.age !== "" &&
      dataArray.age >= 1 &&
      dataArray.age <= 15 &&
      dataArray.type !== "Select Type" &&
      dataArray.weight !== "" &&
      dataArray.weight >= 1 &&
      dataArray.weight <= 15 &&
      dataArray.length !== "" &&
      dataArray.length >= 1 &&
      dataArray.length <= 100 &&
      dataArray.breed !== "Select Type"
    ) {
      return true;
    } else {
      return false;
    }
  };

  // TASK 4. Thêm thú cưng vào danh sách

  const validate = validateData(data);

  if (validate) {
    console.log(`Validation successful! Row added.`);
    petArr.push(data);
    saveToStorage("petArr", petArr);

    if (data.vaccinated && data.dewormed && data.sterilized) {
      healthyPetArr.push(data);
      saveToStorage("healthyPetArr", healthyPetArr);
    }

    if (healthyCheck === false) {
      renderTableData(getFromStorage("petArr"));
    } else if (healthyCheck === true) {
      renderTableData(getFromStorage("healthyPetArr"));
    }
    clearInput();
  } else {
    console.log(`Failed validation!`);
  }
});

renderTableData(getFromStorage("petArr"));

// console.log(petArr);
// console.log(getFromStorage("petArr"));

// TASK 8. Hiển thị các thú cưng khỏe mạnh

// healthyPetArr.push(petP001);

const petRow = document.querySelectorAll(".pet-row");

healthBtn.addEventListener("click", function () {
  healthyCheck = healthyCheck === false ? true : false;

  if (healthyCheck === true) {
    healthBtn.textContent = "Show All Pet";
    renderTableData(healthyPetArr);
  } else if (healthyCheck === false) {
    healthBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
});

// TASK 7. Xóa một thú cưng

function deleteRow(r) {
  if (confirm("Are you sure?")) {
    // Delete the row
    const row = r.parentNode.parentNode.rowIndex;
    console.log("row number:", row);

    document.getElementById("petTable").deleteRow(row);

    let searchRowID = r.parentNode.previousElementSibling;
    console.log(searchRowID.textContent);
    let idIndex;
    let petIndex;
    let healthyPetIndex;
    while (searchRowID) {
      if (searchRowID.classList.contains("id-cell")) {
        console.log(searchRowID.innerHTML);
        // Delete the ID of the row within the idArr to make the id unique again, thus allows user to re-enter the id without alert
        idIndex = idArr.indexOf(searchRowID.textContent);
        console.log(idIndex);

        if (idIndex !== -1) {
          idArr.splice(idIndex, 1);
          saveToStorage("idArr", idArr);
        }

        // Delete the object of the petArr and healthyPetArr on Delete click to make sure they don't appear on screen when press on Show Healthy/All Pet
        petIndex = petArr.findIndex(
          (item) => item.id === searchRowID.textContent
        );
        console.log(petIndex);
        if (petIndex !== -1) {
          petArr.splice(petIndex, 1);
          saveToStorage("petArr", petArr);
        }

        healthyPetIndex = healthyPetArr.findIndex(
          (item) => item.id === searchRowID.textContent
        );
        console.log(healthyPetIndex);
        if (healthyPetIndex !== -1) {
          healthyPetArr.splice(healthyPetIndex, 1);
          saveToStorage("healthyPetArr", healthyPetArr);
        }
        break;
      }
      searchRowID = searchRowID.previousElementSibling;
    }
  }
}

// TASK 4 (Asm 2): Hiển thị Breed trong màn hình quản lý thú cưng
let option;
const breedArr = getFromStorage("breedArr");

const catBreedName = breedArr
  .filter((item) => item.type === "Cat")
  .map((item) => item.breed);

const dogBreedName = breedArr
  .filter((item) => item.type === "Dog")
  .map((item) => item.breed);

const breedNameArr = [];

for (let i = 0; i < breedArr.length; i++) {
  breedNameArr.push(breedArr[i].breed);
}

const testing = function () {
  if (document.getElementById("input-type").value == "Cat") {
    return `Cat options: ${option.innerHTML}`;
  } else if (document.getElementById("input-type").value == "Dog") {
    return `Dog options: ${option.innerHTML}`;
  } else {
    return `All options: ${option.innerHTML}`;
  }
};

const renderBreedOptions = function (arr) {
  breedInput.innerHTML = `<option>Select Type</option>`;
  for (let i = 0; i < arr.length; i++) {
    option = document.createElement("option");
    option.innerHTML = `<option>${arr[i]}</option>`;
    breedInput.appendChild(option);
  }
};

renderBreedOptions(breedNameArr);

const changeOptions = function () {
  const type = document.getElementById("input-type").value;
  if (type == "Cat") {
    renderBreedOptions(catBreedName);
  } else if (type == "Dog") {
    renderBreedOptions(dogBreedName);
  } else {
    renderBreedOptions(breedNameArr);
  }
};
