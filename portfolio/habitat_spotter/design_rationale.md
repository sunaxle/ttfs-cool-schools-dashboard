# Design Rationale: "Habitat Spotter" (Biodiversity Tracking)

## Concept Overview
The "Habitat Spotter" is a biodiversity tracking module designed for elementary school students. It frames the newly planted TTFS Cool Schools trees not just as plants, but as living ecosystems. By asking students to look for visitors (bugs, birds, lizards), it shifts their perspective from passive observers to active "Field Scientists." 

## UI/UX Choices

### 1. The "Field Guide" Metaphor
- **Tone & Identity:** The UI embraces a "sunny, outdoor exploration" theme. The header utilizes a warm yellow (`#FFCA28`) with soft cloud accents to establish an outdoor environment, immediately distinguishing it from the deeper greens of the tree-care modules.
- **Action Verbs:** The primary submit button uses the text "Add to Field Guide! 📖". This frames data collection as an act of co-creating a book, which is a highly rewarding concept for young students.

### 2. "Elementary Talk" & Categorization
Rather than using Linnaean taxonomy (Insects, Aves, Mammalia, Reptilia), the UI uses visual, behavior-based categorization:
- **"Cool Bug" (🐞)**
- **"Flying Friend" (🐦)**
- **"Lizard / Frog" (🦎)**
- **"Furry Friend" (🐿️)**

Similarly, locational data is simplified into spatial concepts that children naturally understand:
- "Down in the dirt"
- "Crawling on the trunk"
- "Flying high above!"
This bypasses the need to teach complex ecological strata (e.g., canopy, understory, forest floor) while still collecting scientifically valid locational data for the 10-year project lifecycle.

### 3. Interaction Design & Tactility
- **Chunky Grids & Lists:** The UI utilizes a 2x2 CSS Grid for animal types and a stacked list for locations. These act as massive hit-areas, making selection effortless on touch devices.
- **Physical Button Physics:** The footer buttons feature a pronounced 6px bottom shadow (`box-shadow`) that disappears when active (`transform: translateY(4px)`). This mimics the physical depression of a real camera shutter or mechanical button, providing satisfying haptic-style feedback.
- **Separated Photo Action:** The camera button is placed adjacent to the submit button. This allows students to optionally attach a photo without making it a blocking requirement, keeping the logging process fast if a "Flying Friend" flies away too quickly to photograph.

### 4. Color Strategy
While still utilizing the UTRGV Green (`#00843D`) for active states and text headers, this interface heavily leans on warm, earthy, and sky-based colors to reinforce the "habitat" theme. The UI remains highly accessible, ensuring all text has sufficient contrast ratios against its background.
