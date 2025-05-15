const ramblingsHeader = document.getElementById("ramblings-header");
const ramblingsContainer = document.getElementById("ramblings-container");
const ramblingsViewer = document.getElementById("ramblings-viewer");

const sdConverter = new showdown.Converter();

const ramblingsCardTemplate = `
            <span class="ramblings-title">{{title}}</span>
            <span class="ramblings-date">{{ts}}</span>`

// fetch(`https://api.github.com/repos/tai-jee/ramblings/git/trees/main?recursive=1`)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => {
//         const dirs = data.tree;
//         const newCard = document.createElement("")
//     });

const ramblingsTreeUrl = "https://api.github.com/repos/tai-jee/ramblings/git/trees/main?recursive=1";
var posts = {};

fetch(ramblingsTreeUrl)
    .then(response => response.json())
    .then(async treeData => {
        const files = treeData.tree.filter(
            f => f.type === "blob" && f.path.split("/").length === 2
        );

        for (const file of files) {
            const [folder, filename] = file.path.split("/");

            const fileResponse = await fetch(file.url);
            const fileData = await fileResponse.json();
            const fileContent = atob(fileData.content.replace(/\n/g, ''));

            if (!posts[folder]) posts[folder] = {};
            posts[folder][filename] = filename.endsWith('.json') ? JSON.parse(fileContent) : fileContent;
        }

        for (const folder of Object.keys(posts)) {
            const card = document.createElement("a");

            var postDate = new Date(posts[folder]["m.json"].ts * 1000);
            var postDateString = postDate.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });


            card.classList.add("ramblings-card");
            card.innerHTML = ramblingsCardTemplate
                .replace("{{title}}", posts[folder]["m.json"].t)
                .replace("{{ts}}", postDateString);

            const url = new URL(window.location.href);
            url.searchParams.set("pid", folder);
            card.href = url;

            ramblingsContainer.appendChild(card);
        }

        checkPIDParam();
    })
    .catch(err => {
        console.error("Error:", err);
    });

function sendHome() {
    const url = new URL(window.location.href);
    url.searchParams.delete("pid");
    window.location.href = url;
}

function checkPIDParam() {
    console.log(Object.keys(posts));
    if (qs.pid !== "undefined" && qs.pid) {
        if (!Object.keys(posts).includes(qs.pid.toString())) sendHome();

        else {
            ramblingsContainer.style.display = "none";
            ramblingsViewer.style.display = "block";
            ramblingsHeader.innerHTML = `<i onclick="sendHome()" class="ph-fill ph-arrow-fat-left back-button"></i> ${posts[qs.pid]["m.json"].t}`;

            const convertedContent = sdConverter.makeHtml(posts[qs.pid]["c.md"]);
            ramblingsViewer.innerHTML = convertedContent;
        }
    }
}
