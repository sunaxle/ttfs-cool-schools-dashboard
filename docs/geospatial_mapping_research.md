# Geospatial Mapping Research: Thermal and LST Data for the Rio Grande Valley

## Executive Summary
This report synthesizes findings on existing thermal mapping and Land Surface Temperature (LST) data for the Rio Grande Valley (RGV), with a specific focus on Hidalgo County and the city of Donna. It outlines resources identifying the urban heat island (UHI) effect in South Texas and details the stark temperature contrasts between shaded (tree canopy) and unshaded (asphalt/concrete) surfaces.

## 1. Existing UHI Data & Thermal Mapping in the RGV
Rapid urbanization and vegetation loss in the RGV have exacerbated the urban heat island effect, making it a critical area of study.

### Key Resources and Datasets
* **Satellite Remote Sensing (Landsat & MODIS):** Researchers frequently utilize thermal infrared data from Landsat (Level-2 imagery) and MODIS to map urban heat hotspots across South Texas. These datasets are foundational for calculating Land Surface Temperature (LST).
* **ArcGIS Living Atlas & Shaded Releaf:** Projects like "Shaded Releaf" provide accessible data layers on ArcGIS Online for communities in the RGV. These layers incorporate LST, albedo, and urban tree canopy coverage, helping visualize heat distribution.
* **Google Earth Engine (GEE):** A powerful tool for analyzing multi-decadal satellite datasets (Landsat/Sentinel) to track LST changes and vegetation indices (NDVI) over time in Hidalgo County.
* **NASA Earthdata (VEDA Dashboard):** Offers tools to visualize changes in LST and vegetation, providing a macro view of the region's thermal dynamics.

### Drivers of the UHI Effect in the Region
* **Impervious Surfaces:** The proliferation of asphalt and concrete, which absorb and retain solar radiation.
* **Land Cover Change:** Conversion of agricultural or natural land into dense urban environments, reducing evaporative cooling.
* **Vegetation Loss:** Reduced tree canopy limits natural shading and evapotranspiration.

## 2. Temperature Contrasts: Shade vs. Asphalt/Concrete
Data specific to the intense summer heat of South Texas highlights a dramatic contrast between exposed built materials and shaded areas.

* **Unshaded Asphalt and Concrete:** These materials act as heat sinks. In extreme heat environments like the RGV, unshaded black asphalt can reach surface temperatures of **160°F to 170°F** during peak summer days.
* **Shaded Tree Canopy:** Tree canopies act as natural air conditioners. Research shows that surface temperatures under a dense tree canopy can be **20°F to 45°F cooler** than adjacent unshaded surfaces. Shaded areas often remain closer to ambient air temperatures (e.g., 95°F–104°F) while exposed asphalt reaches hazardous levels.
* **Impact:** This massive temperature differential is critical for human health (reducing heat stress for students and outdoor workers) and infrastructure (slowing pavement degradation).

## 3. Methodology Notes for the Cool Schools Dashboard
To integrate these findings into the TTFS UTRGV Cool Schools Dashboard while adhering to the project's Privacy-First Architecture (FERPA/COPPA):
* **Data Aggregation:** LST and canopy data should be aggregated at the campus or neighborhood level using census tracts or school boundaries to avoid any pinpointing of individual student locations.
* **Integration of Map Layers:** Leverage ArcGIS REST APIs or processed Google Earth Engine outputs to display LST heatmaps layered beneath school campus polygons. 
* **Focus on Contrast:** The dashboard should visually highlight the "shade vs. exposed" dynamic (the 20°F-45°F difference) to emphasize the value of the Texas Trees Foundation's tree planting initiatives at specific schools.
* **Visual Identity:** Ensure the map interface adheres to a clean, "human-analog" split-screen layout—with a static map on one side and contextual data on the other—avoiding overly complex UI elements.

## Conclusion
The data clearly demonstrates that targeted tree planting in Hidalgo County (e.g., Donna) can dramatically reduce hazardous surface temperatures on school campuses. By utilizing public datasets like Landsat and ArcGIS Living Atlas layers, the Cool Schools Dashboard can effectively visualize the UHI effect and the cooling power of tree canopies without compromising user privacy.
