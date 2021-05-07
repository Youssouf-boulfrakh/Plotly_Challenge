

function buildmetadata(sample) {
    // use d3 to read in json set
  d3.json("samples.json").then((data) => {
    
    var metadata = data.metadata;
    
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
     
    var result = resultArray[0];
    
    var PANEL = d3.select("#sample-metadata");
    
    PANEL.html("");
    
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// build out the plots function (bar plot, bubble plot)
function buildcharts(sample) {
    // read in using json
    d3.json("samples.json").then((data) => {
      var WashFreq = data.metadata.map(d => d.wfreq)

      var samples = data.samples;
    
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    
      var result = resultArray[0];
    
      var otu_ids = result.otu_ids;
    
      var otu_labels = result.otu_labels;
    
      var sample_values = result.sample_values;
  
      // build the bubblay layout input
      var bubbleLayout = {
        title: "Bacteria Cultures for each Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      // build the bubblay data input
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Mars"
          }
        }
      ];
  // plot out the ploty plot, what type of plot, and then variables 
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);


  // y ticks bar data cause its special and wont work unless it tworks
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
    
  // build out the barlayout variable
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };

  // plot out the ploty plot, what type of plot, and then variables 
      Plotly.newPlot("bar", barData, barLayout);

    // The guage chart
  
      // var data_g = [
      //   {
      //   domain: { x: [0, 1], y: [0, 1] },
      //   value: WashFreq[0],
      //   title: { text: `Weekly Washing Frequency ` },
      //   type: "indicator",
      //   mode: "gauge+number",
      //   gauge: { axis: { range: [null, 9] },
      //           steps: [
      //             { range: [0, 2], color: "yellow" },
      //             { range: [2, 4], color: "cyan" },
      //             { range: [4, 6], color: "teal" },
      //             { range: [6, 8], color: "lime" },
      //             { range: [8, 9], color: "green" },
      //           ]}
          
      //   }
      // ];
      // var layout_g = { 
      //     width: 400, 
      //     height: 300, 
      //     margin: { t: 20, b: 40, l:100, r:100 } 
      //   };
      // Plotly.newPlot("gauge", data_g, layout_g);

      // // Piechart otu_ids, and labels (10 each).
      
      var Value1 = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var trace2 = [{
        values: Value1,
        labels: otu_ids.slice(0, 10),
        hovertext: otu_labels.slice(0, 10),
        type: "pie",
        marker: {
          colorscale: "Earth"
        }
      }];
      var layout2 = {
        showlegend: true,
        height: 400,
        width: 500
      };
      Plotly.newPlot("pie", trace2, layout2);
    });
  }
  
  // init the dashboards and stuff
  function init() {
    
    var selector = d3.select("#selDataset");
    
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // first sample to build initial plots
      var firstSample = sampleNames[0];
      buildcharts(firstSample);
      buildmetadata(firstSample);
    });
  }
  
  // when an option is changed
  function optionChanged(newSample) {
    // get new metadata and build new charts
    buildcharts(newSample);
    buildmetadata(newSample);
  }
  
  init();