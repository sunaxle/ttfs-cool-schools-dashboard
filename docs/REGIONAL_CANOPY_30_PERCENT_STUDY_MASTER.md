# 🌳 Regional 30% Tree Canopy Calculation Study — Master Reference

> **Source Documents:** Texas Trees Foundation, studioOutside Landscape Architecture, Heffner Design Team  
> **Participating Districts:** Donna ISD & Mercedes ISD (Rio Grande Valley, Texas)  
> **Total School Sites Evaluated:** 13 Campuses (14 Schools)  
> **Total Studied Land Area:** **8,449,178 sq ft** (~194.0 Acres)  
> **Total Plantable Green Space:** **3,896,912 sq ft** (~89.5 Acres)  
> **Total 30% Target Canopy:** **1,169,075 sq ft** (~26.8 Acres of Mature Shade)  
> **Existing Baseline Canopy:** **309,401 sq ft** (7.9% of Green Space)  
> **Total Additional Trees Needed:** **+661 Restorative Trees**  

---

## 1. Executive Master Table (All 13 Campus Sites)

$$\text{Additional Trees Needed} = \frac{\text{30\% Target Canopy Area (SF)} - \text{Existing Canopy Area (SF)}}{1,314\text{ sq ft / tree}}$$

| District | Campus Name | Site Area (Sq Ft) | Non-Programmed Green Space (Sq Ft) | 30% Target Canopy (Sq Ft) | Existing Canopy (Sq Ft) | Baseline Canopy % of Green Space | **Additional Trees Needed for 30%** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Donna ISD** | **Caceres & Rivas Elementary** | 711,254 | 310,213 | 93,064 | 42,824 | 13.8% | **+38 Trees** |
| **Donna ISD** | **Capt. D. Salinas Elementary** | 1,052,783 | 740,375 | 222,113 | 7,715 | 1.0% | **+163 Trees** |
| **Donna ISD** | **Singleterry Elementary** | 572,971 | 322,105 | 96,631 | 26,297 | 8.2% | **+54 Trees** |
| **Donna ISD** | **Stainke Elementary** | 518,386 | 246,970 | 74,091 | 17,393 | 7.0% | **+43 Trees** |
| **Donna ISD** | **A.M. Ochoa Elementary** | 438,155 | 149,131 | 44,739 | 15,567 | 10.4% | **+22 Trees** |
| **Donna ISD** | **Patricia S. Garza Elementary**| 620,126 | 341,987 | 102,596 | 22,362 | 6.5% | **+61 Trees** |
| **Donna ISD** | **A.P. Solis Middle School** | 854,776 | 346,783 | 104,035 | 19,741 | 5.7% | **+70 Trees** *(144 proposed)* |
| **Donna Subtotal** | *7 Sites / 8 Schools* | **4,768,451** | **2,457,564** | **737,269** | **151,899** | **6.2%** | **+451 Trees** |
| | | | | | | | |
| **Mercedes ISD**| **Sgt. Manuel Chacon Middle** | 1,193,342 | 599,483 | 179,845 | 22,529 | 3.8% | **+120 Trees** |
| **Mercedes ISD**| **Sgt. William G. Harrell Elem**| 461,387 | 152,835 | 45,851 | 6,045 | 4.0% | **+30 Trees** |
| **Mercedes ISD**| **W.B. Travis Elementary** | 420,140 | 215,359 | 64,608 | 33,579 | 15.6% | **+24 Trees** |
| **Mercedes ISD**| **Ruben Hinojosa Elementary** | 389,167 | 132,891 | 39,867 | 10,972 | 8.3% | **+22 Trees** |
| **Mercedes ISD**| **Mercedes High School** | 951,666 | 216,905 | 65,072 | 80,131 | 36.9% | **-11 Trees (Goal Exceeded!)** |
| **Mercedes ISD**| **Mercedes Academic Academy** | 265,025 | 121,875 | 36,563 | 4,246 | 3.5% | **+25 Trees** |
| **Mercedes Subtotal**| *6 Sites / 6 Schools* | **3,680,727** | **1,439,348** | **431,806** | **157,502** | **10.9%** | **+210 Trees (Net)** |
| | | | | | | | |
| **PROJECT TOTAL** | **13 Sites / 14 Schools** | **8,449,178** | **3,896,912** | **1,169,075** | **309,401** | **7.9%** | **+661 Trees Needed** |

---

## 2. Key Findings & Cross-District Insights

### 1. High School vs. Primary Campus Disparity
* **Mercedes High School** is the only campus in the entire study that **already exceeds the 30% canopy benchmark** (36.9% canopy on green space with 80,131 sq ft of existing mature trees).
* In contrast, elementary campuses like **Capt. D. Salinas Elementary (1.0%)**, **Mercedes Academic Academy (3.5%)**, and **Chacon Middle (3.8%)** represent severe urban heat vulnerabilities with massive unshaded turf expanses.

### 2. The Greatest Opportunity Sites (Highest Tree Demand)
1. **Capt. D. Salinas Elementary (Donna ISD):** Needs **163 trees** (740,375 sq ft of open green space).
2. **Sgt. Manuel Chacon Middle (Mercedes ISD):** Needs **120 trees** (599,483 sq ft of open green space).
3. **A.P. Solis Middle School (Donna ISD):** Needs **70 trees** minimum, with **144 trees proposed** in the full athletic perimeter planting plan.

---

## 3. Integration with the Cool Schools Dashboard

All values from this master study are now synchronized into:
* [`data/campus_summaries.csv`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/data/campus_summaries.csv)
* Individual school pages (`donna_*.html` and `mercedes_*.html`)
* [`itree_engine.js`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/itree_engine.js) using the verified $1,314\text{ sq ft}$ mature canopy factor.
