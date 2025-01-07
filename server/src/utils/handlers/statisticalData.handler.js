const CATEGORIES = [
    "All",
    "Beachfront",
    "Windmills",
    "Iconic cities",
    "Countryside",
    "Amazing Pools",
    "Islands",
    "Lakefront",
    "Ski-in/out",
    "Castles",
    "Caves",
    "Camping",
    "Arctic",
    "Desert",
    "Barns",
    "Luxury",
];

const TYPES = ["An entire place","Room(s)", "A Shared Room"]

export const getTypeStatistics = (listings) => {
    
    
     //Khởi tạo đối tượng đếm số lượng sản phẩm cho từng danh mục
     const typeCounts = TYPES.reduce((acc, type) => {
        acc[type] = 0;
        return acc;
    }, {});

    //Duyệt qua danh sách sản phẩm và tăng số lượng tương ứng cho từng danh mục
    (listings).forEach((listing) => {
        if (typeCounts.hasOwnProperty(listing.type || listing.listingId.type)) {
            typeCounts[(listing.type ||listing.listingId.type )]++;
        }
    });

    //Tạo mảng các đối tượng với hai trường name và value
    return TYPES.map((type) => ({
        name: type,
        value: typeCounts[type],
    }));
}
export const getCategoryStatistics = (listings) => {
    //Khởi tạo đối tượng đếm số lượng sản phẩm cho từng danh mục
    const categoryCounts = CATEGORIES.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
    }, {});

    //Duyệt qua danh sách sản phẩm và tăng số lượng tương ứng cho từng danh mục
    listings.forEach((listing) => {
        if (categoryCounts.hasOwnProperty(listing.category)) {
            categoryCounts[listing.category]++;
        }
    });

    //Tạo mảng các đối tượng với hai trường name và value
    return CATEGORIES.map((category) => ({
        name: category,
        value: categoryCounts[category],
    }));
};

export const getUserGrowth = (users) => {
    const userGrowth = Array(12)
        .fill(0)
        .map((_, index) => ({
            name: new Date(0, index).toLocaleString("en-US", {month: "short"}),
            User: 0,
        }));

    users.forEach((user) => {
        const month = new Date(user.createdAt).getMonth();
        userGrowth[month].User += 1;
    });

    return userGrowth;
};

export const getBookingsByMonth = async (bookings) => {
    const bookingsByMonth = Array(12)
        .fill(0)
        .map((_, index) => ({
            name: new Date(0, index).toLocaleString("en-US", {month: "short"}),
            Booking: 0,
            Sales: 0,
        }));

    bookings.forEach((booking) => {
        const month = new Date(booking.startDate).getMonth();
        bookingsByMonth[month].Booking += 1;
        bookingsByMonth[month].Sales += booking.totalPrice; // Assuming `totalPrice` is a field in booking
    });

    return bookingsByMonth;
};

export const getBookingsLastWeek = async (bookings) => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const dailyStats = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(weekAgo);
        day.setDate(day.getDate() + i);
        dailyStats.push({
            name: `${day.getDate()}/${day.getMonth() + 1}`,
            Booking: 0,
            Sales: 0,
        });
    }

    bookings
        .filter(b => new Date(b.createdAt) >= weekAgo && new Date(b.createdAt) <= now)
        .forEach(booking => {
            const bookingDate = new Date(booking.createdAt);
            const index = Math.floor((bookingDate - weekAgo) / (1000 * 60 * 60 * 24));
            if (dailyStats[index]) {
                dailyStats[index].Booking += 1;
                dailyStats[index].Sales += booking.totalPrice || 0;
            }
        });

    return dailyStats;
};
