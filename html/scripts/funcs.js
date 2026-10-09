//////////

//////////

async function updateSteamData() {
  const response = await fetch(
    "https://taijee-personal-site-proxy.itsme-540.workers.dev/steam",
  );
  const data = await response.json();
  console.log("STEAM DATA: ", data);
}

updateSteamData();

//////////

async function updateLastfmData() {
  const historyItemTemplate = document.querySelector(
    "#music-history-item-template",
  );
  const trackHistoryContainer = document.querySelector("#recent-tracks");

  const response = await fetch(
    "https://taijee-personal-site-proxy.itsme-540.workers.dev/lastfm",
  );
  const data = await response.json();

  const recentTracks = data.recenttracks.track.slice(0, 5);

  console.log(historyItemTemplate);

  recentTracks.forEach((track) => {
    let e = document.importNode(historyItemTemplate.content, true);
    let trackDiv = e.querySelector(".music-history-item");
    trackDiv.querySelector(".track-title").textContent = track.name;
    trackDiv.querySelector(".track-artist").textContent = track.artist["#text"];
    if ("@attr" in track && track["@attr"].nowplaying === "true") {
      trackDiv.classList.add("now-playing");
    }
    trackHistoryContainer.appendChild(e);
  });

  console.log("LASTFM DATA: ", data);

  return recentTracks;
}

updateLastfmData();
