// News Feed Data
// Add new news items to the array below - they will automatically be included in the rotation

export const newsFeed = [
    {
        id: 1,
        title: "Queue Game Reaches 1 Million Players",
        content: "The revolutionary waiting experience has captivated audiences worldwide. 'It's like real life, but more frustrating,' says one satisfied customer.",
        category: "milestone",
        timestamp: "2024-12-15T10:30:00Z"
    },
    {
        id: 2,
        title: "New Queue Skip Pro™ Features Announced",
        content: "Premium members can now skip to position 49,999 instead of 50,000! Scientists are calling it 'technically an improvement.'",
        category: "product",
        timestamp: "2024-12-14T15:45:00Z"
    },
    {
        id: 3,
        title: "Local Man Achieves Queue Enlightenment",
        content: "After 47 hours in Queue Game, Jerry from Ohio reports: 'I no longer feel the passage of time. This is either transcendence or a medical emergency.'",
        category: "community",
        timestamp: "2024-12-13T09:20:00Z"
    },
    {
        id: 4,
        title: "Queue Anxiety Pills Show Promising Results",
        content: "Clinical trials reveal 73% of users report reduced anxiety while waiting. Side effects may include increased patience and existential dread.",
        category: "health",
        timestamp: "2024-12-12T14:15:00Z"
    },
    {
        id: 5,
        title: "Breaking: Queue Position Algorithms Updated",
        content: "Our advanced AI now calculates wait times with 15% more uncertainty. 'Chaos is the natural order,' explains Lead Queue Engineer.",
        category: "technology",
        timestamp: "2024-12-11T11:00:00Z"
    },
    {
        id: 6,
        title: "Queue Dating App Launches Today",
        content: "Meet other people who are also waiting! Premium feature: See who's ahead of you in line. Perfect for long-distance queue relationships.",
        category: "lifestyle",
        timestamp: "2024-12-10T16:30:00Z"
    },
    {
        id: 7,
        title: "Study: Waiting Builds Character",
        content: "Researchers confirm that standing in virtual queues increases patience by 300%. Character building has never been this inefficient!",
        category: "science",
        timestamp: "2024-12-09T08:45:00Z"
    },
    {
        id: 8,
        title: "Queue Real Estate Market Booming",
        content: "Premium queue positions now selling for $50k. 'Location, location, location,' says realtor. 'Position 42 has excellent wait time potential.'",
        category: "business",
        timestamp: "2024-12-08T13:20:00Z"
    },
    {
        id: 9,
        title: "Queue University Offers New Degree",
        content: "Bachelor's in Applied Waiting Studies now available! Four-year program includes advanced standing, line theory, and queue psychology.",
        category: "education",
        timestamp: "2024-12-07T10:10:00Z"
    },
    {
        id: 10,
        title: "Queue Mouse™ Prevents RSI",
        content: "Ergonomic mouse designed for extended waiting sessions. Features include stress ball attachment and built-in timer for existential contemplation.",
        category: "product",
        timestamp: "2024-12-06T17:55:00Z"
    },
    {
        id: 11,
        title: "Queue Insurance Now Available",
        content: "Protect your position with comprehensive queue insurance! Coverage includes position theft, line cuts, and acts of queue gods.",
        category: "business",
        timestamp: "2024-12-05T12:40:00Z"
    },
    {
        id: 12,
        title: "Meditation Queue App Gains Popularity",
        content: "Find inner peace while waiting with guided meditation. 'Embrace the void of uncertainty,' teaches Queue Guru Master Chen.",
        category: "wellness",
        timestamp: "2024-12-04T14:25:00Z"
    },
    {
        id: 13,
        title: "Government Considers Queue Regulations",
        content: "Congress debates Queue Safety Act after reports of 'extreme waiting fatigue.' Proposed 72-hour maximum queue time called 'unrealistic.'",
        category: "politics",
        timestamp: "2024-12-03T09:15:00Z"
    },
    {
        id: 14,
        title: "Queue Speedrun Record Broken",
        content: "Gamer completes Queue Game in record 0.3 seconds using exploits. 'I accidentally clicked the wrong button,' admits champion.",
        category: "gaming",
        timestamp: "2024-12-02T19:30:00Z"
    },
    {
        id: 15,
        title: "Virtual Queue Therapy Sessions Available",
        content: "Professional therapists now offer support for queue-related trauma. 'It's okay to feel frustrated,' reassures Dr. Waitington.",
        category: "health",
        timestamp: "2024-12-01T11:50:00Z"
    }
];

// Helper function to get news by category
export function getNewsByCategory(category) {
    return newsFeed.filter(news => news.category === category);
}

// Helper function to get recent news (last N items)
export function getRecentNews(count = 5) {
    return newsFeed
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, count);
}

// Helper function to add new news item (for easy expansion)
export function addNewsItem(title, content, category = 'general') {
    const newItem = {
        id: Math.max(...newsFeed.map(n => n.id)) + 1,
        title,
        content,
        category,
        timestamp: new Date().toISOString()
    };
    newsFeed.unshift(newItem);
    return newItem;
}