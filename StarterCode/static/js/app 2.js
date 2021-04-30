
function loadCharts(id) {

  console.log(id)

  d3.json("samples.json").then((data)=>{

  console.log(data);

  var selectedData = data.samples.filter(obj => obj.id == id)

  console.log(selectedData);

  var otuids = selectedData[0].otu_ids;
  var samplevalues = selectedData[0].sample_values;
  var otulabels = selectedData[0].otu_labels;

  console.log(otuids);
  console.log(samplevalues);
  console.log(otulabels);


  // Build Bar Chart

  // Build Bubble Chart

  // Build Panel data section
  var selectedMetaData = data.metatdata.filter(obj => obj.id == id)

  //metadata key

  //you could do a table, or maybe simpler is just append like "h5"


  });
}


d3.json("samples.json").then((data)=>{

  var dropdown = d3.select("#selDataset");

  data.names.forEach((dataobj) => {

    dropdown.append("option").text(dataobj).property("value", dataobj);
  })

  var id = data.names[0];

  loadCharts(id)

})

function optionChanged(selectedID) {

  loadCharts(selectedID);
}