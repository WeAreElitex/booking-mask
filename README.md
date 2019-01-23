# Booking mask test asignment

### Development

- webpack-dev-server 3.x
- react-hot-loader 4.x
- redux-devtools (with browser plugin)

`npm run new`

or

```
$ npm i yarn -g
$ yarn install
```

### Building

- webpack 4.x
- babel 7.x

`npm run build`

### Code Quality

- eslint 5.x

`npm run lint`

### Unit Testing

- jest 23.x
- enzyme 3.x

`npm test`

### Implementation details

- The booking mask assignment is implemented by the `containers/BookingMask.jsx` component;
- All React tree above `BookingMask.jsx` is at most the default boilerplate, used for the demo purposes;
- `BookingMask.jsx` implements information expert GRASP pattern;
- All `BookingMask.jsx` child components not aware of redux;
- The direct use of `dispatch` inside `BookingMask.jsx` is intentional and done for the testing convinience and consistency.
