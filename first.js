function calculateCo2Emissions(baseTemp, temperatureSetting, duration) {
  const carbonIntensity = 0.5;
  const basePower = 1.5;
  let powerConsumption;
  if (temperatureSetting >= baseTemp) {
    powerConsumption = basePower;
  } else {
    powerConsumption = basePower + (baseTemp - temperatureSetting) * 0.5;
  }
  var energyConsumption = powerConsumption * duration;
  var co2Emissions = energyConsumption * carbonIntensity;
  return co2Emissions;
}

function airCon(baseTemp, temperatureSetting, duration, yearT) {
  var x1 = 1.87 * yearT - 3362.81;
  var x2 = x1 + (calculateCo2Emissions(baseTemp, temperatureSetting, duration) * 8100000000/4.9) / 7814000000000;
  var flood = 1.97 * x2 - 1.97 * x1;
  var ew = 0.79 * x2 - 0.79 * x1;
  var plant = -0.74 * x1 - (-0.74) * x2;
  var co2 = (calculateCo2Emissions(baseTemp, temperatureSetting, duration) * 8100000000/4.9);
  var data = [flood, ew, plant, co2];
  return data;
}

function plasticStraw(num, yearT) {
  var x1 = 1.87 * yearT - 3362.81;
  var x2 = x1 + (0.48 * num * 8100000000) / 7814000000000;
  var flood = 1.97 * x2 - 1.97 * x1;
  var ew = 0.79 * x2 - 0.79 * x1;
  var plant = -0.74 * x1 - (-0.74) * x2;
  var co2 = (0.48 * num * 8100000000);
  var data = [flood, ew, plant, co2];
  return data;
}

function plasticbag(num, yearT) {
  var x1 = 1.87 * yearT - 3362.81;
  var x2 = x1 + (1.58 * num * 8100000000) / 7814000000000;
  var flood = 1.97 * x2 - 1.97 * x1;
  var ew = 0.79 * x2 - 0.79 * x1;
  var plant = -0.74 * x1 - (-0.74) * x2;
  var co2 = (1.58 * num * 8100000000);
  var data = [flood, ew, plant, co2];
  return data;
}

function papercup(num, yearT) {
  var x1 = 1.87 * yearT - 3362.81;
  var x2 = x1 + (0.11 * num * 8100000000) / 7814000000000;
  var flood = 1.97 * x2 - 1.97 * x1;
  var ew = 0.79 * x2 - 0.79 * x1;
  var plant = -0.74 * x1 - (-0.74) * x2;
  var co2 = (0.11 * num * 8100000000);
  var data = [flood, ew, plant, co2];
  return data;
}

function paperbag(num, yearT) {
  var x1 = 1.87 * yearT - 3362.81;
  var x2 = x1 + (5.52 * num * 8100000000) / 7814000000000;
  var flood = 1.97 * x2 - 1.97 * x1;
  var ew = 0.79 * x2 - 0.79 * x1;
  var plant = -0.74 * x1 - (-0.74) * x2;
  var co2 = (5.52 * num * 8100000000);
  var data = [flood, ew, plant, co2];
  return data;
}

function checkInputs() {
  const inputIds = ['ps', 'pb', 'pc','pab','roomtemp','aircontemp','aircontime','year'];
  let allFilled = true;
  inputIds.forEach(id => {
    const inputField = document.getElementById(id);
    const inputValue = inputField.value.trim();
    if (inputValue === '') {
      allFilled = false;
    }
  });
  return allFilled;
}


