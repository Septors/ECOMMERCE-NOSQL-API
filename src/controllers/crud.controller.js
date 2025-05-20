import  Items from "../models/Items.js"
import * as crudService from "../services/crud.services.js"

export const getAllItems = async(req,res) =>{
    try{
        const items = await crudService.getAll();
        res.status(200).json({Message: "All items",items});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error",});
    };
};

export const findItemsById = async(req,res) =>{
    try{
        const {id} = req.params;
        const items = await crudService.getById(id);

        res.status(200).json({Message: "Founded items",items});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    };
};

export const createItems = async(req,res) =>{
    try{
        const{name,price} = req.body;

        const existing = await crudService.getOne({name});
        if(existing){
            return res.status(404).json({Error: "Item existing"});
        }
        const products = await Items.create(req.body);

        res.status(201).json({Message: "Items created",products});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    };
};

export const updateItems = async(req,res) =>{
    try{
        const{id} = req.params;

        const updateItems = await Items.findByIdAndUpdate(id,req.body,{new:true}) ;
        if(!updateItems){return res.status(404).json({Error: "Items not found"})};

        res.status(200).json({Message: "Items updated",updateItems});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    };
};


export const deleteItems = async(req,res) =>{
    try{
        const{id} = req.params;

        const deletedItems = await Items.findByIdAndDelete(id,req.body,{new:true});

        if(!deleteItems){return res.status(404).json({Error: "Items not found"})};

        res.status(200).json({Message: "items deleted"});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    };
};

