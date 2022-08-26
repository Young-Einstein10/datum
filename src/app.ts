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

// ================== ROW TEMPLATE ==================
const getTableRow = ({ id, row, gender, age }: Data) => `
    <tr data-entryid="${id}">
        <td>${row}</td>
        <td class="text-capitalize">${gender}</td>
        <td>${age}</td>
    </tr>
`;
// ================== ROW TEMPLATE ==================

let tableData: TableData = {};
let currentPage = 1;
let paging = {
  next: "",
};

const updateTableUI = (data, currentPage) => {
  const rowString = data.map((row) => getTableRow(row));

  tableBody!.innerHTML = rowString.join(" ");
  labelText!.innerHTML = `Showing Page ${currentPage}`;

  // ================== Navigation ==================
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
  // ================== Navigation ==================
};

const setTableData = (data) => {
  const { paging: page_details, ...rest } = data.results[0];

  paging = { next: page_details.next };

  tableData = { ...tableData, ...rest };
};

const startApp = async () => {
  await fetchPageData();

  // ================== Listeners ==================
  prevBtn!.addEventListener("click", () => paginate("prev"));
  nextBtn!.addEventListener("click", () => paginate("next"));

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

document.addEventListener("DOMContentLoaded", startApp);
