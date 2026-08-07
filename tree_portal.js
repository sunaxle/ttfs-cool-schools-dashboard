document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const generatedNameInput = document.getElementById('generatedName');
    const sponsorshipForm = document.getElementById('sponsorshipForm');

    // Mad-Libs dictionaries
    const adjectives = [
        "Brave", "Wise", "Gentle", "Mighty", "Joyful",
        "Ancient", "Dancing", "Whispering", "Sunlit", "Vibrant",
        "Noble", "Fierce", "Serene", "Sturdy", "Shady"
    ];

    const nouns = [
        "Sapling", "Giant", "Guardian", "Wanderer", "Friend",
        "Dreamer", "Explorer", "Champion", "Shelter", "Hero",
        "Sentinel", "Companion", "Sprout", "Seeker", "Scholar"
    ];

    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    generateBtn.addEventListener('click', () => {
        const adjective = getRandomItem(adjectives);
        const noun = getRandomItem(nouns);
        const newName = `The ${adjective} ${noun}`;
        generatedNameInput.value = newName;
    });

    sponsorshipForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather form data
        const treeId = document.getElementById('treeId').value;
        const treeName = document.getElementById('generatedName').value;
        const sponsorType = document.getElementById('sponsorType').value;
        const sponsorName = document.getElementById('sponsorName').value;

        // Construct email body
        const subject = `Tree Claiming Request: ${treeName}`;
        let body = `Hello TTFS Team,\n\n`;
        body += `We would like to officially claim a tree on campus. Here are the details:\n\n`;
        body += `Tree ID: ${treeId}\n`;
        body += `Chosen Name: ${treeName}\n`;
        body += `Claiming As: ${sponsorType}\n`;
        body += `Display Name: ${sponsorName}\n\n`;
        body += `Please reply with the next steps for finalizing this claim on the digital map.\n\n`;
        body += `Thank you!`;

        // Create mailto link
        const mailtoLink = `mailto:hello@texastrees.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
    });
});
