const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const main = async () => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 3000);
  await sleep(0);
  Promise.resolve().then(() => {
    console.log(3);
  });
  console.log(4);
};

main();
