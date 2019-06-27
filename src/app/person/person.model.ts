export class Person {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public title: string,
    public email: string
  ) {}
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker('./person.worker', { type: 'module' });
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}