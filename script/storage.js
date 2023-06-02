"use strict";

// TASK 2. Lưu dữ liệu dưới LocalStorage

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultValue = "[]") {
  return JSON.parse(localStorage.getItem(key) ?? defaultValue);
}

// getFromStorage("name");

// console.log(getFromStorage("gname"));
