"use strict";

const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

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
const submitBtn = document.getElementById("submit-btn");

const editForm = document.getElementById("main");
// console.log(editForm);

let petArr = getFromStorage("petArr");
let healthyPetArr = getFromStorage("healthyPetArr");
let healthyId = healthyPetArr.map((obj) => obj.id);

let dataDate = new Date();

let rowId;

const renderTableEdit = function (petArray) {
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
        <td>
        <button
        type="button"
        class="btn btn-warning"
        value="Edit"
        onclick="startEditPet(this)"
        >
        Edit
        </button>
        </td>
        </tr>`;
    tableBodyEl.appendChild(row);
  }
};

renderTableEdit(petArr);

let option;
const breedArr = getFromStorage("breedArr");

const catBreedName = breedArr
  .filter((item) => item.type === "Cat")
  .map((item) => item.breed);

const dogBreedName = breedArr
  .filter((item) => item.type === "Dog")
  .map((item) => item.breed);

// const breedNameArr = catBreedName.concat(dogBreedName);

const breedNameArr = [];

for (let i = 0; i < breedArr.length; i++) {
  breedNameArr.push(breedArr[i].breed);
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

const changeOptions = function () {
  if (typeInput.value == "Cat") {
    renderBreedOptions(catBreedName);
  } else if (typeInput.value == "Dog") {
    renderBreedOptions(dogBreedName);
  } else {
    renderBreedOptions(breedNameArr);
  }
};

const alertSubmit1 = function () {
  if (idInput.value === "") alert(`Please input for id`);
  if (nameInput.value === "") alert(`Please input for name`);
  if (ageInput.value === "") alert(`Please input for age`);
  if (typeInput.value === "Select Type") alert(`Please select Type!`);
  if (weightInput.value === "") alert(`Please input for weight`);
  if (lengthInput.value === "") alert(`Please input for length`);
  if (breedInput.value === "Select Type") alert(`Please select Breed!`);
};

const alertSubmit2 = function () {
  if (ageInput.value < 1 || ageInput.value > 15)
    alert("Age must be a number between 1 and 15!");

  if (weightInput.value < 1 || weightInput.value > 15)
    alert("Weight must be a number between 1 and 15!");

  if (lengthInput.value < 1 || lengthInput.value > 100)
    alert("Length must be a number between 1 and 100!");
};

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

const submit = function () {
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

  alertSubmit1();
  alertSubmit2();

  if (validateData(data)) {
    // Find and update the object data in petArr and save to localStorage

    const petObjIndex = petArr.findIndex((obj) => obj.id === rowId.innerHTML);
    const petObjUpdate = petArr[petObjIndex];
    petObjUpdate.name = data.name;
    petObjUpdate.age = data.age;
    petObjUpdate.type = data.type;
    petObjUpdate.weight = data.weight;
    petObjUpdate.length = data.length;
    petObjUpdate.color = data.color;
    petObjUpdate.breed = data.breed;
    petObjUpdate.vaccinated = data.vaccinated;
    petObjUpdate.dewormed = data.dewormed;
    petObjUpdate.sterilized = data.sterilized;
    petObjUpdate.date = data.date;

    if (
      data.vaccinated === true &&
      data.dewormed === true &&
      data.sterilized === true
    ) {
      if (!healthyId.includes(data.id)) {
        healthyPetArr.push(petObjUpdate);
        saveToStorage("healthyPetArr", healthyPetArr);
        healthyId = healthyPetArr.map((obj) => obj.id);
        console.log(healthyId);
      }

      console.log(`Healthy pet:`);
      console.log(petObjUpdate);
      console.log(healthyPetArr);
    } else {
      const healthyPetObjIndex = healthyPetArr.findIndex(
        (obj) => obj.id === rowId.innerHTML
      );
      const healthyPetObjUpdate = healthyPetArr[healthyPetObjIndex];
      if (healthyPetObjUpdate !== -1 && healthyId.includes(rowId.innerHTML)) {
        const hIndex = healthyPetArr.indexOf(healthyPetObjUpdate);
        healthyPetArr.splice(hIndex, 1);
        saveToStorage("healthyPetArr", healthyPetArr);
        healthyId = healthyPetArr.map((obj) => obj.id);
        console.log(healthyId);
      }

      console.log(healthyPetArr);
      // if (healthyId.includes(rowId.innerHTML)) {
      // }
      // healthyPetArr.splice(petObjIndex, 1);
      // saveToStorage("healthyPetArr", healthyPetArr);
      // healthyId = healthyPetArr.map((obj) => obj.id);
      // console.log(healthyId);
    }

    saveToStorage("petArr", petArr);
    renderTableEdit(petArr);

    /////////////////////////
    /////////////////////////

    console.log(`Validation successful! Row updated.`);
    document.getElementById("container-form").classList.add("hide");
    // clearInput();
  } else {
    console.log(`Failed validation!`);
  }
};

// TASK 5 (Asm 2): Chức năng: Edit

const startEditPet = function (petId) {
  document.getElementById("container-form").classList.remove("hide");
  // let rowId =
  //   petId.parentNode.previousElementSibling.previousElementSibling
  //     .previousElementSibling.previousElementSibling.previousElementSibling
  //     .previousElementSibling.previousElementSibling.previousElementSibling
  //     .previousElementSibling.previousElementSibling.previousElementSibling
  //     .previousElementSibling;
  // console.log(rowId.innerHTML);

  rowId = petId.parentNode.previousElementSibling;
  while (rowId) {
    if (rowId.classList.contains("id-cell")) {
      // console.log(rowId.innerHTML);
      for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id === rowId.innerHTML) {
          // console.log(petArr[i]);
          idInput.value = petArr[i].id;
          nameInput.value = petArr[i].name;
          ageInput.value = petArr[i].age;
          typeInput.value = petArr[i].type;
          weightInput.value = petArr[i].weight;
          lengthInput.value = petArr[i].length;
          colorInput.value = petArr[i].color;
          if (petArr[i].type === "Cat") {
            renderBreedOptions(catBreedName);
            breedInput.value = petArr[i].breed;
          } else if (petArr[i].type === "Dog") {
            renderBreedOptions(dogBreedName);
            breedInput.value = petArr[i].breed;
          }
          vaccinatedInput.checked = petArr[i].vaccinated;
          dewormedInput.checked = petArr[i].dewormed;
          sterilizedInput.checked = petArr[i].sterilized;

          // Submit and update the row
          submitBtn.addEventListener("click", submit);
        }
      }
      break;
    }
    rowId = rowId.previousElementSibling;
  }
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
