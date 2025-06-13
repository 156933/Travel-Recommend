import { defineStore } from "pinia";

export const useTripStore = defineStore("trip", {
    state: () => ({
        trips: [
            { id: 'bj', name: '北京', title: '故宫长城 3 日游', cover: '/images/beijing.jpg', price: 1899, description: '穿越古都历史，打卡天安门与万里长城' },
            { id: 'sh', name: '上海', title: '摩登都市 2 日游', cover: '/images/shanghai.jpg', price: 1599, description: '感受东方巴黎，游览外滩与迪士尼' },
            { id: 'cd', name: '成都', title: '慢生活与火锅 3 日', cover: '/images/chengdu.jpg', price: 1699, description: '拜访大熊猫，吃遍成都美食' },
            { id: 'gz', name: '广州', title: '岭南风情 2 日游', cover: '/images/guangzhou.jpg', price: 1499, description: '珠江夜游、上下九步行街、早茶文化' },
            { id: 'hz', name: '杭州', title: '西湖人文 2 日游', cover: '/images/hangzhou.jpg', price: 1399, description: '漫步苏堤、登雷峰塔，品龙井茶' },
            { id: 'xm', name: '厦门', title: '鼓浪屿海岛 3 日', cover: '/images/xiamen.jpg', price: 1799, description: '小清新海岛，漫步鼓浪屿、曾厝垵' },
            { id: 'lz', name: '丽江', title: '丽江古城 3 日游', cover: '/images/lijiang.jpg', price: 1899, description: '邂逅古城风情，感受纳西文化与玉龙雪山' },
            { id: 'gl', name: '桂林', title: '桂林山水 2 日游', cover: '/images/guilin.jpg', price: 1399, description: '山水甲天下，游漓江、阳朔西街' },
            { id: 'xa', name: '西安', title: '历史古都 3 日游', cover: '/images/xian.jpg', price: 1699, description: '兵马俑、大雁塔、回民街美食全体验' }
        ],
    }),
    getters: {
        getTripById: (state) => (id) => state.trips.find((t) => t.id === id),

        getRandomSlides: (state) => {
            const shuffled = [...state.trips].sort(() => Math.random() - 0.5)
            return shuffled.slice(0, 3)
        },

        searchTrips: (state) => (query) => {
            if (!query.trim()) return state.trips;

            const searchTerm = query.toLowerCase().trim();
            return state.trips.filter((trip) =>
                trip.name.toLowerCase().includes(searchTerm) ||
                trip.title.toLowerCase().includes(searchTerm) ||
                trip.description.toLowerCase().includes(searchTerm)
            );
        }
    }
});