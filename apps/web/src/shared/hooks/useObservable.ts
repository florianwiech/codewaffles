import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Observable } from "rxjs";

// https://dev.to/bigab/rxjs-with-react-actions-and-subjects-3e5j
export function useObservable<T>(observable: Observable<T>) {
  const [state, setState] = useState<T>();

  const observableRef = useRef(observable);
  useLayoutEffect(() => {
    observableRef.current = observable;
  });

  useEffect(() => {
    const sub = observableRef.current.subscribe(setState);
    return () => sub.unsubscribe();
  }, []);

  return state;
}
