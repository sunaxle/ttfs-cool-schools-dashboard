# Historical Attendance Data Sources & Methodology

## Overview
This document outlines the methodology and sources used to collect historical attendance rates for school districts in Hidalgo County, Texas, specifically Donna ISD and Mercedes ISD, for integration into the TTFS UTRGV Cool Schools Project.

## Data Sources
The primary source of attendance data for Texas public schools is the **Texas Education Agency (TEA)** through its **Texas Academic Performance Reports (TAPR)** and **Public Education Information Management System (PEIMS)**.

*   **TEA TAPR Portal:** The official TEA database aggregates PEIMS submissions into annual performance reports, which include attendance rates.
*   **District Sources:** Publicly available district board meeting minutes and improvement plans were reviewed to identify higher granularity data.

## Granularity and Limitations
*   **Highest Available Granularity:** The publicly available historical data through TEA TAPR is at an **annual** granularity.
*   **Lack of Public Daily/Weekly Data:** While PEIMS collects more granular data internally (and the reporting structure is shifting to a six-weeks basis for the 2025-2026 school year), historical daily, weekly, or monthly attendance records are not generally published in public-facing dashboards or standard board meeting minutes.
*   **Data Matching Constraints:** Since the TTFS Cool Schools project intends to match this data against historical weather data, the annual granularity poses a significant limitation. To perform fine-grained correlations between extreme heat events and absenteeism, we will likely need to submit a formal Public Information Request (PIR) to the Donna ISD or Mercedes ISD PEIMS departments or secure a data-sharing agreement to access anonymized, campus-level daily attendance logs.

## Extracted Sample Data
The following data points were extracted from recent TAPR summaries:
*   **Donna ISD (2021-2022):** 87.2%
*   **Donna ISD (2022-2023):** 89.4%
*   **Mercedes ISD (2022-2023):** 91.7%

## Next Steps for Enhanced Granularity
To match weather data accurately:
1.  Submit a formal records request for campus-level daily attendance for the last 3-5 years.
2.  Ensure all requested data complies with the project's Privacy-First Architecture (FERPA/COPPA) by requesting aggregated or fully anonymized records without any PII.
