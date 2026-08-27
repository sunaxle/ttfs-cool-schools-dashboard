# 🔬 Cross-Examination of the Landscape Architect Formula Constant ($1,314\text{ sq ft}$ / Tree)

> **Research & Data Integrity Memo**  
> **Prepared for:** Dr. Alexis Racelis (PI), UTRGV Agroecology & Texas Trees Foundation  
> **Topic:** Ecological Validation of the $1,314\text{ sq ft}$ Constant vs. Proposed Species Palette  

---

## 1. Mathematical Origin of the $1,314\text{ sq ft}$ Constant

The Landscape Architect calculation box from Studio Outside / Heffner Design Team utilizes the formula:
$$\text{Additional Trees Needed} = \frac{\text{30\% Target Canopy Area (SF)} - \text{Existing Canopy Area (SF)}}{1,314\text{ sq ft}}$$

Mathematically, a circular canopy area of $1,314\text{ sq ft}$ corresponds to:
$$\text{Canopy Area} = \pi r^2 = 1,314 \implies r = \sqrt{\frac{1,314}{\pi}} \approx 20.45\text{ ft} \implies \mathbf{\text{Crown Diameter } \approx 40.9\text{ ft}}$$

This represents a standard municipal planning heuristic for a **generic, mature, large overstory shade tree** (~$40\text{ ft} \times 40\text{ ft}$ crown spread).

---

## 2. Species-by-Species Crown Comparison

Applying a uniform $1,314\text{ sq ft}$ assumption across diverse species introduces significant variance when evaluated against regional South Texas growth habits:

| Species Code | Common Name | Scientific Name | Actual Mature Crown Diameter (ft) | Actual Mature Canopy Area (sq ft) | Variance vs. $1,314\text{ sq ft}$ Heuristic | Ecological Classification |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`LO`** | **Live Oak** | *Quercus virginiana* | 50 – 75 ft | **$1,963 – 4,418\text{ sq ft}$** | **$+49\%\text{ to }+236\%$** (Underestimated) | **Major Overstory Shade** |
| **`CE`** | **Cedar Elm** | *Ulmus crassifolia* | 35 – 45 ft | **$962 – 1,590\text{ sq ft}$** | **$-27\%\text{ to }+21\%$** (Accurate) | **Major Overstory Shade** |
| **`Poh`** | **Post Oak** | *Quercus stellata* | 35 – 50 ft | **$962 – 1,963\text{ sq ft}$** | **$-27\%\text{ to }+49\%$** (Accurate) | **Major Overstory Shade** |
| **`VA`** | **Velvet Ash** | *Fraxinus velutina* | 30 – 40 ft | **$707 – 1,257\text{ sq ft}$** | **$-46\%\text{ to }-4\%$** (Slight Overestimate) | **Medium Overstory Shade** |
| **`Cm`** | **Crape Myrtle** | *Lagerstroemia indica* | 15 – 20 ft | **$177 – 314\text{ sq ft}$** | **$-76\%\text{ to }-86\%$** (Severely Overestimated) | **Small Ornamental** |
| **`Txp`** | **Texas Persimmon** | *Diospyros texana* | 12 – 18 ft | **$113 – 254\text{ sq ft}$** | **$-81\%\text{ to }-91\%$** (Severely Overestimated) | **Understory / Shrub** |
| **`DW`** | **Desert Willow** | *Chilopsis linearis* | 15 – 20 ft | **$177 – 314\text{ sq ft}$** | **$-76\%\text{ to }-86\%$** (Severely Overestimated) | **Small Ornamental / Arid** |
| **`SP`** | **Sabal Palm** | *Sabal mexicana* | 10 – 15 ft | **$79 – 177\text{ sq ft}$** | **$-87\%\text{ to }-94\%$** (Severely Overestimated) | **Columnar Palm (Minimal Shade)** |

---

## 3. Key Findings & Strategic Implications for UTRGV & TTFS

```
+-----------------------------------------------------------------------------------+
|  THE CANOPY DEFICIT RISK: HEURISTIC VS. SPECIES REALITY                           |
+-----------------------------------------------------------------------------------+
|  If a school needs 100 trees to hit 30% canopy:                                  |
|  - If 100 Live Oaks / Cedar Elms are planted: Real Canopy = ~160,000 SF (MET!)   |
|  - If 50 Live Oaks + 50 Sabal Palms/Persimmons are planted:                       |
|    Real Canopy = ~90,000 SF + ~10,000 SF = 100,000 SF (DEFICIT of 31,400 SF!)     |
+-----------------------------------------------------------------------------------+
```

### Risk Analysis:
1. **The "Palm & Ornamental" Canopy Penalty:**  
   If district planting plans favor small ornamental trees (`Cm`, `DW`) or palms (`SP`) for curb appeal or bus loop aesthetics, the campus will **fall short of the 30% thermal cooling requirement** by up to 40–60%, even if the numerical tree count target is reached.
2. **The "Live Oak" Super-Performer:**  
   Conversely, a single mature Southern Live Oak (`LO`) can cast over $3,500\text{ sq ft}$ of dense shade—delivering the cooling footprint of nearly **20 Sabal Palms**.

---

## 4. Recommendations for the Cool Schools Dashboard

1. **Dual-Calculation View in Dashboard:**
   * **View A: "Architectural Planning Standard" ($1,314\text{ sq ft}$ / tree):** Shows exact parity with Studio Outside / Heffner Design Team CAD stamp sheets.
   * **View B: "Agroecology Species-Weighted Model":** Uses dynamic crown diameters per species to show the *true* ecological cooling and shade delivery over 5, 10, and 20 years.
2. **Planting Palette Recommendation for Districts:**
   * Mandate a **Minimum 70% Overstory Ratio** (Live Oak, Cedar Elm, Post Oak) in active student zones (playgrounds, bus loops) to ensure the 30% canopy goal is physically achieved on the ground.
