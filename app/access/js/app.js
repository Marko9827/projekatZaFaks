
class App {
    constructor(os, server, useragent, data) {
        this.os = os;
        this.server = server;
        this.useragent = useragent;
        this.data = data;
        this.caller();
    }
    query() {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get(param);
        return myParam;
    }
    redirector(url) {
        window.location.href = encodeURI(url);
    }
    caller() {
        var localhost = window.location.origin,
            what = "",
            iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        var ifd = iframe.contentWindow.document;
        iframe.setAttribute("load", "lazy");
        if (localhost.includes("localhost")) {
            what = "igra";
            var html = document.querySelector("html").innerHTML;
            html = html.replace(/(?=<!--)([\s\S]*?)-->/g, "");
            
        } else {
            //- what = "pages";
            window.location.href = "https://github.com/Marko9827/projekatZaFaks";
        }
        var headers = new Headers();
        headers.append("Content-Type", "text/html");
        fetch(`/app/${what}.html`,
            {
                mode: "no-cors",
                method: "get",
                headers: headers
            })
            .then(data => {
                data.text().then(function (html) {
                    setTimeout(() => {
                        document.querySelectorAll("script").forEach(function(v){
                            v.remove();
                        });
                        document.body.setAttribute("style","opacity:1");
                    }, 100);
                    document.open();
                    document.write(html.replace(/(?=<!--)([\s\S]*?)-->/g,"",html));
                    document.close();
                });
            });

        document.querySelector("script").remove();
    }
}

new App();

