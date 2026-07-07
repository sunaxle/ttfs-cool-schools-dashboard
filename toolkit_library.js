const toolkits = [
    {
        id: 1,
        title: "The Tree Diary Project",
        desc: "A multi-week English/ELA project where students 'adopt' a tree, observe its growth, and pin physical photos and creative writing assignments to a classroom bulletin board.",
        grade: "6-8",
        subject: "english",
        duration: "long",
        teks: "TEKS 110.22",
        pdfLink: "#"
    },
    {
        id: 2,
        title: "Meet the Canopy: Leaf Rubbings",
        desc: "A hands-on art and science crossover. Students go outside to collect fallen leaves, create physical texture rubbings, and identify local species.",
        grade: "k-2",
        subject: "art",
        duration: "short",
        teks: "TEKS 112.11",
        pdfLink: "#"
    },
    {
        id: 3,
        title: "Soil Moisture Mathematics",
        desc: "Students use analog rain gauges and soil probes to collect physical data in the schoolyard, then graph the results in the classroom.",
        grade: "3-5",
        subject: "math",
        duration: "medium",
        teks: "TEKS 111.5",
        pdfLink: "#"
    },
    {
        id: 4,
        title: "Campus Maintenance Shadowing",
        desc: "A stewardship activity where students shadow the campus maintenance team to learn about structural upkeep, pruning, and irrigation.",
        grade: "6-8",
        subject: "science",
        duration: "medium",
        teks: "TEKS 112.20",
        pdfLink: "#"
    },
    {
        id: 5,
        title: "Habitat Spotter Logbook",
        desc: "A printable logbook for students to sketch and tally the birds, insects, and squirrels they spot in the schoolyard forest.",
        grade: "k-2",
        subject: "science",
        duration: "short",
        teks: "TEKS 112.12",
        pdfLink: "#"
    },
    {
        id: 6,
        title: "Micro-Climate Temperature Mapping",
        desc: "Students use physical thermometers to measure asphalt vs. grass temperatures and map out the hottest and coolest zones on campus.",
        grade: "3-5",
        subject: "science",
        duration: "medium",
        teks: "TEKS 112.16",
        pdfLink: "#"
    }
];

const grid = document.getElementById('toolkit-grid');
const gradeFilter = document.getElementById('grade-filter');
const subjectFilter = document.getElementById('subject-filter');
const durationFilter = document.getElementById('duration-filter');

function renderToolkits() {
    const grade = gradeFilter.value;
    const subject = subjectFilter.value;
    const duration = durationFilter.value;

    const filtered = toolkits.filter(t => {
        return (grade === 'all' || t.grade === grade) &&
               (subject === 'all' || t.subject === subject) &&
               (duration === 'all' || t.duration === duration);
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-results">No toolkits found matching those filters. Try adjusting your search!</div>';
        return;
    }

    filtered.forEach(t => {
        const card = document.createElement('div');
        card.className = 'toolkit-card';
        
        let gradeLabel = t.grade;
        if(t.grade === 'k-2') gradeLabel = 'K-2nd';
        if(t.grade === '3-5') gradeLabel = '3rd-5th';
        if(t.grade === '6-8') gradeLabel = '6th-8th';

        let durationLabel = t.duration;
        if(t.duration === 'short') durationLabel = '15-30m';
        if(t.duration === 'medium') durationLabel = '45m';
        if(t.duration === 'long') durationLabel = 'Multi-Week';

        card.innerHTML = `
            <div class="card-tags">
                <span class="tag teks">${t.teks}</span>
                <span class="tag">${gradeLabel}</span>
                <span class="tag">${t.subject.toUpperCase()}</span>
                <span class="tag">${durationLabel}</span>
            </div>
            <h3>${t.title}</h3>
            <p>${t.desc}</p>
            <a href="${t.pdfLink}" class="download-btn" onclick="event.preventDefault(); alert('Downloading ${t.title} PDF Toolkit...');">Download PDF</a>
        `;
        grid.appendChild(card);
    });
}

// Event Listeners
gradeFilter.addEventListener('change', renderToolkits);
subjectFilter.addEventListener('change', renderToolkits);
durationFilter.addEventListener('change', renderToolkits);

// Initial Render
renderToolkits();
