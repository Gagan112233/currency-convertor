var searchString = "";
var selectOneVal = "";
var selectTwoVal = "";

$(document).ready(function(){
	mainCall();
});

function mainCall(){
  $.ajax({
		url: "https://free.currconv.com/api/v7/currencies?apiKey=28ba9415ccace596a536",
		success: function(data){
			getCurrencyName(data);
		}
	});
}

function getCurrencyName(data){
	obj = data.results;
	len = Object.keys(obj).length;
	for(var key in obj){

		//To append options from API TO select boxes
		var options1 = "<option value=" + obj[key].id + " class=" + obj[key].id + ">&nbsp" + obj[key].currencyName + "</option>";
		$("#countriesListOne").append(options1);

		var options2 = "<option value=" + obj[key].id + " class=" + obj[key].id + ">&nbsp" + obj[key].currencyName + "</option>";
		$("#countriesListTwo").append(options2);
	}
}

$("#countriesListOne").change(function(){
  selectOneVal = $("#countriesListOne").children("option:selected").val();
  combineString();
});

$("#countriesListTwo").change(function(){
  selectTwoVal = $("#countriesListTwo").children("option:selected").val();
  combineString();
});

$("#integerField").change(function(){
  selectOneVal = $("#countriesListOne").children("option:selected").val();
  selectTwoVal = $("#countriesListTwo").children("option:selected").val();
  combineString();
});

function combineString(){
  searchString = selectOneVal + "_" + selectTwoVal;
  generateConvCurrency(searchString)
}

function generateConvCurrency(searchString){
  var url = "https://free.currconv.com/api/v7/convert?apiKey=28ba9415ccace596a536&q=";
  url += searchString;
  $.ajax({
    url: url,
    success: function(data){
      var obj = data.results;
      var conversionVal = Math.round(obj[searchString].val * 100) / 100;
      //console.log(conversionVal);
      if(searchString.length == 7){
        var finalVal = $("#integerField").val();
        //console.log(finalVal);
        if( finalVal === ""){
          $("#convRate").val(conversionVal);
        }
        else{
          conversionVal *= finalVal;
          conversionVal = Math.round(conversionVal * 100) / 100;
          //console.log(conversionVal);
          $("#convRate").val(conversionVal);
        }
      }
    }
  });
}