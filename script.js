var submit = document.getElementById("submit");
var string =
  "Afghanistan - AF,Åland Islands - AX,Albania - AL,Algeria - DZ,American Samoa - AS,Andorra - AD,Angola - AO,Anguilla - AI,Antarctica - AQ,Antigua and Barbuda - AG,Argentina - AR,Armenia - AM,Aruba - AW,Australia - AU,Austria - AT,Azerbaijan - AZ,Bahamas - BS,Bahrain - BH,Bangladesh - BD,Barbados - BB,Belarus - BY,Belgium - BE,Belize - BZ,Benin - BJ,Bermuda - BM,Bhutan - BT,Bolivia - BO,Bosnia and Herzegovina - BA,Botswana - BW,Bouvet Island - BV,Brazil - BR,British Indian Ocean Territory - IO,Brunei Darussalam - BN,Bulgaria - BG,Burkina Faso - BF,Burundi - BI,Cabo Verde - CV,Cambodia - KH,Cameroon - CM,Canada - CA,Cayman Islands - KY,Central African Republic - CF,Chad - TD,Chile - CL,China - CN,Christmas Island - CX,Cocos - CC,Colombia - CO,Comoros - KM,Congo - CD,Congo - CG,Cook Islands - CK,Costa Rica - CR,Côte dIvoire -CI,Croatia - HR,Cuba - CU,Curaçao - CW,Cyprus - CY,Czechia - CZ,Denmark - DK,Djibouti - DJ,Dominica - DM,Dominican Republic - DO,Ecuador - EC,Egypt - EG,El Salvador - SV,Equatorial Guinea - GQ,Eritrea - ER,Estonia - EE,Eswatini - SZ,Ethiopia - ET,Falkland Islands - FK,Faroe Islands - FO,Fiji - FJ,Finland - FI,France- FR,French Guiana - GF,French Polynesia - PF,French Southern Territories - TF,Gabon - GA,Gambia - GM,Georgia - GE,Germany - DE,Ghana - GH,Gibraltar - GI,Greece - GR,Greenland - GL,Grenada - GD,Guadeloupe - GP,Guam - GU,Guatemala - GT,Guernsey - GG,Guinea - GN,Guinea Bissau - GW,Guyana - GY,Haiti - HT,Heard Island and McDonald Islands - HM,Holy - VA,Honduras - HN,Hong Kong - HK,Hungary - HU,Iceland - IS,India - IN,Indonesia - ID,Iran - IR,Iraq - IQ,Ireland - IE,Isle of Man - IM,Israel - IL,Italy - IT,Jamaica - JM,Japan - JP,Jersey - JE,Jordan - JO,Kazakhstan - KZ,Kenya - KE,Kiribati - KI,Korea - KP,Korea - KR ,Kuwait - KW ,Kyrgyzstan - KG,Latvia - LV, Lebanon - LB, Lesotho - LS, Liberia - LR, Libya - LY, Liechtenstein - LI, Lithuania - LT, Luxembourg - LU, Macao - MO, North Macedonia - MK, Madagascar - MG, Malawi - MW, Malaysia - MY, Maldives - MV, Mali - ML, Malta - MT, Marshall Islands - MH, Martinique - MQ, Mauritania - MR, Mauritius - MU, Mayotte - YT, Mexico - MX, Micronesia - FM, Moldova - MD, Monaco - MC, Mongolia - MN, Montenegro - ME, Montserrat - MS, Morocco - MA, Mozambique - MZ, Myanmar - MM, Namibia - NA, Nauru - NR, Nepal - NP, Netherlands - NL, New Caledonia - NC, New Zealand - NZ, Nicaragua - NI, Niger - NE, Nigeria - NG, Niue - NU, Norfolk Island - NF, Northern Mariana Islands - MP, Norway - NO, Oman - OM, Pakistan - PK, Palau - PW, Palestine - PS, Panama - PA, Papua New Guinea - PG, Paraguay - PY, Peru - PE, Philippines - PH, Pitcair - PN, Poland - PL, Portugal - PT, Puerto Rico - PR, Qatar - QA, Réunion - RE, Romania - RO, Russian Federation - RU, Rwanda - RW, Saint Barthélemy - BL, Saint Kitts and Nevis - KN, Saint Lucia - LC ,Saint Martin - MF, Saint Pierre and Miquelon - PM ,Saint Vincent and the Grenadines - VC ,Samoa - WS ,San Marino - SM, Sao Tome and Principe - ST, Saudi Arabia - SA, Senegal - SN, Serbia - RS ,Seychelles - SC,Sierra Leone - SL, Singapore - SG ,Sint Maarten - SX ,Slovakia - SK, Slovenia - SI ,Solomon Islands - SB ,Somalia - SO ,South Africa - ZA ,South Georgia and the South Sandwich Islands - GS, South Sudan - SS ,Spain - ES ,Sri Lanka - LK, Sudan - SD, Suriname - SR, Sweden - SE, Switzerland - CH ,Syrian Arab Republic - SY ,Taiwan - TW, Tajikistan - TJ, Tanzania - TZ, Thailand - TH, TimoLeste[aa] - TL, Togo - TG, Tokelau - TK, Tonga - TO, Trinidad and Tobago - TT, Tunisia - TN, Turkey - TR, Turkmenistan - TM, Turks and Caicos Islands - TC, Tuvalu - TV, Uganda - UG, Ukraine - UA, United Arab Emirates - AE, United Kingdom of Great Britain and Northern Ireland - GB, United States Minor Outlying Islands - UM, United States of America - US, Uruguay - UY, Uzbekistan - UZ, Vanuatu - VU, Venezuela - VE, Viet Nam - VN, Virgin - VG, Virgin Islands - VI, Wallis and Futuna - WF, Western Sahara - EH, Yemen - YE, Zambia - ZM, Zimbabwe - ZW";
