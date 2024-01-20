import { useEffect, useReducer } from 'react';
import Title from '../Components/Shared/Title'
import homePageReducer from '../src/Reducers/homePageReducer'
import axios from 'axios';
import Loading from '../components/Shared/Loading';
import MessageBox from '../components/Shared/MessageBox';
import Products from '../components/HomePage/Products';
import {GET_FAIL, GET_REQUEST, GET_SUCCESS} from '../src/Actions';

const initialState = {loading: true, error: '', data: []};

export const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);
  const {loading, error, data} = state;

  useEffect(() => {
    const getProducts= async() =>{
      dispatch({type: GET_REQUEST})
      try{
        const {data} = await axios.get('/api/v1/products')
        dispatch({type: GET_SUCCESS, payload: data})
        console.log(state.data)
      } catch(error){
        dispatch({type: GET_FAIL, payload: error.message})
      }
    };
    getProducts();
  }, [])
  
  return (
    
    <div><Title title= "Home Page"/>
        <div className='backgroundHomePage'>
          <img src="https://m.media-amazon.com/images/I/81d5OrWJAkL.SX3000.jpg" alt="backgroundPage" style={{width:'100%'}} />
        </div>
        <div className='products'>
          {loading ? <Loading/>
          :error ? <MessageBox variant='danger'>{error}</MessageBox>
          : (
            <div>
              <Products products={data}/>
            </div>
          )
        }
        </div>
    </div>
  )
}

