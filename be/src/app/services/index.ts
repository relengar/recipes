import { AuthService } from './auth.service';
import { SpoontacularService } from './spoontacular.service'

export default {
    authService: new AuthService(),
    spoonApi: new SpoontacularService()
}
