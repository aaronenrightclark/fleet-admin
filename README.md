# FleetAdmin

Simple fleet tracking app using [@angular/google-maps](https://github.com/angular/components/tree/master/src/google-maps).

This project was initially generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests (when fixed)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## TODO

- Styling of details component when rendered in map info window
- Fix test configs (angular-cli generated configs have some issues...); add tests

## Known Issues

- FleetMapComponent cannot be destroyed and re-loaded as that imports the Google Map script multiple times. This
  asdf

## Author

- Aaron Enright-Clark

## License

None
