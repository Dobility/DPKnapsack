/**
 * 二维背包问题
 * 2019年4月12日22:06:04
 * @author Dobility
 * 阿里JAVA笔试题
 * 商品有价值、标签（1,2,3,4）、重量、体积、库存
 * 背包有重量、体积限制，并且1和3标签不能共存，求最佳放置方案使得价值之和最大
 * 思路：可以把库存“展开”，分开讨论不放1、不放3，这样就只有二维（重量、体积）
 */

/**
 * 初始化动态规划用到的变量
 */
function init() {
  empty = true;
  V = new Array(MAX_I + 1);
  b = new Array(MAX_I + 1);
  for (let i = 0; i <= MAX_I; i++) {
    V[i] = new Array(MAX_W + 1);
    b[i] = new Array(MAX_W + 1);
    for (let w = 0; w <= MAX_W; w++) {
      V[i][w] = new Array(MAX_S + 1);
      b[i][w] = new Array(MAX_S + 1);
      for (let s = 0; s <= MAX_S; s++) {
        V[i][w][s] = 0;
        b[i][w][s] = 0;
      }
    }
  }
}

/**
 * 二维背包算法
  */
function DP(conflictLabel) {
  for (let i = 1; i <= MAX_I; i++) {				// 第i个商品
    for (let w = MAX_W; w >= 0; w--) {			// 当前动态规划的最大重量
      for (let s = MAX_S; s >= 0; s--) {    // 当前动态规划的最大体积
        if (goods[i].weight <= w && goods[i].volume <= s) {
          // 如果商品不超过最大重量、体积，也保证了 V 不会数组越界
          // 不放的当前价值
          let v1 = V[i - 1][w][s];
          // 放的当前价值
          let v2 = V[i - 1][w - goods[i].weight][s - goods[i].volume] + goods[i].value;
          if (v1 > v2 || conflict(goods[i].label, conflictLabel)) {
            // 不放更好，或者产生冲突了
            V[i][w][s] = v1;
          } else {
            // 放更好，且不冲突
            empty = false;    // 已经存放过了
            V[i][w][s] = v2;
            b[i][w][s] = 1;
          }
        } else {
          // 商品放不下
          V[i][w][s] = V[i - 1][w][s];
        }
      }
    }
  }
  return getAnswer();
}

/**
 * 根据标签判断是否冲突
 */
function conflict(currentLabel, conflictLabel) {
  if (empty || (currentLabel != 1 && currentLabel != 3)) {
    // 如果是一开始啥都还没放，或者商品标签不是1,3，则不冲突
    return false;
  }
  return currentLabel == conflictLabel;
}

/**
 * 获取最佳方案
 */
function getAnswer() {
  let TOTAL_W = 0, TOTAL_V = 0, TOTAL_S = 0, GOODS = [];
  function PrintKnapsackItem(i, w, s) {
    if (i == 0 || w == 0 || s == 0) {
      return 0;
    }
    if (b[i][w][s] == 1) {
      PrintKnapsackItem(i-1, w - goods[i].weight, s - goods[i].volume);
      GOODS.push(goods[i]);
      TOTAL_W += goods[i].weight;
      TOTAL_V += goods[i].value;
      TOTAL_S += goods[i].volume;
    } else {
      PrintKnapsackItem(i-1, w, s);
    }
  }
  PrintKnapsackItem(MAX_I, MAX_W, MAX_S);
  return {TOTAL_W, TOTAL_V, TOTAL_S, GOODS}
}

// ---------------------------程序执行-------------------------------
let MAX_I = 10 + 12 + 6,    // 商品总数（库存展开）
    MAX_W = 30,             // 背包最大重量
    MAX_S = 40;             // 背包最大体积
let goods = [], count = 1;
for (let i = 0; i < 10; i++) {
  goods[count++] = {
    value: 10, volume: 10, weight: 10, label: 1
  }
}
for (let i = 0; i < 12; i++) {
  goods[count++] = {
    value: 11, volume: 13, weight: 10, label: 3
  }
}
for (let i = 0; i < 6; i++) {
  goods[count++] = {
    value: 5, volume: 3, weight: 4, label: 3
  }
}
let [first, ...exampleGoods] = goods
console.log("【Sample】");
console.log(exampleGoods);

let V,      // 动态规划表格数据
    b,      // 物品存放情况
    empty;  // 是否背包为空（用于判断标签冲突）

// 计算不放1的背包
init();
let dp1 = DP(1);
// 再计算一次不放3的背包
init();
let dp3 = DP(1);
// 比较得出最佳答案
let dp = dp1.TOTAL_V >= dp3.TOTAL_V ? dp1 : dp3;
console.log('---------------------------\n【Solvement】');
console.log(dp.GOODS)
console.log("---------------------------\n" +
  "Sum: value: %d, volume: %d/%d, weight: %d/%d",
  dp.TOTAL_V, dp.TOTAL_S, MAX_S, dp.TOTAL_W, MAX_W);
