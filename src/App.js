import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { UNAUTHENTICATED_ROUTES } from './utils/constant';
import { AUTHENTICATED_ROUTE } from './utils/constant';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import FrontendLayout from './pages/Layout/FrontendLayout';
import {QueryClientProvider,QueryClient} from "react-query"
import CategoryDetail from './pages/CategoryDetail';
import SearchDetail from './pages/searchDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthService } from './utils/auth.services';
import AdminLayout from './pages/layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminCategories from './pages/layouts/AdminLayouts/AdminCategories';
import AddCategory from './pages/layouts/AdminLayouts/AddCategory';
import AdminUsers from './pages/layouts/AdminLayouts/AdminUsers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 0,
      staleTime: 5 * 1000, //cache expiry time
    },
  },
});

function App() {
  const isUserLoggedIn = AuthService.isUserLoggedIn();
  return (
    <QueryClientProvider client={ queryClient}>
    <BrowserRouter>
    <Routes>
      <Route element ={<FrontendLayout/>}>
        <Route path ={UNAUTHENTICATED_ROUTES.HOME} element={<Home/>}/>
        <Route path ={UNAUTHENTICATED_ROUTES.POST_DETAIL} element={<PostDetail/>}/>
      <Route path={UNAUTHENTICATED_ROUTES.CATEGORY_DETAIL}
      element={<CategoryDetail/>}/>
      <Route path = {UNAUTHENTICATED_ROUTES.SEARCH_DETAIL}
      element={<SearchDetail/>}/>
      <Route path = {UNAUTHENTICATED_ROUTES.REGISTER}
      element={<Register/>}/>
      <Route path = {UNAUTHENTICATED_ROUTES.LOGIN}
      element={<Login/>}/>
      </Route>
      {isUserLoggedIn && (
        <Route element = {<AdminLayout/>}>
          <Route
          path={AUTHENTICATED_ROUTE.DASHBOARD}
          element ={<Dashboard/>}
          />
          <Route path ={AUTHENTICATED_ROUTE.CATEGORIES}
          element = {<AdminCategories/>}/>
          <Route path ={AUTHENTICATED_ROUTE.ADD_CATEGORY}
          element = {<AddCategory/>}/>
          <Route path ={AUTHENTICATED_ROUTE.EDIT_CATEGORY}
          element = {<AddCategory/>}/>
          <Route path ={AUTHENTICATED_ROUTE.USER}
          element = {<AdminUsers/>}/>
        </Route>
      )}
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
