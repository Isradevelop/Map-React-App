import { BtnMyLocation, MapView, SearchBar } from '../components'
import { ReactLogo } from '../components/ReactLogo';

export const HomePage = () => {
    return (
        <div>
            <MapView />
            <BtnMyLocation />
            <ReactLogo />
            <SearchBar />
        </div>
    )
}
