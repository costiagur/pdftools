
myfunc = new Object();
//*********************************************************************************** */
myfunc.msg = function(title,msg_txt){
    document.getElementById("msg_title").innerHTML = title
    document.getElementById("msg_txt").innerHTML = msg_txt
    document.getElementById("msg_dg").showModal()
}
//********************************************************************************************* */
myfunc.response = function(inid,intxt){
    document.getElementById(inid + "_res").innerHTML = intxt
    document.getElementById("response_dg").showModal()
}
//********************************************************************************************* */
myfunc.resp_close = function(){
    document.getElementById("response_dg").close();
    
    resnames = document.getElementsByName("inres")
    
    for (resnm of resnames){
        resnm.innerHTML = ""
    }
}
//********************************************************************************************* */
myfunc.download = function(filename, filetext){

    var a = document.createElement("a");

    document.body.appendChild(a);

    a.style = "display: none";

    a.href = 'data:application/octet-stream;base64,' + filetext;

    a.download = filename;

    a.click();

    document.body.removeChild(a);

}
//********************************************************************************************* */
myfunc.sendrequest = function(fdata){
    return new Promise((resolve) =>{
        var xhr = new XMLHttpRequest();
    
        document.getElementById("loader").style.display='block'; //display loader
    
        xhr.open('POST',"http://localhost:"+ui.port,true)
    
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
                document.getElementById("loader").style.display='none'; //display loader

                resobj = JSON.parse(this.responseText);
                resolve(resobj)

            }
            else if (this.readyState == 4 && this.status != 200){
                document.getElementById("loader").style.display='none'; //display loader
                resolve(["Error",this.responseText])

            }
        }
    
        xhr.send(fdata);
    })
}

//*********************************************************************************** */
myfunc.combinefromfolder = async function(){ //request can be insert or update
    var fdata = new FormData();

    fdata.append("request","combinefromfolder");

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';

    const resobj = await myfunc.sendrequest(fdata)
    if (resobj[0] == "Error"){
        myfunc.msg(resobj[0], resobj[1])
    }
    else if (resobj[0] == 'saved'){
        myfunc.msg('Info','saved to folder')
        return
    }
    else{
        myfunc.download(resobj[0],resobj[1])
    }
}

//*********************************************************************************** */
myfunc.addpagenums = async function(){ //request can be insert or update
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

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg( resobj[0], resobj[1])
    }
    else{
        if (atob(resobj[1]) == 'saved'){
            myfunc.msg('Info','saved to folder')
            return
        }
        else{
            myfunc.download(resobj[0],resobj[1])
        }
    }
}

//********************************************************************************************* */
myfunc.encodepdf = async function(answer){
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

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg( resobj[0], resobj[1])
    }
    else{
        if (atob(resobj[1]) == 'saved'){
            myfunc.msg('Info','saved to folder')
            return
        }
        else{
            myfunc.download(resobj[0],resobj[1])
        }
    }
}
//********************************************************************************************* */
myfunc.mergepdfs = async function(){
    var fdata = new FormData();

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';

    fdata.append("request","mergepdfs");
    
    for (let i=0; i<document.getElementById("upload_mergepdfs").files.length;i++){
        
        fdata.append(`uploadpdfs_${i}`,document.getElementById("upload_mergepdfs").files[i]);
    }

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg(resobj[0], resobj[1])
    }
    else if (resobj[0] == 'saved'){
        myfunc.msg('Info','saved to folder')
        return
    }
    else{
        myfunc.download(resobj[0],resobj[1])
    }
}
//********************************************************************************************* */
myfunc.splitpdf = async function(){
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

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg( resobj[0], resobj[1])
    }
    else{
        if (atob(resobj[1]) == 'saved'){
            myfunc.msg('Info','saved to folder')
            return
        }
        else{
            myfunc.download(resobj[0],resobj[1])
        }
    }
}
//********************************************************************************************* */
myfunc.splitbyn = async function(){
    var fdata = new FormData();

    fdata.append("request","splitbyn");
    
    fdata.append('uploadpdf',document.getElementById("upload_splitbyn").files[0]);

    splitn = prompt("How many pages to split by", "1")

    if (splitn == null){
        return
    }

    fdata.append('splitn',splitn);

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg(resobj[0], resobj[1])
    }
    else{
        if (atob(resobj[1]) == 'saved'){
            myfunc.msg('Info','saved to folder')
            return
        }
        else{
            myfunc.download(resobj[0],resobj[1])
        }

    }
}
//********************************************************************************************* */
myfunc.addblankpage = async function(){
    var fdata = new FormData();

    fdata.append("request","addblankpage");
    
    fdata.append('uploadpdf',document.getElementById("upload_addblankpage").files[0]);

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg(resobj[0], resobj[1])
    }
    else{
        if (atob(resobj[1]) == 'saved'){
            myfunc.msg('Info','saved to folder')
            return
        }
        else{
            myfunc.download(resobj[0],resobj[1])
        }

    }
}
//********************************************************************************************* */
myfunc.watermark = async function(){
    var fdata = new FormData();

    document.getElementById("watermark_diag").close()

    document.getElementById("reorder_tb").innerHTML = ''
    document.getElementById('reorderbts').style.display = 'none';

    fdata.append("request","watermark");

    fdata.append("upload_waterclean",document.getElementById("upload_waterclean").files[0]);
    fdata.append("upload_watermark",document.getElementById("upload_watermark").files[0]);

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg( resobj[0], resobj[1])
    }
    else{
        if (atob(resobj[1]) == 'saved'){
            myfunc.msg('Info','saved to folder')
            return
        }
        else{
            myfunc.download(resobj[0],resobj[1])
        }
    }
}

