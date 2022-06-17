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
    }

    xhr.send(fdata);     
}

//*********************************************************************************** */
ui.combinefromfolder = function(){ //request can be insert or update
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    fdata.append("request","combinefromfolder");

     xhr.open('POST',"http://localhost:"+ui.port,true)

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            ui.download(resobj[0],resobj[1])
        }
    }

    xhr.send(fdata);     
}

//*********************************************************************************** */
ui.addpagenums = function(){ //request can be insert or update
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    startingpage = prompt("Which page will be the first?", "1")

    if (startingpage == null){
        return
    }

    fdata.append("request","addpagenums");
    fdata.append("startingpage",startingpage);
    fdata.append("uploadpdfs",document.getElementById("upload_pagenum").files[0]);

    xhr.open('POST',"http://localhost:"+ui.port,true)

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            ui.download(resobj[0],resobj[1])
        }
    }

    xhr.send(fdata);     
}

//********************************************************************************************* */
ui.encodepdf = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    password = prompt("Insert password", "123456")

    if (startingpage == null){
        return
    }

    fdata.append("request","encodepdf");
    fdata.append("password",password);
    fdata.append("uploadpdf",document.getElementById("upload_encodepdf").files[0]);

    xhr.open('POST',"http://localhost:"+ui.port,true)

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            ui.download(resobj[0],resobj[1])
        }
    }

    xhr.send(fdata); 
}
//********************************************************************************************* */
ui.mergepdfs = function(){
    var xhr = new XMLHttpRequest();
    var fdata = new FormData();

    fdata.append("request","mergepdfs");
    
    for (let i=0; i<document.getElementById("upload_mergepdfs").files.length;i++){
        
        fdata.append(`uploadpdfs_${i}`,document.getElementById("upload_mergepdfs").files[i]);
    }

    xhr.open('POST',"http://localhost:"+ui.port,true)

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   
            console.log(this.responseText)
            
            //alert(this.responseText)

            resobj = JSON.parse(this.responseText);

            ui.download(resobj[0],resobj[1])
        }
    }

    xhr.send(fdata); 

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


