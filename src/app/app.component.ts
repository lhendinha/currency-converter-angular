import { Component } from '@angular/core';

interface Currency {
  value: string;
  viewValue: string;
}

interface Select {
  value: string;
}

type CurrencyResponse = {
  info: {
    rate: number;
  };
  result: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'currency-converter';

  fromText = 0;
  toText = 0;

  isLoading = false

  currentSelectedFrom = ''
  currentSelectedTo = '';

  currencies: Currency[] = [
    {value: 'BRL', viewValue: 'Brazil'},
    {value: 'USD', viewValue: 'EUA'},
    {value: 'CAD', viewValue: 'Canada'},
  ];

  onChangeFromText(event: Event) {
    const input = event.target as HTMLInputElement;

    this.fromText = parseInt(input.value);

    this.callCurrencyConversor();
  }

  onChangeFromSelect(event: Select) {
    this.currentSelectedFrom = event.value;

    this.callCurrencyConversor();
  }

  onChangeToSelect(event: Select) {
    this.currentSelectedTo = event.value;

    this.callCurrencyConversor();
  }

  async callCurrencyConversor() {
    if (this.currentSelectedFrom.length > 0 &&
      this.currentSelectedTo.length > 0 &&
      this.fromText > 0) {
        this.isLoading = true;

        const url = `https://api.exchangerate.host/convert?from=${this.currentSelectedFrom}&to=${this.currentSelectedTo}&amount=${this.fromText}`;

        const response: CurrencyResponse = await (await fetch(url)).json();

        this.toText = response.result;
        this.isLoading = false;
    }
  }
}
