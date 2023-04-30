# research-processing-order

同期処理と非同期処理の動作状況を調査。<br>

## 結果

- 下記の順序で実行される
  1. 同期処理の実行
  2. マイクロタスクキューにあるタスク（この場合、Promise の処理）
  3. タスクキューになるタスク（この場合、setTimeout の処理）
- 同期コードの待機中（await）、タスクキューにタスク（この調査の場合は setTimeout のコールバック）が存在する場合は実行する

## パターン

### パターン 1

```
const main = () => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 0);
  Promise.resolve().then(() => {
    console.log(3);
  });
  console.log(4);
};

main();

```

```
1→4→3→2
```

### パターン 2

```
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const main = async () => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 0);
  await sleep(0);
  Promise.resolve().then(() => {
    console.log(3);
  });
  console.log(4);
};

main();

```

```
1→2→4→3
```

### パターン 3

```
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
```

```
1→4→3→2
```
