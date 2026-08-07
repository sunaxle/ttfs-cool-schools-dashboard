
(function () {
  const config = window.APP_CONFIG;
  const schoolSelect = document.getElementById("schoolSelect");
  const schoolName = document.getElementById("schoolName");
  const schoolAddress = document.getElementById("schoolAddress");
  const schoolCity = document.getElementById("schoolCity");
  const schoolCanopy = document.getElementById("schoolCanopy");
  const profileCanopy = document.getElementById("profileCanopy");
  const profileTrees = document.getElementById("profileTrees");
  const profileNotes = document.getElementById("profileNotes");
  const saveProfile = document.getElementById("saveProfile");

  const SCHOOL_PROFILE_KEY = "rg-school-profiles";

  /**
   * Loads all saved school profiles from localStorage.
   * @returns {Object} An object mapping school names to their profile data.
   */
  function loadProfiles() {
    try {
      return JSON.parse(localStorage.getItem(SCHOOL_PROFILE_KEY)) || {};
    } catch {
      return {};
    }
  }

  /**
   * Saves the provided profiles object to localStorage.
   * @param {Object} profiles - The object containing all school profiles.
   */
  function saveProfiles(profiles) {
    localStorage.setItem(SCHOOL_PROFILE_KEY, JSON.stringify(profiles));
  }

  /**
   * Applies a saved profile to the UI forms for the specified school.
   * @param {string} name - The name of the school to apply the profile for.
   */
  function applyProfile(name) {
    const profiles = loadProfiles();
    const profile = profiles[name] || {};
    profileCanopy.value = profile.canopy || "";
    profileTrees.value = profile.trees || "";
    profileNotes.value = profile.notes || "";
  }

  /**
   * Stores the current UI form values into a profile for the specified school.
   * @param {string} name - The name of the school to store the profile for.
   */
  function storeProfile(name) {
    const profiles = loadProfiles();
    profiles[name] = {
      canopy: profileCanopy.value,
      trees: profileTrees.value,
      notes: profileNotes.value
    };
    saveProfiles(profiles);
  }

  saveProfile.addEventListener("click", () => {
    const name = schoolSelect.value;
    if (!name) return;
    storeProfile(name);
    const originalText = saveProfile.textContent;
    saveProfile.textContent = "Saved!";
    saveProfile.style.backgroundColor = "#4CAF50";
    setTimeout(() => {
      saveProfile.textContent = originalText;
      saveProfile.style.backgroundColor = "";
    }, 2000);
  });

  window.require(
    ["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"],
    (Map, MapView, FeatureLayer) => {
      const map = new Map({ basemap: config?.map?.basemap || "streets-vector" });
      const schoolsLayer = new FeatureLayer({
        url: config.layers.schools.url,
        title: "Schools"
      });
      map.add(schoolsLayer);

      const view = new MapView({
        container: "schoolMap",
        map,
        center: config?.map?.center || [-97.96, 26.2],
        zoom: config?.map?.zoom || 11
      });

      schoolsLayer
        .queryFeatures({
          where: "1=1",
          outFields: ["*"],
          returnGeometry: false
        })
        .then((result) => {
          const features = result.features || [];
          features.forEach((feature) => {
            const option = document.createElement("option");
            option.value = feature.attributes[config.fields.schoolsName];
            option.textContent = feature.attributes[config.fields.schoolsName];
            schoolSelect.appendChild(option);
          });
          if (features.length) {
            schoolSelect.value = features[0].attributes[config.fields.schoolsName];
            schoolSelect.dispatchEvent(new Event("change"));
          }
        });

      schoolSelect.addEventListener("change", async () => {
        const name = schoolSelect.value;
        if (!name) return;
        const query = schoolsLayer.createQuery();
        query.where = `${config.fields.schoolsName} = '${name.replace(/'/g, "''")}'`;
        query.outFields = ["*"];
        query.returnGeometry = true;
        const results = await schoolsLayer.queryFeatures(query);
        const feature = results.features[0];
        if (!feature) return;
        view.goTo(feature.geometry);
        schoolName.textContent = name;
        schoolAddress.textContent = feature.attributes.FullAddress || "--";
        schoolCity.textContent = feature.attributes.City || "--";
        schoolCanopy.textContent = "--";
        applyProfile(name);
      });
    }
  );
})();
