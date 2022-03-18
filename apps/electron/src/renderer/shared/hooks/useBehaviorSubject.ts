import { BehaviorSubject } from "rxjs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useBehaviorSubject<T>(subject: BehaviorSubject<T>) {
  const [state, setState] = useState<T>(subject.getValue());

  const observableRef = useRef(subject);
  useLayoutEffect(() => {
    observableRef.current = subject;
  });

  useEffect(() => {
    const sub = observableRef.current.subscribe(setState);
    return () => sub.unsubscribe();
  }, []);

  return state;
}
