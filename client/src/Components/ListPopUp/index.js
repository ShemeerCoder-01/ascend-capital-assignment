import React, { useState } from 'react';
import './style.css';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import axios from 'axios';

function ListPopUp({handleModal}) {
    const [listTitle, setListTitle] = useState('');
    const [showInputField, setShowInputField] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [listItems, setListItems] = useState([]);

    let jsonToken = sessionStorage.getItem('token');
    const config = {
        headers: { 'Authorization': 'Bearer ' + jsonToken }
    };

    const handleTaskInput = () => {
        setShowInputField(true);
    };

    const handleCancelTask = () => {
        setShowInputField(false);
        setNewTask('');
    };

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setListItems([...listItems, newTask]);
            setNewTask('');
            setShowInputField(false);
        }
    };

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleFinalList = async() => {
        //db call and add data.
        let userEmail = sessionStorage.getItem('userEmail');
        try {
            if(listTitle !== '' && listItems.length !== 0){
                const response = await axios.post('http://localhost:8000/list/add',{title:listTitle,items:listItems,email:userEmail},{headers:config.headers});
                setListItems([]);
                setListTitle('');
                console.log(response);
            }
        } catch (err) {
            console.log("Error",err)
        }
       handleModal();
    }

    return (
        <div className='popup-container'>
            <div className='content-wrapper'>
                <h2 className='title'>Create List</h2>
                <div className='inputArea'>
                    <div className='input-div'>
                        <p className='label'>List Title : </p>
                        <input type='text' className='input-field' placeholder='List Name' onChange={(e) => setListTitle(e.target.value)} />
                    </div>
                    <div className='input-div'>
                        <p className='label'>Add tasks : </p>
                        <ControlPointRoundedIcon className='item-add-icon' onClick={handleTaskInput} />
                    </div>
                    <div>
                        {showInputField && (
                                <div className='task-container'>
                                    <input type='text' className='input-field' placeholder='Add Task' value={newTask} onChange={handleInputChange} />
                                    <div className='task-buttons'>
                                        <button className='btn' onClick={handleAddTask}>Add</button>
                                        <button className='btn' onClick={handleCancelTask}>Cancel</button>
                                    </div>
            
                                </div>
                            )}
                    </div>
                    <div>
                        <ul className='list-items'>
                            {listItems.map((item, index) => (
                                <li className='item' key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='popUp-buttons'>
                        <button onClick={handleFinalList}>Add</button>
                        <button onClick={handleModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListPopUp;
