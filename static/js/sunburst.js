const sunburstDiv=document.querySelector("#sunburst");
var sunburstResizeListener=false;

function SunburstArrays(data,filtered) {
  // Create lists for storing slices of sunburst
  let ids=[];
  let labels=[];
  let parents=[];
  let values=[];

  // Go row by row through data to populate lists, level by level:
  data.forEach(row =>  {
    //Level 1: Boroughs
    //If borough not in ids variable
    if (!ids.includes(`id_${row["Borough"]}`)){
      //To ID push ID_<boroughName>
      ids.push(`id_${row["Borough"]}`);
      //To label push borough name only
      labels.push(row["Borough"]);
      //If function argument for filtered is true, write down language filtered as a L0 Parent. Otherwise L0 parent is NYC
      if (filtered===true){
        parents.push(`${row["Language"]} LEP in NYC`);
      } else {
        parents.push("NYC LEP Speakers")
      }
      // Initialize value of borough by pushing a 0
      values.push(0);
    };

    //Level 2: Community districts
    //If community district not in ids variable
    if (!ids.includes(row["Borough Community District Code"])){

      //To ID push Community District Code number
      ids.push(row["Borough Community District Code"]);

      //To labels push Community District Name
      labels.push(row["Community District Name"]);

      //To parents push Community District id_<boroughName>
      parents.push(`id_${row["Borough"]}`);

      // Initialize value of Community District by pushing a 0
      values.push(0);
    }

    //Level 3: Languages
    //If no language is selected, append level 3 elements, otherwise skip the if part of code:
    if (filtered===false){
      //To ID push Community District Code number _<language>
      ids.push(`${row["Borough Community District Code"]}_${row["Language"]}`);

      //To labels push language e.g Italian
      labels.push(row["Language"]);

      //To parents push Community District Code number
      parents.push(row["Borough Community District Code"]);

      //To values push Population value of row
      values.push(row["LEP Population (Estimate)"]);
    }

    //Add up values for boroughs sum by searching index in IDS with id_<boroughName>, row by row
    values[ids.indexOf(`id_${row["Borough"]}`)]+=row["LEP Population (Estimate)"];

    //Add up values for community district sum by searching index in IDS with Community District Code, row by row.
    values[ids.indexOf(row["Borough Community District Code"])]+=row["LEP Population (Estimate)"];
  })
  return [ids,labels,parents,values];
}



function updateSunburst([ids,labels,parents,values]) {
  var trace = [
    {
      // Settings for sunburst content
      type: "sunburst",
      maxdepth: 3,
      hoverinfo:"label+text+value+percent parent+percent root",
      branchvalues: "total",
      ids: ids,
      labels: labels.map(line=>{return line.replace(", ", "<br>")}),
      parents: parents,
      marker:{line:{color:"white",width:0.2}},
      values:values,
      textposition: 'inside',
      insidetextorientation: 'radial',
      textfont:{size:14,color:"black"}
    }
  ];
  let sunburstHeight=(window.innerWidth>991)?sunburstDiv.offsetHeight-40:sunburstDiv.offsetWidth-40;
  // 
  var layout = {
    // Settings for layout of sunburst
    margin: {l:10,r:10,t:10,b:10},
    paper_bgcolor: "rgba(255, 255, 255, 0)",
    height:sunburstHeight,
    width:sunburstDiv.offsetWidth-40,
    sunburstcolorway:["d67616","62aa9f","1c8782","c7531a","a63a24"]
  };

  Plotly.newPlot('sunburst', trace, layout,{displayModeBar: false});
}