function mainfunc() {
  if (!checkInputs()) {
    alert("請確實填入所有資訊");
    return;  // Stop execution if any input fields are not filled
  }
  // Extract and convert the values from the input fields
  var baseTemp = parseFloat(document.getElementById("roomtemp").value);
  var temperatureSetting = parseFloat(document.getElementById("aircontemp").value);
  var duration = parseFloat(document.getElementById("aircontime").value) * 52;
  var yearT = parseInt(document.getElementById("year").value, 10);
  var num1 = parseInt(document.getElementById("ps").value, 10)  * 52;
  var num2 = parseInt(document.getElementById("pb").value, 10)  * 52;
  var num3 = parseInt(document.getElementById("pc").value, 10)  * 52;
  var num4 = parseInt(document.getElementById("pab").value, 10)  * 52;

  // Call each function once and store the results
  var airConResults = airCon(baseTemp, temperatureSetting, duration, yearT);
  var plasticStrawResults = plasticStraw(num1, yearT);
  var plasticBagResults = plasticbag(num2, yearT);
  var paperCupResults = papercup(num3, yearT);
  var paperBagResults = paperbag(num4, yearT);

  // Calculate the combined results
  var co2emire = (airConResults[3] + plasticStrawResults[3] + plasticBagResults[3] + paperCupResults[3] + paperBagResults[3]).toFixed(2);
  var floodre = (airConResults[0] + plasticStrawResults[0] + plasticBagResults[0] + paperCupResults[0] + paperBagResults[0]).toFixed(2);
  var ewre = (airConResults[1] + plasticStrawResults[1] + plasticBagResults[1] + paperCupResults[1] + paperBagResults[1]).toFixed(2);
  var plantre = (airConResults[2] + plasticStrawResults[2] + plasticBagResults[2] + paperCupResults[2] + paperBagResults[2]).toFixed(2);

  // Update the HTML elements with the calculated values
  document.getElementById("co2emi").innerHTML = co2emire;
  document.getElementById("flood").innerHTML = floodre;
  document.getElementById("ew").innerHTML = ewre;
  document.getElementById("plant").innerHTML = plantre;
  document.getElementById("dosomething").style.display = 'block';
}

function clearNumberInputs() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.value = '';
    });
}

function checkInputs2() {
  const inputIds = ['efstraw', 'efcup', 'efbag','efaircon','efairhour'];
  let allFilled = true;
  inputIds.forEach(id => {
    const inputField = document.getElementById(id);
    const inputValue = inputField.value.trim();
    if (inputValue === '') {
      allFilled = false;
    }
  });
  return allFilled
}

