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
        languageSelect.addEventListener("change",loadGraphs)
        loadGraphs();
    });
}

function loadGraphs(){
    let subjectLanguage=languageSelect.value;
    demoBox(subjectLanguage);
    horizontalBar(subjectLanguage);
    sunburstFilter(subjectLanguage);
}

//     demoBox();
//     horizontalBar(subjectLanguage);
//     content=d3.selectAll('input:checked').property("value");
//     if (content=="map"){
//         console.log("content is set to map");
//         updateMap(subjectLanguage,initialize);
//     }
//     if (content=="sunburst"){
//         if(contentChanged){
//         myMap.remove()
//         }
//         if (subjectLanguage==="All"){
//                 allLanguages();
//             }
//             else {
//                 sunburstFilter(subjectLanguage);
//             }
//     }
    
// }

// function contentSelect(){
//     console.log("contentSelect function was initialized")
//     language=d3.select('select').property("value");
//     d3.select('#content').html("").attr("class","panel");
//     optionChanged(language,true,true)
// }

