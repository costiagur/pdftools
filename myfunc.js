
//*********************************************************************************** */
ui.combinefromfolder = function(){ //request can be insert or update
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    fdata.append("request","combinefromfolder");

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';

    xhr.open('POST',"http://localhost:"+ui.port,true)

    document.getElementById("loader").style.display='block'; //display loader

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   

            document.getElementById("loader").style.display='none'; //display loader

            //console.log(this.responseText)
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            if (atob(resobj[1]) == 'saved'){
                alert('saved to folder')
                return
            }
            else{
                ui.download(resobj[0],resobj[1])
            }
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata);     
}

//*********************************************************************************** */
ui.addpagenums = function(){ //request can be insert or update
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';


    startingpage = prompt("Which page will be the first?", "1")

    if (startingpage == null){
        return
    }

    fdata.append("request","addpagenums");
    fdata.append("startingpage",startingpage);
    fdata.append("uploadpdfs",document.getElementById("upload_pagenum").files[0]);

    xhr.open('POST',"http://localhost:"+ui.port,true)

    document.getElementById("loader").style.display='block'; //display loader

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)

            document.getElementById("loader").style.display='none'; //display loader
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            if (atob(resobj[1]) == 'saved'){
                alert('saved to folder')
                return
            }
            else{
                ui.download(resobj[0],resobj[1])
            }
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata);     
}

//********************************************************************************************* */
ui.encodepdf = function(answer){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    document.getElementById("askendecrypt").close()

    if(answer=='Cancel'){
        return
    }

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';


    password = prompt("Insert password", "123456")

    if (password == null){
        return
    }

    fdata.append("request","encodepdf");
    fdata.append("password",password);
    fdata.append("endecrypt_sel",document.getElementById("endecrypt_sel").value);
    fdata.append("uploadpdf",document.getElementById("upload_encodepdf").files[0]);

    xhr.open('POST',"http://localhost:"+ui.port,true)

    document.getElementById("loader").style.display='block'; //display loader

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)

            document.getElementById("loader").style.display='none'; //display loader
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            if (atob(resobj[1]) == 'saved'){
                alert('saved to folder')
                return
            }
            else{
                ui.download(resobj[0],resobj[1])
            }
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata); 
}
//********************************************************************************************* */
ui.mergepdfs = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';


    fdata.append("request","mergepdfs");
    
    for (let i=0; i<document.getElementById("upload_mergepdfs").files.length;i++){
        
        fdata.append(`uploadpdfs_${i}`,document.getElementById("upload_mergepdfs").files[i]);
    }

    xhr.open('POST',"http://localhost:"+ui.port,true)

    document.getElementById("loader").style.display='block'; //display loader

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)

            document.getElementById("loader").style.display='none'; //display loader
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            if (atob(resobj[1]) == 'saved'){
                alert('saved to folder')
                return
            }
            else{
                ui.download(resobj[0],resobj[1])
            }
            
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata); 

}
//********************************************************************************************* */
ui.splitpdf = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';

    fdata.append("request","splitpdf");
    
    fdata.append('uploadpdf',document.getElementById("upload_splitpdf").files[0]);
   
    splitafterstr = prompt("State pages to split after them. Comma delimited.", "1,2,3")

    if (splitafterstr == null){
        return
    }

    var splitafter = splitafterstr.split(",")

    fdata.append('splitlist',JSON.stringify(splitafter));

    xhr.open('POST',"http://localhost:"+ui.port,true)

    document.getElementById("loader").style.display='block'; //display loader

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   

            console.log(this.responseText)

            document.getElementById("loader").style.display='none'; //display loader

            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            if (atob(resobj[1]) == 'saved'){
                alert('saved to folder')
                return
            }
            else{
                ui.download(resobj[0],resobj[1])
            }
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata); 
}
//********************************************************************************************* */
ui.splitbyn = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    fdata.append("request","splitbyn");
    
    fdata.append('uploadpdf',document.getElementById("upload_splitbyn").files[0]);
   
    splitn = prompt("How many pages to split by", "1")

    if (splitn == null){
        return
    }

    fdata.append('splitn',splitn);

    xhr.open('POST',"http://localhost:"+ui.port,true)

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            if (atob(resobj[1]) == 'saved'){
                alert('saved to folder')
                return
            }
            else{
                ui.download(resobj[0],resobj[1])
            }

        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata); 
}
//********************************************************************************************* */
ui.watermark = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    document.getElementById("watermark_diag").close()

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';

    fdata.append("request","watermark");

    fdata.append("upload_waterclean",document.getElementById("upload_waterclean").files[0]);
    fdata.append("upload_watermark",document.getElementById("upload_watermark").files[0]);

    xhr.open('POST',"http://localhost:"+ui.port,true)

    document.getElementById("loader").style.display='block'; //display loader

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)

            document.getElementById("loader").style.display='none'; //display loader
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            if (atob(resobj[1]) == 'saved'){
                alert('saved to folder')
                return
            }
            else{
                ui.download(resobj[0],resobj[1])
            }
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata); 
}