string = string.split(",");
var country = document.getElementById("inputCountry");
var monthData = document.getElementById("monthData");
monthData.style.display = "none";
var yearData = document.getElementById("yearData");
yearData.style.display = "none";
var dayHoliday = document.getElementById("dayHoliday");
var dayDiscription = document.getElementById("dayDiscription");
var dayData = document.getElementById("dayData");
var tableYear = document.getElementById("tableYear");
var tableMonth = document.getElementById("tableMonth");
dayHoliday.textContent = "Welcome To My Page!!!...";
dayDiscription.textContent = "Know the Holidays of your Country in any Year!";

string.forEach(function (a) {
  var option = document.createElement("option");
  option.textContent = a;
  country.append(option);
});

submit.addEventListener("click", function (e) {
  e.preventDefault();
  tableYear.innerHTML = "";
  tableMonth.innerHTML = "";
  dayHoliday.textContent = "";
  dayDiscription.textContent = "";
  getInputData(requestApi, displayData);
});

function getInputData(req, display) {
  var inputCountry = document.getElementById("inputCountry").value;
  var inputDate = document.getElementById("inputDate").value;
  var cCode = getCountryCode(inputCountry);
  var year = getYear(inputDate);
  req(cCode, year, inputDate, display);
}

function getYear(inputDate) {
  var year = inputDate.split("-")[0];

  return year;
}

function getCountryCode(cCode) {
  cCode = cCode.split("-");
  return cCode[1].split(" ")[1];
}

function requestApi(cCode, year, inputDate, display) {
  var res;
  var checkCountryCode;
  var xhr = new XMLHttpRequest();
  var data = getLocalData();
  data = JSON.parse(data);

  if (data != undefined) {
    console.log(data.response.holidays);
    if (data.response.holidays.length > 0) {
      checkCountryCode = data.response.holidays[0].country.id.toUpperCase();
    }
  } else {
    checkCountryCode = null;
  }

  if (
    cCode == checkCountryCode &&
    checkCountryCode !== null &&
    data.response.holidays[0].date.iso.split("-")[0] == year
  ) {
    displayData(inputDate);
  } else {
    alert("request sent");
    var url =
      "https://calendarific.com/api/v2/holidays?api_key=ded5fbb7b291be5ed5a2e120e742e3d9fc57b781&country=" +
      cCode +
      "&year=" +
      year;
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function () {
      res = xhr.response;
      localStorage.clear("res");
      setLocalData(res);
      displayData(inputDate);
    };
  }
}
function setLocalData(data) {
  localStorage.setItem("res", JSON.stringify(data));
}

function getLocalData() {
  try {
    let data = localStorage.getItem("res");
    data = JSON.parse(data);
    return data;
  } catch (err) {
    return undefined;
  }
}

function displayData(date) {
  var data = getLocalData();
  data = JSON.parse(data);
  var buttons = document.getElementById("buttons");

  displayDayData(data, date);
  buttons.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target.id);
    if (e.target.id == "day") {
      displayDayData(data, date);
    }
    if (e.target.id == "month") {
      tableMonth.innerHTML = "";
      displayMonthData(data, date);
    }
    if (e.target.id == "year") {
      tableYear.innerHTML = "";
      displayYearData(data, date);
    }
  });
}

function displayMonthData(data, date) {
  dayData.style.display = "none";
  yearData.style.display = "none";
  monthData.style.display = "unset";
  var month = date.split("-")[1];

  data.response.holidays.forEach(function (a) {
    if (a.date.iso.split("-")[1] == month) {
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      var tdHoliday = document.createElement("td");
      var tdDisp = document.createElement("td");
      th.setAttribute("scope", "row");
      th.textContent = a.date.iso;
      tdHoliday.textContent = a.name;
      tdDisp.textContent = a.description;
      tr.append(th, tdHoliday, tdDisp);
      tableMonth.append(tr);
    }
  });
}

function displayDayData(data, date) {
  monthData.style.display = "none";
  dayData.style.display = "unset";
  yearData.style.display = "none";
  dayHoliday.textContent = "No Events or Holidays Today!!";
  dayDiscription.textContent = "";
  data.response.holidays.forEach(function (a) {
    if (a.date.iso == date) {
      dayHoliday.textContent = "";
      dayDiscription.textContent = "";
      dayHoliday.textContent = a.name;
      dayDiscription.textContent = a.description;
    }
  });
}

function displayYearData(data, date) {
  dayData.style.display = "none";
  yearData.style.display = "unset";
  monthData.style.display = "none";
  var year = date.split("-")[0];

  data.response.holidays.forEach(function (a) {
    if (a.date.iso.split("-")[0] == year) {
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      var tdHoliday = document.createElement("td");
      th.setAttribute("scope", "row");
      th.textContent = a.date.iso;
      tdHoliday.textContent = a.name;
      tr.append(th, tdHoliday);
      tableYear.append(tr);
    }
  });
}
