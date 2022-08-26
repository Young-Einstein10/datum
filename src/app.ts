import { Data, TableData } from "../utils/types";

const API_URL = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";
const tableBody = document.querySelector("tbody[data-sink]");
const labelText = document.querySelector("label[data-pageview]");
const prevBtn = document.querySelector(
  "button[data-prevbtn]"
) as HTMLButtonElement;
const nextBtn = document.querySelector(
  "button[data-nextbtn]"
) as HTMLButtonElement;

// ================== TABLE STATE =================
let tableData: TableData = {};
let currentPage = 1;
let paging = {
  next: "",
};
// ================== TABLE STATE =================

const updateTableUI = (data: Data[], currentPage: number) => {
  const tableRows = tableBody!.children;

  for (let index = 0; index < tableRows.length; index++) {
    const row = tableRows[index];

    row.setAttribute("data-entryid", data[index].id);
    row.children[0].textContent = `${data[index].row}`;
    row.children[1].className = "text-capitalize";
    row.children[1].textContent = `${data[index].gender}`;
    row.children[2].textContent = `${data[index].age}`;
  }

  labelText!.textContent = `Showing Page ${currentPage}`;

  // === Navigation State ===
  if (currentPage <= 1) {
    prevBtn!.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (!paging.next) {
    nextBtn!.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
  // === Navigation State ===
};

const setTableData = (data) => {
  const { paging: page_details, ...rest } = data.results[0];

  paging = { next: page_details.next };

  tableData = { ...tableData, ...rest };
};

const fetchPageData = async (page = 1) => {
  try {
    const response = await fetch(
      page === 1 ? API_URL : `${API_URL}&page=${page}`
    );

    if (response.ok) {
      const data = await response.json();

      setTableData(data);

      updateTableUI(tableData[page], page);
    }
  } catch (error) {
    console.log(error);
  }
};

const paginate = (type = "next") => {
  if (type === "prev") {
    currentPage--;

    if (tableData[currentPage].length) {
      updateTableUI(tableData[currentPage], currentPage);
    }
  }

  if (type === "next") {
    currentPage++;

    if (tableData[currentPage]) {
      updateTableUI(tableData[currentPage], currentPage);
    } else {
      fetchPageData(currentPage);
    }
  }
};

const startApp = async () => {
  await fetchPageData();

  // ================== Listeners ==================
  prevBtn!.addEventListener("click", () => paginate("prev"));
  nextBtn!.addEventListener("click", () => paginate("next"));
};

document.addEventListener("DOMContentLoaded", startApp);
