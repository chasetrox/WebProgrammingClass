function parse() {
        var request = new XMLHttpRequest();
        request.open("GET", "data.json", true);
        request.onreadystatechange = fetch;
        request.send(null);

        function fetch() {
                if (request.readyState == 4 && request.status == 200) {
                        var messages = document.getElementById('messages');
                        var raw = request.responseText;
                        var json = JSON.parse(raw);
                        for (var index = 0; index < json.length; index++) {
                                var msg = createMessage(json[index]);
                                messages.appendChild(msg);
                        }
                } else if (request.status != 200) {
                        var messages = document.getElementById('messages');
                        messages.innerHTML = "Something went terribly wrong!";
                }
        }
}

function createMessage(data) {
        var div = document.createElement('div');
        div.className = "msg";
        var name = document.createElement('span');
        div.innerHTML = data["content"];
        name.innerHTML = data["username"];
        div.appendChild(name);
        return div;
}
