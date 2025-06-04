import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Routing from "./routes/Routing"

//implementacion de react query
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routing />
    </QueryClientProvider>
  )
}

export default App