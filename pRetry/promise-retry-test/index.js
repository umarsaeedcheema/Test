import pRetry from 'p-retry';

async function myTask() {
  const response = await fetch('https://www.go1ßogle.com');
  return response.text();
}

const retryConfig = {
  retries: 3,            // Number of retry attempts
  onFailedAttempt: err => {
    console.error(`Attempt ${err.attemptNumber} failed. Retrying...`); //when this throws, all retries are are aborted and original promise is rejected
  }
};

async function main() {
  try {
    const result = await pRetry(myTask, retryConfig);
    console.log('Task completed successfully:', result);
  } catch (error) {
    console.error('Task failed after retries:', error);
  }
}

main();