//********************************************************************************************* */
myfunc.renamebyregex = async function(testorrun){
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

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg( resobj[0], resobj[1])
    }
    else{
        if (atob(resobj[1]) == 'saved'){
            myfunc.msg('Info','saved to folder')
            return
        }
        else{
            myfunc.download(resobj[0],resobj[1])
        }
    }
}

//********************************************************************************************** */
myfunc.reorder_showdoc = async function(){
    var fdata = new FormData();
    
    fdata.append("request","reorder_showdoc");
    
    fdata.append('uploadpdf',document.getElementById("upload_reorder").files[0]);

    document.getElementById("reorder_tb").innerHTML = ''

    const resobj = await myfunc.sendrequest(fdata)
    //console.log(resobj)
    
    if (resobj[0] == "Error"){
        myfunc.msg(resobj[0], resobj[1])
    }
    else{
        let tbody = "<tbody>"

        for(var i=0; i<resobj.length; i++){
                if((i+1)%4 == 1){
                    tbody+= "<tr>"
                }
                tbody+=`<td data-ind="${i}" data-img="${i}"><img draggable="true" src="${resobj[i]}" width="150" height="150" id="img_${i}" data-img="${i}" style="transform: rotate(0deg); filter: blur(0px)"><small>${i+1}</small>`;
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

        myfunc.addlisteners()
    }
}
//******************************************************************************************* */
myfunc.addlisteners = function(){
    var eachtd = ''
    var imgmap = new Object();
    var fromind = 0;
    var toind = 0;
    var imgs = document.getElementsByTagName("img")
    var tds = document.getElementById("reorder_tb").getElementsByTagName("TD")

    for (eachtd of tds){
        imgmap[eachtd.firstChild.dataset.img] = [eachtd.firstChild.src,eachtd.firstChild.style.transform,eachtd.firstChild.style.filter];
    }

    window.addEventListener("keydown", (event) => {
        if (event.code == "Delete"){
            myfunc.delpage()
        }
        else if(event.code == "ArrowRight" || event.code == "ArrowLeft"){

            for (eachtd of tds){
                if (eachtd.classList.contains("checked") == true){
                    fromind = parseInt(eachtd.dataset.ind)
                    myfunc.moveonepage(imgmap,fromind,(event.code == "ArrowRight")?fromind+1:fromind-1)
                }
            }
        }
    },true)

    for (eachimg of imgs){
        eachimg.addEventListener('dblclick', (e) => {window.open(e["target"].src,"_blank")})
        eachimg.addEventListener('click',(e) =>{if (e["target"].parentNode.tagName == "TD"){
            e["target"].parentNode.classList.toggle("checked")}
        })
        eachimg.addEventListener('dragover', (e)=> {e.preventDefault();});
        eachimg.addEventListener('dragstart', (e) => {
            if (e["target"].parentNode.tagName == "TD"){
                e["target"].parentNode.classList.toggle("checked")
                fromind = parseInt(e["target"].parentNode.dataset.ind);  // Store the ID of the dragged image
        }})
        eachimg.addEventListener('drop', (e)=> {
            e.preventDefault();
            toind = parseInt(e["target"].parentNode.dataset.ind)
            myfunc.moveonepage(imgmap,fromind,toind)
        });
    }
}

//******************************************************************************************* */
myfunc.moveonepage = function(imgmap,fromind, toind){

    var tds = document.getElementById("reorder_tb").getElementsByTagName("TD");

    var tdmap = new Object();
    var j = 0;

    for (let eachtd of tds){
        tdmap[parseInt(eachtd.dataset.ind)] = eachtd.dataset.img;
    }

    var moving = tdmap[fromind] 

    for(j=fromind;j < tds.length-1;j++){
            tdmap[j] = tdmap[j+1]
    }

    for(j=tds.length;j > toind;j--){
        tdmap[j] = tdmap[j-1]
    }

    tdmap[toind] = moving
        
    tds[toind].classList.remove("checked")
    
    var tbody = "<tbody>"

    for(j=0; j<tds.length; j++){

        if((j+1)%4 == 1){
            tbody+= "<tr>"
        }
        
        tbody+=`<td data-ind="${j}" data-img = "${tdmap[j]}"><img draggable="true" src="${imgmap[tdmap[j]][0]}" width="150" height="150" id="img_${tdmap[j]}" data-img="${tdmap[j]}" style="transform: ${imgmap[tdmap[j]][1]}; filter: ${imgmap[tdmap[j]][2]};"><small>${parseInt(tdmap[j])+1}</small>`;
        
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

    myfunc.addlisteners()
}
//********************************************************************************************* */
myfunc.rotatepage = function(){
    var pagechecks = document.getElementsByClassName("checked");
    var eachpage=''
    var rotatestage = ''
    const regex = /[0-9]/g;
    var newrotate = 0

    for (eachpage of pagechecks){
            rotatestage = eachpage.firstChild.style.transform
            rotateint = parseInt(rotatestage.match(regex).join(''))
            newrotate = (rotateint/90 +1)*90 % 360
            eachpage.firstChild.style.transform = `rotate(${newrotate}deg)` 
    }
}
//********************************************************************************************* */
myfunc.delpage = function(){
    var pagechecks = document.getElementsByClassName("checked");
    var eachpage=''
    var deletestage = '0px'

    for (eachpage of pagechecks){
            deletestage = eachpage.firstChild.style.filter
            if (deletestage == 'blur(0px)'){
                eachpage.firstChild.style.filter= 'blur(5px)';
            }
            else{
                eachpage.firstChild.style.filter= 'blur(0px)';
            }
            eachpage.classList.toggle("checked")
    }
}
//********************************************************************************************** */
myfunc.finalizereorder = async function(){
    var fdata = new FormData();
    var placesobj = {};
    var tds = document.getElementById("reorder_tb").getElementsByTagName("TD");
    const regex = /[0-9]/g;

    for (let td of tds){
        let rotatestage = td.firstChild.style.transform
        let rotate = rotatestage.match(regex).join('')
        let deletestage = td.firstChild.style.filter

        placesobj[td.dataset.ind] = [td.firstChild.dataset.img,rotate,(deletestage == 'blur(0px)')?0:1]
    }

    fdata.append("request","reorder_commit");
    
    fdata.append("placesobj",JSON.stringify(placesobj));

    console.log(JSON.stringify(placesobj))

    fdata.append('uploadpdf',document.getElementById("upload_reorder").files[0]);

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg( resobj[0], resobj[1])
    }
    else{
        myfunc.download(resobj[0],resobj[1])
    }
}
//********************************************************************************************* */
myfunc.selectall = function(){

    var pagechecks = document.getElementsByClassName("checked");

    if (pagechecks[0].checked == true){
        for (let eachpage of pagechecks){
            eachpage.classList.remove("checked")
        }
    }
    else{
        for (let eachpage of pagechecks){
            eachpage.classList.add("checked")
        }
    }

}
//********************************************************************************************* */
myfunc.ocrfile_upload = async function(){
    var fdata = new FormData();

    if(document.getElementById("ocrfile_upload").files.length == 0){
        return
    }
    
    fdata.append("request", "firstpage");
    fdata.append("pdffile",document.getElementById("ocrfile_upload").files[0])

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg( resobj[0], resobj[1])
    }
    else{
        document.getElementById("onepage").innerHTML=`<img width='300' height='424' src=${resobj} id="firstpage" style="w3-border">`
    }
}
//********************************************************************************************* */
myfunc.rollangle = function(){
    document.getElementById("firstpage").style.transform = `rotate(${document.getElementById("rollangle").value}deg)`
    document.getElementById("rollangle_val").innerHTML=document.getElementById("rollangle").value
}
//********************************************************************************************* */
myfunc.brighten = function(){
    document.getElementById("firstpage").style.filter = `brightness(${document.getElementById("brightness").value})`
    document.getElementById("brightness_val").innerHTML=document.getElementById("brightness").value
}
//********************************************************************************************* */
myfunc.doocr = async function(onepage){
    var fdata = new FormData();

    if(document.getElementById("ocrfile_upload").files.length == 0){
        return
    }
    
    fdata.append("request", "do_ocr");
    fdata.append("pdffile",document.getElementById("ocrfile_upload").files[0])
    fdata.append("onepage", onepage);
    fdata.append("rollangle", document.getElementById("rollangle").value);
    fdata.append("brightness", document.getElementById("brightness").value);

    const resobj = await myfunc.sendrequest(fdata)
    if ( resobj[0] == "Error"){
        myfunc.msg( resobj[0], resobj[1])
    }
    else{
         myfunc.download(resobj[0],resobj[1])
    }
}




