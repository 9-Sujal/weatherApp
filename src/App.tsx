import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/theme-provider"
import WeatherDashboard from "./pages/weather-dashboard"

import { Layout } from "./components/layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CityPage from "./pages/city";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
 

  return (
     <QueryClientProvider client={queryClient}>
    <BrowserRouter>
  <ThemeProvider>
  <Layout>
    <Routes>
      <Route path="/" element={<WeatherDashboard />} />
      <Route path="/city/:cityName" element={<CityPage />} />
    </Routes>
  </Layout>
  </ThemeProvider>
    </BrowserRouter>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
