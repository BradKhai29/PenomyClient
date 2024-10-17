const everyoneLevel = {
    id: 1,
    icon: "public",
    title: "Công khai",
};

const privateLevel = {
    id: 3,
    icon: "lock",
    title: "Riêng tư",
};

const publicLevels = [everyoneLevel, privateLevel];

function getPublicLevelItem(publicLevelId) {
    const foundItem = publicLevels.find((item) => item.id == publicLevelId);

    if (foundItem) {
        return foundItem;
    }

    return privateLevel;
}

const ArtworkPublicLevelHelper = {
    getPublicLevelItem: getPublicLevelItem,
};

export { ArtworkPublicLevelHelper };
