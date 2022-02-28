$(document).ready(function(){

    $(".menu-file").click(function (){
        $(".menu-file").append("<div class='btn-save'>Save</div>");
        $(".menu-file").append("<div class='btn-open'>Open</div>");
        

        
        //download
        $(".btn-save").click(function(){
            let jsonData = JSON.stringify(cellData);
            let file = new Blob([jsonData], {type: "application/json"});
    
            let a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = "SheetData.json";
            a.click();
        })
    
        //Upload
        $(".btn-open").click(function (){

            let input = document.createElement("input");
            input.setAttribute("type", "file");
            input.click();
            input.addEventListener("change", () => {
                let fr = new FileReader();
                let files = input.files;
                let fileObj = files[0];

                fr.readAsText(fileObj);
                fr.addEventListener("load",async () => {
                    await emptySheet();

                    let readSheetData = JSON.parse(fr.result);
                    cellData = readSheetData;

                    totalSheets = 0;
                    lastSheet = 0;
                    selectedSheet = "";

                    $(".sheet-tab").remove();   

                    for(sheet in readSheetData){
                        
                        selectedSheet = `${sheet}`; 

                        addFreshSheet(sheet);
                        await emptySheet();
                        loadSheet();
                        selectSheet(document.querySelector(".sheet-tab"));
                    }
                    
                })

            })

        });

        function addFreshSheet(sheet){
            $(".sheet-tab").removeClass("selected");
            totalSheets += 1;
            lastSheet += 1;
            $(".sheet-tab-container").append(`<div class="sheet-tab selected">${sheet}</div>`);
            addSheetEvents();
        }

    });   
   
    $(".menu-file").mouseleave(function (){
        $(".btn-save, .btn-open").remove();
    });

});