//********************************************************************************************* */
ui.renamebyregex = function(testorrun){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    document.getElementById('renamebyregex_diag').close()

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';

    if(testorrun == "run"){

        fdata.append("request","renamebyregex");
    
        if (document.getElementById("upload_renamebyregex").files.length == 0){
            return;
        }
    
        regexstr = prompt("Insert Regular Expression","")
    
        if(regexstr == ""){
            return;
        }
        else{
            fdata.append("regexstr",regexstr);
        }
    
        for (let i=0; i<document.getElementById("upload_renamebyregex").files.length;i++){
            
            fdata.append(document.getElementById("upload_renamebyregex").files[i].name,document.getElementById("upload_renamebyregex").files[i]);
        }
    
    }

    else if(testorrun == "test"){
        fdata.append("request","renameregtxt");

        if (document.getElementById("upload_renamebyregex").files.length == 0){
            return;
        }
        else{
            fdata.append('test',document.getElementById("upload_renamebyregex").files[0]);
        }
 
    }

    xhr.open('POST',"http://localhost:"+ui.port,true)

    document.getElementById("loader").style.display='block'; //display loader

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)

            document.getElementById("loader").style.display='none'; //display loader
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            if (atob(resobj[1]) == 'saved'){
                alert('saved to folder')
                return
            }
            else{
                ui.download(resobj[0],resobj[1])
            }
            
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata); 

}

