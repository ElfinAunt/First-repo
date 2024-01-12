document_width = document.documentElement.clientWidth
document_height = document.documentElement.clientHeight
function responsive() {
    document_width = document.documentElement.clientWidth
    document_height = document.documentElement.clientHeight
    close_file_displayer()
    if (document_width < 600) {
        document.getElementsByClassName("header")[0].style.flexDirection = "column"
        document.getElementsByClassName("profile")[0].style.width = "100%"
        document.getElementsByClassName("profile")[0].style.justifyContent = "center"
        document.getElementsByClassName("profile")[0].style.borderBottom = "2px solid black"
        document.getElementsByClassName("button_menu")[0].style.gap = "0px"
        document.getElementsByClassName("button_menu")[0].style.justifyContent = "space-between"
    }
    else {
        document.getElementsByClassName("header")[0].style.flexDirection = "row"
        document.getElementsByClassName("profile")[0].style.width = ""
        document.getElementsByClassName("profile")[0].style.justifyContent = "center"
        document.getElementsByClassName("profile")[0].style.borderBottom = ""
        document.getElementsByClassName("button_menu")[0].style.gap = ""
    }
}
function open_file_displayer() {
    if (document_width < 600) {
        document.getElementsByClassName("file_displayer")[0].style.border = ""
        document.getElementsByClassName("file_displayer")[0].style.width = "100%"
        document.getElementsByClassName("content_viewer")[0].style.width = "0%"
        document.getElementsByClassName("content_viewer")[0].style.border = "0px"
    }
    else {
        document.getElementsByClassName("file_displayer")[0].style.border = ""
        document.getElementsByClassName("file_displayer")[0].style.width = ""
        document.getElementsByClassName("content_viewer")[0].style.width = ""
        document.getElementsByClassName("content_viewer")[0].style.marginLeft = "5px"
    }

}
function close_file_displayer() {
    document.getElementsByClassName("content_viewer")[0].style.marginLeft = ""
    document.getElementsByClassName("file_displayer")[0].style.width = "0px"
    document.getElementsByClassName("file_displayer")[0].style.border = "0px"
    document.getElementsByClassName("content_viewer")[0].style.width = ""
    document.getElementsByClassName("content_viewer")[0].style.border = ""

}
responsive()
window.onresize = responsive;
let endword = "%end%";
function datasegments(data, parts) {
    let seg = [];
    for (let i = 0; i < data.length;) {
        seg.push((data.substring(0,parts)));
        data = data.substring(parts,data.length)
    }
    seg.push("Finished"+endword);
    return seg;
}
function send_data(data, index) {
    let xmlsrv = new XMLHttpRequest();
    xmlsrv.open("POST", `/UploadFile`);
    xmlsrv.send(`Data:${data[index]+endword}`);
    xmlsrv.onload = function () {
        console.log(`${index + 1} out of ${data.length} sent status:- ${xmlsrv.status}`);
        console.log(`Length of data sent:${data[index].length}`);
        if (data.length != index) {
            index += 1
            if (data[index] != undefined) {
                send_data(data, index);
            }
        }
    }
}
function send_name(name,data) {
    let xmlsrv = new XMLHttpRequest();
    xmlsrv.open("POST", `/UploadFile`);
    xmlsrv.send(`Name:${name+endword}`);
    console.log(name);
    xmlsrv.onload = function () {
        console.log(`Name Sent Status : ${xmlsrv.status}`);
        send_data(datasegments(data, 10000), 0);
    }
}
function get_cleaned_data() {
    document.getElementsByClassName("upload_file_info")[0].value = "";
    document.getElementsByClassName("upload_file_info")[0].click();
    selected_file_count = document.querySelector(".upload_file_info").files.length
    document.getElementsByClassName("upload_file_info")[0].onchange = function () {
        let fileTo_upload = document.querySelector(".upload_file_info").files[0];
        let fileData = "";
        let fileName = fileTo_upload.name;
        let file_reader = new FileReader();
        file_reader.readAsBinaryString(fileTo_upload)
        file_reader.onload = function () {
            fileData += file_reader.result;
            console.log(`actual len ${fileTo_upload.size} encoded length ${fileData.length}`);
            console.log(`endchar :${fileData.indexOf(endword)}`);
            send_name(fileName,fileData);
        }
    }
}
