# QA Checklist: Field Data Collection for TTFS

This checklist ensures that all field data (tree locations, canopy coverage, temperature, etc.) is accurately collected, verified, and standardized before being integrated into the dashboard.

## 1. Tree Locations & Basic Attributes
- [ ] **GPS Coordinates:** Are the latitude and longitude recorded in decimal degrees (e.g., 26.3023, -98.1743)?
- [ ] **Accuracy:** Was the GPS accuracy within acceptable limits (< 5 meters)?
- [ ] **Species Identification:** Is the tree species correctly identified and logged with both common and scientific names?
- [ ] **Tree Status:** Is the health status of the tree logged (e.g., Excellent, Good, Fair, Poor, Dead)?

## 2. Canopy Coverage
- [ ] **Measurement Method:** Was a standardized method used to measure canopy width (e.g., drip line to drip line)?
- [ ] **Data Units:** Are the measurements recorded in consistent units (feet or meters)?
- [ ] **Photographic Evidence:** Is there a clear, unobstructed photo of the canopy attached to the record?
- [ ] **Consistency Check:** Does the measured canopy size logically align with the tree's age and species?

## 3. Temperature & Microclimate
- [ ] **Sensor Placement:** Were temperature readings taken at a standardized height and distance from the trunk?
- [ ] **Time of Day:** Are the time and date of the temperature reading recorded?
- [ ] **Ambient vs. Surface:** Are both ambient air temperature and surface temperature (if required) clearly distinguished?
- [ ] **Calibration:** Were the temperature sensors or thermal cameras calibrated prior to use?

## 4. Data Entry & Formatting
- [ ] **Missing Values:** Have all mandatory fields been filled in without any blanks or 'NA' unless justified?
- [ ] **Formatting Consistency:** Are dates logged in a standard format (e.g., YYYY-MM-DD)?
- [ ] **Duplicates Check:** Has the dataset been checked for duplicate entries or overlapping coordinates?
- [ ] **Notes & Observations:** Are there any field notes for anomalies (e.g., damage, pests, nearby construction) documented clearly?

## 5. Pre-Dashboard Validation
- [ ] **Export Format:** Is the final dataset formatted as a clean CSV or GeoJSON for the dashboard?
- [ ] **Test Import:** Has a sample of the data been successfully test-loaded into the dashboard map without errors?
- [ ] **Review Sign-off:** Has the lead researcher or project manager reviewed and approved the dataset?
