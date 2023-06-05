import {AuthRoutes,GuestRoutes} from "./components/Routes";

import {useActions} from "./hooks/use.actions";
import {useStorage} from "./hooks/use.storage";
import {useAppSelector} from "./hooks/use.store";

import {IUserToken} from "./types/user";

function App() {
  const error = useAppSelector(state => state.user.error)
	const [token] = useStorage<IUserToken | null>('token')
	const { meRequest } = useActions()

	window.addEventListener('DOMContentLoaded', () => {
		if (token && !error) {
			meRequest()
		}
  })

	if (token && !error) {
		return  <AuthRoutes />
	}

  return <GuestRoutes />
}

export default App;
