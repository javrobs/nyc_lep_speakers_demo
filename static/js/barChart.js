const barDiv=document.querySelector("#bar");
var barResizeListener=false;

function horizontalBar(passedData,filtered,language) {
    let reducedData
    if (filtered){
        reducedData=passedData.map(line=>{
            return {"Borough":line["Borough"],
                    "Community District Name":line["Community District Name"],
                    "LEP Population (Estimate)": line["LEP Population (Estimate)"]}
        })
    } else {
        reducedData=passedData.map(line=>{
            return {"Borough":line["Borough"],
                    "Community District Name":line["Community District Name"],
                    "LEP Population (Estimate)": line["LEP Population (Estimate)"],
                    "Language":line["Language"]}
    })}

    let initValue=(reducedData.length>5)?5:reducedData.length;
    let topFive=[]
    for (let i=0;i<initValue;i++){
        topFive.push({"LEP Population (Estimate)":0})
    };
    for (let i=0;i<reducedData.length;i++){
        for (let j=0;j<topFive.length;j++){
            if (reducedData[i]["LEP Population (Estimate)"]>topFive[j]["LEP Population (Estimate)"]){
                topFive.pop()
                topFive.splice(j,0,reducedData[i]);
                break;
            };
        }
    }
    console.log(topFive,filtered,language);

    //////////////////////////

    let communities = topFive.map(row => { 
        let rawName = row["Community District Name"];
        let cleanName = rawName.replace(", ", "<br>");
        return cleanName;
    });
    let total_population = topFive.map(row => {return row["LEP Population (Estimate)"]});
    let boroughs = topFive.map(row => {return row["Borough"]});
    if (filtered){
        var hover = boroughs;
    }
    else {
        let languages = topFive.map(row => {return row["Language"]})
        var hover=[]
        for(let i=0;i<languages.length;i++){
            hover.push(`${boroughs[i]}<br>${languages[i]}`);
        };
    }
    let barData =[
        {
            y: communities.reverse(),
            x: total_population.reverse(),
            hovertext: hover.reverse(),
            type: "bar",
            marker:{color:"#176F6A"},
            orientation: "h",
        },
    ];

    let barHeight=(window.innerWidth>768)?barDiv.offsetHeight-40:300;
    let barLayout = {
        title: "Largest Community Districts",
        margin: { t: 30, l: 150 ,b:20,r:0},
        height: barHeight,
        width: barDiv.offsetWidth-30,
        yaxis: {fixedrange: true},
        xaxis : {fixedrange: true},
        paper_bgcolor: "rgba(255, 255, 255, 0)",
        plot_bgcolor:"rgba(255, 255, 255, 0)",

    };

    Plotly.newPlot("bar" , barData , barLayout,{displayModeBar: false});
    if(barResizeListener===false){
        window.addEventListener("resize",resizeBar);
      }
}

function resizeBar(){
    console.log("listening for resize (bar)");
    let newHeight=(window.innerWidth>768)?barDiv.offsetHeight-40:300;
    let newWidth=barDiv.offsetWidth-30;
    Plotly.update('bar',{},{height:newHeight,width:newWidth},{});
  }