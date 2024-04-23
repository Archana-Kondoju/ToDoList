import { createBrowserRouter,createRoutesFromElements, Route } from "react-router-dom"
import App from "../App"
import { TodoWrapper } from './../Components/TodoWrapper';
import Login from "../Components/Login/Login";
import Register from './../Components/Login/register';
import Protected from './../Components/Protected';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Protected/>}>
                    <Route path='/:uid' element={<TodoWrapper/>}/>
            </Route>
        </Route>
    )
);

export default Router