//********************************************************************************************** */
ui.reorder_showdoc = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    document.getElementById("reorder_tb").innerHTML = ''

    window.addEventListener("keydown", (event) => {
        if (event.code == "Delete"){
            ui.delpage()
        }
        else if(event.code == "ArrowRight" || event.code == "ArrowLeft"){
            ui.moveonepage(event.code)
        }
    },true)

    fdata.append("request","reorder_showdoc");
    
    fdata.append('uploadpdf',document.getElementById("upload_reorder").files[0]);

    xhr.open('POST',"http://localhost:"+ui.port,true)

    document.getElementById("loader").style.display='block'; //display loader

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            //console.log(this.responseText)

            document.getElementById("loader").style.display='none'; //display loader

            resobj = JSON.parse(this.responseText);
            
            let tbody = "<tbody>"

            for(var i=0; i<resobj.length; i++){
                if((i+1)%4 == 1){
                    tbody+= "<tr>"
                }
                tbody+=`<td><label for="check_${i}" style="vertical-align:bottom"><img src="${resobj[i]}" width="150" height="150" id="img_${i}" data-img="${i}" style="transform: rotate(0deg); filter: blur(0px)"><small>${i+1}</small></label><input type="checkbox" name="pagechecks" id="check_${i}" data-check="${i}">`;
                tbody+="</td>";
                if((i+1)%4 == 0){
                    tbody+= "</tr>"
                }
            }

            if((i)%4 != 0){ //in case the loop ended on remainder 1-3
                tbody+= "</tr>"
            }

            tbody+= "</tbody>"
            document.getElementById("reorder_tb").innerHTML = tbody;
            document.getElementById('reorderbts').style.display = 'inline';

            imgs = document.getElementsByTagName("img")
            for (eachimg of imgs){
                eachimg.addEventListener('dblclick', (e) => {console.log(e); window.open(e["target"].src,"_blank")})
            }
            
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }
    }

    xhr.send(fdata);
}
//********************************************************************************************* */
ui.rotatepage = function(){
    var pagechecks = document.getElementsByName("pagechecks");
    var eachpage=''
    var rotatestage = ''
    const regex = /[0-9]/g;
    var newrotate = 0

    for (eachpage of pagechecks){
        if(eachpage.checked == true){
            rotatestage = eachpage.previousSibling.firstChild.style.transform
            rotateint = parseInt(rotatestage.match(regex).join(''))
            newrotate = (rotateint/90 +1)*90 % 360
            eachpage.previousSibling.firstChild.style.transform = `rotate(${newrotate}deg)` 
        }
    }
}
//********************************************************************************************* */
ui.delpage = function(){
    var pagechecks = document.getElementsByName("pagechecks");
    var eachpage=''
    var deletestage = '0px'

    for (eachpage of pagechecks){
        if(eachpage.checked == true){
            deletestage = eachpage.previousSibling.firstChild.style.filter
            if (deletestage == 'blur(0px)'){
                eachpage.previousSibling.firstChild.style.filter= 'blur(5px)';
            }
            else{
                eachpage.previousSibling.firstChild.style.filter= 'blur(0px)';
            }
            eachpage.checked = false
        }
    }
}
//********************************************************************************************* */
ui.movepage = function(){
    var moverate = parseInt(document.getElementById('move_in').value);   
    if (moverate == 0){
        return;
    }

    var pagechecks = document.getElementsByName("pagechecks");

    var movercheck=0;
    var moverimg = 0;
    var placesmap = new Object();
    var imgmap = new Object();
    var wheremove = 0;
    var j = 0;

    for (let eachpage of pagechecks){
        placesmap[parseInt(eachpage.dataset.check)] = parseInt(eachpage.previousSibling.firstChild.dataset.img);
        imgmap[parseInt(eachpage.previousSibling.firstChild.dataset.img)] = [eachpage.previousSibling.firstChild.src,eachpage.previousSibling.firstChild.style.transform,eachpage.previousSibling.firstChild.style.filter];
    }

    var prevmove = 0;

    for (let eachpage of pagechecks){
        if(eachpage.checked == true){

            movercheck = parseInt(eachpage.dataset.check) + prevmove //mover's current place

            moverimg = placesmap[movercheck]//movers id

            wheremove = Math.min(Math.max(movercheck + moverate,0),Object.keys(placesmap).length-1) //movement no less than to 0 and no more than to last page

           
            if (moverate < 0){
                for (let i = movercheck - 1; i >= wheremove; i--){
                    let currentimg_in_place = placesmap[i]
                    placesmap[i+1] = currentimg_in_place
                }
                placesmap[wheremove] = moverimg
                prevmove = prevmove + 1 
            }
            if (moverate > 0){
                for (let i = movercheck + 1; i <= wheremove; i++){
                    let currentimg_in_place = placesmap[i]
                    placesmap[i-1] = currentimg_in_place
                }
                placesmap[wheremove] = moverimg
                prevmove = prevmove -1 //accumulating. for example, if page 0,1 moved to the end, page 2 will now be 2-2 = 0
            }
            
            eachpage.checked = false
        }
    }

    var tbody = "<tbody>"

    for(j=0; j<Object.keys(imgmap).length; j++){

        if((j+1)%4 == 1){
            tbody+= "<tr>"
        }
        tbody+=`<td><label for="check_${j}" style="vertical-align:bottom"><img src="${imgmap[placesmap[j]][0]}" width="150" height="150" id="img_${placesmap[j]}" data-img="${placesmap[j]}" style="transform: ${imgmap[placesmap[j]][1]}; filter: ${imgmap[placesmap[j]][2]};"><small>${placesmap[j]+1}</small></label><input type="checkbox" name="pagechecks" id="check_${j}" data-check="${j}">`;
        tbody+="</td>";
        if((j+1)%4 == 0){
            tbody+= "</tr>"
        }
    }

    if((j)%4 != 0){ //in case the loop ended on remainder 1-3
        tbody+= "</tr>"
    }

    tbody+= "</tbody>"
    document.getElementById("reorder_tb").innerHTML = tbody;

    imgs = document.getElementsByTagName("img")
    for (eachimg of imgs){
        eachimg.addEventListener('dblclick', (e) => {console.log(e); window.open(e["target"].src,"_blank")})
    }
    
}
//********************************************************************************************* */
ui.moveonepage = function(leftright){

    var moverate = (leftright == "ArrowRight")?1:-1;   

    var pagechecks = document.getElementsByName("pagechecks");

    var movercheck=0;
    var moverimg = 0;
    var placesmap = new Object();
    var imgmap = new Object();
    var wheremove = 0;
    var j = 0;

    for (let eachpage of pagechecks){
        placesmap[parseInt(eachpage.dataset.check)] = parseInt(eachpage.previousSibling.firstChild.dataset.img);
        imgmap[parseInt(eachpage.previousSibling.firstChild.dataset.img)] = [eachpage.previousSibling.firstChild.src,eachpage.previousSibling.firstChild.style.transform,eachpage.previousSibling.firstChild.style.filter];
    }

    for (let eachpage of pagechecks){
        if(eachpage.checked == true){

            movercheck = parseInt(eachpage.dataset.check)  //mover's current place

            moverimg = placesmap[movercheck]//movers id

            wheremove = Math.min(Math.max(movercheck + moverate,0),Object.keys(placesmap).length-1) //movement no less than to 0 and no more than to last page
           
            if (wheremove == movercheck){ //if no where to move, stop
                return
            }

            if (moverate < 0){
                let currentimg_in_place = placesmap[wheremove]
                placesmap[wheremove+1] = currentimg_in_place
            }
            else if (moverate > 0){
                let currentimg_in_place = placesmap[wheremove]
                placesmap[wheremove-1] = currentimg_in_place
            }
            
            placesmap[wheremove] = moverimg
            
            eachpage.checked = false
        }
    }
    
    var tbody = "<tbody>"

    for(j=0; j<Object.keys(imgmap).length; j++){

        if((j+1)%4 == 1){
            tbody+= "<tr>"
        }
        tbody+=`<td><label for="check_${j}" style="vertical-align:bottom"><img src="${imgmap[placesmap[j]][0]}" width="150" height="150" id="img_${placesmap[j]}" data-img="${placesmap[j]}" style="transform: ${imgmap[placesmap[j]][1]}; filter: ${imgmap[placesmap[j]][2]};"><small>${placesmap[j]+1}</small></label><input type="checkbox" name="pagechecks" id="check_${j}" data-check="${j}">`;
        tbody+="</td>";
        if((j+1)%4 == 0){
            tbody+= "</tr>"
        }
    }

    if((j)%4 != 0){ //in case the loop ended on remainder 1-3
        tbody+= "</tr>"
    }

    tbody+= "</tbody>"
    document.getElementById("reorder_tb").innerHTML = tbody;

    imgs = document.getElementsByTagName("img")
    for (eachimg of imgs){
        eachimg.addEventListener('dblclick', (e) => {console.log(e); window.open(e["target"].src,"_blank")})
    }
    
    document.getElementById("check_" + wheremove).checked = true
    
}

