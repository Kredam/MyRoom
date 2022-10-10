import { MainMenu } from "components";
import RoomCards from "components/Rooms/Cards/Cards";
import routes from 'routes/routes'

const modules = [
  {
    id:'main-menu',
    path: routes.MainMenu,
    component: <MainMenu />
  },
  {
    id:'rooms',
    path: routes.Rooms,
    component: <RoomCards />
  }
]

export default modules