$(document).ready(() => {
    $("#btncourse").click(() => {
        $("#btncourse").addClass("active");
        $("#btnproject").removeClass("active");
        $("#btncontact").removeClass("active");
        $("#btnrepos").removeClass("active");
    });
    $("#btnproject").click(() => {
        $("#btnproject").addClass("active");
        $("#btncourse").removeClass("active");
        $("#btncontact").removeClass("active");    
        $("#btnrepos").removeClass("active");
    });
    $("#btncontact").click(() => {
        $("#btncontact").addClass("active");
        $("#btncourse").removeClass("active");
        $("#btnproject").removeClass("active");
        $("#btnrepos").removeClass("active");
    });
    $("#btnrepos").click(() => {
        $("#btnrepos").addClass("active");
        $("#btncontact").removeClass("active");
        $("#btncourse").removeClass("active");
        $("#btnproject").removeClass("active");
    });
    $.ajax({
        url: "https://api.github.com/users/ezynook/repos",
        type: 'GET',
        dataType: 'jsonp',
        CORS: true ,
        contentType:'application/json',
        secure: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(""));
        },
        success: function (data){
            let html = "";
            $.each(data.data, (k,v) => {
                html += `
                    <tr>
                        <td>${v.name}</td>    
                        <td>${v.full_name}</td>     
                    </tr>
                `;
            });
            $("#tbody").append(html);
        }
    });
});