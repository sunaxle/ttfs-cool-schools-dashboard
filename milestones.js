const milestoneData = [
  {
    month: "June 2026",
    monthEnd: "2026-06-30T23:59:59",
    items: [
      { id: "jun-26-1", desc: "Kickoff; confirm campus list currently listed in Exhibit E", docs: [] },
      { id: "jun-26-2", desc: "Remote-sensing baseline setup; compile prior-year climate rasters; metadata start.", docs: [{ name: "Baseline Processing Script", url: "doc_viewer.html?doc=scripts/baseline_processing.py" }] },
      { id: "jun-26-3", desc: "Dashboard scaffolding (data model, folders) and draft QA checklist.", docs: [{ name: "QA Checklist", url: "doc_viewer.html?doc=QA_Checklist.md" }] },
      { id: "jun-26-4", desc: "Draft baseline tables/figures; Monitoring Docs: SOP outlines + data dictionary v0.1.", docs: [{ name: "Data Dictionary v0.1", url: "doc_viewer.html?doc=docs/Data_Dictionary.md" }] },
      { id: "jun-26-5", desc: "Dashboard ingestion prototype (CSV/GeoJSON) and first heat-surface visual.", docs: [] },
      { id: "jun-26-6", desc: "Baseline QA on early campuses; fill data gaps from March.", docs: [] },
      { id: "jun-26-7", desc: "Monitoring Docs v0.3 (procedures + quick-reference sheets).", docs: [] },
      { id: "jun-26-8", desc: "Dashboard v1 architecture (pages, filters, style); modeling assumptions v0.1.", docs: [{ name: "Modeling Assumptions v0.1", url: "doc_viewer.html?doc=docs/modeling_assumptions_v0.1.md" }] },
      { id: "jun-26-9", desc: "Baseline near-final package (campus summaries + canopy/heat overlays).", docs: [] },
      { id: "jun-26-10", desc: "Monitoring Docs v0.6 with checklists and field forms.", docs: [{ name: "Monitoring SOP v0.6", url: "doc_viewer.html?doc=docs/Monitoring_SOP_v0.6.md" }, { name: "Field Forms", url: "doc_viewer.html?doc=docs/Field_Forms.md" }] },
      { id: "jun-26-11", desc: "Dashboard v1 feature buildout; start model runs with test inputs.", docs: [] }
    ]
  },
  {
    month: "July 2026",
    monthEnd: "2026-07-31T23:59:59",
    items: [
      { id: "jul-26-1", desc: "Baseline final QA; lock v1 tables & campus fact sheets.", docs: [] },
      { id: "jul-26-2", desc: "Monitoring Docs v0.8 (internal review).", docs: [] },
      { id: "jul-26-3", desc: "Dashboard v1 refinement; user notes; prep Training #1 outline.", docs: [] }
    ]
  },
  {
    month: "August 2026",
    monthEnd: "2026-08-31T23:59:59",
    items: [
      { id: "aug-26-1", desc: "Modeling visuals (heat/canopy projections) for reporting placeholders.", docs: [] },
      { id: "aug-26-2", desc: "Training materials v0.5 (slides/handouts); TA log structure.", docs: [] },
      { id: "aug-26-3", desc: "Dashboard v2 planning from v1 feedback.", docs: [] }
    ]
  },
  {
    month: "September 2026",
    monthEnd: "2026-09-30T23:59:59",
    items: [
      { id: "sep-26-1", desc: "Dashboard v2 early components (performance tweaks, extra layers).", docs: [] },
      { id: "sep-26-2", desc: "Figure templates and caption conventions.", docs: [] },
      { id: "sep-26-3", desc: "Dashboard usability pass; document limits and data caveats.", docs: [] },
      { id: "sep-26-4", desc: "Training materials v0.8; Monitoring Docs updates from field feedback.", docs: [] }
    ]
  },
  {
    month: "October 2026",
    monthEnd: "2026-10-31T23:59:59",
    items: [
      { id: "oct-26-1", desc: "Dashboard v2 near-final; ingestion & styling docs updated.", docs: [] },
      { id: "oct-26-2", desc: "Prep 2027 reporting workplan (review cycles, roles).", docs: [] }
    ]
  },
  {
    month: "November 2026",
    monthEnd: "2026-11-30T23:59:59",
    items: [
      { id: "nov-26-1", desc: "Model consolidation; align visuals with text; figure index build.", docs: [] },
      { id: "nov-26-2", desc: "Training #1 prep finalized; logistics confirmed.", docs: [] },
      { id: "nov-26-3", desc: "Collect feedback from TTF for the 2027 plan.", docs: [] }
    ]
  },
  {
    month: "December 2026",
    monthEnd: "2026-12-31T23:59:59",
    items: [
      { id: "dec-26-1", desc: "Year-end integration memo (baseline, docs, dashboard status).", docs: [] },
      { id: "dec-26-2", desc: "Deliver Training #1 (if scheduled) or finalize for January.", docs: [] },
      { id: "dec-26-3", desc: "Set January artifacts and reporting targets.", docs: [] }
    ]
  },
  {
    month: "January 2027",
    monthEnd: "2027-01-31T23:59:59",
    items: [
      { id: "jan-27-1", desc: "Online Training Session #1 delivery; feedback; materials update.", docs: [] },
      { id: "jan-27-2", desc: "Dashboard refinements (labels, legends, export).", docs: [] },
      { id: "jan-27-3", desc: "Compile Q1 reporting excerpts and TA logs.", docs: [] }
    ]
  },
  {
    month: "February 2027",
    monthEnd: "2027-02-28T23:59:59",
    items: [
      { id: "feb-27-1", desc: "Docs touch-ups (SOP clarifications) from training feedback.", docs: [] },
      { id: "feb-27-2", desc: "Prepare Training #2 content & schedule.", docs: [] }
    ]
  },
  {
    month: "March 2027",
    monthEnd: "2027-03-31T23:59:59",
    items: [
      { id: "mar-27-1", desc: "Online Training Session #2 delivery; TA logs & attendance.", docs: [] },
      { id: "mar-27-2", desc: "Identify last data gaps to close before final drafting.", docs: [] }
    ]
  },
  {
    month: "April 2027",
    monthEnd: "2027-04-30T23:59:59",
    items: [
      { id: "apr-27-1", desc: "Implementation Support Memo v0.5 drafted.", docs: [] },
      { id: "apr-27-2", desc: "Dashboard minor enhancements from training feedback.", docs: [] }
    ]
  },
  {
    month: "May 2027",
    monthEnd: "2027-05-31T23:59:59",
    items: [
      { id: "may-27-1", desc: "Reporting refinements; crosswalk tables; glossary & appendix shells.", docs: [] },
      { id: "may-27-2", desc: "Dashboard final edits (color ramps, accessibility).", docs: [] },
      { id: "may-27-3", desc: "Assemble documentation bundles for review.", docs: [] }
    ]
  },
  {
    month: "June 2027",
    monthEnd: "2027-06-30T23:59:59",
    items: [
      { id: "jun-27-1", desc: "Implementation Support Memo finalized.", docs: [] },
      { id: "jun-27-2", desc: "Change-log template for comment integration.", docs: [] }
    ]
  },
  {
    month: "July 2027",
    monthEnd: "2027-07-31T23:59:59",
    items: [
      { id: "jul-27-1", desc: "Dashboard export package + admin notes (refresh/update).", docs: [] },
      { id: "jul-27-2", desc: "Archive interim artifacts per retention plan.", docs: [] }
    ]
  },
  {
    month: "August 2027",
    monthEnd: "2027-08-31T23:59:59",
    items: [
      { id: "aug-27-1", desc: "Integrate Foundation comments; reconcile redlines.", docs: [] },
      { id: "aug-27-2", desc: "Revisions to dashboard documentation and training addenda.", docs: [] },
      { id: "aug-27-3", desc: "Prep final graphics for layout.", docs: [] }
    ]
  },
  {
    month: "September 2027",
    monthEnd: "2027-09-30T23:59:59",
    items: [
      { id: "sep-27-1", desc: "Narrative polish; references & appendix QA.", docs: [] },
      { id: "sep-27-2", desc: "Assemble final report packaging & metadata.", docs: [] }
    ]
  },
  {
    month: "October 2027",
    monthEnd: "2027-10-31T23:59:59",
    items: [
      { id: "oct-27-1", desc: "Deliver near-final dashboard & docs.", docs: [] },
      { id: "oct-27-2", desc: "Log final stakeholder review items and assign owners.", docs: [] }
    ]
  },
  {
    month: "November 2027",
    monthEnd: "2027-11-30T23:59:59",
    items: [
      { id: "nov-27-1", desc: "Address remaining comments; finalize artifacts; archive sources.", docs: [] },
      { id: "nov-27-2", desc: "Prepare delivery letters & distribution list.", docs: [] }
    ]
  },
  {
    month: "December 2027",
    monthEnd: "2027-12-31T23:59:59",
    items: [
      { id: "dec-27-1", desc: "Post-mortem notes and sustainability handoff.", docs: [] }
    ]
  }
];

