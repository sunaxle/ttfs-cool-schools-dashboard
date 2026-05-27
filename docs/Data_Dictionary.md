# Field Data Dictionary (v0.1)
This dictionary describes the required variables and data types for the Environmental Monitoring database.

## Dataset: Tree Location and Health
*   **Tree_ID**: Unique identifier for each tree (String, e.g., "MHS-001")
*   **Campus**: Name of the school campus (String, e.g., "Mercedes High School")
*   **Species_Common**: Common name of the tree (String)
*   **Species_Scientific**: Scientific name of the tree (String)
*   **Latitude**: GPS Latitude (Float, Decimal degrees, e.g., 26.1350)
*   **Longitude**: GPS Longitude (Float, Decimal degrees, e.g., -97.9080)
*   **Status**: Health status (Categorical: Excellent, Good, Fair, Poor, Dead)
*   **Canopy_Width_ft**: Measured width of the tree canopy in feet (Float)
*   **Height_Estimate_ft**: Estimated height of the tree in feet (Float)

## Dataset: Climate and Remote Sensing Baseline
*   **Campus**: Name of the school campus
*   **MeanTemp_C**: Mean surface temperature across the campus bounds in Celsius (Float)
*   **MaxTemp_C**: Maximum surface temperature in Celsius (Float)
*   **CanopyPct**: Percentage of the campus area covered by tree canopy (Float)
*   **ImperviousPct**: Percentage of the campus area covered by impervious surfaces (Float)
*   **BaselineYear**: The year the baseline data was established (Integer)
