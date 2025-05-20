import Items from "../models/Items.js";

export const getAll = async() =>{
    const allItems = await Items.find();
    if(!allItems) throw new Error("Not found anything");
    return allItems;
};

export const getById = async(id) => {
    const items = await Items.findById(id);
    if(!items) throw new Error("Product not found");
    return items;
}
export const getOne = async(payload) =>{
    return  await Items.findOne(payload);
}