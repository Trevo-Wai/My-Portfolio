const driverToRouteCount = {
    "Aung": { "Jakarta": 50, "Yangon": 25, "Hanoi": 12 },
    "Barry": { "Yangon": 60, "Kuala Lumpur": 45, "Hanoi": 30, "Singapore": 5 },
    "Cat": { "Bangkok": 90, "Jakarta": 30, "Singapore": 20, "Yangon": 30 },
    "Dora": { "Hanoi": 40, "Kuala Lumpur": 10, "Jakarta": 20 }
};

// Sum all route counts for each driver and list them in order
function listDriversByTotalRoutes() {
    const driversWithTotals = Object.entries(driverToRouteCount)
        .map(([driver, routes]) => [driver, Object.values(routes).reduce((sum, count) => sum + count, 0)])
        .sort((a, b) => b[1] - a[1]); // Sort in descending order by total routes

    // Print the drivers in a numbered list format
    driversWithTotals.forEach(([driver, total], index) => {
        console.log(`${index + 1}. ${driver} (${total} routes)`);
    });
}

listDriversByTotalRoutes();
