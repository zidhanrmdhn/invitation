function getWishesSheet_(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("Bind this script to the Google Sheet first.");
  let sheet = ss.getSheetByName("Friend Wishes");
  if (!sheet){
    sheet = ss.insertSheet("Friend Wishes");
    sheet.appendRow(["Waktu", "Nama", "Pesan"]);
  }
  return sheet;
}

function doGet(e){
  const params = (e && e.parameter) || {};
  const callback = String(params.callback || "");
  if (!/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)){
    return ContentService.createTextOutput("Invalid callback");
  }
  const sheet = getWishesSheet_();
  const lastRow = sheet.getLastRow();
  let wishes = [];
  if (lastRow > 1){
    wishes = sheet.getRange(2, 1, lastRow - 1, 3).getDisplayValues()
      .filter(row => row[1] && row[2])
      .map(row => ({ name: row[1], message: row[2] }))
      .reverse();
  }
  const result = { ok: true, wishes: wishes };
  return ContentService.createTextOutput(callback + "(" + JSON.stringify(result) + ");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(e){
  try{
    const params = (e && e.parameter) || {};
    const data = JSON.parse(params.payload || "{}");
    const name = String(data.name || "").trim().slice(0, 60);
    const message = String(data.message || "").trim().slice(0, 500);
    if (!name || !message) throw new Error("Nama dan pesan wajib diisi.");
    getWishesSheet_().appendRow([new Date(), name, message]);
    return ContentService.createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (error){
    return ContentService.createTextOutput("ERROR: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}