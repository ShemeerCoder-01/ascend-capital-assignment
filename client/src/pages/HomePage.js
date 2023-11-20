import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import ListPopUp from '../Components/ListPopUp';
import axios from 'axios';
import uniqid from 'uniqid';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  let jsonToken = sessionStorage.getItem('token');
  const config = {
    headers: { 'Authorization': 'Bearer ' + jsonToken }
  };

  useEffect(() => {
    let token = sessionStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
  },[navigate]);

  useEffect(() => {
    //get data from the db to render
    let userEmail = sessionStorage.getItem('userEmail');
    const dataFetching = async () => {
      try {
        const response = await axios.get('http://localhost:8000/list/all', {
          params: {
            email: userEmail
          },
          headers:config.headers
        }
        );
        setLists(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    dataFetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);


 

  const handleModal = () => {
    setModalOpen(prevState => !prevState);
  }

  const handleChecker = async(e,itemIndex,listIndex,id) => {
    let email = sessionStorage.getItem('userEmail');
    try {
      const response = await axios.put('http://localhost:8000/list/item',config,{
        params:{
          email:email,
          listIndex:listIndex,
          itemIndex:itemIndex,
          id
        }
      });
      console.log(response);
      setLists(response.data.items);

    } catch (err) {
      
    }
  }


  return (
    <div>
      <Navbar />
      <div className='main-container'>
        <div className='list-flex'>
          {
            lists  &&
            lists?.map((list, listIndex) => {
              return (
                <div key={uniqid()} className='added-lists'>
                  <h4 className='list-title'>{list.title}</h4>
                  {
                    list?.items?.map((task, itemIndex) => {
                      return (
                        <div className='task' key={uniqid()}>
                          <input type='checkbox' onClick={(e) => handleChecker(e,itemIndex,listIndex,list.id)}/>
                          <span>{task}</span>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
        <div className='homepage-container'>
          <div className='homepage-wrapper'>
            <h4 className='list-title'>Create New List</h4>
            <div className='add-icon-wrapper'>
              <ControlPointRoundedIcon className='add-icon' onClick={handleModal} />
            </div>
          </div>
        </div>
        {modalOpen && <ListPopUp handleModal={handleModal} />}
      </div>
    </div>
  )
}

export default HomePage