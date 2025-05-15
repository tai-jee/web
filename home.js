// shortcut links to socials
if (qs.s !== "undefined" && qs.s) {
    switch (qs.s) {
        case "github":
            url = "https://github.com/tai-jee/";
            break;
        case "twitch":
            url = "https://www.twitch.tv/taijeeee";
            break;
        case "youtube":
            url = "https://www.youtube.com/@tai-jee";
            break;
        default:
            url = new URL(window.location.href);
            url.searchParams.delete("s");
    }

    window.location.href = url;
}

async function updateStatus() {
    try {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://pastebin.com/raw/RS2K4xL3')}?nocache=${Date.now()}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            const statusElements = document.querySelectorAll('.status');
            const statuses = data.contents.split("\r\n");
            
            statusElements.forEach(element => {
                var status = statuses[Math.floor((Math.random() * statuses.length))];
                element.innerHTML = (status == "\\" ? "" : `"${status}"`);
            });
        });


    } catch (error) {
        console.error('Could not fetch or update status:', error);
        const statusElements = document.querySelectorAll('.status');
        statusElements.forEach(element => {
            element.innerHTML = "Status Unavailable";
        });
    }
}

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

updateStatus();

document.getElementById("age").innerHTML = _calculateAge(new Date("2008-01-25T22:55"));