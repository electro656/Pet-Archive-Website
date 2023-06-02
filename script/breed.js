"use strict";

const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// TASK 3 : Chức năng: Quản lý Breed

const submitBtn = document.getElementById("submit-btn");

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");

let breedArr = getFromStorage("breedArr");
let catBreedName = getFromStorage("catBreedName");
let dogBreedName = getFromStorage("dogBreedName");
// console.log(breedArr);

const renderBreedTable = function (breedArr) {
  const tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  catBreedName = [];
  dogBreedName = [];

  for (let i = 0; i < breedArr.length; i++) {
    let row = document.createElement("tr");

    row.innerHTML = `<tr class="pet-row">
    <th class="id-cell" scope="row">${breedArr.indexOf(breedArr[i]) + 1}</th>
    <td class="breed-cell">${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>
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
    if (breedArr[i].type == "Cat") {
      catBreedName.push(breedArr[i].breed);
      saveToStorage("catBreedName", catBreedName);
    } else if (breedArr[i].type == "Dog") {
      dogBreedName.push(breedArr[i].breed);
      saveToStorage("dogBreedName", dogBreedName);
    }
  }
};

renderBreedTable(breedArr);

submitBtn.addEventListener("click", function () {
  const breedData = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  if (breedInput.value === "") alert(`Please input for Breed`);
  if (typeInput.value === "Select Type") alert(`Please select Type!`);
  if (
    catBreedName.includes(breedData.breed) &&
    dogBreedName.includes(breedData.breed)
  )
    alert(`Breed name of each type must be unique`);

  const clearInput = function () {
    typeInput.value = "Select Type";
    breedInput.value = "";
  };

  clearInput();

  const validateBreedData = function (dataArray) {
    if (
      dataArray.type !== "Select Type" &&
      dataArray.breed !== "" &&
      (!catBreedName.includes(dataArray.breed) ||
        !dogBreedName.includes(dataArray.breed))
    ) {
      return true;
    } else {
      return false;
    }
  };

  if (validateBreedData(breedData)) {
    console.log(`Validation successful! Row added.`);
    breedArr.push(breedData);
    saveToStorage("breedArr", breedArr);
    clearInput();
    renderBreedTable(getFromStorage("breedArr"));
  } else {
    console.log(`Failed validation!`);
  }
});

function deleteRow(r) {
  if (confirm("Are you sure?")) {
    // Delete the row
    const row = r.parentNode.parentNode.rowIndex;
    // console.log("hereis ", row);
    document.getElementById("breedTable").deleteRow(row);
    // saveToStorage("breedArr", breedArr);

    let searchRowID = r.parentNode.previousElementSibling;
    // console.log(searchRowID);
    // console.log(searchRowID.textContent);
    let breedIndex;
    let catBreedIndex;
    let dogBreedIndex;
    while (searchRowID) {
      if (searchRowID.classList.contains("breed-cell")) {
        // Remove breed from breedArr
        breedIndex = breedArr.findIndex(
          (item) =>
            item.breed === searchRowID.textContent &&
            item.type === searchRowID.nextElementSibling.textContent
        );

        if (breedIndex !== -1) {
          breedArr.splice(breedIndex, 1);
          saveToStorage("breedArr", breedArr);
        }

        // Remove a cat breed name from catBreedName
        if (searchRowID.nextElementSibling.textContent === "Cat") {
          console.log(searchRowID.nextElementSibling.textContent);

          catBreedIndex = catBreedName.findIndex(
            (item) => item === searchRowID.textContent
          );
          // console.log(catBreedIndex);

          if (catBreedIndex !== -1) {
            catBreedName.splice(catBreedIndex, 1);
            saveToStorage("catBreedName", catBreedName);
          }

          // Remove a dog breed name from dogBreedName
        } else if (searchRowID.nextElementSibling.textContent === "Dog") {
          dogBreedIndex = dogBreedName.findIndex(
            (item) => item === searchRowID.textContent
          );
          // console.log(dogBreedIndex);

          if (dogBreedIndex !== -1) {
            dogBreedName.splice(dogBreedIndex, 1);
            saveToStorage("dogBreedName", dogBreedName);
          }
        }
        break;
      }
      searchRowID = searchRowID.previousElementSibling;
    }
  }
}
