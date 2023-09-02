const metadataDiv=document.querySelector("#metadata");

function demoBox(passedData,filtered,language){
    // metadataDiv.innerHTML='';
    let thisLEP=passedData.reduce((sum,one)=> sum + one["LEP Population (Estimate)"],0);
    if (filtered){
        let allLEP=alldata.reduce((sum,one)=> sum + one["LEP Population (Estimate)"],0);
        let percentageOfLEP="%"+String(Math.floor(thisLEP/allLEP*100*100000)/100000)
        console.log(percentageOfLEP,allLEP,thisLEP,language);
    } else {
        console.log(thisLEP,language);
    }
    // panel.append('h5').classed("demo_header",true).text(`Language:`);
    // panel.append('h5').classed("demo_info",true).text(`${data["Language"]}`);
    // panel.append('h5').classed("demo_header",true).text(`Limited English Proficiency (LEP) Speakers:`);
    // panel.append('h5').classed("demo_info",true).text(`${data["Total LEP population"].toLocaleString("en-US")}`);
    // if (Object.keys(data).includes("LEP Percentage")){
    //     panel.append('h5').classed("demo_header",true).text(`% of all LEP Speakers:`);
    //     panel.append('h5').classed("demo_info",true).text(`${data["LEP Percentage"]}`);
        
    // }           
    
}
