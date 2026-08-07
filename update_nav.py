import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    if '<nav class="app-nav">' not in content:
        return

    filename = os.path.basename(filepath)

    def make_link(href, text, is_deliverable):
        classes = ["nav-link"]
        if is_deliverable:
            classes.append("deliverable-link")
        if href == filename:
            classes.append("active")
        
        class_str = " ".join(classes)
        badge = ' <span class="badge-tag">DELIVERABLE</span>' if is_deliverable else ''
        return f'            <a class="{class_str}" href="{href}">{text}{badge}</a>'

    nav_content = f"""<nav class="app-nav">
        <div class="nav-section deliverables-section">
            <span class="nav-header-label">⭐ GRANT DELIVERABLES (PRIMARY FOCUS)</span>
            <a class="nav-link" href="portals/v3/portal_v3_concept_a_scroll.html" style="color: #a3e635; font-weight: bold;">▶ Intro Portal</a>
            <a class="nav-link" href="campuses.html">Select Campus</a>
            <a class="nav-link" href="dashboard_map.html">Dashboard Overview</a>
{make_link('canopy.html', 'Canopy Over Time', True)}
{make_link('biodiversity.html', 'Biodiversity', True)}
{make_link('albedo.html', 'Albedo & Reflectance', True)}
{make_link('surface_area.html', 'Surface Breakdown', True)}
        </div>
        <div class="nav-section simulations-section">
            <span class="nav-header-label muted">🧪 BONUS SIMULATIONS</span>
{make_link('itree_ledger.html', 'i-Tree Eco Ledger', False)}
{make_link('tree_3d.html', '3D Shade Models', False)}
{make_link('student_tracking.html', 'Student Tracking', False)}
{make_link('zoning.html', 'Site Zoning', False)}
{make_link('protocols.html', 'SOP Protocols', False)}
{make_link('maintenance.html', 'Maintenance Tracker', False)}
{make_link('economics.html', 'Economics / ROI', False)}
{make_link('trails.html', 'Trails', False)}
{make_link('wind.html', 'Wind', False)}
{make_link('temperature.html', 'Temp', False)}
{make_link('soil_moisture.html', 'Moisture', False)}
{make_link('water_table.html', 'Water Table', False)}
{make_link('soil_types.html', 'Soils', False)}
{make_link('index.html', 'Impact', False)}
        </div>
        <div class="nav-section new-prototypes-section" style="border-left: 2px solid #9C27B0; padding-left: 10px; margin-left: 15px;">
            <span class="nav-header-label" style="color: #9C27B0;">🆕 NEW PROTOTYPES (NOT DELIVERABLES)</span>
{make_link('teks_lesson_plans.html', 'TEKS Lesson Plans', False)}
{make_link('biodiversity_analog_concept.html', 'Child-Friendly Biodiversity', False)}
{make_link('rivas_tree_roster.html', 'Tree Sponsorship Roster', False)}
{make_link('user_access_strategy.html', 'User Access Strategy', False)}
        </div>
    </nav>"""

    new_content = re.sub(r'<nav class="app-nav">.*?</nav>', nav_content, content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    print(f"Updated {filename}")

for f in os.listdir('.'):
    if f.endswith('.html'):
        process_file(f)

