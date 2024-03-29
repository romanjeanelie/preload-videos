const videoUrls = [
  "./videos/1.webm",
  "./videos/2.webm",
  "./videos/3.webm",
  "./videos/4.webm",
  "./videos/5.webm",
  "./videos/6.webm",
  "./videos/7.webm",
  "./videos/8.webm",
  "./videos/9.webm",
  "./videos/10.webm",
  "./videos/11.webm",
  "./videos/12.webm",
];

// Fonction pour charger une vidéo en tant qu'objet Blob
const loadVideoBlobAsync = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";

    xhr.onload = function () {
      if (xhr.status === 200) {
        const videoBlob = new Blob([xhr.response], { type: "video/mp4" });

        // Stocker la vidéo dans un objet global (window)
        window.preloadedVideos = window.preloadedVideos || {};
        window.preloadedVideos[url] = videoBlob;

        resolve({ status: "fulfilled", value: videoBlob });
      } else {
        reject({ status: "rejected", reason: `Failed to load video: ${url}` });
      }
    };

    xhr.onerror = function () {
      reject({ status: "rejected", reason: `Failed to load video: ${url}` });
    };

    xhr.send();
  });
};

// Options pour la fonction de préchargement des vidéos
export const preloadVideos = async (options) => {
  const { onComplete } = options;
  console.log("preloading...");

  try {
    const results = await Promise.allSettled(videoUrls.map((url) => loadVideoBlobAsync(url)));

    const successfulVideos = results.filter((result) => result.status === "fulfilled").map((result) => result.value);

    console.log("All videos preloaded", successfulVideos);

    if (onComplete && typeof onComplete === "function") {
      onComplete();
    }
  } catch (error) {
    console.error("Error during preloading videos", error);
  }
};
