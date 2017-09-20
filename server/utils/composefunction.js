const compose = function () {
  const funcs = arguments;
  return function () {
    let args = arguments;
    for (let i = funcs.length; i-- > 0;) {
      args = [funcs[i].apply(this, args)];
    }
    return args[0];
  };
};
// const f = compose(negate, square, mult2, add1);
// console.log(f(2));

