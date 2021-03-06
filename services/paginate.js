module.exports = {
    pagination: (nPages, currentPage) => {
        const page_Items = [];
        for (let i = 1; i <= nPages; i++){
            const item = {
                value: i,
                isActive: i === currentPage
            }
            page_Items.push(item);
        }
        return {
            pre_Value: currentPage - 1,
            next_Value: currentPage + 1,
            can_Prev: currentPage > 1,
            can_Next: currentPage < nPages,
            page_Items
        }
    },
}