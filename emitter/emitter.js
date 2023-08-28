const { EventEmitter } = require('events'); //importing module

const getLetter = (index) =>{
    let cypher = "*12345K%^*^&*" //will be a fetch function in a real scenario which will fetch a new cypher every time
    let cipher_split = cypher.split('')
    return cipher_split[index]
}

const emitterFn = () => {
  const emitter = new EventEmitter(); //initializing new emitter
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    
    if (counter === 7) {
      clearInterval(interval);
      emitter.emit('end');
    }
    
    let letter = getLetter(counter)
    
    if (isNaN(letter)) { //Check if the received value is a number
      (counter<7) && emitter.emit(
        'error',
        new Error(`The index ${counter} needs to be a digit`)
      );
      return;
    }
    (counter<7) && emitter.emit('success', counter);
    // console.log(emitter.emit('success', counter))
  }, 1000);

  return emitter;
}

const listner = emitterFn();

listner.on('end', () => {
  console.info('All six indexes have been checked');
});

listner.on('success', (counter) => {
  console.log(`${counter} index is an integer`);
});

listner.on('error', (err) => {
  console.error(err.message);
});
