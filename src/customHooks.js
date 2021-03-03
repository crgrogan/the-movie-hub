import { useEffect, useRef } from "react";

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export const useComponentWillMount = (func) => {
  const willMount = useRef(true);

  if (willMount.current) func();

  willMount.current = false;
};