function getDaysRemaining(targetDateStr) {
  const now = new Date();
  const target = new Date(targetDateStr);
  const diffTime = target - now;
  if (diffTime <= 0) return 0;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#milestonesTable tbody");
  const clearBtn = document.getElementById("clearBtn");

  // Global Countdown Logic
  const todayDisplay = document.getElementById("currentDateDisplay");
  const globalCountdown = document.getElementById("globalCountdown");
  
  if (todayDisplay && globalCountdown) {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    todayDisplay.innerHTML = "Today's Date: <span style='color: #1b4d2b; font-weight: bold;'>" + today.toLocaleDateString(undefined, options) + "</span>";
    
    // Project end date from contract (Dec 31, 2027)
    const projectEnd = "2027-12-31T23:59:59";
    const daysLeft = getDaysRemaining(projectEnd);
    
    if (daysLeft > 0) {
      globalCountdown.textContent = daysLeft + " Days Left in Project";
    } else {
      globalCountdown.textContent = "Project Completed!";
      globalCountdown.style.color = "#2e6b3f";
    }
  }

  function loadState(id, checkType) {
    return localStorage.getItem(`milestone_${id}_${checkType}`) === "true";
  }

  function saveState(id, checkType, isChecked) {
    localStorage.setItem(`milestone_${id}_${checkType}`, isChecked);
  }

  function renderTable() {
    tableBody.innerHTML = "";
    milestoneData.forEach(monthGroup => {
      // Add Month Header with Ticker
      const headerRow = document.createElement("tr");
      
      let tickerHtml = "";
      if (monthGroup.monthEnd) {
        const daysLeftMonth = getDaysRemaining(monthGroup.monthEnd);
        if (daysLeftMonth > 0) {
          tickerHtml = `<span style="float: right; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; font-size: 13px;">🕒 ${daysLeftMonth} days left</span>`;
        } else {
          tickerHtml = `<span style="float: right; background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 12px; font-size: 13px;">✅ Passed</span>`;
        }
      }

      headerRow.innerHTML = `<td colspan="3" class="month-header">${monthGroup.month} ${tickerHtml}</td>`;
      tableBody.appendChild(headerRow);

      // Add Items
      monthGroup.items.forEach(item => {
        const row = document.createElement("tr");
        
        // Docs links HTML
        const docsHtml = item.docs.map(d => `<a href="${d.url}" class="doc-link" target="_blank">${d.name}</a>`).join("<br>");

        row.innerHTML = `
          <td>${item.desc}</td>
          <td>
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" data-id="${item.id}" data-type="ai" ${loadState(item.id, 'ai') ? 'checked' : ''}>
                Student Check
              </label>
              <label class="checkbox-item">
                <input type="checkbox" data-id="${item.id}" data-type="pi" ${loadState(item.id, 'pi') ? 'checked' : ''}>
                PI Check
              </label>
              <label class="checkbox-item">
                <input type="checkbox" data-id="${item.id}" data-type="sup" ${loadState(item.id, 'sup') ? 'checked' : ''}>
                Superior Check
              </label>
            </div>
          </td>
          <td>${docsHtml || '<em>None</em>'}</td>
        `;
        tableBody.appendChild(row);
      });
    });

    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => {
      cb.addEventListener("change", (e) => {
        saveState(e.target.dataset.id, e.target.dataset.type, e.target.checked);
      });
    });
  }

  clearBtn.addEventListener("click", () => {
    if(confirm("Are you sure you want to clear all sign-offs?")) {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if(key.startsWith("milestone_")) {
          localStorage.removeItem(key);
        }
      });
      renderTable();
    }
  });

  // Re-evaluate countdowns every hour if the page is left open
  setInterval(() => {
    renderTable();
  }, 1000 * 60 * 60);

  renderTable();
});
