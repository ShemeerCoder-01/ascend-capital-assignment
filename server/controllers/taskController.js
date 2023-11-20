const List = require('../models/taskModel');

const getAllLists = async(req,res) => {
    const {email} = req.query;
    try {
        const response = await List.findAll({
            where:{
                email
            }
        });
        res.status(200).send(response);
    } catch (err) {
        res.status(500).json({msg:'Error occured while fetching list.'});
    }
}

const addList = async(req,res) => {
    const{title,items,email} = req.body;

    try {
        const newItem = await List.create({title,items,email});
        res.status(200).send("List Created successfully!!!");
    } catch (err) {
        console.error('Error creating list:', err);
        res.status(500).json({msg:'Error occured while creating list.'});
    }    
}

const updateList = async (req, res) => {
    try {
        const { email, listIndex, itemIndex,id } = req.body.params;

        // Fetch the list data based on the email
        const list = await List.findAll({
            where: { email }
        });

        if (!list) {
            return res.status(404).json({ msg: 'List not found for the given email' });
        }
        let {items} = list[listIndex];
       
        if (listIndex >= 0 && listIndex < items.length) {
            items.splice(itemIndex, 1); 
        } 

        await List.update({items} , {
            where: { id  }
        });
        const updatedList = await List.findAll({
            where: { email }
        });
        for(let i = 0; i < updatedList.length; i++){
            let items = updatedList[i].items;
            if(items.length === 0){
                await List.destroy({
                    where:{
                        id:i+1
                    }
                })
            }
        }
        const finalList = await List.findAll({
            where: { email }
        });
        res.status(200).json({ msg: 'Item deleted successfully',items:finalList });
    } catch (err) {
        console.error('Error occurred while deleting item:', err);
        res.status(500).json({ msg: 'Error occurred while deleting item' });
    }
}

module.exports = {getAllLists,addList,updateList}