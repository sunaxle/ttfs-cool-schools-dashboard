const milestoneData = [
  {
    month: "June 2026",
    items: [
      {
        id: "jun-26-1",
        desc: "Kickoff; confirm campus list currently listed in Exhibit E",
        docs: []
      },
      {
        id: "jun-26-2",
        desc: "Remote-sensing baseline setup; compile prior-year climate rasters; metadata start.",
        docs: [
          { name: "Baseline Processing Script", url: "doc_viewer.html?doc=scripts/baseline_processing.py" }
        ]
      },
      {
        id: "jun-26-3",
        desc: "Dashboard scaffolding (data model, folders) and draft QA checklist.",
        docs: [
          { name: "QA Checklist", url: "doc_viewer.html?doc=QA_Checklist.md" }
        ]
      },
      {
        id: "jun-26-4",
        desc: "Draft baseline tables/figures; Monitoring Docs: SOP outlines + data dictionary v0.1.",
        docs: [
          { name: "Data Dictionary v0.1", url: "doc_viewer.html?doc=docs/Data_Dictionary.md" }
        ]
      },
      {
        id: "jun-26-5",
        desc: "Dashboard ingestion prototype (CSV/GeoJSON) and first heat-surface visual.",
        docs: []
      },
      {
        id: "jun-26-6",
        desc: "Baseline QA on early campuses; fill data gaps from March.",
        docs: []
      },
      {
        id: "jun-26-7",
        desc: "Monitoring Docs v0.3 (procedures + quick-reference sheets).",
        docs: []
      },
      {
        id: "jun-26-8",
        desc: "Dashboard v1 architecture (pages, filters, style); modeling assumptions v0.1.",
        docs: [
          { name: "Modeling Assumptions v0.1", url: "doc_viewer.html?doc=docs/modeling_assumptions_v0.1.md" }
        ]
      },
      {
        id: "jun-26-9",
        desc: "Baseline near-final package (campus summaries + canopy/heat overlays).",
        docs: []
      },
      {
        id: "jun-26-10",
        desc: "Monitoring Docs v0.6 with checklists and field forms.",
        docs: [
          { name: "Monitoring SOP v0.6", url: "doc_viewer.html?doc=docs/Monitoring_SOP_v0.6.md" },
          { name: "Field Forms", url: "doc_viewer.html?doc=docs/Field_Forms.md" }
        ]
      },
      {
        id: "jun-26-11",
        desc: "Dashboard v1 feature buildout; start model runs with test inputs.",
        docs: []
      }
    ]
  },
  {
    month: "July 2026",
    items: [
      {
        id: "jul-26-1",
        desc: "Baseline final QA; lock v1 tables & campus fact sheets.",
        docs: []
      },
      {
        id: "jul-26-2",
        desc: "Monitoring Docs v0.8 (internal review).",
        docs: []
      },
      {
        id: "jul-26-3",
        desc: "Dashboard v1 refinement; user notes; prep Training #1 outline.",
        docs: []
      }
    ]
  }
  // Future months can be added here
];

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#milestonesTable tbody");
  const clearBtn = document.getElementById("clearBtn");

  function loadState(id, checkType) {
    return localStorage.getItem(`milestone_${id}_${checkType}`) === "true";
  }

  function saveState(id, checkType, isChecked) {
    localStorage.setItem(`milestone_${id}_${checkType}`, isChecked);
  }

  function renderTable() {
    tableBody.innerHTML = "";
    milestoneData.forEach(monthGroup => {
      // Add Month Header
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `<td colspan="3" class="month-header">${monthGroup.month}</td>`;
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
                AI Check
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

  renderTable();
});
