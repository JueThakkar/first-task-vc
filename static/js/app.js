function getIdFromDataTable(self) {
  var $row = $(self).closest("tr"); // Find the row
  var $tds = $row.find('td'), // Find the column
    id = $tds.eq(0).text();

  return id;
}

function ddlFill(name, fileName, value, valPartialMatch) {
  $.get("/static/json/"+fileName+".json?1", function(r){
    var o = JSON.parse(r),
      selectorStr = "select[name='"+name+"']";

    // append select one
    $(selectorStr).append($('<option>', {
        value: "",
        text:  "Select one"
    }));

    // append all ptions
    for(var i=0;i<o.length;i++){
      $(selectorStr).append($('<option>', {
          value: o[i].v,
          text:  o[i].n,
          title: o[i].d || o[i].n,
      }));
    }

    // select a value
    if(valPartialMatch === true){
      $(selectorStr).children("option[value^='"+value+"']").attr("selected", "");
    }
    else {
      $(selectorStr).val(value);
    }
  });
}
