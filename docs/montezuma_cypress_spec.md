# Montezuma Cypress (*Taxodium mucronatum*) 3D Botanical & Asset Specification

**Project:** Texas Trees Foundation & UTRGV Cool Schools Project  
**Author:** Antigravity 3D Botanical Engineering Team  
**Blender Compatibility:** Blender 4.x & Blender 5.2+ LTS  
**Native Ecosystem:** Rio Grande Valley (RGV), Texas (Cameron & Hidalgo Counties) & Northern Mexico  

---

## 1. Botanical & Morphological Specifications

| Feature | Botanical Parameter | 3D Implementation in Blender |
| :--- | :--- | :--- |
| **Trunk Flare & Fluting** | Massive basal swelling (1.8×–2.5× breast height diameter) with deep undulating harmonic fluting. | Procedural BMesh loft with radial trigonometric harmonic equations ($N_f = 7\dots 9$ lobes) and root toe ground anchors. |
| **Cypress Knees** | **Absent** (rarely if ever produces aerial knees in landscape soils). | Zero vertical knee geometry modeled; wide fluted root crown anchored into soil. |
| **Branching Architecture** | Broad spreading umbrella crown with low, sinuous scaffold limbs and pendulous weeping branchlets. | Golden-ratio phyllotaxis ($137.5^\circ$) scaffold limbs (L1) with catenary gravity sag on secondary (L2) and weeping tertiary twigs (L3). |
| **Foliage Structure** | Feathery, 2-ranked (distichous) soft linear needles (6–12 mm). Semi-evergreen habit in RGV climate. | Curved cross-quad foliage spray cards instanced at terminal branchlet nodes with downward gravity orientation. |
| **Bark Color & Texture** | Stringy, fibrous, shreddy bark with longitudinal fissures revealing cinnamon underbark. | Procedural Principled BSDF with Z-stretched Wave texture striations, Voronoi plate fissures, and normal-based moss masking. |
| **Foliage Shading (PBR)** | Translucent needle plumes with high solar transmission. | Principled BSDF v2 Subsurface Scattering (SSS) with chartreuse backlit glow (`#AEE04E`, weight: 0.65). |

---

## 2. Color Palette Codes (Hex & RGB)

### 2.1 Bark Material (`M_Montezuma_Bark`)
* **Outer Weathered Fibrous Crest:** `#756C63` / RGB `(117, 108, 99)`
* **Underbark Warm Cedar:** `#5C534A` / RGB `(92, 83, 74)`
* **Inner Fissure Cinnamon Cambium:** `#8D4629` / RGB `(141, 70, 41)`
* **Deep Recessed Furrow Shadow:** `#28160E` / RGB `(40, 22, 14)`
* **Bark Moss Infiltration:** `#46542B` / RGB `(70, 84, 43)`

### 2.2 Foliage Material (`M_Montezuma_Foliage`)
* **Peak Summer Foliage:** `#3A6B2D` / RGB `(58, 107, 45)`
* **Fresh Spring Flush Tip:** `#8BC34A` / RGB `(139, 195, 74)`
* **Deep Inner Canopy Shadow:** `#2E5723` / RGB `(46, 87, 35)`
* **Subsurface Scattering (SSS) Tint:** `#AEE04E` / RGB `(174, 224, 78)`
* **Senescent Autumn/Bronze Highlight:** `#A47239` / RGB `(164, 114, 57)`

---

## 3. Generated 3D Asset Files

The assets are exported and located in `assets/3d/montezuma_cypress/`:

1. **Mature Campus Specimen (12.5m Height)**:
   - **Native Blender Project:** [`assets/3d/montezuma_cypress/montezuma_cypress.blend`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/assets/3d/montezuma_cypress/montezuma_cypress.blend)
   - **WebGL / Three.js GLB:** [`assets/3d/montezuma_cypress/montezuma_cypress.glb`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/assets/3d/montezuma_cypress/montezuma_cypress.glb)
   - **Universal OBJ + MTL:** [`assets/3d/montezuma_cypress/montezuma_cypress.obj`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/assets/3d/montezuma_cypress/montezuma_cypress.obj)
   - **High-Res Render Preview:** [`assets/3d/montezuma_cypress/montezuma_cypress_preview.png`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/assets/3d/montezuma_cypress/montezuma_cypress_preview.png)

2. **Historic Old-Growth Giant (16m Height, 5.6m Fluted Base)**:
   - **Native Blender Project:** [`assets/3d/montezuma_cypress/montezuma_cypress_old_growth.blend`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/assets/3d/montezuma_cypress/montezuma_cypress_old_growth.blend)
   - **WebGL / Three.js GLB:** [`assets/3d/montezuma_cypress/montezuma_cypress_old_growth.glb`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/assets/3d/montezuma_cypress/montezuma_cypress_old_growth.glb)
   - **Universal OBJ + MTL:** [`assets/3d/montezuma_cypress/montezuma_cypress_old_growth.obj`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/assets/3d/montezuma_cypress/montezuma_cypress_old_growth.obj)
   - **High-Res Render Preview:** [`assets/3d/montezuma_cypress/montezuma_cypress_old_growth_preview.png`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/assets/3d/montezuma_cypress/montezuma_cypress_old_growth_preview.png)

---

## 4. How to Use in Your Open Blender Session

### Option A: Open the Generated `.blend` File Directly
1. In Blender, go to **File > Open** (`Cmd + O`).
2. Navigate to:
   `/Users/dr3/Documents/Antigravity Designs/work/TTFS_UTRGV_Project_Cool_Schools/assets/3d/montezuma_cypress/montezuma_cypress.blend`
3. Switch 3D Viewport shading mode to **Material Preview** (`Z` $\to$ Material Preview) or **Rendered** (`Z` $\to$ Rendered) to view the PBR bark striations and translucent weeping foliage.

### Option B: Run / Customize in the Blender Scripting Workspace
1. In Blender, switch to the **Scripting** tab along the top workspace bar.
2. Click **Open** and select [`scripts/generate_montezuma_cypress.py`](file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/scripts/generate_montezuma_cypress.py).
3. Adjust any desired parameters in `TreeConfig` (e.g. `height`, `flute_lobes`, `canopy_spread`, `random_seed`).
4. Click **Run Script** (or press `Alt + P`) to generate a new tree variation in real-time.
