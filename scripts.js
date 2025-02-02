function loadPage(page) {
    fetch(page + '.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            if (page === 'wiki') {
                initializeWiki();
            }
        })
        .catch(error => {
            document.getElementById('content').innerHTML = '<h1>Page Not Found</h1><p>The requested page was not found.</p>';
        });
}

function initializeWiki() {
    const categories = document.querySelectorAll('.wiki-category');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
}

function loadWikiPage(term) {
    fetch(`wiki/${term}.html`)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                return '<h1>Page Not Found</h1><p>The requested wiki page was not found.</p>';
            }
        })
        .then(data => {
            document.getElementById('wikiContent').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('wikiContent').innerHTML = '<h1>Error</h1><p>There was an error loading the wiki page.</p>';
        });
}

// Load the home page by default
window.onload = () => loadPage('home');





        let url = "example.com";
        $(document).ready(() => {
            $.getJSON("https://api.mcsrvstat.us/1/" + url, (status) => {
                if (status.debug.ping) {
                    $("#motd").append(status.motd.raw);
                    $("#status").append("On");
                    $("#version").append(status.version);
                    $("#players_num").append(status.players.online + "/" + status.players.max)
                    $.each(status.players.list, function (index, player) {
                        $("#players_list").append("<li>" + player + "</li>")
                    });
                } else {
                    $("#motd").append(status.hostname);
                    $("#status").append("Off");
                    $("#version").hide();
                    $("#players_num").hide();
                }
                $("body").fadeIn(2000);
            });
        });