//********************************************************************************************** */
ui.finalizereorder = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();
    var placesobj = {};
    var pagechecks = document.getElementsByName("pagechecks");
    const regex = /[0-9]/g;

    for (let eachpage of pagechecks){
        let rotatestage = eachpage.previousSibling.firstChild.style.transform
        let rotate = rotatestage.match(regex).join('')
        let deletestage = eachpage.previousSibling.firstChild.style.filter

        placesobj[eachpage.dataset.check] = [eachpage.previousSibling.firstChild.dataset.img,rotate,(deletestage == 'blur(0px)')?0:1]
    }

    fdata.append("request","reorder_commit");
    
    fdata.append("placesobj",JSON.stringify(placesobj));

    console.log(JSON.stringify(placesobj))

    fdata.append('uploadpdf',document.getElementById("upload_reorder").files[0]);

    xhr.open('POST',"http://localhost:"+ui.port,true)

    document.getElementById("loader").style.display='block'; //display loader

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)

            document.getElementById("loader").style.display='none'; //display loader
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            ui.download(resobj[0],resobj[1])
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata);
}
//********************************************************************************************* */
ui.selectall = function(){

    var pagechecks = document.getElementsByName("pagechecks");

    if (pagechecks[0].checked == true){
        for (let eachpage of pagechecks){
            eachpage.checked = false
        }
    }
    else{
        for (let eachpage of pagechecks){
            eachpage.checked = true
        }
    }

}


//********************************************************************************************* */
ui.download = function(filename, filetext){

    var a = document.createElement("a");

    document.body.appendChild(a);

    a.style = "display: none";

    a.href = 'data:application/octet-stream;base64,' + filetext;

    a.download = filename;

    a.click();

    document.body.removeChild(a);

}


