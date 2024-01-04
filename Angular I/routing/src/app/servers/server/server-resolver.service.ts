import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ServersService } from '../servers.service';
import { Observable } from 'rxjs';



interface Server {
  id: number;
  name: string;
  status: string;
}
@Injectable({
  providedIn: 'root'
})
export class ServerResolverService implements Resolve<Server> {
  constructor(private serverServices: ServersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Server> | Promise<Server> | Server {
    return this.serverServices.getServer(+route.params['id']);
  }

}
