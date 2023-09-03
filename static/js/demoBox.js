const languageMetadata=document.querySelector("#language-placeholder");
const populationMetadata=document.querySelector("#lep-population-placeholder");
const percentageMetadata=document.querySelector("#percentage-placeholder");
const percentageHeader=document.querySelector("#percentage-header");

function demoBox(passedData,filtered,language){
    let thisLEP=passedData.reduce((sum,one)=> sum + one["LEP Population (Estimate)"],0);
    languageMetadata.innerHTML=language;
    populationMetadata.innerHTML=thisLEP.toLocaleString("en-EN");
    if (filtered){
        let allLEP=alldata.reduce((sum,one)=> sum + one["LEP Population (Estimate)"],0);
        let percentageOfLEP=String(Math.floor(thisLEP/allLEP*100*100000)/100000)+"%";
        console.log(percentageOfLEP,allLEP,thisLEP,language);
        percentageHeader.classList.remove("d-none");
        percentageMetadata.classList.remove("d-none");
        percentageMetadata.innerHTML=percentageOfLEP;
    } else {
        console.log(thisLEP,language);
        percentageHeader.classList.add("d-none");
        percentageMetadata.classList.add("d-none");
    } 
}
