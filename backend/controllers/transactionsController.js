const axios = require('axios');
const Transaction = require('../models/Transaction');


// Initialize Database
const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        await Transaction.deleteMany({});
        await Transaction.insertMany(data);

        res.status(200).json({ message: 'Database initialized successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch Transactions with Search and Pagination
const getTransactions = async (req, res) => {
    try {
        const { month, search, page = 1, perPage = 10 } = req.query;

        // Filter based on month
        const filter = {
            dateOfSale: {
                $gte: new Date(`${month}-01`),
                $lte: new Date(`${month}-31`)
            }
        };

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } }
            ];
        }

        const transactions = await Transaction.find(filter)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Other APIs (Statistics, Bar Chart, Pie Chart) will be implemented similarly...
const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        // Filter transactions based on the month
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(`${month}-31`);

        const soldItems = await Transaction.find({ 
            dateOfSale: { $gte: startDate, $lte: endDate }, 
            sold: true 
        });

        const notSoldItems = await Transaction.find({ 
            dateOfSale: { $gte: startDate, $lte: endDate }, 
            sold: false 
        });

        const totalSaleAmount = soldItems.reduce((acc, item) => acc + item.price, 0);

        res.status(200).json({
            totalSaleAmount,
            totalSoldItems: soldItems.length,
            totalNotSoldItems: notSoldItems.length,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;

        const startDate = new Date(`${month}-01`);
        const endDate = new Date(`${month}-31`);

        const transactions = await Transaction.find({ 
            dateOfSale: { $gte: startDate, $lte: endDate }
        });

        const priceRanges = [
            { range: '0-100', min: 0, max: 100, count: 0 },
            { range: '101-200', min: 101, max: 200, count: 0 },
            { range: '201-300', min: 201, max: 300, count: 0 },
            { range: '301-400', min: 301, max: 400, count: 0 },
            { range: '401-500', min: 401, max: 500, count: 0 },
            { range: '501-600', min: 501, max: 600, count: 0 },
            { range: '601-700', min: 601, max: 700, count: 0 },
            { range: '701-800', min: 701, max: 800, count: 0 },
            { range: '801-900', min: 801, max: 900, count: 0 },
            { range: '901-above', min: 901, max: Infinity, count: 0 },
        ];

        transactions.forEach(transaction => {
            priceRanges.forEach(range => {
                if (transaction.price >= range.min && transaction.price <= range.max) {
                    range.count += 1;
                }
            });
        });

        res.status(200).json(priceRanges);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        // Call the other API functions internally
        const [statistics, barChartData, pieChartData] = await Promise.all([
            getStatistics(req, res),
            getBarChartData(req, res),
            getPieChartData(req, res)
        ]);

        res.status(200).json({
            statistics: statistics.data,
            barChartData: barChartData.data,
            pieChartData: pieChartData.data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        const startDate = new Date(`${month}-01`);
        const endDate = new Date(`${month}-31`);

        const transactions = await Transaction.find({
            dateOfSale: { $gte: startDate, $lte: endDate },
        });

        const categoryMap = {};

        transactions.forEach((transaction) => {
            const category = transaction.category;
            categoryMap[category] = (categoryMap[category] || 0) + 1;
        });

        const pieData = Object.keys(categoryMap).map((category) => ({
            category,
            count: categoryMap[category],
        }));

        res.status(200).json(pieData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Export the functions
module.exports = {
    initializeDatabase,
    getTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData,
};