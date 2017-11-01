import { restaurantService } from '../../services/restaurant-service';
import { Restaurant } from '../../services/common/restaurant';
import { resFail, resSuccess } from '../common/response-body';

import { Response, Request } from 'express';


//aqui se maneja una url con queries
export class LocationQuery {
    lat: number;
    lon: number;
    km: number;
    //Con query se obtienen de una url ?dato=valor&dato1=valor
    //con params se obtienen datos de una peticion get o delete
    //con body se obtinen datos de una peticion post y put
    constructor(query: any) { 
        this.lat = query.lat ? parseFloat(query.lat) : 0;
        this.lon = query.lon ? parseFloat(query.lon) : 0;
        this.km = query.km ? parseInt(query.km) : 5;
    }
}

export function allLocation(req: Request, res: Response, next) {
    let query: LocationQuery = new LocationQuery(req.query);
    restaurantService
        .allByLocation(query.lon, query.lat, query.km)
        .then(result => resSuccess<Restaurant[]>(res, result))
        .catch(err => resFail(res, 500, err));
}