function mainfunc2() {
  if (!checkInputs2()) {
    alert("請確實填入所有空格");
    return;  // Stop execution if any input fields are not filled
  }
  // Extract and convert the values from the input fields
  var baseTemp = parseFloat(document.getElementById("roomtemp").value);
  var temperatureSetting2 = parseFloat(document.getElementById("efaircon").value);
  var duration2 = parseFloat(document.getElementById("efairhour").value) * 52;
  var temperatureSetting = parseFloat(document.getElementById("aircontemp").value);
  var duration = parseFloat(document.getElementById("aircontime").value) * 52;
  if (duration2 > duration) {
    alert("要愛地球，吹冷氣的時間應該比前次少");
    return;
  };
  if (temperatureSetting > temperatureSetting2) {
    alert("要愛地球，冷氣的溫度可以調高一些");
    return;
  };
  var yearT = parseInt(document.getElementById("year").value, 10);
  var num1 = parseInt(document.getElementById("ps").value, 10)  * 52;
  var num2 = parseInt(document.getElementById("pb").value, 10)  * 52;
  var num3 = parseInt(document.getElementById("pc").value, 10)  * 52;
  var num4 = parseInt(document.getElementById("pab").value, 10)  * 52;
  if (document.getElementById("ps").value > document.getElementById("efstraw").value) {
    var num1n = (parseInt(document.getElementById("ps").value, 10) - parseInt(document.getElementById("efstraw").value, 10))  * 52} else {
      var num1n = 0
    };
  if (document.getElementById("pb").value > document.getElementById("efbag").value) {
    var num2n = (parseInt(document.getElementById("pb").value, 10) - parseInt(document.getElementById("efbag").value, 10))  * 52} else {
      var num2n = 0
    };
  if (document.getElementById("pc").value > document.getElementById("efcup").value) {
    var num3n = (parseInt(document.getElementById("pc").value, 10) - parseInt(document.getElementById("efcup").value, 10))  * 52} else {
      var num3n = 0
    };
  if (document.getElementById("pab").value > document.getElementById("efbag").value) {
    var num4n = (parseInt(document.getElementById("pab").value, 10) - parseInt(document.getElementById("efbag").value, 10))  * 52} else {
      var num4n = 0
    };

  // Call each function once and store the results
  var airConResults = airCon(baseTemp, temperatureSetting, duration, yearT);
  var plasticStrawResults = plasticStraw(num1, yearT);
  var plasticBagResults = plasticbag(num2, yearT);
  var paperCupResults = papercup(num3, yearT);
  var paperBagResults = paperbag(num4, yearT);
  
  var airConResults2 = airCon(baseTemp, temperatureSetting2, duration2, yearT);
  var plasticStrawResults2 = plasticStraw(num1n, yearT);
  var plasticBagResults2 = plasticbag(num2n, yearT);
  var paperCupResults2 = papercup(num3n, yearT);
  var paperBagResults2 = paperbag(num4n, yearT);

  // Calculate the combined results
  var co2emire = airConResults[3] + plasticStrawResults[3] + plasticBagResults[3] + paperCupResults[3] + paperBagResults[3];
  var floodre = airConResults[0] + plasticStrawResults[0] + plasticBagResults[0] + paperCupResults[0] + paperBagResults[0];
  var ewre = airConResults[1] + plasticStrawResults[1] + plasticBagResults[1] + paperCupResults[1] + paperBagResults[1];
  var plantre = airConResults[2] + plasticStrawResults[2] + plasticBagResults[2] + paperCupResults[2] + paperBagResults[2];
  
  var co2emire2 = airConResults2[3] + plasticStrawResults2[3] + plasticBagResults2[3] + paperCupResults2[3] + paperBagResults2[3];
  var floodre2 = airConResults2[0] + plasticStrawResults2[0] + plasticBagResults2[0] + paperCupResults2[0] + paperBagResults2[0];
  var ewre2 = airConResults2[1] + plasticStrawResults2[1] + plasticBagResults2[1] + paperCupResults2[1] + paperBagResults2[1];
  var plantre2 = airConResults2[2] + plasticStrawResults2[2] + plasticBagResults2[2] + paperCupResults2[2] + paperBagResults2[2];
  
  var co2emire3 = (co2emire - co2emire2).toFixed(2);
  var floodre3 = (floodre - floodre2).toFixed(2);
  var ewre3 = (ewre - ewre2).toFixed(2);
  var plantre3 = (plantre - plantre2).toFixed(2);

  // Update the HTML elements with the calculated values
  document.getElementById("bco2emi").innerHTML = co2emire3;
  document.getElementById("bflood").innerHTML = floodre3;
  document.getElementById("bew").innerHTML = ewre3;
  document.getElementById("bplant").innerHTML = plantre3;
}

function appear() {
  document.getElementById("try").style.display = 'block';
  document.getElementById('try').scrollIntoView({ behavior: 'smooth' });
  document.getElementById("obj").style.display = 'block';
  document.getElementById("objectives").style.display = 'block';
  document.getElementById("eaircon").style.display = 'block';
  document.getElementById("betterres").style.display = 'block';
  document.getElementById("betterresults").style.display = 'block';
  document.getElementById("calresult2").style.display = 'block';
  document.getElementById("clearinput2").style.display = 'block';
  document.body.style.backgroundImage = url("美麗大自然2.png");
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "top";
  document.body.style.backgroundRepeat = "repeat";
}

function clearSpecificInputs() {
    const ids = ["efstraw","efcup","efbag","efaircon","efairhour"];
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (input && input.type === 'number') {
            input.value = ''; 
        }
    });
}
