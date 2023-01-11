console.log("Hello Back to School!");
let viz;

//1. Create a variable to store the vizContainer
//2. Create a variable to store the dashboard options
//3. Create a variable to store the URL - if doesn't load, might need to specify height aqnd width
const containerDiv = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  height: "900px",
  width: "1100px",
};
const url =
  "https://public.tableau.com/shared/H73SJ5S87?:display_count=n&:origin=viz_share_link";
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}
document.addEventListener("DOMContentLoaded", initViz);
const exportpdfbutton = document.getElementById("exportPDF");
exportpdfbutton.addEventListener("click", exportPDFfunction);
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
const exportpptbutton = document.getElementById("exportPPT");
exportpptbutton.addEventListener("click", exportPPTfunction);
function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  //need to get active sheet, but this could be a dashboard or worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //inspect the sheets you need to filter
  console.log(sheets);
  //index of the sheets you want to filter
  const sheetToFilter = sheets[1];
  //do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);
