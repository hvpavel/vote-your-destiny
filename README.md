# Your vote matters

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Install dependencies

As simple as it could be. Just run `npm install` inside the root folder of the repository.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`.

## StackBlitz

You can also [check the project online on StackBlitz](https://stackblitz.com/github/hvpavel/vote-your-destiny). Just wait while StackBlitz does its magic.

## Design decisions

### Poll format

I decided that a poll should have a following format:

```typescript
interface Poll {
  question: string;
  answer: {
    [key: string]: string;
  };
}
```

In the described interface `[key: string]` is a unique ID generated for each answer when its control is added to the form. Because the application doesn't have a dedicated button for submitting a poll form when its ready, and the application should update all the data as it changes, it implies that a user can change any answer (e.g. fix a typo or remove an unnecessary answer) without losing data. So we need a way to set a connection between votes and the editing form and the chart data. Using a unique ID for an answer helps keep track of answers and votes regardless of the order of answers in the form or changing their text.
