import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { UNAUTHENTICATED_ROUTES } from './utils/constant';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import FrontendLayout from './pages/Layout/FrontendLayout';
import {QueryClientProvider,QueryClient} from "react-query"
import CategoryDetail from './pages/CategoryDetail';

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
  return (
    <QueryClientProvider client={ queryClient}>
    <BrowserRouter>
    <Routes>
      <Route element ={<FrontendLayout/>}>
        <Route path ={UNAUTHENTICATED_ROUTES.HOME} element={<Home/>}/>
        <Route path ={UNAUTHENTICATED_ROUTES.POST_DETAIL} element={<PostDetail/>}/>
      <Route path={UNAUTHENTICATED_ROUTES.CATEGORY_DETAIL}
      element={<CategoryDetail/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
