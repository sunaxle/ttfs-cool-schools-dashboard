# Modeling Assumptions (v0.1)
**Project:** TTFS UTRGV Cool Schools
**Date:** June 2026

## 1. Remote Sensing Baseline
*   **Surface Temperature (LST):** Derived from Landsat 8/9 Thermal Infrared Sensor (TIRS) Band 10 data. Assumes emissivity based on NDVI. 
*   **Canopy Coverage:** Derived using National Agriculture Imagery Program (NAIP) 1m resolution data paired with NDVI thresholding (NDVI > 0.4 indicates canopy).
*   **Albedo:** Estimated using Landsat surface reflectance. 

## 2. Heat Reduction Forecast Model
*   **Shade Impact:** Every 10% increase in continuous canopy cover over impervious surfaces is modeled to reduce ambient surface temperature by approximately 1.5°C to 2.5°C during peak summer hours, assuming mature tree size (15-20 years post-planting).
*   **Growth Rate:** The model assumes an average canopy growth rate of 1.5 feet in diameter per year for the selected native species.
*   **Evapotranspiration Cooling:** Contributes an additional localized cooling effect of up to 1°C in areas with dense plantings and adequate soil moisture.

## 3. Dashboard Ingestion Logic
*   Uploaded CSV/GeoJSON files are assumed to be in WGS84 coordinate reference system (EPSG:4326).
*   Measurements lacking timestamps are assigned the ingestion date as a default baseline.
*   Missing temperature or canopy values are excluded from the aggregate averages to prevent downward skewing.
