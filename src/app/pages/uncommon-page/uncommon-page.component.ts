import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Fernando',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canadá'
}

const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canadá'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {

  // i18nSelectPipe
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  };

  changeClient(){
    if(this.client() === client1){
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }

  // i18nPluralPipe
  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Mellisa',
    'Natalia',
    'Andrea',
    'Juan',
    'Carlos'
  ]);

  clientsMap = signal({
    '=0': 'no tenemos ningún cliente',
    '=1': 'tenemos un cliente',
    '=2': 'tenemos 2 clientes',
    other: 'tenemos # clientes' // el # se sustituye por el numero que se está evaluando
  });

  deleteClient(){

    this.clients.update(prev => prev.slice(1));

  }

  //KeyValuePipe
  profile = {
    name: 'Fernando',
    age: 39,
    address: 'Ottawa, Canadá'
  }

  //AsyncPipe con promesas
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('Tenemos error en la promesa');
      resolve('Tenemos data en la promesa');
      console.log('Promesa finalizada');
    }, 3500);
  });

  //AsyncPipe con observables
  myObservableTimer = interval(2000).pipe(
    map(value => value + 1),
    tap(value => console.log('tap:', value))
  );

}
