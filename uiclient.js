ui = new Object();

ui.port = 50000

//********************************************************************************** */
window.addEventListener('beforeunload',function(event){ //when closing browser, close python
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    fdata.append("request",'close'); //prepare files

    xhr.open('POST',"http://localhost:"+ui.port, true);

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText);
        }
    };
    
    xhr.send(fdata);
    
})
//********************************************************************************** */
window.addEventListener('load',function(event){
    ui.onloadfunc()
})
//******************************************************************************************** */

ui.onloadfunc = function(){

    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    fdata.append("request",'mypypdftools'); //parol

    xhr.open('POST',"http://localhost:"+ui.port, true);

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText);

            res = JSON.parse(xhr.responseText);

            ui.port = res.port;

            if(res.args != null){

                for(key of Object.keys(res.args)){

                    if (document.getElementById(key)){ //if such id doesn't exists, than object will return null which is false
            
                        document.getElementById(key).value = res.args[key];
                    }

                }
            }
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    };
    
    xhr.send(fdata);
}

//*********************************************************************************** */
ui.submit = function(){ //request can be insert or update
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    fdata.append("in1",document.getElementById("in1").value);

    fdata.append("in2",document.getElementById("in2").value);

    fdata.append("doc1",document.getElementById("doc1").files[0]);

    fdata.append("doc2",document.getElementById("doc2").files[0]);

    fdata.append("doc3",document.getElementById("doc3").files[0]);

    xhr.open('POST',"http://localhost:"+ui.port,true)

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)
            
            alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            ui.download(resobj[0],resobj[1])
        }
        else if (this.readyState == 4 && this.status != 200){
            alert(this.responseText)
        }

    }

    xhr.send(fdata);     
}

//*********************************************************************************** */
ui.combinefromfolder = function(){ //request can be insert or update
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    fdata.append("request","combinefromfolder");

    document.getElementById("reorder_tb").innerHTML = ''

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
ui.encodepdf = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    document.getElementById("reorder_tb").innerHTML = ''

    password = prompt("Insert password", "123456")

    if (password == null){
        return
    }

    fdata.append("request","encodepdf");
    fdata.append("password",password);
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
//********************************************************************************************** */
ui.reorder_showdoc = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    document.getElementById("reorder_tb").innerHTML = ''

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
    var placesmap = new Map();
    var imgmap = new Map();
    var wheremove = 0;
    var j = 0;

    for (let eachpage of pagechecks){
        placesmap.set(parseInt(eachpage.dataset.check),parseInt(eachpage.previousSibling.firstChild.dataset.img))
        imgmap.set(parseInt(eachpage.previousSibling.firstChild.dataset.img),[eachpage.previousSibling.firstChild.src,eachpage.previousSibling.firstChild.style.transform,eachpage.previousSibling.firstChild.style.filter])
    }

    var prevmove = 0;

    for (let eachpage of pagechecks){
        if(eachpage.checked == true){

            movercheck = parseInt(eachpage.dataset.check) + prevmove //mover's current place

            moverimg = placesmap.get(movercheck)//movers id

            wheremove = Math.min(Math.max(movercheck + moverate,0),placesmap.size-1) //movement no less than to 0 and no more than to last page

           
            if (moverate < 0){
                for (let i = movercheck - 1; i >= wheremove; i--){
                    let currentimg_in_place = placesmap.get(i)
                    placesmap.set(i+1,currentimg_in_place)
                }
                placesmap.set(wheremove,moverimg)
                prevmove = prevmove + 1 
            }
            if (moverate > 0){
                for (let i = movercheck + 1; i <= wheremove; i++){
                    let currentimg_in_place = placesmap.get(i)
                    placesmap.set(i-1,currentimg_in_place)
                }
                placesmap.set(wheremove,moverimg)
                prevmove = prevmove -1 //accumulating. for example, if page 0,1 moved to the end, page 2 will now be 2-2 = 0
            }
            
            eachpage.checked = false
        }
    }

    var tbody = "<tbody>"

    for(j=0; j<imgmap.size; j++){

        if((j+1)%4 == 1){
            tbody+= "<tr>"
        }
        tbody+=`<td><label for="check_${j}" style="vertical-align:bottom"><img src="${imgmap.get(placesmap.get(j))[0]}" width="150" height="150" id="img_${placesmap.get(j)}" data-img="${placesmap.get(j)}" style="transform: ${imgmap.get(placesmap.get(j))[1]}; filter: ${imgmap.get(placesmap.get(j))[2]};"><small>${placesmap.get(j)+1}</small></label><input type="checkbox" name="pagechecks" id="check_${j}" data-check="${j}">`;
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


