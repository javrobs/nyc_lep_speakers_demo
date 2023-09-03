const URL = "https://raw.githubusercontent.com/javrobs/nyc_lep_speakers_demo/main/static/data/records.json";
const languageSelect= document.querySelector("#language-select");
var alldata;

setUp();

function setUp(){
    fetch(URL).then(data=>data.json()).then(data=>{
        console.log(data);
        alldata=data;
        // fetch languages for dropdown menu
        let languages=[]
        data.forEach(row =>  {
            if (!languages.includes(row.Language)){
            languages.push(row.Language);
            }
        });
        languages.sort()
        languages.forEach(row => {
            let newOption=document.createElement("option");
            newOption.innerHTML=row;
            languageSelect.appendChild(newOption);
        });
        languageSelect.addEventListener("change",()=>loadGraphs);
        window.addEventListener("resize",()=>{
            if (window.innerWidth>768){
                let doit;
                console.log("resizing");
                clearTimeout(doit);
                doit = setTimeout(loadGraphs, 100);
            } else {
                loadGraphs(false);
            };
        });
        // window.addEventListener("resize",loadGraphs);
        loadGraphs();
    });
}

function loadGraphs(purge=true){
    if (purge){
        Plotly.purge('bar');
        Plotly.purge('sunburst');
    };
    selectedLanguage=languageSelect.value;
    if (selectedLanguage==="All"){
        demoBox(alldata,false,selectedLanguage);
        horizontalBar(alldata,false,selectedLanguage);
        updateSunburst(SunburstArrays(alldata,false));
    } else {
        filteredData=alldata.filter(row=>{return (row["Language"]===selectedLanguage)})
        console.log(filteredData);
        demoBox(filteredData,true,selectedLanguage);
        horizontalBar(filteredData,true,selectedLanguage);
        updateSunburst(SunburstArrays(filteredData,true));
    }
}


