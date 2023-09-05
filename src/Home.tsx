import { doc } from 'firebase/firestore';
import { useFirestoreDocData, useFirestore } from 'reactfire';

import Counter from './features/counter/Counter';

function useBurrito() {
  const burritoRef = doc(useFirestore(), 'tryreactfire', 'burrito');

  return useFirestoreDocData(burritoRef);
}

function BurritoTaste() {
  const { status, data } = useBurrito();

  if (status === 'loading') {
    return <p>Fetching burrito flavor...</p>;
  }

  if (typeof data?.yummy !== 'boolean') {
    return <p>No burrito taste...</p>;
  }

  return <p>The burrito is {data.yummy ? 'good' : 'bad'}!</p>;
}

export function Component() {
  return (
    <>
      <Counter />
      <p>
        Edit <code>src/Home.tsx</code> and save to test HMR
      </p>
      <BurritoTaste />
    </>
  );
}

export default Component;
